import React from 'react'
import BasculaIMC from './BasculaIMC';
import IMC from './IMC';
export default class CuerpoCalculo extends React.Component {
    
    render(){
       
        return (
            <section className="panel-block">
                <article className="columns is-mobile">
                    <IMC App = {this.props.App}/>
                    <BasculaIMC/>
                </article>
            </section> 
        )
    }
}