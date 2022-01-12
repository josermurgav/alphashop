import { render } from '@testing-library/react';
import React, { Component } from 'react';
import Bottone from './Bottone';
import './Contatore.css';



class contatore extends Component {
   

    constructor(props)
    {
      super(props);     
      this.state ={

        contatore:this.props.contatore1,
        contatore2:this.props.contatore2,
        valIncremento:this.props.val_incremento,
        valDecremento:this.props.val_decremento
    } 

    }
    
    render()
    {
        return(

            <div className="Contatore">
                {/* <button onClick={this.incrementa}>+{this.props.val_incremento}</button>
                <button onClick={this.decrementa}>-{this.props.val_decremento}</button>                
                <span className="valore"> {this.state.contatore}</span> */}
                {/* <Bottone modifica={this.incrementa.bind(this,1)} valore={1}></Bottone> */}
                <Bottone modifica={this.incrementa.bind(this,this.state.valIncremento)} valore={this.state.valIncremento}></Bottone>
                <Bottone modifica={this.decrementa.bind(this,this.state.valDecremento)} valore={this.state.valDecremento}></Bottone>
                <span className="valore"> {this.state.contatore}</span>
            </div>
        )

    }

    incrementa = (valore) =>{

        //console.log("Click");
    
        this.setState( 
            (prevState) =>{
                // return { contatore: this.state.contatore + valore  }
                return { contatore: prevState.contatore + valore  }
            }   
        )
    }


    decrementa = (valore) =>{

        //console.log("Click");
    
        this.setState(
            (prevState)=>{
                return {contatore: prevState.contatore -valore}                
            }
        )
    }
} 



export default contatore;