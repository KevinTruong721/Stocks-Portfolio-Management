import React, {useContext, useState, useEffect, useRef} from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';


import { UserContext1 } from "../UserContexts/UserContext1";
import { UserContext2 } from "../UserContexts/UserContext2";


import {Link, useNavigate} from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Table from 'react-bootstrap/Table';

export const ProfileDetails= (props) => {

    const navigate = useNavigate();

    const [ticker_s, setTicker_s] = useState([]);
    const [portfolioList, setPortfolioList] = useState([]);

    const {id_user, setId_user} = useContext(UserContext1);
    const {id_portfolio, setId_portfolio} = useContext(UserContext2);

    const initialRender = useRef(true);
    
    useEffect(() => {

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

        window.localStorage.setItem('ID_USER', JSON.stringify(id_user))

        if (id_user != null) {
            fetch(`http://localhost:8080/symbolprocedure/${id_user}`)
            .then((response) => response.json())
            .then((json) => {
    
            setTicker_s(json)
        
            })

            fetch(`http://localhost:8080/portfolioListProcedure/${id_user}`)
            .then((response) => response.json())
            .then((json) => {

            setPortfolioList(json);
        
            })
        }
    }, [id_user])


    const logout = () => {
        localStorage.removeItem('NAME_USER')
        localStorage.removeItem('ID_USER')
        localStorage.removeItem('ID_PORTFOLIO')
        localStorage.removeItem('NAME_PORTFOLIO')
    }

    const charts_reports = (id) => {

        setId_portfolio(id);
        navigate('/PortfolioWeeklyReportManagement');
        
    }

    return (
        <div> 
            <Navbar bg="dark" variant="dark" expand="lg">
                <Nav className="me-auto">
                    <Nav.Item>
                        <Navbar.Brand  as={Link} to={"/ProfileManagement"}>Home</Navbar.Brand>
                    </Nav.Item>


                    <NavDropdown title="Profile Reports" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={"/WeeklyReportManagement"}>Weekly Report</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"/MonthlyReportManagement"}>Monthly Report</NavDropdown.Item>
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
                    <div  style = {{width: '30%', marginLeft: 'auto', marginRight: 'auto', paddingTop: '3%', display: 'inline-block'}}>
                        <Table className="text-center" striped bordered hover >
                            <thead>
                                <tr>
                                    <th hidden={true}>ID</th>
                                    <th>Watchlist</th>
                                </tr>
                            </thead>
                        
                            <tbody>
                                {ticker_s.map((item) =>
                                    <tr key={item.ticker_symbol}>
                                        <td hidden={true}>{item.user_id}</td>
                                        <td>{item.ticker_symbol}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>

                    <div style = {{width: '50%',  paddingLeft: '5%' , display: 'inline-block'}}>
                    <Table className="text-center" striped bordered hover>
                        <thead>
                            <tr>
                                <th hidden={true}>ID</th>
                                <th hidden={true}>PORTFOLIO_ID</th>
                                <th>Portfolio Name</th>
                                <th>Amount</th>
                                <th>Currency</th>
                                <th>Charts/Reports</th>
                            </tr>
                        </thead>
                    
                        <tbody>
                            {portfolioList.map(item =>
                                <tr key={item.portfolio_name}>
                                    <td hidden={true}>{item.user_id}</td>
                                    <td hidden={true}>{item.portfolio_id}</td>
                                    <td>{item.portfolio_name}</td>
                                    <td>${item.portfolio_money}</td>
                                    <td>{item.currency_type}</td>
                                    <td>
                                        <Button onClick={(e) => charts_reports(item.portfolio_id)}>View Portfolio Charts/Reports</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    </div>
                    
                </center>
            </div>
        </div>
    );
}