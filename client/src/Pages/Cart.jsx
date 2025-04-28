import React from 'react'
import Button from '../Components/Button'
import CartItem from '../Components/CartItem'
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, selectCart } from '../Redux/Slices/CartSlice'
import { useClearCartMutation } from '../Redux/RTK/Cart';

const Cart = () => {
    const { cart, totalPrice } = useSelector(selectCart);

    const [ clearUserCart, others ] = useClearCartMutation();

    const dispatch = useDispatch();

    const clearMyCart = async () => {
        dispatch(clearCart());
        try {
            const res = await clearUserCart().unwrap();
            console.log('Cart cleared:', res.data);
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <div className='flexCenter flex-col mt-26 max-md:mt-[15rem]'>
            <h1 className='h1-bold text-center text-white'>Your Cart</h1>
            <div className='w-full flexAround max-md:flex-col'>
                <Button title="CONTINUE SHOPPING" href="/" icon="/icons/cart-white.svg" btnType="button" />
                <Button title={<p onClick={clearMyCart}>CLEAR CART</p>} href="/" icon="/icons/cart-white.svg" btnType="button" />
            </div>
            <div className='w-full max-md:flex max-md:justify-center'>
                <div className='p-3 border border-gray-300 rounded-xl w-fit m-5'>
                    <p className='p-bold-20 text-white'>
                        Shopping Cart {`(${cart.length})`}
                        <br className='hidden max-md:block' />
                        Total Price: {`$${totalPrice}`}
                    </p>
                </div>
            </div>
            <div className='w-full flexCenter'>
                <div className='grid grid-cols-2 max-md:grid-cols-1'>
                    {
                        cart.length === 0 
                        ?   <p className='text-white h1-bold w-full text-center col-span-2 my-10'>Cart is Empty</p> 
                        :   cart.map((product, index) => {
                                console.log(`${index} >>>`, product);
                                return (
                                    <CartItem key={index} product={product} />
                                )
                            }) 
                    }
                </div>
            </div>
            {
                cart.length > 0 &&
                <div className='flexCenter w-full'>
                    <Button title='CHECKOUT' href="/checkout" icon="/icons/cart-white.svg" btnType="button" />
                </div>
            }
        </div>
    )
}

export default Cart