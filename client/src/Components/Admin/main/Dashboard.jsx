import React from 'react'
import Card from '../Card'
import Charts from '../Charts'

const Dashboard = () => {
    return (
        <div className='w-full flex flex-col'>
            <p className='w-full p-bold-24 ml-2'>Today Compared to Yesterday:</p>
            <div className='flexCenter my-3 max-md:flex-col'>
                <Card />
                <Card />
                <Card />
            </div>
            <div className='max-md:w-full max-md:overflow-y-scroll max-md:h-[200px]'>
                <Charts />
            </div>
        </div>
    )
}

export default Dashboard