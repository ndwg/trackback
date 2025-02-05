import classes from './MainInterface.module.scss'
import React, { useEffect, useState } from 'react';
import PlaylistGroup from '../PlaylistGroup';
import SearchInterface from '../SearchInterface';

const MainInterface = () => {
    const featured = [2098157264, 12321527131, 1036183001, 1996494362, 1306931615, 1282483245, 1130102843, 1999466402, 8515679522, 706093725, 1431800665]

    const [playlistCount, setPlaylistCount] = useState(1);

    useEffect(() => {
        const updatePlaylistCount = () => {
            let count;
            if (window.matchMedia("(min-width: 1800px)").matches) count = 6;
            else if (window.matchMedia("(min-width: 1500px)").matches) count = 5;
            else if (window.matchMedia("(min-width: 1200px)").matches) count = 4;
            else if (window.matchMedia("(min-width: 940px)").matches) count = 3;
            else if (window.matchMedia("(min-width: 670px)").matches) count = 2;
            else count = 1;
            setPlaylistCount(count);
        };

        updatePlaylistCount();
        window.addEventListener('resize', updatePlaylistCount);

        return () => window.removeEventListener('resize', updatePlaylistCount);
    }, []);

    return (
        <div className={`${classes.body}`}>
            <h1>search for a playlist</h1>
            <SearchInterface playlistCount={playlistCount}/>
            <h1>or choose a featured playlist</h1>
            <PlaylistGroup playlists={featured} count={playlistCount} name={'trending now'} />
        </div>
    )
}

export default MainInterface