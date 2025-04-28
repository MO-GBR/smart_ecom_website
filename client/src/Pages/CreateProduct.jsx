import React, { useState } from 'react'
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';
import { useAddProductMutation } from '../Redux/RTK/Products';

const CreateProduct = () => {
    const [ selectedImg, setSelectedImg ] = useState(null);
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ msg, setMsg ] = useState('');

    const navigate = useNavigate();

    const [ addNewProduct, others ] = useAddProductMutation();

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

    const CreateOneProduct = async (e) => {
        e.preventDefault();
        const product = {
            title,
            description,
            img: selectedImg,
            price
        };
        await addNewProduct(product);
        setMsg('Product Created Successfully!');
        navigate('/admin');
    };

    return (
        <div className='flexCenter w-full h-screen'>
            <form className='bg-white h-fit w-[60%] flexCenter flex-col p-20 rounded-2xl' onSubmit={CreateOneProduct}>
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
                <Button title={others.isLoading ? 'Processing...' : 'Create Product'} btnType="submit" icon='/icons/plus-white.svg' />
            </form>
        </div>
    )
}

export default CreateProduct