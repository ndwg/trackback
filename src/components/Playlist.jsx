import React, { useState, useEffect } from 'react';
import axios from 'axios'

async function fetchPlaylist(id) {
    const options = {
        method: 'GET',
        url: `https://deezerdevs-deezer.p.rapidapi.com/playlist/${id}`,
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_DEEZER_KEY,
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };
      
    try {
        const {data} = await axios.request(options);
        return data;
    }
    catch (error) {
        console.error('Error fetching playlist:', error);
        return null;
    }
}

const Playlist = ({id}) => {
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPlaylist(id);
            setPlaylist(data);
            setLoading(false);
        };

        fetchData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!playlist) return <p>Playlist not found.</p>;

    return(
        <div>
            <img src={playlist.picture_medium} alt="" />
            <p>{playlist.title}</p>
        </div>
    )
}

export default Playlist