import "../styles/app.css";
import qr from '../../public/qrcode.png'
// import car from '../../public/Car.svg'

function BlackBox () {

    return (
      <div className="Box">
        <div className="Center">
            <div class="grid-container">
                <div class="grid-item">
                    <div className="TextInBox">

                    NO. Plate: 
                    </div>
                </div>
                <div class="grid-item">
                    <div className="TextInBox">

                    1234 
                    </div>
                </div>
                {/* <div class="grid-item">
                    <div className="TextInBox">

                    Car Model: 
                    </div>
                </div>
                <div class="grid-item">
                    <div className="TextInBox">

                    Honda Civic
                    </div>
                </div> */}
            </div>
                <img src={qr.src} style={{ width: '471.575px'}} alt="QR Code" />
            <div className="TextInBox">
                Scan Here<br></br>
                Check Your Pressure
            </div>
        </div>
        
      </div>
   
    

  )
}

export default BlackBox
