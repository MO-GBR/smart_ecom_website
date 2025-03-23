const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchData = async (url, fetchMethod, body) => {
    const config = {
        method: fetchMethod,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
    };

    const result = await fetch(`${baseUrl}/${url}`, config);
    const data = result.ok ? await result.json() : await result.json().then((data) => {throw new Error(data.data)} );
    return data;
};