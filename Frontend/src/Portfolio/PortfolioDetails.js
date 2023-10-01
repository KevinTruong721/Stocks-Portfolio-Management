import React, {useContext, useState, useEffect, useRef} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';

import { UserContext1 } from '../UserContexts/UserContext1';
import {UserContext2} from '../UserContexts/UserContext2';
import {UserContext3} from '../UserContexts/UserContext3';
import {UserContext4} from '../UserContexts/UserContext4';

import {Link, useNavigate} from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Table from 'react-bootstrap/Table';


export const PortfolioDetails = (props) => {

    const navigate = useNavigate();

    const {id_user, setId_user} = useContext(UserContext1);
    const {id_portfolio, setId_portfolio} = useContext(UserContext2);
    const {name_portfolio, setName_portfolio} = useContext(UserContext3);
    const {t_symbol, setT_symbol} = useContext(UserContext4);

    const [currentHoldings, setCurrentHoldings] = useState([]);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [portfolioAmount, setPortfolioAmount] = useState();

    const [ticker_symbol, setTicker_symbol] = useState("");

    const initialRender = useRef(true);


    useEffect(() => {

        localStorage.removeItem('NAME_TICKER')
        setT_symbol("");


        if (JSON.parse(localStorage.getItem("ID_USER"))) {
            const data = JSON.parse(localStorage.getItem("ID_USER"));
            setId_user(JSON.parse(data));
        }

        if (JSON.parse(localStorage.getItem("ID_PORTFOLIO"))) {
            const portfolioId = JSON.parse(localStorage.getItem("ID_PORTFOLIO"));
            setId_portfolio(JSON.parse(portfolioId));
        }

        if (localStorage.getItem("NAME_PORTFOLIO")) {
            const portfolioName = localStorage.getItem("NAME_PORTFOLIO");
            setName_portfolio(portfolioName);
        }
    }, [])


    useEffect(() => {

        if (initialRender.current) {
            initialRender.current=false;
            return;
        }
        window.localStorage.setItem('NAME_PORTFOLIO', name_portfolio)
        window.localStorage.setItem('ID_USER', JSON.stringify(id_user))
        window.localStorage.setItem('ID_PORTFOLIO', JSON.stringify(id_portfolio))

        if (id_portfolio != null) {
            fetch(`http://localhost:8080/getCurrentHoldings/${id_portfolio}`)
            .then((response) => response.json())
            .then((json) => {
            
            setCurrentHoldings(json);
    
            })
            
            fetch(`http://localhost:8080/getPortfolioTransaction/${id_portfolio}`)
            .then((response) => response.json())
            .then((json) => {
            
            setTransactionHistory(json);
    
            })

            fetch(`http://localhost:8080/portfolioAmount/${id_portfolio}`)
            .then((response) => response.json())
            .then((json) => {
            
            setPortfolioAmount(json);
            })
        }
    }, [name_portfolio], [id_user], [id_portfolio])


    const logout = () => {
        localStorage.removeItem('NAME_USER')
        localStorage.removeItem('ID_USER')
        localStorage.removeItem('ID_PORTFOLIO')
        localStorage.removeItem('NAME_PORTFOLIO')
        localStorage.removeItem('NAME_TICKER')
    }

    const removeName = () => {
        localStorage.removeItem('NAME_PORTFOLIO')
    }

    const toInputUppercase = (e) => {
        e.target.value = ("" + e.target.value).toUpperCase();
    }

    const searchSymbol = () => {
        navigate("/StockDetails");
        
    }

    const viewDetail = (tickerSymbol) => {
        setT_symbol(tickerSymbol);
        navigate("/StockDetails");
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Nav className="me-auto">
                    <Nav.Item>
                        <Navbar.Brand  onClick={removeName} as={Link} to={"/Home"}>Home</Navbar.Brand>
                    </Nav.Item>

                    <div className="me-auto" >
                        <Nav.Item>
                            <Nav.Link onClick={removeName} as={Link} to={"/Portfolios"}>Portfolios</Nav.Link>
                        </Nav.Item>
                    </div>
                    

                    <NavDropdown title="Portfolio Reports" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={"/PortfolioWeeklyReport"}>Weekly Report</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"/PortfolioMonthlyReport"}>Monthly Report</NavDropdown.Item>
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
                    <h1> {name_portfolio}: ${portfolioAmount}</h1>
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
                                value = {t_symbol}
                                onChange = {(e) => setT_symbol(e.target.value)}
                                onInput={toInputUppercase}
                            />
                        </Form.Group>
                    </Form>
                </div>

                <div style={{display: 'inline-block', paddingLeft: '2.5%'}}>
                    <Button variant="primary" onClick={searchSymbol}>
                        Search ticker symbol
                    </Button>
                </div>
            </div>


            <div  style = {{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Table className="text-center" striped bordered hover >
                    <thead>
                        <tr>
                            <th hidden={true}>ID</th>
                            <th>Current Holdings</th>
                            <th>Stock Details</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        {currentHoldings.map((item) =>
                            <tr key={item.holdings_id}>
                                <td hidden={true}>{item.user_id}</td>
                                <td>{item.ticker_symbol}</td>
                                <td>
                                    <Button onClick={(e) => viewDetail(item.ticker_symbol)}>View Stock Details</Button>
                                </td>
                            </tr>
                        )} 
                    </tbody> 
                </Table>
            </div>

            <div  style = {{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Table  striped bordered hover >
                    <thead>
                        <tr>
                            <th>Transaction History</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        {transactionHistory.map(item =>
                            <tr key={item.transaction_id}>
                                <td hidden={true}>{item.portfolio_id}</td>
                                <td hidden={true}>{item.transaction_id}</td>
                                <td>{item.transaction_type} {item.ticker_symbol} at ${item.cost_per_unit} x {item.quantity} on {item.transaction_date}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}