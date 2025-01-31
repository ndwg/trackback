import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useMatch
} from "react-router-dom"
import PlaylistGroup from './components/PlaylistGroup';
import Footer from './components/Footer';
import GameInterface from './components/GameInterface';
import Header from './components/Header';
import classes from './App.module.scss';

function App() {
  const playlists = [3155776842, 1313621735, 1282495565, 13154877883, 13241781803, 13238299403]
  const decades = [248297032, 878989033, 867825522, 1470022445, 620264073]
  const teens = [8282573142, 7662551722, 2159765062, 6200785264, 745674991, 5922972724, 5174094184, 13013668743]
  const aughts = [248297032, 9341070582, 5714797982, 4135818362, 5782150322]
  const nineties = [8311123682, 1724212365, 1728093421, 4135981802, 1950632062]
  const eighties = [8512471762, 5172233424, 8621268482, 1294679255, 1276784581]
  const pop = [2098157264, 13154877883, 1036183001, 1282483245, 4888783264, 2228601362, 8311123682, 1976454162, 8326097522, 1282523285, 1370794195]
  const rap = [1996494362, 13241781803, 6682665064, 7662551722, 1677006641, 6712593324, 4676818664, 2734448044, 1724212365, 2018572642]

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

  useEffect(() => {
    console.log('~~~~~~~welcome to trackback~~~~~~~~\n~~~~~~~~~~~version 1.1.2~~~~~~~~~~~\n~~a game created by Nathan Silva~~~\n~~~~~~inspired by Track Star*~~~~~~\n~~~~~powered by the Deezer API~~~~~')
  }, []);

  const match = useMatch('playlist/:id')

  const playlist = match? match.params.id: null

  return (
    <div className={`${classes.content}`}>
      <Header/>
      <Routes>
        <Route path='/playlist/:id' element={
          <GameInterface id={playlist}/>
        }/>
        <Route path='/search/:id' element={
          <GameInterface id={playlist}/>
        }/>
        <Route path='/' element={
          <div className={`${classes.body}`}>
          <h1>choose a playlist</h1>
          <PlaylistGroup playlists={pop} count={playlistCount} name={'popular pop playlists'}/>
          <PlaylistGroup playlists={teens} count={playlistCount} name={'10s throwback'}/>
          <PlaylistGroup playlists={rap} count={playlistCount} name={'popular rap playlists'}/>
          </div>
          }/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App