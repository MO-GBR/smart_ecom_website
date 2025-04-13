import { useState, useEffect } from 'react';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useFetch = (url) => {
    const [ data, setData ] = useState(null);

    useEffect(() => {
        fetch(`${baseUrl}/${url}`, {
            credentials: 'include'
        }).then((result) => result.json()).then((data) => setData(data));
    }, [url]);
    
    return [data];
};
