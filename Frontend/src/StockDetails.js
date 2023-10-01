import React, {useContext, useState, useEffect, useRef} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { UserContext1 } from './UserContexts/UserContext1';
import {UserContext2} from './UserContexts/UserContext2';
import {UserContext3} from './UserContexts/UserContext3';
import {UserContext4} from './UserContexts/UserContext4';

import axios from "axios";

import {Link, useNavigate} from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Modal from 'react-bootstrap/Modal';

import Table from 'react-bootstrap/Table';

import { MY_API_KEY } from './config';


export const StockDetails = (props) => {

    const navigate = useNavigate();

    const {id_user, setId_user} = useContext(UserContext1);
    const {id_portfolio, setId_portfolio} = useContext(UserContext2);
    const {name_portfolio, setName_portfolio} = useContext(UserContext3);
    const {t_symbol, setT_symbol} = useContext(UserContext4);

    const [transactionHistory, setTransactionHistory] = useState([]);
    const [currentStock, setCurrentStock] = useState([]);

    const [portfolioInfo, setPortfolioInfo] = useState([]);

    const [totalBook, setTotalBook] = useState(0.00);
    const [totalCurrent, setTotalCurrent] = useState(0.00);

    const [symbolPrice, setSymbolPrice] = useState(0);
    const [dividend, setDividend] = useState(0);
    const [divDate, setDivDate] = useState("");
    const [displayDivDate, setDisplayDivDate] = useState("");
    const [symbolName, setSymbolName] = useState("");
    const [currencyType, setCurrencyType] = useState("");


    const[stockInfo, setStockInfo] = useState({
        user_id: 0,
        portfolio_id: 0,
        total_book_value: 0.00,
        total_current_value: 0.00,
        quantity: 0,
        ticker_symbol: ""
    })

    const {user_id, portfolio_id, total_book_value, quantity, ticker_symbol} = stockInfo;

    const[dividendInfo, setDividendInfo] = useState({
        portfolio_id: 0,
        quantity: 0,
        dividend_amount: 0.00,
        dividend_date: "",
        ticker_symbol: ""

    })


    const[transaction, setTransaction] = useState({
        portfolio_id: 0,
        transaction_type: "",
        quantity: 0,
        cost_per_unit: 0.00,
        transaction_date: "",
        ticker_symbol: ""
    })


    const [quantity1, setQuantity1] = useState(0);
    const [newQuantity, setNewQuantity] = useState(0);


    const [modalFlag, setModalFlag] = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showModal, setShowModal] = useState(false);
    
    const [portfolioMoney, setPortfolioMoney] = useState(0);

    const [displayQuantity, setDisplayQuantity] = useState(0);
    const [displayBookValue, setDisplayBookValue] = useState(0);
    const [displayCurrentValue, setDisplayCurrentValue] = useState(0);

    const [currencyRate1, setCurrencyRate1] = useState([]);
    const [currencyRate2, setCurrencyRate2] = useState([]);

    const [carryover, setCarryover] = useState({
        start_date: "",
    })

    const {start_date, end_date} = carryover;


    const initialRender = useRef(true);

    useEffect(() => {
        function getStock() {
            const options = {
                method: 'GET',
                url: 'https://yh-finance.p.rapidapi.com/market/v2/get-quotes',
                params: {region: 'US|CA', symbols: t_symbol},
                headers: {
                    'X-RapidAPI-Key': MY_API_KEY,
                    'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
                }
            };
              
            axios.request(options).then(function (response) {
                var tempDividend = Math.round((response.data.quoteResponse.result[0].dividendsPerShare / 4) * 100) / 100; 
                var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

                const seconds = response.data.quoteResponse.result[0].dividendDate * 1000;
                var date = new Date(seconds);
                let year = date.getFullYear();
                let month = date.getMonth();
                let day = date.getDate();

                var selectedMonthName = months[month];
                var ddate = selectedMonthName + " " + day + " " + year;
                var ddate1 = year + "-" + (Number(month)+1) + "-" + day;
                   
                if (isNaN(seconds) === true) {
                    setDisplayDivDate(null);
                    setDivDate(null);
                }

                else {
                    setDisplayDivDate(ddate);
                    setDivDate(ddate1);
                }

                setCurrencyType(response.data.quoteResponse.result[0].currency)
                setSymbolName(response.data.quoteResponse.result[0].symbol)
                setSymbolPrice(response.data.quoteResponse.result[0].regularMarketPrice);
                setDividend(tempDividend);

                }).catch(function (error) {
                    console.error(error);
                });
        }

        getStock();

        const interval = setInterval(() => getStock(), 10000)
        return () => {
            clearInterval(interval);
        }

    }, [])

   
    useEffect(() => {
        function getCurrency() {
            const options = {
                method: 'GET',
                url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert',
                params: {from: 'CAD', to: 'USD', amount: '1'},
                headers: {
                'X-RapidAPI-Key': MY_API_KEY,
                'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
                }
            };
                
            axios.request(options).then(function (response) {
                setCurrencyRate1(response.data.result);
            }).catch(function (error) {
                    console.error(error);
                });
            } 

            function getCurrency1() {
                const options = {
                    method: 'GET',
                    url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert',
                    params: {from: 'USD', to: 'CAD', amount: '1'},
                    headers: {
                      'X-RapidAPI-Key': MY_API_KEY,
                      'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
                    }
                };
                 
                axios.request(options).then(function (response) {
                    setCurrencyRate2(response.data.result);
                }).catch(function (error) {
                    console.error(error);
                });
            }

            getCurrency();
            getCurrency1();

            const interval = setInterval(() => getCurrency(), 5000)
            const interval1 = setInterval(() => getCurrency1(), 5000)

            return() => {
                clearInterval(interval)
                clearInterval(interval1);
            }
    }, [])


    useEffect(() => {

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

        if (localStorage.getItem("NAME_TICKER")) {
            const tickerName = localStorage.getItem("NAME_TICKER");
            setT_symbol(tickerName);
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
        window.localStorage.setItem('NAME_TICKER', t_symbol)

        async function fetchData() {
            
            if (id_portfolio != null) {    
                fetch(`http://localhost:8080/portfolioInfoProcedure/${id_portfolio}`)
                .then((response) => response.json())
                .then((json) => {
                    setPortfolioInfo(json);
                })
             }

            if (id_portfolio != null && t_symbol != null) {
                var portfolio_id = id_portfolio;
                var ticker_symbol = t_symbol;

                await axios.get("http://localhost:8080/getTransactionHistory", {params: {
                    portfolio_id,
                    ticker_symbol
                }})

                .then((response) => {
                    setTransactionHistory(response.data);
                })
            
                .catch((err) => {
                    console.log(err.message);
                })

                await axios.get("http://localhost:8080/getCurrentStock", {params: {
                    portfolio_id,
                    ticker_symbol
                }})

                .then((response) => {
                    setCurrentStock(response.data);
                })

                .catch((err) => {
                    console.log(err.message);
                })
            }
        }
        fetchData();

    }, [name_portfolio], [id_user], [id_portfolio], [t_symbol])




    useEffect(() => {
        if (currentStock[0] === null || currentStock[0] === undefined) {
            setDisplayQuantity(0);
            setDisplayBookValue(0);
            setDisplayCurrentValue(0);
        }

        else {
            setDisplayQuantity(currentStock[0].quantity)
            setDisplayBookValue(Math.round((currentStock[0].total_book_value) * 100) / 100)
            setDisplayCurrentValue(Math.round((currentStock[0].total_current_value) * 100) / 100)
        }
    })


    const logout = () => {
        localStorage.removeItem('NAME_USER')
        localStorage.removeItem('ID_USER')
        localStorage.removeItem('ID_PORTFOLIO')
        localStorage.removeItem('NAME_PORTFOLIO')
        localStorage.removeItem('NAME_TICKER')
    }



    const buyButton = (e) => {

        if (portfolioInfo[0].currency_type === 'CAD' && currencyType === 'USD') {
            if (Number(quantity1) === 0 || (portfolioInfo[0].portfolio_money < (Number(quantity1) * symbolPrice * currencyRate2))) {
                //popup error modal
                setModalFlag(3);
                setShowModal(handleShow);
            }
   
            else {
                setModalFlag(1);
                setShowModal(handleShow);
                calcBuy();
            }
        }

        else if (portfolioInfo[0].currency_type === 'USD' && currencyType === 'CAD') {
            if (Number(quantity1) === 0 || (portfolioInfo[0].portfolio_money < (Number(quantity1) * symbolPrice * currencyRate1))) {
                //popup error modal
                setModalFlag(3);
                setShowModal(handleShow);
            }
   
            else {
                setModalFlag(1);
                setShowModal(handleShow);
                calcBuy();
            }
        }

        else {

            if (Number(quantity1) === 0 || (portfolioInfo[0].portfolio_money < (Number(quantity1) * symbolPrice))) {
                //popup error modal
                setModalFlag(3);
                setShowModal(handleShow);
            }
   
            else {
                setModalFlag(1);
                setShowModal(handleShow);
                calcBuy();
            }
        }
    }


    function sellButton() {

        if(Number(quantity1) === 0 || currentStock[0] === null || currentStock[0] === undefined || currentStock[0].quantity === 0 || currentStock[0].quantity < Number(quantity1)) {
            setModalFlag(3);
            setShowModal(handleShow);
        }

         else {
             setModalFlag(2);
             setShowModal(handleShow)
             calcSell();
         }
    }


    const carryoverButton = () => {
        if (Number(quantity1) === 0) {
            setModalFlag(3);
            setShowModal(handleShow);
        }

        else {
            setModalFlag(4)
            setShowModal(handleShow);
        }
    
    }


    const calcSell = (e) => {

        var sellSumPortfolio = 0;
        var sellSumHoldings = 0;
        var newAmount = 0;
        var commission = 9.99;
        var totalBookValue = 0;
        var totalCurrentValue = 0;


        var date = (new Date()).toISOString().split('T')[0];


        if (portfolioInfo[0].currency_type === 'CAD' && currencyType === 'USD') {
            sellSumPortfolio = Number(quantity1) * symbolPrice * currencyRate2;
        }


        else if (portfolioInfo[0].currency_type === 'USD' && currencyType === 'CAD') {
            sellSumPortfolio = Number(quantity1) * symbolPrice * currencyRate1;
        }

        else {
            sellSumPortfolio = Number(quantity1) * symbolPrice;
        }

        sellSumHoldings = Number(quantity1) * symbolPrice;
        newAmount = portfolioInfo[0].portfolio_money + sellSumPortfolio;

    

        totalCurrentValue = currentStock[0].total_book_value - sellSumHoldings;
        totalBookValue = currentStock[0].total_book_value - sellSumHoldings - commission;


        var new_Quantity = currentStock[0].quantity - quantity1;
    
        var newPortfolioMoney = newAmount-commission;

        setPortfolioMoney(newPortfolioMoney);
        setNewQuantity(new_Quantity);
        setTotalBook(totalBookValue);
        setTotalCurrent(totalCurrentValue);

        setTransaction({...transaction, portfolio_id: id_portfolio, 
        transaction_type: "SELL", 
        quantity: quantity1, 
        cost_per_unit: symbolPrice,
        transaction_date: date,
        ticker_symbol: t_symbol
        })
    }

    const calcBuy = () => {

        if (currentStock[0] === null || currentStock[0] === undefined) {

            var buySumPortfolio = 0;
            var buySumHoldings = 0;
            var commission = 9.99;
            var newQuantity1 = 0;
            var totalBookValue = 0;
            var totalCurrentValue = 0;
            var newPortfolioMoney = 0;
            var date = (new Date()).toISOString().split('T')[0];

            if (portfolioInfo[0].currency_type === 'CAD' && currencyType === 'USD') {
                buySumPortfolio = Number(quantity1) * symbolPrice * currencyRate2;
            }

            else if (portfolioInfo[0].currency_type === 'USD' && currencyType === 'CAD') {
                buySumPortfolio = Number(quantity1) * symbolPrice * currencyRate1;
            }

            else {
                buySumPortfolio = Number(quantity1) * symbolPrice;
            }

            buySumHoldings = Number(quantity1) * symbolPrice;

            newQuantity1 = quantity1;

            totalCurrentValue = buySumHoldings;
            totalBookValue = buySumHoldings + commission;

            newPortfolioMoney = portfolioInfo[0].portfolio_money - buySumPortfolio - commission;

            setPortfolioMoney(newPortfolioMoney);
            setStockInfo({...stockInfo, user_id: id_user, portfolio_id: id_portfolio, total_book_value: Math.round(totalBookValue*100)/100, total_current_value: Math.round(totalCurrentValue*100)/100, quantity: newQuantity1, ticker_symbol: t_symbol})
            setDividendInfo({...dividendInfo, portfolio_id: id_portfolio,
            quantity: newQuantity1,
            dividend_amount: dividend,
            dividend_date: divDate,
            ticker_symbol: t_symbol
            })

            setTransaction({...transaction, portfolio_id: id_portfolio, 
            transaction_type: "BUY", 
            quantity: quantity1, 
            cost_per_unit: symbolPrice,
            transaction_date: date,
            ticker_symbol: t_symbol
            })            
        }

        else {
            var buySumPortfolio = 0;
            var buySumHoldings = 0;
            var commission = 9.99;
            var newQuantity1 = 0;
            var newTotalBookValue = 0;
            var newTotalCurrentValue = 0;
            var newPortfolioMoney = 0;
            var date = (new Date()).toISOString().split('T')[0];

            if (portfolioInfo[0].currency_type === 'CAD' && currencyType === 'USD') {
                buySumPortfolio= Number(quantity1) * symbolPrice * currencyRate2;
            }

    
            else if (portfolioInfo[0].currency_type === 'USD' && currencyType === 'CAD') {
                buySumPortfolio = Number(quantity1) * symbolPrice * currencyRate1;
            }

            else {
                buySumPortfolio = Number(quantity1) * symbolPrice;
            }

            buySumHoldings = Number(quantity1) * symbolPrice;
            newQuantity1 = Number(quantity1) + currentStock[0].quantity;
           

            newTotalBookValue = buySumHoldings + commission + currentStock[0].total_book_value;
            newTotalCurrentValue = buySumHoldings + currentStock[0].total_book_value;
            
            newPortfolioMoney = portfolioInfo[0].portfolio_money - buySumPortfolio - commission;

            setPortfolioMoney(newPortfolioMoney);
            setTotalBook(newTotalBookValue);
            setTotalCurrent(newTotalCurrentValue);
            setNewQuantity(newQuantity1);

            setTransaction({...transaction, portfolio_id: id_portfolio, 
            transaction_type: "BUY", 
            quantity: quantity1, 
            cost_per_unit: symbolPrice,
            transaction_date: date,
            ticker_symbol: t_symbol
            })
        }
    }
    

    const carryOverConfirm = async(e) => {
        var getYear = start_date.substring(0,4);
        var addYear = Number(getYear) + 1;
        var remainingDate = start_date.substring(4, 10);
        var end_date = addYear + remainingDate;

        var portfolio_id = id_portfolio;
        var ticker_symbol = t_symbol;
        var quantity = quantity1;

            await axios.post("http://localhost:8080/addCarryOver", null, {params: {
                portfolio_id,
                quantity,
                start_date,
                end_date,
                ticker_symbol
            }})

            localStorage.removeItem('NAME_TICKER')
            navigate("/PortfolioDetails");

    }


    const buyConfirm = async(e) => {
        e.preventDefault();

        var temp_portfolio_money = 0;
        var portfolio_money = 0;
        var portfolio_id = id_portfolio;
        temp_portfolio_money = portfolioMoney;
        portfolio_money = Math.round(temp_portfolio_money*100)/100


        if (currentStock[0] === undefined || currentStock[0] === null) {

            //insert proc
            await axios.post("http://localhost:8080/createCurrentHoldings", stockInfo);

            await axios.post("http://localhost:8080/updatePortfolio", null, {params: {
                portfolio_id,
                portfolio_money
             }})

            await axios.post("http://localhost:8080/createTransactionHistory", transaction);

            if (divDate != null) { 
                await axios.post("http://localhost:8080/addDividend", dividendInfo);
            }

            localStorage.removeItem('NAME_TICKER')
            navigate('/PortfolioDetails')
        }
             
    
         else {
            var portfolio_id = id_portfolio;
            var tempBookValue = totalBook;
            var total_book_value = Math.round(tempBookValue*100)/100
            var quantity = newQuantity;
            var ticker_symbol = t_symbol;

            var tempCurrentValue = totalCurrent;
            var total_current_value = Math.round(tempCurrentValue*100)/100

             //update proc
            await axios.post("http://localhost:8080/updateCurrentHoldings", null, {params: {
                portfolio_id,
                total_book_value,
                total_current_value,
                quantity,
                ticker_symbol
            }})

            await axios.post("http://localhost:8080/updatePortfolio", null, {params: {
                portfolio_id,
                portfolio_money
            }})

            await axios.post("http://localhost:8080/createTransactionHistory", transaction);

            await axios.post("http://localhost:8080/updateDividendQuantity", null, {params: {
                portfolio_id,
                quantity,
                ticker_symbol
            }})

            localStorage.removeItem('NAME_TICKER')
            navigate("/PortfolioDetails");
        }
    }

    const sellConfirm = async() => {
        var portfolio_id = id_portfolio;
        var tempBookValue = totalBook;
        var total_book_value = Math.round(tempBookValue*100)/100

        var tempCurrentValue = totalCurrent;
        var total_current_value = Math.round(tempCurrentValue*100)/100

        var quantity = newQuantity;
        var ticker_symbol = t_symbol;
        var temp_portfolio_money = 0;
        var portfolio_money = 0;

        temp_portfolio_money = portfolioMoney;
        portfolio_money = parseFloat(temp_portfolio_money.toFixed(2));


        if (newQuantity === 0) {
            // delete row
            await axios.post("http://localhost:8080/deleteCurrentHoldingsRow", null, {params: {
                 portfolio_id,
                 ticker_symbol
             }})

            await axios.post("http://localhost:8080/updatePortfolio", null, {params: {
                portfolio_id,
                portfolio_money
            }})

            await axios.post("http://localhost:8080/createTransactionHistory", transaction);

            await axios.post("http://localhost:8080/deleteDividend", null, {params: {
                portfolio_id,
                ticker_symbol
            }})

            localStorage.removeItem('NAME_TICKER')
            navigate("/PortfolioDetails");
        }

        else if (newQuantity !== 0) {
            //update row
            await axios.post("http://localhost:8080/updateCurrentHoldings", null, {params: {
                portfolio_id,
                total_book_value,
                total_current_value,
                quantity,
                ticker_symbol
            }})

            await axios.post("http://localhost:8080/updatePortfolio", null, {params: {
                portfolio_id,
                portfolio_money
            }})

            await axios.post("http://localhost:8080/updateDividendQuantity", null, {params: {
                portfolio_id,
                quantity,
                ticker_symbol
            }})

            await axios.post("http://localhost:8080/createTransactionHistory", transaction);
            
            localStorage.removeItem('NAME_TICKER')
            navigate("/PortfolioDetails");
        }
    }

    const changeHandler = (e) => {       
        setCarryover({...carryover, [e.target.name]: e.target.value})
    }

    const ModalContent = (e) => {
        if (modalFlag === 1) {
            return (
                <Modal  show={show} 
                onHide={handleClose} 
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
                >
                    <center>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>
                        
                        <Modal.Body>
                            Buy {quantity1} {symbolName} shares at {symbolPrice}
                        </Modal.Body>
                        
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>

                            <Button variant="primary" onClick={buyConfirm}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </center>

                </Modal> 
            );
        }

        else if (modalFlag === 2) {
            return (
                <Modal  show={show} 
                onHide={handleClose} 
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
                >
                    <center>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            Sell {quantity1} {symbolName} shares at {symbolPrice}
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={sellConfirm}>
                                Confirm
                            </Button>
                        </Modal.Footer>

                    </center>
                </Modal> 
            );
        }

        else if (modalFlag === 3) {
            return (
                <Modal  show={show} 
                onHide={handleClose} 
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>ERROR, please try again</Modal.Title>
                    </Modal.Header>
    
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal> 
            );
        }

        else if (modalFlag === 4) {
            return (
                <Modal show={show} 
                onHide={handleClose} 
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
                >
                    <center>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div>
                                <div style={{display: "inline-block"}}>
                                    Buy {quantity1} {symbolName} shares on 
                                </div>
            
                                <div style={{paddingLeft: '5%', width: '40%', display: "inline-block"}}>

                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control
                                                type="date"
                                                autoFocus
                                                name="start_date"
                                                value = {start_date}
                                                onChange = {changeHandler}
                                            />
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            
                            <Button variant="primary" onClick={carryOverConfirm}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </center>
                </Modal>
            );
        }
    }

    return (
        <div>
            {show ? <ModalContent/> : null}
      
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

            <div>
                <center>
                    <h1 style={{fontSize: '100px', paddingTop: '3%'}}>{symbolName}: ${symbolPrice}</h1>
                </center>
            </div>

            <div style={{paddingTop: '3%'}}>
                <center>
                    <div style={{width: '10%',display: 'inline-block'}}>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter quantity"
                                    autoFocus
                                    name="quantity"
                                    value={quantity1}
                                    onChange = {(e) => setQuantity1(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </div>

                    <div style={{paddingLeft:'5%', display: 'inline-block'}}>
                        <Button style={{width: '200px'}} onClick = {buyButton} size="lg" variant="primary">
                            Buy
                        </Button>
                    </div>
        
                    <div style={{display: 'inline-block'}}>
                        <div style={{paddingLeft: '10%'}}>
                            <Button  style={{width: '200px'}} onClick = {sellButton} size="lg" variant="danger">
                                Sell
                            </Button>
                        </div>
                    </div>

                    <div style={{display: 'inline-block'}}>
                        <div style={{paddingLeft: '20%'}}>
                            <Button  style={{width: '200px'}} onClick = {carryoverButton} size="lg" variant="secondary">
                                Year carry over
                            </Button>
                        </div>
                    </div>
                </center>
            </div>
            

            <div  style = {{width: '70%', marginLeft: 'auto', marginRight: 'auto', paddingTop: '3%'}}>
                <Table className="text-center" striped bordered hover >
                
                    <tbody>
                        <tr>
                            <td style = {{width: '50%'}}>Total book value: ${displayBookValue}</td>
                            <td>Dividend: ${dividend}</td>
                        </tr>
                        <tr>
                            <td>Non-realized profit/loss: ({Math.round((symbolPrice*displayQuantity) * 100)/100}-{displayCurrentValue}) = ${Math.round(((symbolPrice*displayQuantity)-displayCurrentValue)*100)/100}</td>
                            <td>Dividend date: {displayDivDate} </td>
                        </tr>
                        <tr>
                            <td>Quantity: {displayQuantity}</td>
                            <td>Total current value: {displayCurrentValue}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div  style = {{width: '40%', marginLeft: 'auto', marginRight: 'auto'}}>
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
    )
}