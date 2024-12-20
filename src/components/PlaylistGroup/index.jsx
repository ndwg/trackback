import classes from './PlaylistGroup.module.scss'
import Playlist from '../Playlist';
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

const PlaylistGroup = ({playlists}) => {
    return(
        <div>
            <ul className={`${classes.list}`}>
                {playlists.map(playlist =>
                    <li key={`${playlist}`} className={`${classes.element}`}>
                        <Link to={`/playlist/${playlist}`}>
                            <Playlist id={playlist}/>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default PlaylistGroup