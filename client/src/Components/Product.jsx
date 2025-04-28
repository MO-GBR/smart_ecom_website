import React from 'react'
import Button from '../Components/Button'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';

const Product = ({productDetails}) => {
    const { img, title, price, _id } = productDetails;
    const { contextSafe } = useGSAP();

    const handleScaleIn = contextSafe(({ currentTarget }) => {
        gsap.to(currentTarget, {
            scale: 1.1,
            duration: 0.5
        });
    });

    const handleScaleOut = contextSafe(({ currentTarget }) => {
        gsap.to(currentTarget, {
            scale: 1,
            duration: 0.5
        });
    });

    return (
        <div className='g1 rounded-3xl border border-gray-400 w-[350px] py-3 m-3 flexCenter flex-col cursor-pointer max-md:w-[250px]' onMouseEnter={handleScaleIn} onMouseLeave={handleScaleOut}>
            <div className='flexCenter'>
                <img
                    src='/shapes/shape-2.svg'
                    alt='shape-2'
                />
                <img
                    src={img}
                    alt='watch'
                    className='img w-[220px] absolute'
                />
            </div>
            <p className='p-bold-24 text-white'>{title}</p>
            <Button title="Details" icon="/icons/info-white.svg" href={`product/${_id}`} btnType="button" />
            <div className='w-full flexAround'>
                <p className='p-semibold-20 text-white'>{`$${price}`}</p>
                <div className='bg-white rounded-full p-2 cursor-pointer'>
                    <img
                        src='/icons/add-cart.svg'
                        alt='add-to-cart'
                    />
                </div>
            </div>
        </div>
    )
}

export default Product