import React, { useState, useEffect } from 'react'
import { colors } from '../Constants'
import Button from '../Components/Button';
import { useParams } from 'react-router-dom';
import { useFetch } from '../Hook/useFetch';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../Redux/Actions/CartActions';

const Product = () => {
    const id = useParams().id;
    const dispatch = useDispatch();
    const [ data ] = useFetch(`product/${id}`);
    const [selectedColor, setSelectedColor] = useState('bg-[#000]');
    const [prodctColor, setProdctColor] = useState({bg: 'bg-[#000]', code: '#000'});
    const [quantity, setQuantity] = useState(1);

    console.log(data);

    const handleQuantity = (handleType) => {
        if(handleType === 'plus') {
            setQuantity(quantity + 1);
        }
        if(handleType === 'minus') {
            if(qunatity === 0) return;
            setQuantity(quantity - 1);
        }
    };

    const handleColor = (color) => {
        setSelectedColor(color.bg);
        setProdctColor(color);
    }

    const addProductToCart = () => {
        const product = {
            product: data.data,
            quantity,
            color: prodctColor
        };
        addItemToCart(dispatch, product);
    };

    return (
        <div className='flexCenter flex-col w-full h-full mt-26 max-md:mt-[15rem]'>
            <div className='flexAround w-full h-full max-md:flex-col'>
                <div className='flexCenter flex-col'>
                    <div className='flexCenter'>
                        <img
                            src='/shapes/shape-1.svg'
                            alt='shape1'
                            className='img w-[500px]'
                        />
                        <img
                            src={ data && data.data.img }
                            alt='popoular product'
                            className='img w-[400px] absolute'
                        />
                    </div>
                    <div className='h3-bold text-white'>{ data && data.data.title }</div>
                    <div className='g3 desc-card'>{ data && data.data.description }</div>
                </div>
                <div className='flexCenter flex-col'>
                    <div className='p-2 border border-white flexCenter flex-col rounded-2xl'>
                        <p className='text-white font-bold w-full text-center'>Choose Color</p>
                        <div className='flexCenter'>
                            {
                                colors.map((color, index) => (
                                    <div key={index} className='flexCenter flex-col'>
                                        <div className={`${color.bg} p-5 mx-3 border border-gray-400 rounded-full w-5 h-5 cursor-pointer max-md:w-3 max-md:h-3 max-md:p-2`} onClick={() => handleColor(color)} />
                                    </div>
                                ))
                            }
                        </div>
                        <div className='border border-white my-3 w-[50%] flexBetween rounded-full max-md:w-[90%]'>
                            <p className='text-white font-bold m-3'>Selected Color</p>
                            <div className={ `border border-white w-12 h-12 rounded-full ${selectedColor}` } />
                        </div>
                    </div>
                    <div className='flexCenter'>
                        <div className='bg-white rounded-full p-2 cursor-pointer' onClick={() => handleQuantity('plus')}>
                            <img
                                src='/icons/plus.svg'
                                alt='add'
                                className='img w-[20px]'
                            />
                        </div>
                        <p className='text-white font-bold mx-5 my-7'>{quantity}</p>
                        <div className='bg-white rounded-full p-2 cursor-pointer' onClick={() => handleQuantity('minus')}>
                            <img
                                src='/icons/minus.svg'
                                alt='remove'
                                className='img w-[20px]'
                            />
                        </div>
                    </div>
                    <Button title={<p onClick={addProductToCart}>Add To Cart</p>} icon="/icons/add-cart-white.svg" btnType="button" />
                </div>
            </div>
            <div className='flexAround w-full max-md:flex-col'>
                <div className='flexCenter g1 featureCard'>
                    <div className='p-1 bg-black rounded-full'>
                        <img
                            src='/icons/water-white.svg'
                            alt='water'
                        />
                    </div>
                    <p className='font-bold text-white'>Water Resistant</p>
                </div>
                <div className='flexCenter g1 featureCard'>
                    <div className='p-1 bg-black rounded-full'>
                        <img
                            src='/icons/star2-white.svg'
                            alt='water'
                        />
                    </div>
                    <p className='font-bold text-white'>Modern Design</p>
                </div>
                <div className='flexCenter g1 featureCard'>
                    <div className='p-1 bg-black rounded-full'>
                        <img
                            src='/icons/setting-white.svg'
                            alt='water'
                        />
                    </div>
                    <p className='font-bold text-white'>Easy to use</p>
                </div>
            </div>
        </div>
    )
}

export default Product