import React, { useState } from 'react'
import Button from '../Components/Button'
import { setUser } from '../Redux/Actions/UserActions';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../Redux/RTK/Auth';
import { Link } from 'react-router-dom';

const googleLink = import.meta.env.VITE_MODE === 'development' ? `${import.meta.env.VITE_API_URL}/oauth/google` : "/oauth/google";

const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const dispatch = useDispatch();

    const [ login, { isLoading, isError, error } ] = useLoginMutation();

    const onSubmitLogin = async (e) => {
        try {
            e.preventDefault();
            const userData = { email, password };
            const res = await login(userData).unwrap();
            setUser(dispatch, res.data);
        } catch (error) {
            console.log("Error in login", error);
        }
    };

    return (
        <div className='w-full flexCenter max-md:h-screen'>
            <img
                src='/images/watch/water.png'
            />
            <form className='authContainer flexCenter' onSubmit={onSubmitLogin}>
                {
                    isError && (
                        <p className='msg-error'>{error.data.data}</p>
                    )
                }
                <label className='BlackLabel'>
                    <input type='email' placeholder='Your Email' value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label className='BlackLabel'>
                    <input type='password' placeholder='Your Password' value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <Button title={isLoading ? 'Processing' : 'Sign In'} icon="/icons/login-white.svg" btnType="submit" />
                <Button title="Sign In with Google" href={googleLink} btnType="button" />
                <Link to='/signup' className='link'>Create Account</Link>
                <Link to='/forgetpassword' className='link'>Forget Password</Link>
            </form>
        </div>
    )
}

export default Login