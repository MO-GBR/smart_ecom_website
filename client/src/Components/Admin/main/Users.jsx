import React from 'react'
import User from '../User'
import { useGetAllUsersQuery } from '../../../Redux/RTK/User'

const Users = () => {
    const { data: allUsers } = useGetAllUsersQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    
    return (
        <div className='w-full flex items-center flex-col overflow-y-scroll h-[80vh] mt-5 border border-gray-300 max-md:h-screen'>
            {
                allUsers && allUsers.data.map((user, index) => (
                    <User key={index} id={user._id} fullName={`${user.firstName} ${user.lastName}`} />
                ))
            }
        </div>
    )
}

export default Users