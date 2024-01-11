import "../../assets/styles/app.css";
import { useState, useEffect } from 'react';
import { getCarData } from "../../services/dataHandlers";
import qr from '../../assets/Images/qrcode.png'
import "@fontsource/poppins";
import "@fontsource/suez-one";
import QRCode from 'react-qr-code';


function BlackBox () {

    const [plate, setPlate] = useState<string | null >(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const url = new URL(await getCarData());
            
            const urlParams = new URLSearchParams(url.search);

            const licensePlateParam = urlParams.get('licenceplate');
            const sensorReadingsParam = urlParams.get('sensorreadings');
            
            console.log('Data fetched:', licensePlateParam, sensorReadingsParam);
            setPlate(licensePlateParam);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    
      let url = "https://www.tyre-runner.com/pressure/";

    return (
      <div className="Box">
        <div style={{height:"45px"}}/>
        
            <div className="TextBox">
                <span className="TextInBox Label"> No.Plate:  </span>
                <span className="TextInBox"> {plate} </span>
            </div>
            
            <div className="Center">
           
           {/* QRcode */} 
            <div style={{height:"30px"}} />
                <QRCode
                        size={256}
                        style={{ height: "auto", width: "80%", border: "20px solid white", backgroundColor: "white", borderRadius: "10px"}} 
                        value= {url}
                    />
            <div style={{height:"40px"}}/>

            <div className="TextInBox TextCenter">
                Scan Here<br></br>
                Check Your Pressure
            </div>
            
        </div>
        
      </div>
   

  )
}

export default BlackBox
