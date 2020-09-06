import React, { Component } from 'react';
import Main                 from './App';

const NUM_OF_POKEMONS     = 27; // número de pokemons que queremos
const POKEMONS_URL        = 'https://pokeapi.co/api/v2/pokemon/'; // URL base para cada Pokemon
const SPECIES_URL         = 'https://pokeapi.co/api/v2/pokemon-species/'; // URL base de species, para determinar cadena evolutiva
let   requestedPokemons   = []; // este array es creado para registrar todas las peticiones de pokemons hechas a la API
let   requestedSpecies    = []; // este array es creado para registrar todas las peticiones de species hechas a la API
let   evolutionsData      = [];

class info extends Component {
	constructor(props) {
		super(props)

		this.state = {
			receivedData       : false,   // esta propriedad se activa para confirmar que hemos recibido respuesta a las peticiones
			error              : null,    // esta propiedad es activada cuando ocurre algún error, para renderizar una pantalla personalizada de error
			pokeList           : [],      // aqui se almacenarán todos los pokemons recibidos
			evolutions         : {},      // aqui se almacenarán todas las evoluciones recibidas
      filterBy           : '',      // string de búsqueda
      filteredPokeList   : []       // aquí se almacenarán los pokemons filtrados
		}
	}

	componentDidMount() {

    this.catchPokemons();

    Promise.all( requestedPokemons ) // las tareas abajo solo son cumplidas cuando todas las Promesas (peticiones) son resolvidas (cuando ya tenemos sus valores)
    .then( pokemonData => { this.createPokemonObject( pokemonData ) }) // llama al método createPokemonObject pasando todo el listado de pokemons
    .catch( error => this.setState({ error }) ); // gestiona los errores alterando la propiedad error en el state

    Promise.all( requestedSpecies ) // las tareas abajo solo son cumplidas cuando todas las Promesas (peticiones) son resolvidas (cuando ya tenemos sus valores)
    .then( speciesData => { this.manageSpecies( speciesData ) }) // llama al método createPokemonObject pasando todo el listado de pokemons
    .catch( error => this.setState({ error }) ); // gestiona los errores alterando la propiedad error en el state
  }

  fetchData = URI => {
    return fetch( URI )
    .then( response => response.json() )
  }

  catchPokemons = () => {

    for(let i = 1 ; i <= NUM_OF_POKEMONS; i++) {
      const QUERY = i;
      requestedPokemons.push( this.fetchData(`${POKEMONS_URL}${QUERY}/`) ); // cada petición está siendo guardada no array requests, y genera una Promesa
      requestedSpecies.push( this.fetchData(`${SPECIES_URL}${QUERY}/`) ); // lo mismo
    }
  }

  createPokemonObject = pokemonData => {
    let pokeList   = [];

    for ( const pokemon of pokemonData ) { // crea un objecto para cada pokemon con solo las informaciones necesarias
      let sprites = [];

      sprites.push( pokemon.sprites['front_default'] );
      sprites.push( pokemon.sprites['back_default'] );
      sprites.push( pokemon.sprites['front_shiny_female'] || pokemon.sprites['front_shiny'] );
      sprites.push( pokemon.sprites['back_shiny_female'] || pokemon.sprites['back_shiny'] );

      pokeList = [ ...pokeList, // ES6 Spreading: mantiene los objectos ya guardados en pokeList, añadiendo nuevos
        {
          id        : pokemon.id,
          name      : pokemon.name,
          types     : pokemon.types.map( typeObject => typeObject.type.name ),
          height    : pokemon.height / 10,
          weight    : pokemon.weight / 10,
          abilities : pokemon.abilities.map( typeObject => typeObject.ability.name ),
          speed     : pokemon.stats[0].base_stat,
          defense   : pokemon.stats[3].base_stat,
          attack    : pokemon.stats[4].base_stat,
          hp        : pokemon.stats[5].base_stat,
          photo     : sprites
        }
      ];
    }

    this.setState({
      filteredPokeList : pokeList,
      pokeList, // en ES6 escribir de esa manera es lo mismo que escribir pokeList: pokeList (la primera es la propiedad del State y la segunda es la variable creada arriba)
    });
  }

  manageSpecies = speciesData => {
    let evolutionChains = [];

    for ( const _thisSpecies of speciesData ) {
      evolutionChains.push( _thisSpecies.evolution_chain.url )
    }
    evolutionChains = [ ...new Set( evolutionChains ) ];
    this.catchEvolutions( evolutionChains );
  }

  catchEvolutions = evolutionChains => {
    let requestedEvolutions = []; // este array es creado para registrar todas las peticiones de evolución hechas a la API

    for( const URI of evolutionChains ) {
      requestedEvolutions.push( this.fetchData( URI ) ); // cada petición está siendo guardada no array requestedPokemons, y genera una Promesa
    }

    Promise.all( requestedEvolutions )
    .then( evolutionsData => { this.createEvolutionsObject( evolutionsData ) })
    .catch( error => this.setState( { error } ));
  }

  componentDidUpdate( prevProps, prevState ) {
    if ( prevState.pokeList !== this.state.pokeList ) {
      this.createEvolutionsObject( evolutionsData );
    }
  }

  createEvolutionsObject = evolutionsInfo => {
    const { pokeList } = this.state;
    let   evolutions   = {};
    evolutionsData     = evolutionsInfo;

    if ( !pokeList ) {
      return
    }

    for ( const evolution of evolutionsData ) {
      const evolutionChain = evolution.chain;

      if ( !evolutionChain.evolves_to[0] ) {

        evolutions = { ...evolutions,
          [ evolutionChain.species.name ] : null
        };
      } else if ( !evolutionChain.evolves_to[0].evolves_to[0] ) {
        let cameFromId, evolvesToId;

        for ( const _thisPokemon of pokeList ) {
          if ( _thisPokemon.name === evolutionChain.species.name ) {
            cameFromId = _thisPokemon.id;
          }
          if ( _thisPokemon.name === evolutionChain.evolves_to[0].species.name ) {
            evolvesToId = _thisPokemon.id;
          }
        }

        evolutions = { ...evolutions,
          [ evolutionChain.evolves_to[0].species.name ]: {
            from: {
              cameFrom: {
                id      : cameFromId,
                species : evolutionChain.species.name
              }
            },
            to: null
          },
          [ evolutionChain.species.name ]: {
            from: null,
            to: {
              evolvesTo: {
                id      : evolvesToId,
                species : evolutionChain.evolves_to[0].species.name
              }
            }
          }
        };
      } else {
        let cameFromId, wasBornId, evolvesToId, lastEvolutionId;

        for ( const _thisPokemon of pokeList ) {
          if ( _thisPokemon.name === evolutionChain.species.name ) {
            wasBornId = _thisPokemon.id;
          }
          if ( _thisPokemon.name === evolutionChain.evolves_to[0].species.name ) {
            cameFromId = evolvesToId = _thisPokemon.id;
          }
          if ( _thisPokemon.name === evolutionChain.evolves_to[0].evolves_to[0].species.name ) {
            lastEvolutionId = _thisPokemon.id;
          }
        }
        evolutions = { ...evolutions,
          [ evolutionChain.evolves_to[0].evolves_to[0].species.name ]: {
            from: {
                cameFrom: {
                id      : cameFromId,
                species : evolutionChain.evolves_to[0].species.name
              },
              wasBorn: {
                id      : wasBornId,
                species : evolutionChain.species.name
              }
            },
            to: null
          },
          [ evolutionChain.evolves_to[0].species.name ]: {
            from: {
              cameFrom: {
                id      : wasBornId,
                species : evolutionChain.species.name
              }
            },
            to: {
              evolvesTo: {
                id      : lastEvolutionId,
                species : evolutionChain.evolves_to[0].evolves_to[0].species.name
              }
            }
          },
          [ evolutionChain.species.name ] : {
            from: null,
            to: {
              evolvesTo: {
                id      : evolvesToId,
                species : evolutionChain.evolves_to[0].species.name
              },
              lastEvolution: {
                id      : lastEvolutionId,
                species : evolutionChain.evolves_to[0].evolves_to[0].species.name
              }
            }
          }
        }
      }
    }
    this.setState({
      receivedData: true,
      evolutions
    });
  }

	filterPokemons = event => {
		const { value }    = event.currentTarget;  // ES6 Destructuring: determina que la variable "value" es igual a una propiedad de event.currentTarget (event.currentTarget.value)
    const { pokeList } = this.state;

		this.setState({
      filterBy         : value,  // puedo llamar la variable "value", que el código entende que nos referimos a event.currentTarget.value
      filteredPokeList : pokeList.filter(pokemon => pokemon.name.toLowerCase().includes(value.toLowerCase()))
		})
	}

  resetFilter = () => {
    const { pokeList } = this.state;

		this.setState({
      filterBy         : '',
      filteredPokeList : pokeList
		})
  }

  render() {

	const { pokeList: myPokeList, filteredPokeList, evolutions, receivedData, filterBy, error } = this.state;  // ES6 Destructuring: se está definiendo como variables las propiedades del State para que haga falta repetir "this.state" al llamarlas

    return (
      <div className="App">
          <Main
            pokeList         = { myPokeList }
            evolutions       = { evolutions }
            filterBy         = { filterBy }
            filterPokemons   = { this.filterPokemons }
            filteredPokeList = { filteredPokeList }
            resetFilter      = { this.resetFilter }
          />
      </div>
    );
  }
}

export default info;