import { FormControl, FormGroup, Input, Button, makeStyles, Typography } from "@material-ui/core";
import {InputLabel,Radio ,RadioGroup ,FormControlLabel,FormLabel} from "@material-ui/core";
import { Select, MenuItem } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { editUser, getUsers } from "../Service/api";
import {useHistory, useParams} from 'react-router-dom';


const useStyle = makeStyles({
    container:{
        width:'50%',
        margin: '3% 0 0 25%',
        '& > *':{
            marginTop:0
        }
    },
    gender:{
        marginTop:15
    }
})

const initalValues ={
    name: '',
    salary: '',
    address: '',
    team: '',
    gender: ''
}

const EditUser = () => {
    const [user, setUser] = useState(initalValues);
    const {name, salary, address, team, gender} = user;
    const {id} = useParams();
    const classes = useStyle();
    const history = useHistory();

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async() => {
        const response = await getUsers(id);
        setUser(response.data);
    }

    const editUserDetails = async () => {
        await editUser(id, user);
        history.push('/all');
    }

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }


    return(
        <FormGroup className={classes.container}>
            <Typography variant="h5">Edit Employee</Typography>
            <FormControl>
                <InputLabel>Employee Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} /> 
            </FormControl>
            <FormControl>
                <InputLabel>Salary</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='salary' value={salary}/> 
            </FormControl>
            <FormControl>
                <InputLabel>Address</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='address' value={address}/> 
            </FormControl>

            <FormControl>
                <InputLabel>Team</InputLabel>
                <Select onChange={(e) => onValueChange(e)} name='team' value={team}>
                    <MenuItem value="Arjun">Arjun</MenuItem>
                    <MenuItem value="Krishna">Krishna</MenuItem>
                    <MenuItem value="Mahasena">Mahasena</MenuItem>
                    <MenuItem value="Lankesh">Lankesh</MenuItem>
                </Select>
            </FormControl>
            
            <FormControl className={classes.gender}>
                <FormLabel >Gender</FormLabel>
                <RadioGroup onChange={(e) => onValueChange(e)} name='gender' value={gender}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>

            <FormControl>
                <Button variant="contained" onClick={() => editUserDetails()} color="primary">Submit</Button>
            </FormControl>
        </FormGroup>
    )
}

export default EditUser;