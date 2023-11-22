import "../../assets/styles/app.css";
import qr from '../../assets/Images/qrcode.png'
import "@fontsource/poppins";
import "@fontsource/suez-one";

// import car from '../../public/Car.svg'

function BlackBox () {

    return (
      <div className="Box">
        <div className="Center">
            <br></br>
            <br></br>
            <div class="grid-container">
                <div class="grid-item">
                    <div className="TextInBox">
                    No. Plate: 
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
            <br></br>
            <br></br>
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
