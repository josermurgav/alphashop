import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SalutiService from '../Services/API/Saluti/SalutiService.js';
import './WelcomeComponent.css';

export default class WelcomeComponent extends Component
{
    state = {
        SalutiMsg:''
    }

    render()
    {
        return (
            <div className="WelcomeComponent">
                <section className="section-content bg padding-y">
                    <header className="section-heading">
                        <h2 className="section-title">Benvenuti in GestFid</h2>
                    </header>
                    <p>Saluti {this.props.match.params.user}! Clicca  <Link to='/clienti'>qui</Link> per vedere clienti disponibili </p>
                    
                    <button type="button" className="btn btn-primary" onClick={this.getSaluti}>Visualizza Saluti</button>
                <h3>{this.state.SalutiMsg}</h3>
                </section>
            </div>
    
        );      

    }

    getSaluti = () => {
        SalutiService.getSalutiDataParam(this.props.match.params.user)
        .then(response=>this.handleResponse(response))
        .catch(error=>this.handleError(error))
    }

    handleResponse = (response) => {
        this.setState(
            {
                SalutiMsg : response.data
            }
        )

    }

    handleError = (error) =>
    {
        console.log(error.response.data.message);    

        this.setState(
            {
                SalutiMsg : error.response.data.message
            }
        )
    }



}
