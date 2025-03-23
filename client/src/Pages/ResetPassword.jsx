import React, { useState } from 'react'
import Button from '../Components/Button'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { ResetUserPassword } from '../Redux/Actions/UserActions';
import { selectUser } from '../Redux/Slices/UserSlice';

const ResetPassword = () => {
    const resetToken = useParams().resetToken;

    const [ password, setPassword ] = useState('');
    const [ confirmassword, setConfirmassword ] = useState('');

    const dispatch = useDispatch();
    const { fetching, user, message, error } = useSelector(selectUser);

    const onSubmitReset = (e) => {
        e.preventDefault();
        ResetUserPassword(dispatch, resetToken, password, confirmassword);
    };
    
    return (
        <div className='w-full flexCenter max-md:h-screen'>
            <img
                src='/images/watch/water.png'
                alt='auth-bg'
            />
            <form className='authContainer flexCenter' onSubmit={onSubmitReset}>
                {
                    message && (
                        <div className='w-full bg-black rounded-3xl p-2 flexCenter flex-col'>
                            <p className={ error ? 'msg-error w-full' : 'msg w-full' }>{message}</p>
                            <Button title="Sign In" href="/signin" icon="/icons/login-white.svg" btnType="button" />
                        </div>
                    )
                }
                <label className='BlackLabel'>
                    <input type='password' placeholder='Your Password' value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <label className='BlackLabel'>
                    <input type='password' placeholder='Confirm Your Password' value={confirmassword} onChange={e => setConfirmassword(e.target.value)} />
                </label>
                <Button title="Reset Password" icon="/icons/reset-password-white.svg" btnType="submit" />
            </form>
        </div>
    )
}

export default ResetPassword