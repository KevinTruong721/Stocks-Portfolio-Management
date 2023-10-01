import React, {useContext, useState, useEffect, useRef} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import { UserContext } from '../UserContexts/UserContext';
import { UserContext1 } from '../UserContexts/UserContext1';
import {UserContext2} from '../UserContexts/UserContext2';
import {UserContext3} from '../UserContexts/UserContext3';

import axios from "axios";

import {Link, useNavigate} from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Modal from 'react-bootstrap/Modal';

import Table from 'react-bootstrap/Table';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import Toast from 'react-bootstrap/Toast';


export const Portfolio = (props) => {
    const navigate = useNavigate();

    const {id_user, setId_user} = useContext(UserContext1);
    const {user_name, setUser_name} = useContext(UserContext);
    const {id_portfolio, setId_portfolio} = useContext(UserContext2);
    const {name_portfolio, setName_portfolio} = useContext(UserContext3);

    const [currencyType, setCurrencyType] = useState("CAD")

    const [portfolioList, setPortfolioList] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const[portfolio, setPortfolio] = useState({
        user_id: 0,
        portfolio_name: "",
        portfolio_money: 5000.00,
        currency_type: ""
    })

    const {user_id, portfolio_name} = portfolio;

    const changeHandler = (e) => {
        setPortfolio({...portfolio, user_id: id_user, [e.target.name]: e.target.value, currency_type: currencyType})
    }

    const changeHandler1 = (e) => {
        setCurrencyType(e);
        setPortfolio({...portfolio, currency_type: e})
    }


    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(false);

    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);


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

        localStorage.removeItem('NAME_PORTFOLIO')
        localStorage.removeItem('ID_PORTFOLIO')
 
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

            fetch(`http://localhost:8080/portfolioListProcedure/${id_user}`)
            .then((response) => response.json())
            .then((json) => {
    
            setPortfolioList(json);
    
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

    const portfolioDetails = (id, id1, name) => {

        setId_user(id);
        setId_portfolio(id1);
        setName_portfolio(name);

        navigate('/PortfolioDetails');
        
    }

    const deleteRow = (id) => {
        var portfolio_id = id;

        axios.get("http://localhost:8080/checkHoldingsExist", {params: {
            portfolio_id
        }})

            .then((response) => {
                if (response.data === 1) {
                   setShowB(true);
                }

                else {
                    axios.post("http://localhost:8080/deletePortfolioRow", null, {params: {
                        portfolio_id
                    }})
                }
            })

            .catch((err) => {
            console.log(err.message);
            })
    }


    const saveChange = async(e) => {
       
        await axios.get("http://localhost:8080/checkPortfolioValidity", {params: {
            user_id,
            portfolio_name
        }})

        .then((response) => {
            if (response.data === 1) {
                handleClose();
                setShowA(true)
            }

            else {
                axios.post("http://localhost:8080/createPortfolio", portfolio)
                setPortfolio({...portfolio, user_id: id_user, portfolio_name: "", portfolio_money: 5000.00, currency_type: ""})
                handleClose();
            }
        })

        .catch((err) => {
        console.log(err.message);
        }) 
        
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

            <div>
                <center>
                    <Toast show={showA} onClose={toggleShowA} bg='danger'>
                    <Toast.Header>
                        <img className="rounded me-2" alt="" />
                        <strong className="me-auto">Portfolio already exists. Please try again</strong>
                    </Toast.Header>
                    </Toast>
                </center>
            </div>

            <div>
                <center>
                    <Toast show={showB} onClose={toggleShowB} bg='danger'>
                    <Toast.Header>
                        <img className="rounded me-2" alt="" />
                        <strong className="me-auto">An error occured. Please sell all of your current holdings and try again</strong>
                    </Toast.Header>
                    </Toast>
                </center>
            </div>


            <div style={{paddingTop: '2%'}}>
                <center>
                <h1> {user_name}'s Portfolios </h1>
                </center>
            </div>

            <div style = {{width: '60%', marginLeft: 'auto', marginRight: 'auto', paddingTop: '3%'}}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th hidden={true}>ID</th>
                            <th hidden={true}>PORTFOLIO_ID</th>
                            <th>Portfolio Name</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th style={{width: '25%'}}>Portfolio Details</th>
                            <th style = {{width: '10%'}}>Delete Portfolio</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        {portfolioList.map(item =>
                            <tr key={item.portfolio_name}>
                                <td hidden={true}>{item.user_id}</td>
                                <td hidden={true}>{item.portfolio_id}</td>
                                <td style={{width: '60%'}}>{item.portfolio_name}</td>
                                <td>${item.portfolio_money}</td>
                                <td>{item.currency_type}</td>
                                <td>
                                    <Button onClick={(e) => portfolioDetails(item.user_id, item.portfolio_id, item.portfolio_name)}>View Portfolio Details</Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={(e) => deleteRow(item.portfolio_id)}>Delete</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>


            <div style={{display: 'inline-block', paddingLeft: '80%', paddingTop: '5%'}}>
                <Button variant="primary" onClick={handleShow}>
                    Create Portfolio
                </Button>
            </div>  

            <Modal  show={show} 
                    onHide={handleClose} 
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Create Portfolio</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <div>
                    <div style={{paddingLeft: '5%', width: '80%', display: "inline-block"}}>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Portfolio Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter a portfolio name"
                                    autoFocus
                                    name="portfolio_name"
                                    value = {portfolio_name}
                                    onChange = {changeHandler}
                                />
                            </Form.Group>
                        </Form>
                    </div>

                    <div style={{display: "inline-block", paddingLeft: '2%'}}>
                        <DropdownButton title={currencyType} id="dropdown-basic-button">
                            <Dropdown.Item onClick={() => {changeHandler1('CAD')}}>CAD</Dropdown.Item>
                            <Dropdown.Item onClick={() => {changeHandler1('USD')}}>USD</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveChange}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}