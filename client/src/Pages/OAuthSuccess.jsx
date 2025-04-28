import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLoginWithGoogleQuery } from '../Redux/RTK/Passport';
import { setUser } from '../Redux/Actions/UserActions';
import { useDispatch } from 'react-redux';

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: googleUser, isLoading } = useLoginWithGoogleQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if(googleUser) {
            setUser(dispatch, googleUser);
            navigate('/');
        }
    }, [googleUser]);
    
    return (
        <div className='w-full h-screen flexCenter text-4xl text-white font-bold'>{isLoading ? 'Loading...' : 'Redirecting...'}</div>
    )
}

export default OAuthSuccess