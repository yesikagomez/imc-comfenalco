import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom'
import 'bulma/css/bulma.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import CalculadorApp from './components/imc/captura/CalculadorApp'
import DetalleIMC from './components/imc/proyeccion/DetalleIMCApp'
export default class App extends React.Component {
  componentWillMount() {
    this.setState({ imc: 0 })
  }

  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <div className="tabs">
          <ul>
            <li className="is-active"><Link to = "/calculo-imc">Calculo</Link></li>
            <li><Link to = "/detalle-imc">Detalle</Link></li>
          </ul>
        </div>
        
          <Switch>
            <Route path = "/calculo-imc" exact component = {() =>  <CalculadorApp App={this} /> } />
            <Route path = "/detalle-imc" exact component = {() =>  <DetalleIMC App={this} /> } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}