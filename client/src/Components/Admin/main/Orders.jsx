import React from 'react'
import Order from '../Order'
import { useFetch } from '../../../Hook/useFetch'

const Orders = () => {
    const [ data ] = useFetch('order/');
    return (
        <div className='w-full flex items-center flex-col overflow-y-scroll h-[80vh] mt-5 border border-gray-300 max-md:h-screen'>
            {
                data && data.data.map((order, index) => (
                    <Order key={index} user={order.buyer} stripeId={order.stripeId} address={order.address} phoneNumber={order.phoneNumber} order={order.products} amount={order.amount} />
                ))
            }
        </div>
    )
}

export default Orders