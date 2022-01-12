import axios from "axios";

class ClientiService{
    state = {
        server: "http://localhost:5071",
        BaseUrl: "/api/clienti"
    }

    getAllClientiData = () =>{
        
        //let BasicAuthHeader = 'Basic ' + window.btoa(this.state.UserId + ":" + this.state.Password);
        
        return axios.get(`${this.state.server}${this.state.BaseUrl}/cerca/all`);//,
                        // { 
                        //     headers:{
                        //         authorization : BasicAuthHeader
                        //     }                        
                        // });
    }

    getClienteByCode = (codfid) =>{
        return axios.get(`${this.state.server}${this.state.BaseUrl}/cerca/codice/${codfid}`);
    }

    getClienteByNominativo = (codfid) =>
    {
        return axios.get(`${this.state.server}${this.state.BaseUrl}/cerca/nominativo/${codfid}`);
    }

    getCienteByBollini = (bollini) =>
    {
        return axios.get(`${this.state.server}${this.state.BaseUrl}/cerca/bollini/${bollini}`);
    }

    delClienteByCode =(codfid) =>{
        return axios.delete(`${this.state.server}${this.state.BaseUrl}/elimina/codfid/${codfid}`);
    }

    insCliente = (cliente) =>
    {
        return axios.post(`${this.state.server}${this.state.BaseUrl}/inserisci`,cliente);
    }
}

export default new ClientiService()
