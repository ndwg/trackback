import classes from './GameInterface.module.scss'
import React, { useEffect, useState } from 'react';
import { FaPause, FaPlay } from "react-icons/fa";

const checkGuess = (event, guess, name, endRound, resetField) => {
    event.preventDefault();
    if(guess.toLowerCase() === name.toLowerCase()){
        console.log('Correct!');
        endRound(true);
    }
    else{
        console.log('Try Again!');
    }

    resetField('');
}

const GameInterface = ({id}) => {
    const [playlist, setPlaylist] = useState(null);
    const [track, setTrack] = useState(null);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [guess, setGuess] = useState("");
    const [roundIsOver, setRoundIsOver] = useState(false);

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
                console.log("fetch");

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

    useEffect(() => {
        if(playlist){
            newTrack();
        }
    }, [playlist]);

    const newTrack = () => {
        const randomTrack = Math.floor(Math.random()*playlist.tracks.data.length);
        setTrack(randomTrack);
        setRoundIsOver(false);
        if (audio){
            audio.pause();
            setAudio(null);
        }
        setIsPlaying(false);
    };

    const handlePlay = () => {
        if (audio) {
            audio.play();
            setIsPlaying(true);
            return;
        }
        const newAudio = new Audio(playlist.tracks.data[track].preview);
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

    const handleGuess = (event) => {
        checkGuess(event, guess, playlist.tracks.data[track].artist.name, setRoundIsOver, setGuess);
    };

    const handleGiveUp = () => {
        setRoundIsOver(true);
    };

    const handleNewRound = () => {
        newTrack();
    };

    if(track) {
    return(
        <div className={`${classes.interface}`}>
            <img
                className={roundIsOver? '' :`${classes.hiddenCover}`}
                src={playlist.tracks.data[track].album.cover_medium}
                alt="album cover"
            />
            <p className={roundIsOver? '' :`${classes.hiddenInfo}`}>
                {playlist.tracks.data[track].title}
            </p>
            <p className={roundIsOver? '' :`${classes.hiddenInfo}`}>
                {playlist.tracks.data[track].artist.name}
            </p>
            {console.log(playlist.tracks.data[track])}
            <button
                className={`${classes.playButton}`}
                onClick={isPlaying ? handlePause : handlePlay}
            >
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <form onSubmit={handleGuess}>
                <label htmlFor="guess">guess the artist:</label>
                <input type="text" id="guess" name="guess" value={guess} onChange={(e) => setGuess(e.target.value)}/>
                <button type="submit">guess</button>
            </form>
            <button
                className={roundIsOver? `${classes.hiddenButton}`: ''}
                onClick={handleGiveUp}>
                give up
            </button>
            <button
                className={roundIsOver? '': `${classes.hiddenButton}`}
                onClick={handleNewRound}>
                next
            </button>
        </div> 
    )
    }
    return(
        <div>loading...</div>
    )
}

export default GameInterface