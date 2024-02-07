import logo from '../assets/images/logo_transparent.png'
import "../assets/styles/app.css";

function Header () {

    return (
        <nav className="Header">
                <a href='/' className='Center'>
                    <img src={logo.src} style={{ width: '430px'}}alt="logo" />
                </a>        
        </nav>
    )
}

export default Header