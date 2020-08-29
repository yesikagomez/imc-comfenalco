import React, { Component } from 'react';
import FormularioCalculo from './FormularioCalculo';
import VerCalculo from './VerCalculoIMC';
class IMC extends Component {
    constructor(props){
        super(props);
        this.state = {
            peso : 0,
            altura : 1,
        }
    }

    calcularIMC({peso,altura}){
        return peso / Math.pow(altura,2);
    }

    render() {
        return (
            <>
                <FormularioCalculo C_IMC = {this} App = {this.props.App}/>
                <VerCalculo C_IMC = {this} altura={this.state.altura} peso={this.state.peso}/>
            </>
        );
    }
}
export default IMC;