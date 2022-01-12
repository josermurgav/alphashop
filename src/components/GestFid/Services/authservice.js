import axios from "axios";


class AuthenticationService{

    state = {
        server: "http://localhost:5071",
        BaseUrl: "/api/clienti",
        serverAuth: "http://localhost:9100"
    }
    
    authUser = (username,password) =>
    {
        return axios.get(`${this.state.server}${this.state.BaseUrl}/auth`,{
            headers : {
                authorization : this.createBasicAuthHeader(username,password)
            }
        });
    }
    jwtAuthUser = (username,password) =>{
        return axios.post(`${this.state.serverAuth}/auth`,
            {   
                username,
                password
            });
    }
    
    createBasicAuthHeader = (username,password) => 'Basic ' + window.btoa(username + ":" + password); 
    
    saveUserInfo = (username,password) =>
    {
        sessionStorage.setItem("user",username);
        
        //let BasicAuthHeader = 'Basic ' + window.btoa(this.state.UserId + ":" + this.state.Password);
        //let BasicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);

        this.setupAxiosInterceptors(this.createBasicAuthHeader(username,password));
    }

    createJwtAuthHeader = (token) => 'Bearer ' + token;

    saveUserInfoJWT = (username,token) =>
    {
        sessionStorage.setItem("user",username);
        sessionStorage.setItem("token",token);
        this.setupAxiosInterceptorsJwt(this.createJwtAuthHeader(token));
    }

    clearUserInfo = () =>
    {
        sessionStorage.removeItem("user");
    }

    getUserInfo = () => {

        return sessionStorage.getItem("user");
    }

    isLogged =() =>
    {
        let user= this.getUserInfo();       
        if(user== null)
        {
            console.log("Non loggato");
            return false;
        }            
        else
        {
            console.log("loggato");    
            return true;
        }
            
    }

    setupAxiosInterceptors(BasicAuthHeader)
    {
        
        axios.interceptors.request.use(
            (config) => {
                if(this.isLogged())
                {
                    config.headers.authorization = BasicAuthHeader
                }
                return config;
            }
        )

        
    }

    setupAxiosInterceptorsJwt(token)
    {
        
        axios.interceptors.request.use(
            (config) => {
                if(this.isLogged())
                {
                    config.headers.authorization = token
                }
                return config;
            }
        )

        
    }


    

}

export default new AuthenticationService()