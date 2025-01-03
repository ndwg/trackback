import classes from './GameInterface.module.scss'
import { useFetch } from '../../hooks';
import React, { useEffect, useMemo, useState } from 'react';

const checkGuess = (event, guess, name) => {
    event.preventDefault();
    if(guess.toLowerCase() === name.toLowerCase()){
        console.log('Correct!');
    }
    else{
        console.log('Try Again!');
    }
}

const GameInterface = ({id}) => {
    const options = useMemo(() => ({
        method: 'GET',
        url: `https://deezerdevs-deezer.p.rapidapi.com/playlist/${id}`,
        headers: {
            'x-rapidapi-key': import.meta.env.VITE_DEEZER_KEY,
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    }), [id]);
    
    const [track, setTrack] = useState(null);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [guess, setGuess] = useState("");

    const { data: playlist, loading } = useFetch(options);

    useEffect(() => {
        if(playlist){
            newTrack();
        }
    }, [playlist]);

    const newTrack = () => {
        const randomTrack = Math.floor(Math.random()*playlist.tracks.data.length);
        setTrack(randomTrack);
        //console.log(playlist.tracks.data[track]);
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
        checkGuess(event, guess, playlist.tracks.data[track].artist.name);
    };

    if(track) {
    return(
        <>
            <img className={`${classes.image}`} src={playlist.tracks.data[track].album.cover_medium} alt="" />
            {console.log(playlist.tracks.data[track])}
            <button onClick={isPlaying ? handlePause : handlePlay}>
                {isPlaying ? '⏸︎' : '⏵︎'}
            </button>
            <form onSubmit={handleGuess}>
                <label htmlFor="guess">Guess the artist:</label>
                <input type="text" id="guess" name="guess" value={guess} onChange={(e) => setGuess(e.target.value)}/>
                <button type="submit">guess</button>
            </form>
        </>
        
    )
    }
    return(
        <div>loading</div>
    )
}

export default GameInterface