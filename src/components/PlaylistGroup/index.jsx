import classes from './PlaylistGroup.module.scss'
import Playlist from '../Playlist';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"

const PlaylistGroup = ({playlists, count}) => {
    const [displayedPlaylists, setDisplayedPlaylists] = useState(null);
    const [leftBound, setLeftBound] = useState(0);
    const [rightBound, setRightBound] = useState(count);

    useEffect(() => {
        setDisplayedPlaylists(playlists.slice(leftBound, rightBound));
    }, [playlists])

    const handleLeftButton = () => {
        setLeftBound((prevLeftBound) => {
            const newLeftBound = prevLeftBound === 0 ? playlists.length - 1 : prevLeftBound - 1;
            setDisplayedPlaylists(() => {
                const newRightBound = rightBound === 0 ? playlists.length - 1 : rightBound - 1;
                return newLeftBound < newRightBound
                    ? playlists.slice(newLeftBound, newRightBound)
                    : playlists.slice(newLeftBound).concat(playlists.slice(0, newRightBound));
            });
            return newLeftBound;
        });
    
        setRightBound((prevRightBound) => {
            const newRightBound = prevRightBound === 0 ? playlists.length - 1 : prevRightBound - 1;
            return newRightBound;
        });
    };

    const handleRightButton = () => {
        setLeftBound((prevLeftBound) => {
            const newLeftBound = (prevLeftBound + 1) % playlists.length;
            setDisplayedPlaylists(() => {
                const newRightBound = (rightBound + 1) % playlists.length;
                return newLeftBound < newRightBound
                    ? playlists.slice(newLeftBound, newRightBound)
                    : playlists.slice(newLeftBound).concat(playlists.slice(0, newRightBound));
            });
            return newLeftBound;
        });
    
        setRightBound((prevRightBound) => {
            const newRightBound = (prevRightBound + 1) % playlists.length;
            return newRightBound;
        });
    };

    if(displayedPlaylists) return(
        <div className={`${classes.container}`}>
            <button
                onClick={handleLeftButton}
                className={`${classes.button}`}
            >
                <FaArrowLeft />
            </button>
            <ul className={`${classes.list}`}>
                {displayedPlaylists.map(playlist =>
                    <li key={`${playlist}`} className={`${classes.element}`}>
                        <Link to={`/playlist/${playlist}`}>
                            <Playlist id={playlist}/>
                        </Link>
                    </li>
                )}
            </ul>
            <button
                onClick={handleRightButton}
                className={`${classes.button}`}
            >
                <FaArrowRight />
            </button>
        </div>
    )
}

export default PlaylistGroup