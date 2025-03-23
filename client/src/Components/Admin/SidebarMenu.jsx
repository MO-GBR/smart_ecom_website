import React from 'react'
import { useDispatch } from 'react-redux';
import { setAdminCurrent } from '../../Redux/Actions/AdminAction';

const SidebarMenu = () => {
    const dispatch = useDispatch();
    return (
        <>
            <div className='adminLink flexCenter' onClick={() => setAdminCurrent(dispatch, 'Dashboard')}>
                <img
                    src='/icons/home.svg'
                    alt='users'
                />
                <p className='ml-2 font-bold'>Dashboard</p>
            </div>
            <div className='adminLink flexCenter' onClick={() => setAdminCurrent(dispatch, 'Products')}>
                <img
                    src='/icons/products.svg'
                    alt='users'
                />
                <p className='ml-2 font-bold'>Manage Products</p>
            </div>
            <div className='adminLink flexCenter' onClick={() => setAdminCurrent(dispatch, 'Users')}>
                <img
                    src='/icons/users.svg'
                    alt='users'
                />
                <p className='ml-2 font-bold'>Manage Users</p>
            </div>
            <div className='adminLink flexCenter' onClick={() => setAdminCurrent(dispatch, 'Orders')}>
                <img
                    src='/icons/orders.svg'
                    alt='users'
                />
                <p className='ml-2 font-bold'>Manage Orders</p>
            </div>
        </>
    )
}

export default SidebarMenu