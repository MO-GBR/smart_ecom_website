import React, { useEffect } from 'react'
import Hero from '../Sections/Hero'
import AdBFri from '../Sections/AdBFri'
import PopulareProduct from '../Sections/PopulareProduct'
import Products from '../Sections/Products'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../Redux/Slices/UserSlice'
import { setCurrentUserCart } from '../Redux/Actions/CartActions'
import { useGetCartQuery } from '../Redux/RTK/Cart'
import { selectCart } from '../Redux/Slices/CartSlice'

const Home = () => {
    const { currentUser } = useSelector(selectUser);
    const { cart } = useSelector(selectCart);

    const dispatch = useDispatch();
    const { data: cartData, refetch, isSuccess } = useGetCartQuery(undefined, { skip: !currentUser });
    

    useEffect(() => {
        if (isSuccess && cartData?.data) {
            const cartMap = cartData?.data.cartItems.map((item) => {
                return {
                    productId: item.product._id,
                    quantity: item.quantity,
                    color: item.color
                }
            });

            const userCart = {
                cart: cartMap || [],
                totalPrice: cartData?.data.totalPrice || 0
            };

            setCurrentUserCart(dispatch, userCart);
        }
    }, [isSuccess, cartData, dispatch]);

    useEffect(() => {
        if (currentUser) {
            refetch();
        }
    }, [currentUser, refetch, cart]);
    
    return (
        <>
            <Hero />
            <AdBFri />
            <PopulareProduct />
            <Products />
        </>
    )
}

export default Home