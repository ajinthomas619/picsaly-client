import { useEffect, useState } from "react";
// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";

const { CanvasJSChart } = CanvasJSReact;

const PostsPerMonth = () => {
    const navigate = useNavigate();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/getMonthlyPost`, { withCredentials: true })
            .then((res) => {
                console.log("the response of posts per month", res);
                const data = res.data.postsPerMonth;

                const filledChartData = Array.from({ length: 12 }, (_, i) => {
                    const monthData = data.find(
                        (item: { x: number }) => item.x === i + 1
                    );
                    return { label: getMonthName(i + 1), y: monthData ? monthData.y : 0 };
                });
                setChartData(filledChartData);
            })
            .catch((error) => {
                console.error("Error fetching chart data:", error);
                navigate("/admin");
            });
    }, [navigate]);

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1",
        title: {
            text: "Posts Per Month"
        },
        axisY: {
            includeZero: true
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

export default PostsPerMonth;
