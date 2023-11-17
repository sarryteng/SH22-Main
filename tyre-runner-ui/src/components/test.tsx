import "../styles/app.css";
import qr from '../../public/qrcode.png'
import car from '../../public/Car.svg'

function QRcode () {
    // const qrCodeSrc = 'https://cdn.discordapp.com/attachments/941167937799225345/1173755904735334482/image.png?ex=65651c5f&is=6552a75f&hm=6c12e6fe166c6b01680dc81280706403d1b43492f34a83a5829fb17073bda623&'

    return (
      <div>
         <div className="Center">
      <img src={qr.src} style={{ width: '300px' }} alt="QR Code" />
    </div>
    <div className="Center">
      <img src={car.src} style={{ width: '300px' }} alt="QR Code" />
    </div>
      </div>
   
    

  )
}

export default QRcode
