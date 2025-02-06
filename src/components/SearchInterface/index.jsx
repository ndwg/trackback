import classes from './SearchInterface.module.scss'
import React, { useState } from 'react';
import PlaylistGroup from '../PlaylistGroup';
import { FaSearch } from "react-icons/fa";

const SearchInterface = ({ playlistCount }) => {
    const [searchInput, setSearchInput] = useState('');
    const [lastSearch, setlastSearch] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    const fetchSearchResults = async (event) => {
        event.preventDefault();
        setlastSearch(searchInput);
        try {
            const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
            const response = await fetch(`${API_BASE_URL}/api/search?q=${searchInput}`);
            if (!response.ok) throw new Error('Failed to fetch results');
    
            const data = (await response.json()).data.map(playlist => playlist.id);
            setSearchResults(data);
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
    };

    if(lastSearch) return (
        <div>
            <form action="" onSubmit={fetchSearchResults} className={`${classes.container}`}>
                <input type="text" onChange={handleChange} className={`${classes.searchInput}`} placeholder='search for a playlist, genre, etc.'/>
                <button type='submit' className={`${classes.searchButton}`}><FaSearch /></button>
            </form>
            <PlaylistGroup playlists={searchResults} name={`search results for ${lastSearch}`} count={playlistCount}/>
        </div>
    )
    return (
        <div>
            <form action="" onSubmit={fetchSearchResults} className={`${classes.container}`}>
                <input type="text" onChange={handleChange} className={`${classes.searchInput}`} placeholder='search for a playlist, genre, etc.'/>
                <button type='submit' className={`${classes.searchButton}`}><FaSearch /></button>
            </form>
        </div>
    )
}

export default SearchInterface