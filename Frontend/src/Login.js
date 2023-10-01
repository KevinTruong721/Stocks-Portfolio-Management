import React, {useContext, useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import { UserContext } from './UserContexts/UserContext';
import { UserContext1 } from './UserContexts/UserContext1';
import axios from "axios";

import Toast from 'react-bootstrap/Toast';

export const Login = (props) => {

    const navigate = useNavigate();

    const {user_name, setUser_name} = useContext(UserContext);
    const {id_user, setId_user} = useContext(UserContext1);


    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
          setShowA(false);
        }, 3000);
        
        return () => clearTimeout(timer);
      });  


    const signin = (e) => {

        var user_email = email;
        var user_password = password;

        axios.get("http://localhost:8080/checkValidity", {params: {
            user_email,
            user_password
        }})

        .then((response) => {
            if (response.data === 1) {
                
                if (user_email === 'admin') {
                    navigate('/ProfileManagement')
                }

                else {
                    fetch(`http://localhost:8080/fetchIdAndName/${email}`)
                    .then((response) => response.json())
                    .then((json) => {
            
    
                        setUser_name(json[0].user_firstName);
                        setId_user(json[0].user_id);
    
                        window.localStorage.setItem('NAME_USER', user_name)
    
                    })

                    .catch((err) => {
                    console.log(err.message);
                    })
                    navigate('/Home');
                }
            }

            else {
                setShowA(true)
            }
        })

         .catch((err) => {
         console.log(err.message);
         })
    }

    const registerPage = () => {
        navigate('/')
    }

    return (
        <div>
            <div>
                <center>
                    <Toast show={showA} onClose={toggleShowA} bg='danger' style={{width: '30%'}}>
                        <Toast.Header>
                            <img className="rounded me-2" alt="" />
                            <strong className="me-auto">Incorrect email address/password. Please try again</strong>
                        </Toast.Header>
                    </Toast>
                </center>
            </div>
                
            <div style={{paddingTop: '2%'}}>
                <center>
                    <h1> Database System for Stocks/Portfolio Management </h1>
                </center>
            </div>
            
            <Form>
                <div style = {{width: '25%', marginLeft: 'auto', marginRight: 'auto', paddingTop: '3%'}}>
                    <label htmlFor="Email">Email address</label>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                placeholder="Enter email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                            />
                    </Form.Group>
                </div>

                <div style = {{width: '25%', marginLeft: 'auto', marginRight: 'auto', paddingTop: '2%'}}>
                    <label htmlFor="password">Password</label>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                placeholder="*************"
                            />
                    </Form.Group>
                </div>
            </Form>

            <div style = {{display: 'flex', alignItems: 'center', justifyContent: 'center',margin: 'auto', paddingTop: '1%'}}>
                <div>
                    <Button variant="primary" onClick ={signin}>Sign in</Button>
                </div>
            </div>


            <div style = {{display: 'flex', alignItems: 'center', justifyContent: 'center',margin: 'auto', paddingTop: '1%'}}>
                <Button variant="secondary" onClick={registerPage}>Don't have an account? Register here!</Button>
            </div>
        </div>        
    )
}

