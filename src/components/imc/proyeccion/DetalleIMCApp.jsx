import React,{Component} from 'react';
import Cabecera from './CabeceraDetalleIMC';
import Cuerpo from './CuerpoDetalleIMC';
export default class DetalleIMCApp extends Component{
    // {nombre:"Oscar", apellido: "Mesa", edad: 29}
    constructor(props){
        console.log(props);
        super(props);
        this.state = {

        }
    }

    render(){
        return (<section className="panel">
                    <Cabecera/>
                    <Cuerpo App = {this.props.App}/>
                </section>
        );
    }
}