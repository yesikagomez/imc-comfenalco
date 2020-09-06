import React     from 'react';
import Navbar from './../Navbar/Navbar';
import Card from './Card';
import {Grid} from '@material-ui/core';
import '../../index.css';

// Functional Stateless Component

const CardList = ({ filteredPokeList }) => {

	return (
    <div>
      <Navbar />
		      <div className="grid-container" id="card" >
            {filteredPokeList.map( pokemon => {
                return (
                <div  key={ pokemon.id } >
                  <Grid container justify="center">
                    <Card pokemon={pokemon} />
                  </Grid>
                </div>
                )
              })
            }
		      </div>
    </div>
	);
}

export default CardList;