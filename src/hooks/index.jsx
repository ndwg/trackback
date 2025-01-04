import { useEffect, useState } from 'react'
import axios from 'axios'

export const useFetch = (options) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.request(options);
                setData(data)
            }
            catch (error) {
                console.error('Error fetching data:', error);
                setData(null);
            }
            finally{
                setLoading(false);
            }
        };

        fetchData();
    }, [options]);

    console.log('fetch');

    return { data, loading };
};