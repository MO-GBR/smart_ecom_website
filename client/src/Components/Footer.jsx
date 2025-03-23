import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-black border-t border-gray-300 h-20 max-md:h-36 flexCenter'>
            <div className='w-full flexAround max-md:flex-col'>
                <p className='logo hidden max-md:block'>SMART</p>
                <p className='p-regular-16 text-white'>Privacy Policy</p>
                <p className='p-regular-16 text-white'>Our Terms</p>
                <p className='logo block max-md:hidden'>SMART</p>
                <p className='p-regular-16 text-white'>Contact Us</p>
                <p className='p-regular-16 text-white'>Our Collection</p>
            </div>
        </footer>
    )
}

export default Footer