import React from 'react';
//import './style.css';
import {AppBar, Typography, Toolbar} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

function Navbar(props) {
    const { classes } = props
    return (
        <div className="Navbar">
            <AppBar className={classes.NavColor} position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" noWrap>
                        Pokemon
                    </Typography>
                    
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles({
    NavColor: {
        background: '#219ebc'
    }
}) (Navbar);
