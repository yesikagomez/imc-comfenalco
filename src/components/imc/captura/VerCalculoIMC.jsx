import React from 'react'
import PropTypes from 'prop-types'; 

function VerCalculoIMC(props) {
    let imc = props.C_IMC.calcularIMC({peso: props.peso, altura:props.altura}).toFixed(2);
    return (
        <div className="column">
            <h3>IMC</h3>
            <h3>{imc}</h3>
        </div>
    )
}

VerCalculoIMC.propTypes = {
    peso : PropTypes.number.isRequired,
    altura : PropTypes.number.isRequired
};

export default VerCalculoIMC