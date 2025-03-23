import React, { useState } from 'react'
import Button from '../Components/Button'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slices/UserSlice';
import { ForgetUserPassword } from '../Redux/Actions/UserActions';

const ForgetPassword = () => {
    const [ email, setEmail ] = useState('');

    const dispatch = useDispatch();
    const { fetching, user, message, error } = useSelector(selectUser);

    const onSubmitSend = async (e) => {
        e.preventDefault();
        ForgetUserPassword(dispatch, email);
    };
    return (
        <div className='w-full flexCenter max-md:h-screen'>
            <img
                src='/images/watch/water.png'
                alt='auth-bg'
            />
            <form className='authContainer flexCenter' onSubmit={onSubmitSend}>
                {
                    message && (
                        <p className={ error ? 'msg-error' : 'msg' }>{message}</p>
                    )
                }
                <label className='BlackLabel'>
                    <input type='email' placeholder='Your Email' value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <Button title="Send Email" icon="/icons/send-email-white.svg" btnType="submit" />
            </form>
        </div>
    )
}

export default ForgetPassword