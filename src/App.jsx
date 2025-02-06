import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useMatch
} from "react-router-dom"
import Footer from './components/Footer';
import GameInterface from './components/GameInterface';
import MainInterface from './components/MainInterface';
import Header from './components/Header';
import classes from './App.module.scss';

function App() {
  useEffect(() => {
    console.log('~~~~~~~welcome to trackback~~~~~~~~\n~~~~~~~~~~~version 2.0.1~~~~~~~~~~~\n~~a game created by Nathan Silva~~~\n~~~~~~inspired by Track Star*~~~~~~\n~~~~~powered by the Deezer API~~~~~')
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
          <MainInterface/>
        }/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App