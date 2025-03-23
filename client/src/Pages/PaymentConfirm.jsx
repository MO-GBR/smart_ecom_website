import React from 'react'
import Button from '../Components/Button'

const PaymentConfirm = () => {
    return (
        <div className='flexCenter w-full h-screen'>
            <div className='bg-white p-3 w-[40vw] max-md:w-[90vw] rounded-3xl flexCenter flex-col'>
                <h1 className='success-text h1-bold w-full'>DONE</h1>
                <img
                    src='/images/2.png'
                    alt='success'
                    className='img w-[300px]'
                />
                <Button title="CONTINUE SHOPPING" href="/" icon="/icons/cart-white.svg" btnType="button" />
            </div>
        </div>
    )
}

export default PaymentConfirm