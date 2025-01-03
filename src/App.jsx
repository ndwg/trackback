import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"
import Playlist from './components/Playlist';
import PlaylistGroup from './components/PlaylistGroup';
import Footer from './components/Footer';
import GameInterface from './components/GameInterface';

function App() {
  const playlists = [3155776842, 1313621735, 1282495565, 13154877883, 13241781803, 13238299403]

  const match = useMatch('playlist/:id')

  const playlist = match? match.params.id: null

  return (
    <>
      <Routes>
        <Route path='/playlist/:id' element={
          <GameInterface id={playlist}/>
        }/>
        <Route path='/' element={
          <PlaylistGroup playlists={playlists}/>
          }/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App