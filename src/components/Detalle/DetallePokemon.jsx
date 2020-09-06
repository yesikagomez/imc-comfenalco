import React    from 'react';
import Navbar from './../Navbar/Navbar';
import { Link } from 'react-router-dom';
import '../../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class DetallePokemon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pokemon                : null,
      evolution              : null,
      filteredPokemonsIds    : [],
      pokemonPositionOnArray : 0,
      nextPokemons           : []
    }
  };

  componentDidMount() {
    const { filteredPokeList } = this.props;
    const id                   = Number( this.props.match.params.id );
    let   filteredPokemonsIds  = [];

    for ( const _thisFilteredPokemon of filteredPokeList ) {
      filteredPokemonsIds.push( _thisFilteredPokemon.id );
    }

    this.setState({ filteredPokemonsIds });
    this.selectPokemon( id );
  }

  selectFilteredPokemon = action => {
    const { pokemon, filteredPokemonsIds } = this.state;

    let activePokemon = Number( pokemon.id );
    let nextPokemon;

    activePokemon = filteredPokemonsIds.indexOf( activePokemon );

    if ( action === 'back' ) {
      nextPokemon = activePokemon - 1;
    } else {
      nextPokemon = activePokemon + 1;
    }

    nextPokemon = filteredPokemonsIds[nextPokemon];
    this.selectPokemon( nextPokemon );
  }

  selectPokemonOnEvolutionChain = id => {
    const { resetFilter } = this.props;

    resetFilter();
    this.selectPokemon( id );
  }

  selectPokemon = id => {
    const { pokeList, evolutions, filteredPokeList } = this.props;

    let filteredPokemonsIds    = [];
    let pokemonPositionOnArray = 0;
    let nextPokemons           = [];

    for ( const _thisFilteredPokemon of filteredPokeList ) {
      filteredPokemonsIds.push( _thisFilteredPokemon.id );
    }

    pokemonPositionOnArray = filteredPokemonsIds.indexOf( id );

    nextPokemons.push(filteredPokemonsIds[pokemonPositionOnArray - 1], filteredPokemonsIds[pokemonPositionOnArray + 1] )
    for ( const _thisPokemon of pokeList ) {
      if ( _thisPokemon.id === id ) {

        for ( const _thisEvolution in evolutions ) {
          if ( _thisEvolution === _thisPokemon.name ) {
            this.setState({
              pokemon                : _thisPokemon,
              evolution              : evolutions[_thisEvolution],
              filteredPokemonsIds,
              pokemonPositionOnArray,
              nextPokemons
            })
          }
        }
      }
    }
  }

  getCameFromPhoto = evolvedPokemonId => {
    const { pokeList } = this.props;

    for ( const _thisPokemon of pokeList ) {

      if ( _thisPokemon.id === evolvedPokemonId ) {
        return _thisPokemon.photo[2];
      }
    }
  }

  getWasBornPhoto = evolvedPokemonId => {

    const { pokeList } = this.props;
    for ( const _thisPokemon of pokeList ) {

      if ( _thisPokemon.id === evolvedPokemonId ) {
        return _thisPokemon.photo[2]
      }
    }
  }

  render () {
    const { pokemon, evolution, filteredPokemonsIds, pokemonPositionOnArray, nextPokemons } = this.state;
    const { filterBy } = this.props;
    return (
      <div className="container p-3 my-3 bg-dark text-white">
        <Navbar/>
        <a href="#" id="btn-cerrar-popup" className="btn-cerrar-popup text-decoration-none"><i class="fas fa-times"></i></a>
        <div className="overlay">
          <div className="popup">
            { pokemon ?
            <div>
              <div className="container">
                <div className="text-center">
                  <h2>{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.substr(1) }</h2>
                </div>
                <div>
                  <img src={ pokemon.photo[0] } alt={ `${pokemon.name}` }/>
                  <img  src={ pokemon.photo[1] } alt={ `${pokemon.name} (back)` }/>
                  <img  src={ pokemon.photo[2] } alt={ `${pokemon.name} (alternative appearance)` }/>
                  <img src={ pokemon.photo[3] } alt={ `${pokemon.name} (back of alternative appearance)` }/>
                </div>
                <div className="text-center">
                  <h4>Evoluciones</h4>
                  <table  className="table">
                    <tr>
                    <th>
                    { evolution.to && evolution.to.lastEvolution &&
                    <Link to={ `${evolution.to.lastEvolution.id}` } className="text-decoration-none">
                      <h5 onClick={ () => this.selectPokemonOnEvolutionChain( evolution.to.lastEvolution.id )}>  
                        <img src={ this.getCameFromPhoto(evolution.to.lastEvolution.id) } alt={ evolution.to.lastEvolution.species }/>
                        {evolution.to.lastEvolution ? evolution.to.lastEvolution.species.charAt(0).toUpperCase() + evolution.to.lastEvolution.species.substr(1) : null }
                      </h5>
                    </Link>
                    }
                  </th>
                <th>
                  { evolution.to &&
                  <Link to={ `${evolution.to.evolvesTo.id}` } className="noLinkStyle">
                    <h5 onClick={ () => this.selectPokemonOnEvolutionChain( evolution.to.evolvesTo.id )}>
                      <img  src={ this.getCameFromPhoto(evolution.to.evolvesTo.id) } alt={ evolution.to.evolvesTo.species }/>
                      { evolution.to.evolvesTo ? evolution.to.evolvesTo.species.charAt(0).toUpperCase() + evolution.to.evolvesTo.species.substr(1) : null }
                    </h5>
                  </Link>
                  }
                </th>
                <th>
                  { evolution.from &&
                  <Link to={ `${evolution.from.cameFrom.id}` } className="noLinkStyle">
                    <h5 onClick={ () => this.selectPokemonOnEvolutionChain( evolution.from.cameFrom.id )}>
                      { evolution.from.cameFrom ? evolution.from.cameFrom.species.charAt(0).toUpperCase() + evolution.from.cameFrom.species.substr(1) : null }
                      <img  src={ this.getCameFromPhoto(evolution.from.cameFrom.id) } alt={ evolution.from.cameFrom.species }/>
                    </h5>
                  </Link>
                  }
                </th>
                <th className="col">
                  { evolution.from && evolution.from.wasBorn &&
                    <Link to={ `${evolution.from.wasBorn.id}` }>
                      <h5 onClick={ () => this.selectPokemonOnEvolutionChain( evolution.from.wasBorn.id ) }>
                        { evolution.from.wasBorn ? evolution.from.wasBorn.species.charAt(0).toUpperCase() + evolution.from.wasBorn.species.substr(1) : null }
                        <img src={ this.getWasBornPhoto(evolution.from.wasBorn.id) } alt={ evolution.from.wasBorn.species }/>
                      </h5>
                    </Link>
                  }
                </th>
                </tr>
                </table>
                </div>
            </div>
            <div>
              <table class="table">
                <thead>
                  <tr className="text-white">
                    <th>Altura</th> 
                    <th>Peso</th> 
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-white">
                    <th>{ pokemon.height } m</th>
                    <th>{ pokemon.weight } kg</th>
                  </tr>
                </tbody>
              </table>
              <div>
                <h4>Habilidades: </h4>
                <ul>
                  { pokemon.abilities.map( type => <li  key={ type }>{ type.toUpperCase() }</li> )}
                </ul>
              </div>
            </div>
          </div>
        : null
        }
          </div>
        </div>
      </div>

    );
  }
}

export default DetallePokemon;