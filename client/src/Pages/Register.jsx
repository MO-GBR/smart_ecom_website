import React, { useState } from 'react'
import Button from '../Components/Button'
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/Actions/UserActions';
import { useRegisterMutation } from '../Redux/RTK/Auth';

const Register = () => {
    const [ firstName, setFirstName] = useState('');
    const [ lastName, setLastName] = useState('');
    const [ password, setPassword] = useState('');
    const [ email, setEmail ] = useState('');
    const [ confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const [ register, { isLoading, isError, error } ] = useRegisterMutation();

    const onSubmitRegister = async (e) => {
        e.preventDefault();
        const userData = {firstName, lastName, email, password, confirmPassword};
        const res = await register(userData).unwrap();
        setUser(dispatch, res.data);
    };

    return (
        <div className='w-full flexCenter max-md:h-screen'>
            <img
                src='/images/watch/water.png'
            />
            <form className='authContainer flexCenter' onSubmit={onSubmitRegister}>
                {
                    isError && (
                        <p className='msg-error'>{error.data.data}</p>
                    )
                }
                <label className='BlackLabel'>
                    <input type='text' placeholder='Your First Name' value={firstName} onChange={e => setFirstName(e.target.value)} />
                </label>
                <label className='BlackLabel'>
                    <input type='text' placeholder='Your Last Name' value={lastName} onChange={e => setLastName(e.target.value)} />
                </label>
                <label className='BlackLabel'>
                    <input type='email' placeholder='Your Email' value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label className='BlackLabel'>
                    <input type='password' placeholder='Your Password' value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <label className='BlackLabel'>
                    <input type='password' placeholder='Confirm Your Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </label>
                <Button title={isLoading ? 'Processing ...' : 'Sign Up'} icon="/icons/add-user-white.svg" btnType="submit" />
            </form>
        </div>
    )
}

export default Register