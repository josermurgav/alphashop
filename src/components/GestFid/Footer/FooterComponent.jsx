import React, { Component } from 'react';
import './FooterComponent.css';

export default class FooterComponent extends Component {

    render() {
        return ( 
            <div className="FooterComponent">
                <footer className="footer text-xs-center">
                    <p className="text-muted">
                        <small>&copy; 2019 by Xantrix Inc.</small>
                    </p>
                    <p className="text-muted">
                        <a href="#"><small>Termini &amp; Condizioni</small> </a>
                    </p>
                    <p className="text-muted">
                        <a href="#"><small>Chi Siamo</small></a>
                    </p>
                    <p className="text-muted">
                        <a href="#"><small>I nostri Negozi</small></a>
                    </p>
                </footer>
            </div>
        )
    }
}