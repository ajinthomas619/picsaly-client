import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const UsersPerMonth = () => {
    const [chartData, setChartData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/getMonthlyUsers `, {
            withCredentials: true
        })
            .then((res) => {
                console.log("the response of users per month", res);
                const data = res.data.usersPerMonth;

                const filledChartData = Array.from({ length: 12 }, (_, i) => {
                    const monthData = data.find(
                        (item: { x: number }) => item.x === i + 1
                    );
                    return { label: getMonthName(i + 1), y: monthData ? monthData.y : 0 };
                });
                setChartData(filledChartData);
            })
            .catch((error) => {
                console.error("Error in fetching chart data:", error);
                navigate("/admin");
            });
    }, [navigate]);

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1",
        title: {
            text: "Users Per Month"
        },
        axisY: {
            includeZero: true,
        },
        axisX: {
            title: "Month",
            interval: 1
        },
        data: [
            {
                type: "column",
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: chartData,
            }
        ]
    };

    const getMonthName = (monthNumber: number) => {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return months[monthNumber - 1];
    };

    return (
        <div className="w-full">
            <CanvasJSChart options={options} />
        </div>
    );
};

export default UsersPerMonth;
