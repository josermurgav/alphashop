import axios from "axios"

class SalutiService{

    getSalutiData = () => {
        return axios.get("http://localhost:8080/api/saluti");
    }

    getSalutiDataParam = (nome) => {
        return axios.get(`http://localhost:8080/api/saluti/${nome}`);
    }
}

export default new SalutiService()