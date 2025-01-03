import React, { useMemo } from 'react';
import classes from './Playlist.module.scss'
import { useFetch } from '../../hooks';

const Playlist = ({id}) => {
    const options = useMemo(() => ({
        method: 'GET',
        url: `https://deezerdevs-deezer.p.rapidapi.com/playlist/${id}`,
        headers: {
            'x-rapidapi-key': import.meta.env.VITE_DEEZER_KEY,
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    }), [id]);

    const { data: playlist, loading } = useFetch(options);

    if (loading) return <p>Loading...</p>;
    if (!playlist) return <p>Playlist not found.</p>;

    return(
        <div className={`${classes.playlist}`}>
            <img src={playlist.picture_medium} alt="" />
            <p>{playlist.title}</p>
        </div>
    )
}

export default Playlist