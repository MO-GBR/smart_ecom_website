import React from 'react'
import Product from './Product'

const Order = ({ order }) => {
    const { buyer, stripeId, address, phoneNumber, amount, products } = order;
    return (
        <div className='border border-gray-500 p-3 w-[90%] max-md:w-full my-5 flex items-start flex-col rounded-2xl'>
            <div className='my-2 flex max-md:flex-col'>
                <p className='font-bold text-xl'>Buyer:</p>
                <p className='text-lg text-gray-800 ml-3 max-md:ml-0'>{buyer}</p>
            </div>
            <div className='my-2 flex max-md:flex-col'>
                <p className='font-bold text-xl'>Stripe Customer ID:</p>
                <p className='text-lg text-gray-800 ml-3 max-md:ml-0'>{stripeId}</p>
            </div>
            <div className='my-2 flex max-md:flex-col'>
                <p className='font-bold text-xl'>Address:</p>
                <p className='text-lg text-gray-800 ml-3 max-md:ml-0'>{address}</p>
            </div>
            <div className='my-2 flex max-md:flex-col'>
                <p className='font-bold text-xl'>Phone Number:</p>
                <p className='text-lg text-gray-800 ml-3 max-md:ml-0'>{phoneNumber}</p>
            </div>
            <div className='my-2 flex'>
                <p className='font-bold text-xl'>Payment:</p>
                <p className='text-lg text-gray-800 ml-3 max-md:ml-0'>${amount}</p>
            </div>
            <div className='w-full border border-gray-500 p-3 flex flex-col items-center justify-start overflow-y-scroll h-[300px]'>
                {
                    products.map((item, index) => (
                        <Product id={item.productId} manage={false} quantity={item.quantity} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default Order