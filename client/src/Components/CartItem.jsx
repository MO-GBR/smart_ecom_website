import React from 'react'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { removeItemToCart } from '../Redux/Actions/CartActions';

const CartItem = ({ product }) => {
    const dispatch = useDispatch();
    const removeProduct = () => {
        removeItemToCart(dispatch, product);
    };
    return (
        <div className='g1 rounded-3xl border border-gray-400 w-[350px] py-3 m-3 flexCenter flex-col cursor-pointer max-md:w-[250px]'>
            <div className='flexCenter'>
                <img
                    src='/shapes/shape-2.svg'
                    alt='shape-2'
                />
                <img
                    src={product.product.img}
                    alt='watch'
                    className='img w-[220px] absolute'
                />
            </div>
            <p className='p-bold-24 text-white'>{product.product.title}</p>
            <Button title={<p onClick={removeProduct}>Remove</p>} icon="/icons/remove-cart-white.svg" href="#" btnType="button" />
            <div className='flexAround w-full'>
                <p className='text-white font-bold'>{product.quantity}</p>
                <p className='text-white font-bold'>{`$${product.product.price}`}</p>
                <div className={`${product.color.bg} p-5 mx-3 border border-gray-400 rounded-full w-5 h-5 cursor-pointer`} />
            </div>
        </div>
    )
}

export default CartItem