import React, { Component } from 'react';
import Cliente from './Clienti';

export default class Fidelity extends Component 
{
    constructor(props)
    {
        super(props);
        console.log("Avvio Costruttore");

        this.state = {

            clienti: [
                {nome:'J Murga', bollini:'1500', data:'01/01/2021'},
                {nome:'P Castillo', bollini:'1800', data:'01/02/2021'},
                {nome:'V Mendoza', bollini:'1300', data:'01/03/2021'}
    
            ]
        }

   
    }

    modificaDati = () =>
    {
        console.log("click tasto");
    }

    modificaClient = () =>
    {
        console.log("click tasto");
    }

    render(){
        console.log("Avvio Render");
        return (

            <div>
                <Cliente modifica={this.modificaClient} nome ={ this.state.clienti[0].nome} bollini={ this.state.clienti[0].bollini} data={ this.state.clienti[0].data}>Ciao</Cliente>   
                <Cliente modifica={this.modificaClient} nome ={ this.state.clienti[1].nome} bollini={ this.state.clienti[1].bollini} data={ this.state.clienti[1].data}>Ciao 2</Cliente>   
                <Cliente modifica={this.modificaClient} nome ={ this.state.clienti[2].nome} bollini={ this.state.clienti[2].bollini} data={ this.state.clienti[2].data}>Ciao 3</Cliente>   
                <button onClick={this.modificaDati}> Has click pe causa</button>
            </div>
        )
    }

    shouldComponentUpdate()
    {
        return false;
    }

    componentDidMount()
    {
        console.log("Avvio componentDidMount");
    }

    componentWillUnmount()
    {
        console.log("Avvio componentWillUnmount");
    }
}