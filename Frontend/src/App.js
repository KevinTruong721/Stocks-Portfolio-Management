import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';

import {Login} from './Login';
import {Register} from './Register';
import {Home} from './Profile/Home';
import { StockDetails } from './StockDetails';

import { WeeklyReport } from './Profile/ProfileReport/WeeklyReport';
import { MonthlyReport } from './Profile/ProfileReport/MonthlyReport';

import { PortfolioMonthlyReport } from './Portfolio/PortfolioReport/PortfolioMonthlyReport';
import { PortfolioWeeklyReport } from './Portfolio/PortfolioReport/PortfolioWeeklyReport';

import { PortfolioDetails } from './Portfolio/PortfolioDetails';


import { UserContext } from './UserContexts/UserContext';
import {UserContext1} from './UserContexts/UserContext1';
import {UserContext2} from './UserContexts/UserContext2';
import {UserContext3} from './UserContexts/UserContext3';
import { UserContext4 } from './UserContexts/UserContext4';

import { Portfolio } from './Portfolio/Portfolio';

import {ManageProfiles} from './FacilityManagement/ManageProfiles'
import {ProfileDetails} from './FacilityManagement/ProfileDetails'
import {WeeklyReportManagement} from './FacilityManagement/WeeklyReportManagement';
import {MonthlyReportManagement} from './FacilityManagement/MonthlyReportManagement';
import {PortfolioWeeklyReportManagement} from './FacilityManagement/PortfolioWeeklyReportManagement';
import {PortfolioMonthlyReportManagement} from './FacilityManagement/PortfolioMonthlyReportManagement';

function App() {

  const [user_name, setUser_name] = useState(null);
  const [id_user, setId_user] = useState(null);
  const [id_portfolio, setId_portfolio] = useState(null);
  const [name_portfolio, setName_portfolio] = useState(null);
  const [t_symbol, setT_symbol] = useState("");

  return (
    <Router>
      <div>
        <UserContext.Provider value = {{user_name, setUser_name}}>
        <UserContext1.Provider value = {{id_user, setId_user}}>
        <UserContext2.Provider value = {{id_portfolio, setId_portfolio}}>
        <UserContext3.Provider value = {{name_portfolio, setName_portfolio}}>
        <UserContext4.Provider value ={{t_symbol, setT_symbol}}>
        <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/Portfolios" element={<Portfolio/>}/>
            <Route path="/WeeklyReport" element={<WeeklyReport/>}/>
            <Route path="/MonthlyReport" element={<MonthlyReport/>}/>
            <Route path="/PortfolioWeeklyReport" element={<PortfolioWeeklyReport/>}/>
            <Route path="/PortfolioMonthlyReport" element={<PortfolioMonthlyReport/>}/>
            <Route path="/PortfolioDetails" element={<PortfolioDetails/>}/>
            <Route path="/StockDetails" element={<StockDetails/>}/>
            <Route path="/ProfileManagement" element={<ManageProfiles/>}/>
            <Route path="/ProfileDetails" element={<ProfileDetails/>}/>
            <Route path="/WeeklyReportManagement" element={<WeeklyReportManagement/>}/>
            <Route path="/MonthlyReportManagement" element={<MonthlyReportManagement/>}/>
            <Route path="/PortfolioWeeklyReportManagement" element={<PortfolioWeeklyReportManagement/>}/>
            <Route path="/PortfolioMonthlyReportManagement" element={<PortfolioMonthlyReportManagement/>}/>
        </Routes>
        </UserContext4.Provider>
        </UserContext3.Provider>
        </UserContext2.Provider>
        </UserContext1.Provider>
        </UserContext.Provider> 
      </div>
    </Router>
  )
}

export default App;
