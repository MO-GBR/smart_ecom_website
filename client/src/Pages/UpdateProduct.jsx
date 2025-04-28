import React from 'react'
import { useParams } from 'react-router-dom';
import EditForm from '../Components/Admin/EditForm';
import { useGetProductByIdQuery } from '../Redux/RTK/Products';

const UpdateProduct = () => {
    const id = useParams().id;

    const { data, isLoading } = useGetProductByIdQuery(id);

    if(isLoading) {
        return (
            <div className='w-full h-screen flexCenter'>
                <div className='h1-bold text-white text-center'>Loading...</div>
            </div>
        )
    }

    return (
        <div className='flexCenter w-full h-screen'>
            <EditForm product={data.data} id={id} />
        </div>
    )
}

export default UpdateProduct