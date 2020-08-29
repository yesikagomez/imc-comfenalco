import React from 'react'
import PropTypes from 'prop-types'
import { toast } from "bulma-toast"

class FormularioCalculo extends React.Component {

     constructor(props){
         super(props);
        // this.C_IMC = props.C_IMC;
         this.calcularIMC = this.calcularIMC.bind(this);
     }

    calcularIMC(e){
        try{
            let peso_1 = parseFloat(document.querySelector("#peso").value);
            let altura = parseFloat(document.querySelector("#altura").value);
            let imc = this.props.C_IMC.calcularIMC({peso:peso_1,altura:altura});
           
            if(!isNaN(imc)){
                this.props.C_IMC.setState({peso : peso_1, altura : altura});
                this.props.App.setState({imc: imc}); 
            }else
                throw new Error("Valor de IMC invalido");

        }catch(error){
            toast({
                message: `Se presento un error durante el calculo. ${error.message}`,
                type: "is-danger",
                position: "top-right",
                closeOnClick: true,
                pauseOnHover: true,
              //  animate: { in: "fadeIn", out: "fadeOut" }
            });
        }
    }

    render() {

        return (
            <div className="column">
                <div className="field">
                    <label htmlFor="peso" className="label">Peso (kilos)</label>
                    <div className="control">
                        <input className="input caja_texto" type="number" name="peso" id="peso" placeholder="Peso" />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="altura" className="label">Altura (cm)</label>
                    <div className="control">
                        <input className="input caja_texto" type="number" name="altura" id="altura" placeholder="Altura" />
                    </div>
                </div>


                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={this.calcularIMC}>Calcular</button>
                    </div>
                </div>
            </div>
        )
    }
}
FormularioCalculo.propTypes = {
    C_IMC: PropTypes.object
};

export default FormularioCalculo