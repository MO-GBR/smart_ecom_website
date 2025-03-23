import React, { useState } from 'react'
import { fetchData } from '../Lib/fetchData';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart } from '../Redux/Slices/CartSlice';
import { clearCart } from '../Redux/Slices/CartSlice';
import { selectUser } from '../Redux/Slices/UserSlice';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import Button from './Button';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const CheckoutForm = () => {
    const [ address, setAddress ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();

    const { totalPrice, cart } = useSelector(selectCart);
    const { user } = useSelector(selectUser);

    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, token } = await stripe.createToken(cardElement);

        if(!error) {
            await fetchData('order/new', 'POST', {
                address,
                phoneNumber,
                amount: totalPrice,
                token,
                fullCart: cart,
                cartId: user.data.cart,
                userId: user.data.id
            });
            navigate('/success');
            dispatch(clearCart());
        }
    };

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    return (
        <div className='checkout'>
            <form className='flexCenter flex-col' onSubmit={handleSubmit}>
                <h1 className='h1-bold'>Checkout</h1>
                <label className='BlackLabel'>
                    <input
                        type='text'
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <label className='BlackLabel'>
                    <input
                        type='text'
                        placeholder='Phone Number'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </label>
                <p className='w-full font-bold text-green-800 text-center my-3'>Payment</p>
                <div className='w-full flexCenter border border-gray-300 rounded-md p-2'>
                    <CardElement className='w-full' onChange={handleChange} />
                </div>
                <Button title="Pay" icon="/icons/card-white.svg" btnType="submit" />
                {error && <p className='msg-error'>{error}</p>}
            </form>
        </div>
    )
}

const Wrapper = () => {
    const [stripePromise, setStripePromise] = useState(() => loadStripe(stripeKey))
    return (
        <Elements stripe={stripePromise} className='checkout'>
            <CheckoutForm />
        </Elements>
    )
};

export default Wrapper;