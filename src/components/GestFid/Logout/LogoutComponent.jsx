import react, { Component } from 'react';
import './LogoutComponent.css';
import { Link } from 'react-router-dom';
import AuthenticationService from '../Services/authservice.js';
export default class LogoutComponent extends Component{
    render()
    {
        AuthenticationService.clearUserInfo();

       return (
            <div className="LogoutComponent">
                <h2>Ti sei Sloggato</h2>   
                <Link  to="/Login">Vai su Login</Link>   
            </div>

       )     

    }
}