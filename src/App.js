import React             from 'react';
import { Route, Switch } from 'react-router-dom';
import DetallePokemon           from './components/Detalle/DetallePokemon';
import Filter            from './components/Navbar/Filter';
import CardList        from './components/Card/Card-List';

// Functional Stateless Component

const App = ({ filterPokemons, filterBy, pokeList, evolutions, resetFilter, filteredPokeList }) => {

	return (

      <Switch>
        <Route exact path='/' render={ () =>
        	<React.Fragment>

            <Filter
              filterPokemons = { filterPokemons }
              filterBy       = { filterBy }
            />
            <CardList
              pokeList         = { pokeList }
              filterBy         = { filterBy }
              filteredPokeList = { filteredPokeList }
            />

        	</React.Fragment>
        }
        />
        <Route path='/detalle/:id' render={ props =>
          <DetallePokemon
            match            = { props.match }
            pokeList         = { pokeList }
            evolutions       = { evolutions }
            filterBy         = { filterBy }
            filteredPokeList = { filteredPokeList }
            resetFilter      = { resetFilter }
          />}
        />
      </Switch>
	);
}

export default App;






  


