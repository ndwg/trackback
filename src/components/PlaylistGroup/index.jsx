import classes from './PlaylistGroup.module.scss';
import Playlist from '../Playlist';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const PlaylistGroup = ({ playlists, count, name }) => {
    const [leftBound, setLeftBound] = useState(0);

    useEffect(() => {
        setLeftBound(0);
    }, [count]);

    const getDisplayedPlaylists = () => {
        if (leftBound + count > playlists.length) {
            return playlists.slice(leftBound).concat(playlists.slice(0, (leftBound + count) % playlists.length));
        } else {
            return playlists.slice(leftBound, leftBound + count);
        }
    };

    const handleLeftButton = () => {
        setLeftBound((prevLeftBound) => (prevLeftBound - 1 + playlists.length) % playlists.length);
    };

    const handleRightButton = () => {
        setLeftBound((prevLeftBound) => (prevLeftBound + 1) % playlists.length);
    };

    if(!playlists){
    return (
        <div className={`${classes.outerContainer}`}>
            <div className={`${classes.innerContainer}`}>
                <h2 className={`${classes.label}`}>{name}</h2>
                <div className={`${classes.playlists}`}>
                    <button onClick={handleLeftButton} className={`${classes.button}`}>
                        <FaArrowLeft />
                    </button>
                    <ul className={`${classes.list}`}>
                        {Array.from({ length: count }).map((_, i) => (
                            <li key={i} className={`${classes.element}`}>
                                <Playlist id={0} />
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleRightButton} className={`${classes.button}`}>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
    }

    return (
        <div className={`${classes.outerContainer}`}>
            <div className={`${classes.innerContainer}`}>
                <h2 className={`${classes.label}`}>{name}</h2>
                <div className={`${classes.playlists}`}>
                    <button onClick={handleLeftButton} className={`${classes.button}`}>
                        <FaArrowLeft />
                    </button>
                    <ul className={`${classes.list}`}>
                        {getDisplayedPlaylists().map((playlist) => (
                            <li key={playlist} className={`${classes.element}`}>
                                <Link to={`/playlist/${playlist}`}>
                                    <Playlist id={playlist} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleRightButton} className={`${classes.button}`}>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaylistGroup;