import React from 'react'
import User from '../User'
import { useFetch } from '../../../Hook/useFetch'

const Users = () => {
    const [ data ] = useFetch('users/');
    return (
        <div className='w-full flex items-center flex-col overflow-y-scroll h-[80vh] mt-5 border border-gray-300 max-md:h-screen'>
            {
                data && data.data.map((user, index) => (
                    <User key={index} id={user._id} fullName={`${user.firstName} ${user.lastName}`} />
                ))
            }
        </div>
    )
}

export default Users