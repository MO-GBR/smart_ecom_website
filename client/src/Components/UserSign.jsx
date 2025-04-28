import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../Redux/Slices/UserSlice';
import { LogoutUser } from '../Redux/Actions/UserActions';
import { Link } from 'react-router-dom';
import { clearCart, selectCart } from '../Redux/Slices/CartSlice'
import { useLogoutMutation } from '../Redux/RTK/Auth';

const UserSign = () => {
    const { currentUser } = useSelector(selectUser);
    const { cart } = useSelector(selectCart);
    const dispatch = useDispatch();

    const fullName = `${currentUser.firstName} ${currentUser.lastName}`;

    const [ logout, others ] = useLogoutMutation();

    const LogUserOut = async () => {
        await logout();
        dispatch(clearCart());
        LogoutUser(dispatch);
    };
    return (
        <div className='flexAround max-md:flex-col'>
            <Link to="/" className='font-bold mr-2 text-white'>Hi, {fullName}</Link>
            <div className='flexAround'>
                <div className='p-2 rounded-full cursor-pointer hover:bg-yellow-200' title='Sign Out' onClick={LogUserOut}>
                    <img
                        src='/icons/white-hand.svg'
                        alt='hand-icon'
                        className='img w-[30px]'
                    />
                </div>
                {
                    currentUser.role === 'Admin' && (
                        <Link to="/admin" className='p-2 rounded-full cursor-pointer hover:bg-yellow-200' title='Admin'>
                            <img
                                src='/icons/admin-white.svg'
                                alt='admin-icon'
                            />
                        </Link>
                    )
                }
                <Link to="/cart" className='p-2 rounded-full cursor-pointer flexCenter hover:bg-yellow-200' title='Admin'>
                    <img
                        src="/icons/cart-white.svg"
                        alt='admin-icon'
                    />
                    <div className='text-white font-bold bg-blue-700 text-center rounded-full p-1 text-xs'>{cart.length}</div>
                </Link>
            </div>
        </div>
    )
}

export default UserSign