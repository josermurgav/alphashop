import React from 'react';
import './Clienti.css';

const cliente = (props) => { 
    return  (
        <div>
                <p onClick={props.modifica}>{props.nome} - Bollini {props.bollini} - Ultima Spesa {props.data} </p>
                <p> {props.children} </p>
                <input type="text" value={props.nome}></input>
        </div>
        
        
        )

}

export default cliente;