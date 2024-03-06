import logo from '../assets/images/logo_transparent.png'
import "../assets/styles/app.css";

function Header () {

    return (
        <nav className="Header">
                <a href='/' className='HeaderLogo'>
                    <img src={logo.src} className="HeaderImg" alt="logo" />
                </a>        
        </nav>
    )
}

export default Header