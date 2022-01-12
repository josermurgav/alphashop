import react, { Component } from 'react';
import AuthenticationService from './Services/authservice.js';
import { Redirect , Route } from 'react-router-dom';
import jwt from 'jsonwebtoken'
import axios from 'axios';

export default class AuthRoute extends Component {

    componentWillMount() {
        this.setupAxiosInterceptors('Bearer ' + sessionStorage.getItem('token'));
    }

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                if (AuthenticationService.isLogged()) {
                    config.headers.authorization = token
                } 

                return config;
            }
        )
    }  
    render()
    {
        let token=sessionStorage.getItem("token");
        let decoded =jwt.decode(token);
        let ruoli =decoded.authorities;
        if(AuthenticationService.isLogged())
        {
            let myRole=this.props.role;

            if(ruoli.includes(myRole))
            {
                return <Route {...this.props}></Route>
            }
            else
            {
                return <Redirect to="/forbidden" />     
            }
                 

        }
        else{
           return <Redirect to="/login" />
        }

    }

}