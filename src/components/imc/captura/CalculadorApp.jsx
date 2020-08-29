import React from 'react';
import Cabecera from './CabeceraCalculo';
import Cuerpo from './CuerpoCalculo';
let micomponente = (props) => {
    return (
        <section className="panel">
            <Cabecera 
                titulo="Calculadora" 
                nombre_clase="cabecera_calculo"
            />
            <Cuerpo  App = {props.App}/>
        </section>
    );
}
 
export default micomponente;