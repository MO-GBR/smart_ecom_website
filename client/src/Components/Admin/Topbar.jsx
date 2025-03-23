import React from 'react'
import moment from "moment";

const Topbar = ({ title }) => {
    const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');

    return (
        <div className='flex flex-col justify-center w-full border-b border-gray-400 h-[80px]'>
            <p className='text-xl font-bold ml-3'>{title}</p>
            <p className='text-sm ml-3 text-gray-800 font-semibold'>{currentTime}</p>
        </div>
    )
}

export default Topbar