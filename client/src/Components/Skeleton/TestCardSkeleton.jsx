import React from 'react'

const TestCardSkeleton = () => {
    return (
        <div className='S_Testimonial'>
            <div className='w-[70px] h-[70px] bg-gray-600 rounded-full animate-pulse' />
            <div className='w-[170px] h-[15px] bg-gray-600 rounded-lg animate-pulse' />
            <div className='w-[170px] h-[15px] bg-gray-600 rounded-lg animate-pulse' />
            <div className='w-[170px] h-[15px] bg-gray-600 rounded-lg animate-pulse' />
            <div className='w-[100px] h-[15px] bg-gray-600 rounded-lg animate-pulse' />
        </div>
    )
}

export default TestCardSkeleton