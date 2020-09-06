import React from 'react';
import typeColors from '../../helpers/typeColors'
import {Card, CardMedia, CardContent, Typography} from '@material-ui/core'
import {withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';
import '../../index.css';

function PokeCard({pokemon }) {
    const { name, photo, types, id } = pokemon;

    return (
    <Card className="item">
        <Link to= { `/detalle/${id} `}>
            <CardMedia/>
                <Typography className="id" variant="h4">{id}</Typography>
                <img className="media"  src={ photo[0] } alt={ name } />
            
                <Typography gutterBottom variant="h4" component="h2">
                        {pokemon.name}
                </Typography>
        </Link> 
        <CardContent>
        <Typography variant="h6">
            <div>
                <div>
                { types.map( type => <div className= {` type-${ type }`} key={ type }  style={{ backgroundColor: typeColors[type] }}>{ type.toUpperCase()  }</div> ) }
                 </div>         
          </div>
        </Typography>
        </CardContent>
      </Card>
      
    );
}

export default PokeCard;
