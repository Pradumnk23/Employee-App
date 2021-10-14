

import {AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { NavLink } from 'react-router-dom';

const useStyle = makeStyles({
    header:{
        
    },
    tabs :{
        color:'#FFFFFF',
        textDecoration:'none',
        marginRight: 15,
        fontSize: 20,
    }
})

const Navbar = () => {
    const classes = useStyle();
    return (
        <AppBar className={classes.header} position="static">
            <Toolbar>
                <NavLink className={classes.tabs} to="./" exact>Home</NavLink>
                <NavLink className={classes.tabs} to="all" exact>All_Employee</NavLink>
                <NavLink className={classes.tabs} to="add" exact>Add</NavLink>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;