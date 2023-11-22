import "../../assets/styles/app.css";
import qr from '../../assets/Images/qrcode.png'
import "@fontsource/poppins";
import "@fontsource/suez-one";

// import car from '../../public/Car.svg'

function BlackBox () {

    return (
      <div className="Box">
        <div style={{height:"45px"}}/>
        <div className="Center">
            <div className="grid-container">
                <div className="grid-item">
                    <div className="TextInBox">
                    No. Plate: 
                    </div>
                </div>
                <div className="grid-item">
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
            <div style={{height:"40px"}}/>
                <img src={qr.src} style={{ width: '471.575px'}} alt="QR Code" />
                <div style={{height:"20px"}}/>
            <div className="TextInBox">
                Scan Here<br></br>
                Check Your Pressure
            </div>
        </div>
        
      </div>
   
    

  )
}

export default BlackBox
