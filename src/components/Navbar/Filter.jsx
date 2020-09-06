import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Filter = ({ filterPokemons, filterBy }) => {

	return (

		<section className="container-fluid">
			 <nav className="navbar navbar-light">
                <form className="form-inline">
                    <input  className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search" onKeyUp={ filterPokemons } defaultValue={ filterBy }></input>
                </form>
            </nav>
		</section>

	);
}

export default Filter;