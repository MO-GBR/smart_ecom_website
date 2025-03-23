import React, { useRef, useEffect } from 'react'
import Chart from 'chart.js/auto';
import { data1 } from '../../Constants';
import { Line, PolarArea } from "react-chartjs-2";

const Charts = () => {
    const chart1 = useRef(null);
    const chart2 = useRef(null);

    const chartData = {
        labels: data1.map(row => row.year),
        datasets: [
            {
                label: "Chart by year",
                data: data1.map(row => row.count)
            }
        ]
    };

    return (
        <div className='flexCenter max-md:flex-col'>
            <div className='img w-[350px]'>
                <Line data={chartData} />
            </div>
            <div className='img w-[350px]'>
                <PolarArea data={chartData} className='img w-[200px]' />
            </div>
        </div>
    )
}

export default Charts