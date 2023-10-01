import React, {useContext, useState, useEffect, useRef} from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

import { UserContext1 } from "../UserContexts/UserContext1";
import { UserContext2 } from "../UserContexts/UserContext2";

import {Link, useNavigate} from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Table from 'react-bootstrap/Table';

export const ManageProfiles = (props) => {
    const navigate = useNavigate();

    const [profileList, setProfileList] = useState([]);
    const {id_user, setId_user} = useContext(UserContext1);
    const {id_portfolio, setId_portfolio} = useContext(UserContext2);


    useEffect(() => {

        localStorage.removeItem('ID_USER');

        fetch(`http://localhost:8080/profileList`)
        .then((response) => response.json())
        .then((json) => {

        setProfileList(json);
    
        })

        .catch((err) => {
            console.log(err.message);
        })
    }, [])

    const logout = () => {
        localStorage.removeItem('NAME_USER')
        localStorage.removeItem('ID_USER')
        localStorage.removeItem('ID_PORTFOLIO')
        localStorage.removeItem('NAME_PORTFOLIO')
    }


    const profileDetails = (userID) => {
        setId_user(userID);
        navigate('/ProfileDetails')

    }
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Nav className="me-auto">
                    <Nav.Item>
                        <Navbar.Brand  as={Link} to={"/ProfileManagement"}>Home</Navbar.Brand>
                    </Nav.Item>
                </Nav>

                <Nav>
                    <Nav.Item className="ml-auto">
                        <Nav.Link onClick={logout} as={Link} to={"/"}>Logout</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>

            <div style = {{width: '50%', marginLeft: 'auto', marginRight: 'auto', paddingTop: '3%'}}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th hidden={true}>ID</th>
                        <th>Profile Name</th>
                        <th>Profile Details</th>
                    </tr>
                </thead>
              
                <tbody>
                    {profileList.map(item =>
                        <tr key={item.user_id}>
                            <td hidden={true}>{item.user_id}</td>
                            <td>{item.user_firstName} {item.user_lastName}</td>
                            <td style={{width: '30%'}}>
                                <Button onClick={(e) => profileDetails(item.user_id)}>View Profile Details</Button>
                            </td>
                        
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
        </div>
    );
}