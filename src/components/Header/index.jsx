import classes from './Header.module.scss'
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
import { IoMusicalNote } from "react-icons/io5";

const Header = () => {
    return(
        <div className={`${classes.header}`}>
            <Link className={`${classes.text}`} to="/"><IoMusicalNote />trackback</Link>
        </div>
    )
}

export default Header