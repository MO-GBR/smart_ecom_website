import React, { useEffect, useRef } from 'react'
import Button from '../Components/Button'
import gsap from 'gsap';

const Hero = () => {
    const heroImg = useRef(null);

    useEffect(() => {
        gsap.to(heroImg.current, {
            keyframes: {
                y: [15, -15, 15, -15, 15],
            },
            ease: "power1.inOut",
            duration: 5,
            repeat: -1
        })
    }, []);
    return (
        <div className='flexCenter w-full h-screen g1 rounded-t-3xl max-md:mt-[14rem] max-md:h-[125vh]'>
            <div className='flexAround w-full max-md:flex-col-reverse'>
                <div className='max-md:m-4'>
                    <p className='p-medium-20 text-white'>The Smartest out there (2025 New Trend)</p>
                    <br />
                    <h2 className='h2-medium text-white mb-10'>The All in One Smart Watch</h2>
                    <p className='p-medium-16 text-gray-400'>
                        Be more productive.
                        <br />
                        Stand out with the modern design.
                        <br />
                        Powered with the most cutting edge technologies.
                    </p>
                    <div className='flexAround w-full max-md:flex-col'>
                        <Button title="Shop Now" href="#" icon="/icons/cart-white.svg" btnType="button" />
                        <Button title="Expolre Watches" href="#" icon="/icons/star-white.svg" btnType="button" />
                    </div>
                </div>
                <img
                    src="/images/watch/water.png"
                    alt='watch'
                    className='img w-[500px]'
                    ref={heroImg}
                />
            </div>
        </div>
    )
}

export default Hero