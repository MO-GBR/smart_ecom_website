import React, { useEffect, useRef } from 'react'
import Button from '../Components/Button'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AdBFri = () => {
    const adRef = useRef(null);
    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: adRef.current,
                toggleActions: "restart none none none"
            }
        });
        tl.set(adRef.current, { y: -300, opacity: 0 });
        tl.to(adRef.current, { y: 0, opacity: 1, duration: 1 });
    }, []);
    
    return (
        <div className='w-full flexCenter flex-col bg-black'>
            <h1 className='h1-bold text-white w-full text-center my-3'>Black Friday Offer</h1>
            <img
                src='/images/1.jpg'
                alt='ad'
                className=' img w-[60vw] my-5 rounded-3xl'
                ref={adRef}
            />
            <div className='w-full flexCenter'>
                <Button title="Shop Now" href="#" icon="/icons/cart-white.svg" btnType="button" />
            </div>
        </div>
    )
}

export default AdBFri