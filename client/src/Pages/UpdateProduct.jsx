import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useFetch } from '../Hook/useFetch';
import EditForm from '../Components/Admin/EditForm';


const UpdateProduct = () => {
    const id = useParams().id;
    const [ data ] = useFetch(`product/${id}`);

    if(data === null) {
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