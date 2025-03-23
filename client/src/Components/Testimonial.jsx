import React from 'react'

const Testimonial = ({ testName, testImg, testComment }) => {
    return (
        <div className='flexCenter flex-col w-[20vw] border border-gray-400 rounded-2xl p-5 m-3 max-md:w-[90%]'>
            <img
                src={testImg}
                alt='Testimonial'
                className='img w-[100px] p-2 border border-gray-300 rounded-full'
            />
            <p className='text-blue-300 my-3'>{testName}</p>
            <p className='text-white text-center'>{testComment}</p>
        </div>
    )
}

export default Testimonial