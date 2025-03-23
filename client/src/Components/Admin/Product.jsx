import React from 'react'
import Button from '../Button'
import { fetchData } from '../../Lib/fetchData';
import { Link, useNavigate } from 'react-router-dom';

const Product = ({ title, id, quantity, manage }) => {
    const navigate = useNavigate();
    const deleteProduct = async (e) => {
        e.preventDefault();
        await fetchData(`product/${id}`, 'DELETE');
        navigate(0);
    };
    return (
        <div className='border border-gray-500 p-3 w-[90%] my-5 flexBetween max-md:flex-col'>
            <p className='font-bold'>{title}</p>
            <div className='flexAround'>
                <Button title="Details" icon="/icons/info-white.svg" href={`/product/${id}`} btnType="button" />
                {
                    manage && (
                        <>
                            <Link to={`/editproduct/${id}`} className='p-3 bg-black rounded-full mx-3 cursor-pointer max-md:p-1 max-md:w-10 max-md:h-10 max-md:mx-1 max-md:flex max-md:items-center max-md:justify-center'>
                                <img
                                    src='/icons/edit-white.svg'
                                    alt='edit'
                                    className='img w-[30px]'
                                />
                            </Link>
                            <div className='p-3 bg-black rounded-full mx-3 cursor-pointer max-md:p-1 max-md:w-10 max-md:h-10 max-md:mx-1 max-md:flex max-md:items-center max-md:justify-center' onClick={deleteProduct}>
                                <img
                                    src='/icons/delete-white.svg'
                                    alt='delete'
                                    className='img w-[30px]'
                                />
                            </div>
                        </>
                    )
                }
                {
                    quantity && (
                        <div className='p-3 bg-black rounded-full mx-3 cursor-pointer text-center text-white' onClick={deleteProduct}>
                            {quantity}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Product