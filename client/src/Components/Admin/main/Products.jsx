import React from 'react'
import { products } from '../../../Constants'
import Product from '../Product'
import Button from '../../Button'
import { useFetch } from '../../../Hook/useFetch';

const Products = () => {
    const [ data ] = useFetch('product/');
    return (
        <div className='w-full flex items-center flex-col overflow-y-scroll h-[80vh] mt-5 border border-gray-300 max-md:h-screen'>
            <Button title='Add Product' href="/newproduct" />
            {
                data && data.data.map((product, index) => (
                    <Product key={index} title={product.title} id={product._id} manage={true} />
                ))
            }
        </div>
    )
}

export default Products