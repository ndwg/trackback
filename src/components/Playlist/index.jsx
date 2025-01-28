import React, { useState, useEffect } from 'react';
import classes from './Playlist.module.scss'

const Playlist = ({id}) => {
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await fetch(
                    `https://deezerdevs-deezer.p.rapidapi.com/playlist/${id}`,
                    {
                        method: 'GET',
                        headers: {
                            'x-rapidapi-key': import.meta.env.VITE_DEEZER_KEY,
                            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch playlist');
                }

                const data = await response.json();
                setPlaylist(data);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchPlaylist();
    }, [id]);

    if (!playlist) {
        return(
            <div className={`${classes.playlist}`}>
                <img src="https://image.architonic.com/pro1-3/20182929/vm-2036-z-pro-sq-arcit18.jpg" alt="" />
                <p>loading...</p>
            </div>
        )
    }

    return(
        <div className={`${classes.playlist}`}>
            <img src={playlist.picture_medium} alt="" />
            <p>{playlist.title}</p>
        </div>
    )
}

export default Playlist