import React, {useEffect, useContext, useState, useRef} from "react";
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'

import Button from 'react-bootstrap/Button';

import { UserContext } from "../../UserContexts/UserContext";
import { UserContext1 } from "../../UserContexts/UserContext1";

import { jsPDF } from "jspdf";

import autoTable from 'jspdf-autotable'

export const MonthlyChart = (props) => {

    const[reportDateData, setReportDateData] = useState([]);
    const[userMoneyData, setUserMoneyData] = useState([]);

    const {id_user, setId_user} = useContext(UserContext1);
    const {user_name, setUser_name} = useContext(UserContext);

    const [data, setData] = useState([]);

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


        if (id_user != null) {

           
            fetch(`http://localhost:8080/monthlyReport/${id_user}`)
            .then((response) => response.json())
            .then((result) => {
                var reportDate1 = result.map(function(e) {return e.report_date})
                var userMoney1 = result.map(function(e) {return e.user_money})
                
                setReportDateData(reportDate1)
                setUserMoneyData(userMoney1)

                const tt = result.map(e => [e.report_date, e.user_money]);

                setData(tt);
            })

            .catch((err) => {
            console.log(err.message);
            })
        }

    }, [user_name], [id_user])


    const headers = [["Date", "Total Amount"]]
   
    let content = {
        startY: 120,
        head: headers,
        body: data
        
    };


    const downloadMonthly = () => {
        const canvas = document.getElementById('MonthlyChart');
        const canvasImage = canvas.toDataURL('image/png', 1.0);

        const pdf = new jsPDF('portrait');
        pdf.setFontSize(20);
        pdf.addImage(canvasImage, 'JPEG', 15, 15, 180, 100);
        pdf.text(70, 10, "Profile Monthly Report")
        pdf.autoTable(content);
        pdf.save('ProfileMonthlyReport.pdf');
    }
        



    return(
        <div>
            <div style={{width: '80%', marginLeft:'auto', marginRight:'auto'}}>
                <Line
                id="MonthlyChart"
                data={{
                    labels: reportDateData,
                    datasets: [
                        {
                            label: 'Profile Amount',
                            data: userMoneyData,
                            fill: true,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ]
                          }
                      ]
                }}
                height={500}
                options={{    
                      maintainAspectRatio: false,
                  }}
                />
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',margin: 'auto', paddingTop: '3%'}}> 
                <Button variant="dark" onClick={downloadMonthly}>Download monthly report</Button>
            </div>
        </div>
    );
}
    
    

