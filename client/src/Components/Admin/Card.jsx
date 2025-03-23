import React from 'react'

const Card = () => {
    return (
        <div className='card'>
            <div className='flexBetween w-full'>
                <div>Total Revenue</div>
                <div className='badge-up'>20% UP</div>
            </div>
            <div className='font-bold text-2xl'>$27.99</div>
        </div>
    )
}

export default Card