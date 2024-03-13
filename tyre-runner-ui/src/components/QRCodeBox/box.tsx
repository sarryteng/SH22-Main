import "../../assets/styles/app.css";
import { useState, useEffect } from 'react';
import { getCarData } from "../../services/dataHandlers";
import "@fontsource/poppins";
import "@fontsource/suez-one";
import QRCode from 'react-qr-code';


function BlackBox () {

    const [plate, setPlate] = useState<string | null >(null);
    const [QRUrl, setQRUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            let carData = await getCarData();
            let fetchedUrl=carData.url;
            setQRUrl(fetchedUrl.toString());
            // const url = new URL(fetchedUrl);
            console.log(fetchedUrl);
            // const urlParams = new URLSearchParams(url.search);

            const licensePlateParam = carData.registration_plate;
            // const sensorReadingsParam = urlParams.get('sensorreadings');
            
            // console.log('Data fetched:', licensePlateParam, sensorReadingsParam);
            setPlate(licensePlateParam);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);


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
              { QRUrl &&  ( <QRCode
                        size={256}
                        style={{ height: "auto", width: "80%", border: "20px solid white", backgroundColor: "white", borderRadius: "10px"}} 
                        value= {QRUrl}
                    /> ) }
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
