import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../Redux/Slices/UserSlice';
import { LogoutUser } from '../Redux/Actions/UserActions';
import { Link } from 'react-router-dom';
import { selectCart } from '../Redux/Slices/CartSlice'

const UserSign = () => {
    const { user } = useSelector(selectUser);
    const { cart } = useSelector(selectCart);
    const dispatch = useDispatch();

    const LogUserOut = () => {
        LogoutUser(dispatch);
    };
    return (
        <div className='flexAround max-md:flex-col'>
            <Link to="/" className='font-bold mr-2 text-white'>Hi, {user.data.fullName}</Link>
            <div className='flexAround'>
                <div className='p-2 rounded-full cursor-pointer hover:bg-yellow-200' title='Sign Out' onClick={LogUserOut}>
                    <img
                        src='/icons/white-hand.svg'
                        alt='hand-icon'
                        className='img w-[30px]'
                    />
                </div>
                {
                    user.data.role === 'Admin' && (
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