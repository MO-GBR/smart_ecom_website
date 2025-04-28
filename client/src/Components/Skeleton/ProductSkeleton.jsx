import React from 'react'

const ProductSkeleton = () => {
    return (
        <div className='S_Product'>
            <div className='w-[100px] h-[100px] bg-gray-600 rounded-full animate-pulse' />
            <div className='w-[200px] h-[50px] bg-gray-600 rounded-md animate-pulse' />
            <div className='w-[230px] h-[30px] bg-gray-600 rounded-xl animate-pulse' />
        </div>
    )
}

export default ProductSkeleton