// import "../styles/app.css";
import tel from '../assets/Images/tel_img.png'
import mail from '../assets/Images/mail_img.png'

function Contact () {

    return (
      <div className='contact_text'>
        <img src={tel.src} style={{ width: '25px'}} alt="phone" />
        <span style={{marginRight: '50px', marginLeft:'10px'}}>0131 358 6116</span>
        <img src={mail.src} style={{ width: '32px'}} alt="email" />
        <span style={{marginLeft: '10px'}}>hello@TyreRunner.com</span>
      </div>

  )
}

export default Contact
