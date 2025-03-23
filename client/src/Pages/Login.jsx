import React, { useState, useEffect } from 'react'
import Button from '../Components/Button'
import { LoginUser } from '../Redux/Actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slices/UserSlice';

const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const dispatch = useDispatch();

    const { message, error } = useSelector(selectUser);

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        LoginUser(dispatch, email, password);
    };
    return (
        <div className='w-full flexCenter max-md:h-screen'>
            <img
                src='/images/watch/water.png'
            />
            <form className='authContainer flexCenter' onSubmit={onSubmitLogin}>
                {
                    message && (
                        <p className={ error ? 'msg-error' : 'msg' }>{message}</p>
                    )
                }
                <label className='BlackLabel'>
                    <input type='email' placeholder='Your Email' value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label className='BlackLabel'>
                    <input type='password' placeholder='Your Password' value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <Button title="Sign In" icon="/icons/login-white.svg" btnType="submit" />
                <Button title="Sign Up" href="/signup" icon="/icons/add-user-white.svg" btnType="button" />
                <Button title="Forget Password" href="/forgetpassword" icon="/icons/send-email-white.svg" btnType="button" />
            </form>
        </div>
    )
}

export default Login