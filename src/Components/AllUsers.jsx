import { TableBody, TableCell, Table, TableHead, TableRow, makeStyles, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../Service/api";
import {Link} from 'react-router-dom';

const useStyle = makeStyles({
    table:{
        width:'90%',
        margin:'10px 0 0 110px'
    },
    bold:{
        '& > *':{
            color:'#1111FF',
            fontWeight:"bold"
        }
    }
})

const AllUsers = () => {

    const [users, setUsers]=useState([]);
    const classes = useStyle();
    useEffect(()=>{
        getAllUsers();
    }, [])

    const getAllUsers = async() =>{
        const response = await getUsers();
        console.log(response);
        setUsers(response.data);
    }

    const deleteUserData = async (id) => {
        await deleteUser(id);
        getAllUsers();
    }

    return(
        <Table className={classes.table}>
            <TableHead>
                <TableRow className={classes.bold}>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Salary</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    users.map(user => (
                        <TableRow>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.gender}</TableCell>
                            <TableCell>{user.salary}</TableCell>
                            <TableCell>{user.team}</TableCell>
                            <TableCell>{user.address}</TableCell>
                            <TableCell>
                                <Button variant="contained" style={{marginRight:10}} component={Link} to={`/edit/${user.id}`}>✏️</Button>
                                <Button variant="contained" color="error" onClick={() => deleteUserData(user.id)} >❌</Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default AllUsers;