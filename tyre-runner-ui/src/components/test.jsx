import "../styles/app.css";

function QRcode () {
    const qrCodeSrc = 'https://cdn.discordapp.com/attachments/941167937799225345/1173755904735334482/image.png?ex=65651c5f&is=6552a75f&hm=6c12e6fe166c6b01680dc81280706403d1b43492f34a83a5829fb17073bda623&'
    
    return (
    <div className="QRcode">
      <img src={qrCodeSrc} style={{ width: '300px' }} alt="QR Code" />
    </div>
    

  )
}

export default QRcode
