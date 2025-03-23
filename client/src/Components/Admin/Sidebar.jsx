import React, { useState } from 'react'
import UserSign from '../UserSign';
import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
    const [toggle, setToggle] = useState(false);
    return (
        <div className='g2 flex justify-start items-center flex-col border-r border-gray-400 h-screen p-3 w-fit max-md:w-full max-md:h-fit'>
            <div className='bg-black p-3 rounded-2xl mb-5'>
                <UserSign />
            </div>
            <div className='bg-black p-2 rounded-full hidden max-md:block' onClick={() => setToggle(!toggle)}>
                <img
                    src='/icons/menu-white.svg'
                    alt='menu'
                    className='img w-[30px]'
                />
            </div>
            <div className='line'/>
            <div className='block max-md:hidden'>
                <SidebarMenu />
            </div>
            {
                toggle && (
                    <div className='hidden max-md:block absolute bg-white p-2 rounded-3xl top-50'>
                        <SidebarMenu />
                    </div>
                )
            }
        </div>
    )
}

export default Sidebar