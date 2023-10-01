import React, {useContext, useState, useEffect, useRef} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import { UserContext } from '../UserContexts/UserContext';
import { UserContext1 } from '../UserContexts/UserContext1';
import axios from "axios";

import {Link, useNavigate} from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import Table from 'react-bootstrap/Table';


export const Home = (props) => {

    const navigate = useNavigate();

    const {id_user, setId_user} = useContext(UserContext1);
    const {user_name, setUser_name} = useContext(UserContext);
    const [ticker_s, setTicker_s] = useState([]);

    const[watchlist, setWatchlist] = useState({
        user_id: 0,
        ticker_symbol: ""
    })

    const {user_id, ticker_symbol} = watchlist;

    const changeHandler = (e) => {
        setWatchlist({...watchlist, user_id: id_user, [e.target.name]: e.target.value})
    }

    const initialRender = useRef(true);

    useEffect(() => {

        if (localStorage.getItem("NAME_USER")) {
            const dataName = localStorage.getItem("NAME_USER");
            setUser_name(dataName);
        }

        if (JSON.parse(localStorage.getItem("ID_USER"))) {
            const data = JSON.parse(localStorage.getItem("ID_USER"));
            setId_user(JSON.parse(data));
        }

    }, [])


    useEffect(() => {

        if (initialRender.current) {
            initialRender.current=false;
            return;
        }
        window.localStorage.setItem('NAME_USER', user_name)
        window.localStorage.setItem('ID_USER', JSON.stringify(id_user))


    }, [user_name], [id_user])


    useEffect(() => {
        if (id_user != null) {
            fetch(`http://localhost:8080/symbolprocedure/${id_user}`)
            .then((response) => response.json())
            .then((json) => {
                setTicker_s(json)
            })
        }
    })

    const logout = () => {
        localStorage.removeItem('NAME_USER')
        localStorage.removeItem('ID_USER')
        localStorage.removeItem('ID_PORTFOLIO')
        localStorage.removeItem('NAME_PORTFOLIO')
        localStorage.removeItem('NAME_TICKER')
    }


    const deleteRow = (id, symbol) => {
        var watchlist_id = id;
        var ticker_symbol = symbol;

        axios.post("http://localhost:8080/deleteWatchlistRow", null, {params: {
                watchlist_id,
                ticker_symbol
        }})
    } 

    const toInputUppercase = (e) => {
        e.target.value = ("" + e.target.value).toUpperCase();
    }

    const saveChange = async() => {
        await axios.post("http://localhost:8080/addTicker", watchlist)
    }


    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Nav className="me-auto">
                    <Nav.Item>
                        <Navbar.Brand  as={Link} to={"/Home"}>Home</Navbar.Brand>
                    </Nav.Item>

                    <div className="me-auto" >
                        <Nav.Item>
                            <Nav.Link as={Link} to={"/Portfolios"}>Portfolios</Nav.Link>
                        </Nav.Item>
                    </div>
                    

                    <NavDropdown title="Profile Reports" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={"/WeeklyReport"}>Weekly Report</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"/MonthlyReport"}>Monthly Report</NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                <Nav>
                    <Nav.Item className="ml-auto">
                        <Nav.Link onClick={logout} as={Link} to={"/"}>Logout</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>

            <div style={{paddingTop: '2%'}}>
                <center>
                    <h1> {user_name}'s Watchlist </h1>
                </center>
            </div>


            <div style = {{width: '50%', marginLeft: 'auto', marginRight: 'auto', paddingTop: '3%'}}>
                <div style={{width: '75%',display: 'inline-block'}}>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Enter a ticker symbol"
                                autoFocus
                                name="ticker_symbol"
                                value = {ticker_symbol}
                                onChange = {changeHandler}
                                onInput={toInputUppercase}
                            />
                        </Form.Group>
                    </Form>
                </div>

                <div style={{display: 'inline-block', paddingLeft: '5%'}}>
                    <Button variant="primary" onClick={saveChange}>
                        Add ticker symbol
                    </Button>
                </div>
            </div>

            <div  style = {{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Table className="text-center" striped bordered hover >
                    <thead>
                        <tr>
                            <th hidden={true}>ID</th>
                            <th>Ticker Symbol</th>
                            <th style = {{width: '20%'}}>Delete row</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        {ticker_s.map((item) =>
                            <tr key={item.ticker_symbol}>
                                <td hidden={true}>{item.user_id}</td>
                                <td >{item.ticker_symbol}</td>
                                <td>
                                    <Button variant="danger" onClick={(e) => deleteRow(item.watchlist_id, item.ticker_symbol)}>Delete</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}