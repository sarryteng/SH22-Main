import React, { useEffect, useRef, useState } from 'react';
import { getSensorReadings,getPlateReadings} from '../services/getPressurePlate'; 

interface DialogProps {
  plate: string;
  
  tyrePressure: string;
}

const Dialog: React.FC<DialogProps> = ({ plate,tyrePressure }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleButtonClick = (value: string) => {
        if (value === 'cancel') {
         
          console.log('cancel button clicked');
          if (inputRef.current) {
          
            inputRef.current.value = tyrePressure;
            console.log('no Change value:', inputRef.current?.value);
            
          }
        } else if (value === 'confirm') {
          
          console.log('Changed value:', inputRef.current?.value);
          console.log('Confirm button clicked');
          const dialog = document.querySelector('dialog');
          if (dialog) {
            dialog.close();
          }
        }
      };
      
      const inputStyle={
        height:'50px',
      }

      //reading the sensor and plate data from url
      useEffect(() => {
        const url = 'http://localhost:8000/url-data?licenceplate=XYZ&sensorreadings=123';
        const sensorReadings = getSensorReadings(url);
        const plateReadings=getPlateReadings(url);
        console.log("the plate data is ",plateReadings); 
        console.log("the sensor data is ",sensorReadings); 
    
      }, []); 

    return (
        <dialog open  className="dialogContainer">
      <form method="dialog">
        <label >
        Tyre pressure:
          <input type="text" defaultValue={tyrePressure} ref={inputRef} className="dialogInput"/>
        </label>
        <div className="buttonContainer">
          <button type="button" onClick={() => handleButtonClick('cancel')} className="Dialogbutton">Cancel</button>
          <button type="button" onClick={() => handleButtonClick('confirm')} className="Dialogbutton">Confirm</button>
        </div>
      </form>
    </dialog>
    );
    
  }
  

export default Dialog;