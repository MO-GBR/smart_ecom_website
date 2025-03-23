import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ icon, title, href, btnType }) => {
    return (
        <div className='w-[60%] my-3 mx-2 max-md:w-[80%]'>
            <button className='btn flexCenter' type={btnType}>
                {
                    icon && (
                        <img
                            src={icon}
                            alt='shop-now'
                            className='img w-[20px]'
                        />
                    )
                }
                {
                    href ? (
                        <Link to={href}>
                            <span className='btn-txt'>{title}</span>
                        </Link>
                    ) : (
                        <span className='btn-txt'>{title}</span>
                    )
                }
            </button>
        </div>
    )
}

export default Button