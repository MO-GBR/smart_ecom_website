import React from 'react'
import { fetchData } from '../../Lib/fetchData';
import { useNavigate } from 'react-router-dom';

const User = ({ id, fullName }) => {
    const navigate = useNavigate();
    const deleteUser = async () => {
        await fetchData(`users/${id}`, 'DELETE');
        navigate(0);
    };
    return (
        <div className='border border-gray-500 p-3 w-[90%] my-5 flexBetween max-md:justify-center max-md:items-center max-md:flex-col'>
            <p className='font-bold'>{`${fullName}: ${id}`}</p>
            <div className='flexAround'>
                <div className='p-3 bg-black rounded-full mx-3 cursor-pointer' onClick={deleteUser}>
                    <img
                        src='/icons/delete-white.svg'
                        alt='delete'
                        className='img w-[20px]'
                    />
                </div>
            </div>
        </div>
    )
}

export default User