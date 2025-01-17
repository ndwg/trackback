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
  const teens = [5922972724, 7662551722, 6200785264, 2159765062, 745674991]
  const aughts = [248297032, 9341070582, 5714797982, 4135818362, 5782150322]
  const nineties = [8311123682, 1724212365, 1728093421, 4135981802, 1950632062]
  const eighties = [8512471762, 5172233424, 8621268482, 1294679255, 1276784581]

  var playlistCount = 1;

  if(window.matchMedia("(min-width: 670px)").matches) playlistCount = 2;
  if(window.matchMedia("(min-width: 940px)").matches) playlistCount = 3;
  if(window.matchMedia("(min-width: 1200px)").matches) playlistCount = 4;

  const match = useMatch('playlist/:id')

  const playlist = match? match.params.id: null

  return (
    <div className={`${classes.content}`}>
      <Header/>
      <Routes>
        <Route path='/playlist/:id' element={
          <GameInterface id={playlist}/>
        }/>
        <Route path='/' element={
          <>
          <h1>choose a playlist</h1>
          <PlaylistGroup playlists={decades} count={playlistCount}/>
          <PlaylistGroup playlists={teens} count={playlistCount}/>
          <PlaylistGroup playlists={aughts} count={playlistCount}/>
          </>
          }/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App