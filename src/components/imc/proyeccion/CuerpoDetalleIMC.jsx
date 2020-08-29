import React, { Component } from 'react'
import Tabla from './TablaIMC'
export default class CuerpoDetalleIMC extends Component {


    render() {
        return (
            <div className="columns is-mobile panel-block">
                <div className="column is-half is-offset-one-quarter">
                    <Tabla imc = {this.props.App.state.imc} datosTabla={
                        {
                            cabecera: { cabecera1: "IMC", cabecera2: "Situación", cabecera3: "Valoración" },
                            data: [
                                {li : 0,ls : 18.5, imc: "Menor de 18.5", situacion: "Bajo peso" },
                                {li : 18.5,ls : 24.9, imc: "18.5 - 24.9", situacion: "Normopeso" },
                                {li : 25,ls : 26.9, imc: "25 - 26.9", situacion: "Sobrepeso grado I" },
                                {li : 27,ls : 29.9, imc: "27 - 29.9", situacion: "Sobrepeso grado II" },
                                {li : 30,ls : 34.9, imc: "30 - 34.9", situacion: "Obesidad de tipo I" },
                                {li : 35,ls : 39.9, imc: "35 - 39.9", situacion: "Obesidad de tipo II" },
                                {li : 40,ls : 49.9, imc: "40 - 49.9", situacion: "Obesidad de tipo III (mórbida)" },
                                {li : 50,ls : Number.MAX_VALUE, imc: "Mayor a 50", situacion: "Obesidad de tipo IV (extrema)" },
                            ]
                        }
                    } />
                </div>
            </div>
        )
    }
}