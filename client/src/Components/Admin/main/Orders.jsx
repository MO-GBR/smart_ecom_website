import React from 'react'
import Order from '../Order'
import { useGetOrdersQuery } from '../../../Redux/RTK/Order'

const Orders = () => {
    const { data: allOrders } = useGetOrdersQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    return (
        <div className='w-full flex items-center flex-col overflow-y-scroll h-[80vh] mt-5 border border-gray-300 max-md:h-screen'>
            {
                allOrders && allOrders.data.map((order, index) => (
                    <Order key={index} order={order} />
                ))
            }
        </div>
    )
}

export default Orders