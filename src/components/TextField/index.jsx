import React, { useState, useEffect } from 'react';
import classes from './TextField.module.scss'

const TextField = ({ values, playlist, track, endRound, roundStatus }) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const filteredSuggestions = getFilteredSuggestions(value);
        setSuggestions(filteredSuggestions);
    };

    const handleSelect = (suggestion) => {
        setInputValue(suggestion);
        setSuggestions([]);
        if (suggestion === playlist[track].artist.name) {
            endRound(true);
            setInputValue('');
        }
    };

    const getFilteredSuggestions = (value) => {
        if (value === '') return [];
        else return values.filter((item) => item.toLowerCase().includes(value.toLowerCase()));
    };

    return (
        <div className={!roundStatus ? '' : `${classes.hideDisplay}`}>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="guess the artist..."
                className={suggestions.length === 0 ? `${classes.guessInput}` : `${classes.guessInputWithSuggestions}`}
            />
            <ul className={suggestions.length === 0 ? '' : `${classes.suggestionList}`}>
                {suggestions.map((suggestion, index) => (
                    <li
                        key={index}
                        onClick={() => handleSelect(suggestion)}
                        className={`${classes.suggestions}`}>
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TextField;