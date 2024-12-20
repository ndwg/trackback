import classes from './Footer.module.scss'

const Footer = () => {
    return(
        <div className={`${classes.footer}`}>
            <p>
                Inspired by <a href="https://www.youtube.com/@track-star-show">Track Star*</a>
            </p>
            <p>
                Powered by the <a href="https://developers.deezer.com/api">Deezer API</a>
            </p>
            <p>
                Created by Nathan Silva
            </p>
        </div>
    )
}

export default Footer