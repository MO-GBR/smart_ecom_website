import React, { useState } from 'react'
import { fetchData } from '../../Lib/fetchData';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const EditForm = ({ product, id }) => {
    const [title, setTitle] = useState(product.title);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [selectedImg, setSelectedImg] = useState(product.img);
    const [msg, setMsg] = useState('');

    const navigate = useNavigate();

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if(!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
        };
    };

    const UpdateOneProduct = async (e) => {
        e.preventDefault();
        const product = {
            title,
            description,
            img: selectedImg,
            price
        };
        await fetchData(`product/update/${id}`, 'PUT', product);
        setMsg('Product Updated Successfully!');
        navigate('/admin');
    };

    return (
        <form className='bg-white h-fit w-[60%] flexCenter flex-col p-20 rounded-2xl' onSubmit={UpdateOneProduct}>
            {
                msg && <p className='msg -mt-12'>{msg}</p>
            }
            <label className='bg-black w-[10%] rounded-full mb-8 flexCenter'>
                <span className='absolute bg-black rounded-full cursor-pointer'>
                    <img
                        src={ selectedImg || '/icons/plus-white.svg' }
                        alt='add-product-img'
                        className='img w-[100px]'
                    />
                </span>
                <input type='file' onChange={handleImageUpload}/>
            </label>
            <label className='BlackLabel'>
                <input type='text' placeholder='Product Name' value={title} onChange={e => setTitle(e.target.value)}/>
            </label>
            <label className='BlackLabel-textarea'>
                <textarea placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            <label className='BlackLabel'>
                <input type='number' placeholder='Price' value={price} onChange={e => setPrice(e.target.value)} />
            </label>
            <Button title="Submit Changes" btnType="submit" icon='/icons/plus-white.svg' />
        </form>
    )
}

export default EditForm