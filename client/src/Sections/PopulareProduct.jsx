import React from 'react'
import { testimonials } from '../Constants'
import Testimonial from '../Components/Testimonial'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { useLoading } from '../Hook/useLoading';
import TestCardSkeleton from '../Components/Skeleton/TestCardSkeleton';

const PopulareProduct = () => {
    const { contextSafe } = useGSAP();

    const [ loading ] = useLoading();

    const handleRotateIn = contextSafe(({ currentTarget }) => {
        gsap.to(currentTarget, {
            rotate: "+=480",
            duration: 2
        });
    });

    const handleRotateOut = contextSafe(({ currentTarget }) => {
        gsap.to(currentTarget, {
            rotate: "-=480",
            duration: 2
        });
    });
    
    return (
        <div className='bg-black flexCenter flex-col'>
            <h1 className='h1-bold text-white text-center'>Our New Product</h1>
            <h2 className='h2-medium text-center text-white'>Modern design, water resistant, easy to use, and More</h2>
            <div className='w-full flexCenter max-md:flex-col'>
                <div className='flexCenter'>
                    <img
                        src='/shapes/shape-1.svg'
                        alt='shape1'
                        className='img w-[500px]'
                        onMouseEnter={handleRotateIn}
                        onMouseLeave={handleRotateOut}
                    />
                    <img
                        src='/images/watch/2.png'
                        alt='popoular product'
                        className='img w-[400px] absolute'
                    />
                </div>
                <div className='grid grid-cols-2 grid-rows-3 max-md:grid-cols-1 max-md:grid-rows-6'>
                    {
                        testimonials.map((test, index) => {
                            if(loading) {
                                return (
                                    <TestCardSkeleton key={index} />
                                )
                            } else {
                                return (
                                    <Testimonial key={index} testName={test.name} testImg={test.avatarUrl} testComment={test.comment} />
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default PopulareProduct