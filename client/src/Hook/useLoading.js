import { useState, useEffect } from 'react';

export const useLoading = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = () => {
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
        load();
    }, []);

    return [loading];
};