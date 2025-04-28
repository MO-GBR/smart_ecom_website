import React, { useState } from 'react'
import Button from '../Components/Button'
import { useParams } from 'react-router-dom'
import { useResetPasswordMutation } from '../Redux/RTK/Auth';

const ResetPassword = () => {
    const resetToken = useParams().resetToken;

    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const [ resetPassword, { data, isError, error, isLoading } ] = useResetPasswordMutation();

    const onSubmitReset = async (e) => {
        e.preventDefault();
        const resetInput = { password, confirmPassword };
        await resetPassword({ resetToken, resetInput }).unwrap();
    };
    
    return (
        <div className='w-full flexCenter max-md:h-screen'>
            <img
                src='/images/watch/water.png'
                alt='auth-bg'
            />
            <form className='authContainer flexCenter' onSubmit={onSubmitReset}>
                {
                    isError && (
                        <p className='msg-error'>{error.data.data}</p>
                    )
                }
                {
                    data && (
                        <div className='w-full bg-black rounded-3xl p-2 flexCenter flex-col'>
                            <p className='msg w-full'>{data.data}</p>
                            <Button title="Sign In" href="/signin" icon="/icons/login-white.svg" btnType="button" />
                        </div>
                    )
                }
                <label className='BlackLabel'>
                    <input type='password' placeholder='Your Password' value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <label className='BlackLabel'>
                    <input type='password' placeholder='Confirm Your Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </label>
                <Button title={isLoading ? 'Processing...' : 'Reset Password'} icon="/icons/reset-password-white.svg" btnType="submit" />
            </form>
        </div>
    )
}

export default ResetPassword