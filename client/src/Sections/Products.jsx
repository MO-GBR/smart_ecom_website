import React, { useState, useEffect } from 'react'
import Product from '../Components/Product'
import { useFetch } from '../Hook/useFetch';
import { useLoading } from '../Hook/useLoading';
import { useGetProductsQuery } from '../Redux/RTK/Products';
import ProductSkeleton from '../Components/Skeleton/ProductSkeleton';


const Products = () => {
    const { data, isLoading, refetch } = useGetProductsQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    useEffect(() => {
        refetch();
    }, []);

    return (
        <div className='g1'>
            <h1 className='w-full text-center h1-bold text-white'>
                Our Products
            </h1>
            <div className='flexCenter w-full'>
                <div className='grid grid-cols-3 max-md:grid-cols-1'>
                    {
                        data?.data.map((watch, index) => {
                            if(isLoading) {
                                return (
                                    <ProductSkeleton key={index} />
                                )
                            } else {
                                return (
                                    <Product
                                        productDetails={watch}
                                        key={index}
                                    />
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Products