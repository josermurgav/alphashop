import React from 'react';
import './Contatore.css';

const bottone = (props) =>{

    return (
        <div className="Bottone">
            <button onClick={props.modifica}>+{props.valore}</button>
        </div>

    );

}

export default bottone;