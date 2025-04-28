import React, { useState } from 'react'
import Button from '../Components/Button'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slices/UserSlice';
import { useForgetPasswordMutation } from '../Redux/RTK/Auth';

const ForgetPassword = () => {
    const [ email, setEmail ] = useState('');

    const [ forgetPassword, { data: emailConfirmation, isLoading, isError, error } ] = useForgetPasswordMutation();

    const onSubmitSend = async (e) => {
        e.preventDefault();
        await forgetPassword({email}).unwrap();
    };

    return (
        <div className='w-full flexCenter max-md:h-screen'>
            <img
                src='/images/watch/water.png'
                alt='auth-bg'
            />
            <form className='authContainer flexCenter' onSubmit={onSubmitSend}>
                {
                    isError && (
                        <p className='msg-error'>{error.data.data}</p>
                    )
                }
                {
                    emailConfirmation && (
                        <p className='msg'>{emailConfirmation.data.data}</p>
                    )
                }
                <label className='BlackLabel'>
                    <input type='email' placeholder='Your Email' value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <Button title={isLoading ? 'Processing ...' : 'Send Email'} icon="/icons/send-email-white.svg" btnType="submit" />
            </form>
        </div>
    )
}

export default ForgetPassword