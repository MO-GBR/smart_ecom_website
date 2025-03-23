import React, { useState, useEffect } from 'react'
import Product from '../Components/Product'
import { useFetch } from '../Hook/useFetch';
import { useLoading } from '../Hook/useLoading';
import SCard from '../Components/Skeleton/SCard';


const Products = () => {
    const [ data ] = useFetch('product/');
    const [ loading ] = useLoading();

    return (
        <div className='g1'>
            <h1 className='w-full text-center h1-bold text-white'>
                Our Products
            </h1>
            <div className='flexCenter w-full'>
                <div className='grid grid-cols-3 max-md:grid-cols-1'>
                    {
                        data && data.data.map((watch, index) => {
                            if(loading) {
                                return (
                                    <SCard />
                                )
                            } else {
                                return (
                                    <Product title={watch.title} img={watch.img} price={watch.price} id={watch._id} key={index} />
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