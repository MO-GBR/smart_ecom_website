import React from 'react'
import Sidebar from '../Components/Admin/Sidebar'
import Topbar from '../Components/Admin/Topbar'
import Dashboard from '../Components/Admin/main/Dashboard'
import Products from '../Components/Admin/main/Products'
import Users from '../Components/Admin/main/Users'
import Orders from '../Components/Admin/main/Orders'
import { useSelector } from 'react-redux'
import { selectAdmin } from '../Redux/Slices/AdminSlice'

const AdminDashboard = () => {
    const { current } = useSelector(selectAdmin);
    return (
        <div className='flexCenter w-full m-0 p-0 overflow-hidden'>
            <div className='w-full h-screen max-md:h-[160vh] bg-white flex items-start max-md:flex-col'>
                <Sidebar />
                <div className='w-full flexCenter flex-col'>
                    <Topbar title={current} />
                    {
                        current === 'Dashboard' && <Dashboard />
                    }
                    {
                        current === 'Products' && <Products />
                    }
                    {
                        current === 'Users' && <Users />
                    }
                    {
                        current === 'Orders' && <Orders />
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard