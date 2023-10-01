import React from "react";

import { WeeklyChart } from "../Profile/ProfileReport/WeeklyChart";

import {Link, useNavigate} from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const WeeklyReportManagement = (props) => {

    const logout = () => {
        localStorage.removeItem('NAME_USER')
        localStorage.removeItem('ID_USER')
        localStorage.removeItem('ID_PORTFOLIO')
        localStorage.removeItem('NAME_PORTFOLIO')
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

            <WeeklyChart/>
        </div>
    );
}