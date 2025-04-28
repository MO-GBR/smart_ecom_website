import React, { useEffect } from 'react'
import Product from '../Product'
import Button from '../../Button'
import { useGetProductsQuery } from '../../../Redux/RTK/Products';

const Products = () => {
    const { data: allProducts, isLoading, refetch } = useGetProductsQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    useEffect(() => {
        refetch();
    }, []);
    
    return (
        <div className='w-full flex items-center flex-col overflow-y-scroll h-[80vh] mt-5 border border-gray-300 max-md:h-screen'>
            <Button title='Add Product' href="/newproduct" />
            {
                allProducts && allProducts.data.map((product, index) => (
                    <Product key={index} title={product.title} id={product._id} manage={true} />
                ))
            }
        </div>
    )
}

export default Products