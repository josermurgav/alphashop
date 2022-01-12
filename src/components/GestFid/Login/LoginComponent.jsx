import react, { Component } from 'react';
import './LoginComponent.css';
import AuthenticationService from '../Services/authservice.js';

export default class LoginComponent extends Component{

    state={
        userid:'',
        password: '',
        isLogged: false,
        isNoLogged:false
    }
    
    render()
    {
      return (
            <div className="LoginComponent">
                <section className="section-content bg padding-y">
                    <div className="container login-container">
                        <div className="row">
                            <div className="col-md-6 login-form">
                                <h3>Accesso a GestFid</h3>
                                <div className="form-group">
                                    <input type="text" className="form-control"  name="userid" placeholder="Nome Utente" 
                                        value={this.state.userid} onChange={this.GestMod} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control"  name="password" placeholder="Password" 
                                        value={this.state.password} onChange={this.GestMod} />
                                </div>
                                <div className="form-group">
                                    <button className="btnSubmit" onClick={this.Login}>Connetti</button>
                                </div>
                                <div className="form-group">
                                        <a href="#" className="ForgetPwd">Password Dimenticata?</a>
                                </div>
                                <ConnexKoMsg isNoLogged={this.state.isNoLogged}  /> 
                            </div>
                        </div>
                    </div>
                </section>
            </div>

      )      

    }

    Login = () =>{

        console.log("login:" + this.state.userid +" password "+this.state.password);

        //AuthenticationService.authUser(this.state.userid,this.state.password)
        AuthenticationService.jwtAuthUser(this.state.userid,this.state.password)
        // .then(() => {
        //     AuthenticationService.saveUserInfo(this.state.userid,this.state.password);            
        //     this.props.history.push(`/welcome/${this.state.userid}`); //ALT +0096   
        // })
        .then((response) => {
            AuthenticationService.saveUserInfoJWT(this.state.userid,response.data.token);            
            this.props.history.push(`/welcome/${this.state.userid}`); //ALT +0096   
        })
        .catch(() =>{
            this.setState({isLogged:false});
            this.setState({isNoLogged:true});
        })

        // if(this.state.userid==="Ocme" && this.state.password==="arechi")
        // {
        //     AuthenticationService.saveUserInfo(this.state.userid,this.state.password);
        //     //console.log("Hola Mundo");  
        //     this.props.history.push(`/welcome/${this.state.userid}`); //ALT +0096    
        //     // this.setState({isLogged:true});
        //     // this.setState({isNoLogged:false});
        // }         
        // else
        // {
        //     //console.log("sticazzi");
        //     this.setState({isLogged:false});
        //     this.setState({isNoLogged:true});
        // }
            
    }

    ModUSer =(event) =>{

        this.setState(
            {
                user: event.target.value
            }
        )
    }

    ModPassword =(event) =>{

        this.setState(
            {
                password: event.target.value
            }
        )
    }

    GestMod =(event) =>{

        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

}

function ConnexKoMsg(props){

    if(props.isNoLogged)
    {
        return <div className="alert alert-danger" role="alert">Spiacente la userid e/o la password sono errate!</div>
    }

    return null;
}
