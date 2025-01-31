import classes from './Footer.module.scss'

const Footer = () => {
    return(
        <div className={`${classes.footer}`}>
            <p>
                inspired by <a href="https://www.youtube.com/@track-star-show">Track Star*</a>
            </p>
            <p>
                powered by the <a href="https://developers.deezer.com/api">Deezer API</a>
            </p>
            <p>
                created by Nathan Silva
            </p>
            <p>
                <a href="https://github.com/ndwg/trackback">source</a>
            </p>
        </div>
    )
}

export default Footer