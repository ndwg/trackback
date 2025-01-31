import classes from './GameInterface.module.scss'
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPause, FaPlay } from "react-icons/fa";
import { CiFaceSmile } from "react-icons/ci";
import { IoIosSkipForward } from "react-icons/io";
import TextField from '../TextField';

const GameInterface = ({id}) => {
    const [playlist, setPlaylist] = useState(null);
    const [details, setDetails] = useState(null);
    const [track, setTrack] = useState(0);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [roundIsOver, setRoundIsOver] = useState(false);
    const [artists, setArtists] = useState(false);

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

                const data = (await response.json());
                const sortedData = data.tracks.data.filter((track) => track.preview);

                for (let i = sortedData.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [sortedData[i], sortedData[j]] = [sortedData[j], sortedData[i]];
                }

                setPlaylist(sortedData);
                setDetails(data);
            } 
            catch (err) {
                console.log(err.message);
            }
        };

        fetchPlaylist();
    }, [id]);

    useEffect(() => {
        return () => {
            handlePause();
        };
    }, [useLocation().pathname, audio]);

    useEffect(() => {
        if(playlist){
            const completeArtists = playlist.map((track) => track.artist.name);
            setArtists([...new Set(completeArtists)]);

            console.log(`🎵 now playing ${details.title} 🎵`)
        }
    }, [playlist]);

    const handlePlay = () => {
        if (audio) {
            audio.play();
            setIsPlaying(true);
            return;
        }
        const newAudio = new Audio(playlist[track].preview);
        setAudio(newAudio);
        newAudio.play();
        setIsPlaying(true);

        newAudio.onended = () => setIsPlaying(false);
    };

    const handlePause = () => {
        if (audio) {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const handleGiveUp = () => {
        setRoundIsOver(true);
    };

    const handleNewRound = () => {
        setTrack(track => track+1);
        setRoundIsOver(false);
        if (audio){
            audio.pause();
            setAudio(null);
        }
        setIsPlaying(false);
    };

    if(playlist && track === playlist.length){
        return(
            <h1>game over <CiFaceSmile /></h1>
        )
    }
    else if(playlist && (track || track === 0)) {
    return(
        <div className={`${classes.interface}`}>
            <img
                className={roundIsOver? '' :`${classes.hiddenCover}`}
                src={playlist[track].album.cover_medium}
                alt="album cover"
            />
            <p className={roundIsOver? '' :`${classes.hiddenInfo}`}>
                {playlist[track].title}
            </p>
            <p className={roundIsOver? '' :`${classes.hiddenInfo}`}>
                {playlist[track].artist.name}
            </p>
            <button
                className={`${classes.playButton}`}
                onClick={isPlaying ? handlePause : handlePlay}
                title='play/pause'
            >
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <TextField values={artists} playlist={playlist} track={track} endRound={setRoundIsOver} roundStatus={roundIsOver}/>
            <button
                className={roundIsOver? `${classes.hiddenButton}`: `${classes.nextButton}`}
                onClick={handleGiveUp}
                title='skip/next'
            >
                <IoIosSkipForward />
            </button>
            <button
                className={roundIsOver? `${classes.nextButton}`: `${classes.hiddenButton}`}
                onClick={handleNewRound}>
                <IoIosSkipForward />
            </button>
        </div> 
    )
    }
    return(
        <div>loading...</div>
    )
}

export default GameInterface