import React, { useEffect } from 'react'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { removeFromCart, setTotalPrice } from '../Redux/Slices/CartSlice';
import { useRemoveFromCartMutation } from '../Redux/RTK/Cart';
import { useGetProductByIdQuery } from '../Redux/RTK/Products';

const CartItem = ({ product }) => {
    const dispatch = useDispatch();
    const productDetails = JSON.parse(JSON.stringify(product));

    const { data: productData, isLoading, refetch } = useGetProductByIdQuery(productDetails.productId, {
        refetchOnMountOrArgChange: true
    });
    
    const productInfo = productData?.data || {};
    const { title, img, price } = productInfo;

    useEffect(() => {
        refetch();
    }, []);

    const [ removeItem, others ] = useRemoveFromCartMutation();

    const removeProduct = async () => {
        try {
            dispatch(removeFromCart(productDetails.productId));
            try {
                const res = await removeItem(productDetails.productId).unwrap();
                dispatch(setTotalPrice(res.data.totalPrice));
                console.log('Product removed from cart:', productDetails.productId, res.data);
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) return <p className='text-white'>Loading...</p>;

    return (
        <div className='g1 rounded-3xl border border-gray-400 w-[350px] py-3 m-3 flexCenter flex-col cursor-pointer max-md:w-[250px]'>
            <div className='flexCenter'>
                <img
                    src='/shapes/shape-2.svg'
                    alt='shape-2'
                />
                <img
                    src={img}
                    alt='watch'
                    className='img w-[220px] absolute'
                />
            </div>
            <p className='p-bold-24 text-white'>{title}</p>
            <Button title={<p onClick={removeProduct}>Remove</p>} icon="/icons/remove-cart-white.svg" href="#" btnType="button" />
            <div className='flexAround w-full'>
                <p className='text-white font-bold'>{product?.quantity}</p>
                <p className='text-white font-bold'>{`$${price}`}</p>
                <div className={`${productDetails.color.bg} p-5 mx-3 border border-gray-400 rounded-full w-5 h-5 cursor-pointer`} />
            </div>
        </div>
    )
}

export default CartItem