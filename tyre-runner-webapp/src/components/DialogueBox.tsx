import React, { useEffect, useRef, useState } from 'react';
import { getSensorReadings,getPlateReadings} from '../services/getPressurePlate'; 


interface DialogProps {
  isOpen: boolean;
}


const dialogStyle: React.CSSProperties = {
  
  backgroundColor:'brown'
};



const Dialog: React.FC<DialogProps> = ({ isOpen }) => {
// const Dialog: React.FC = () => {
    // const [isOpen, setIsOpen] = useState(true);
    const inputRefTyre1 = useRef<HTMLInputElement | null>(null);
  const inputRefTyre2 = useRef<HTMLInputElement | null>(null);
  const inputRefTyre3 = useRef<HTMLInputElement | null>(null);
  const inputRefTyre4 = useRef<HTMLInputElement | null>(null);
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [sensorReadings, setSensorReadings] = useState('');
    const [plateReadings, setPlateReadings] = useState('');

    const [tyre1, setTyre1] = useState('');
    const [tyre2, setTyre2] = useState('');
    const [tyre3, setTyre3] = useState('');
    const [tyre4, setTyre4] = useState('');
    


    useEffect(() => {
      const fetchGeneratedUrl = async () => {
        try {
          const response = await fetch('http://localhost:8000/get-data');
          const data = await response.json();
          setGeneratedUrl(data.url);
          console.log("fetched url:"+data.url)
          const sensorData = await getSensorReadings(data.url);
          const plateData = await getPlateReadings(data.url);

          setSensorReadings(sensorData || '');  
          setPlateReadings(plateData || ''); 
        console.log("the plateReadings is ",plateReadings); 
        console.log("the sensorReadings is ",sensorData); 
        const readingsArray = sensorData?.split(',') || [];
        setTyre1(readingsArray[0] || '');
        setTyre2(readingsArray[1] || '');
        setTyre3(readingsArray[2] || '');
        setTyre4(readingsArray[3] || '');
      
        
        

        } catch (error) {
          console.error('Error fetching generated URL:', error);
        }
      };
  
      fetchGeneratedUrl();
    }, []);

    function Close(){
      isOpen=false;
  }
  

    const handleButtonClick = (value: string) => {
      if (value === 'cancel') {
        console.log('cancel button clicked');
     
  
        // Modify the value of the specific inputRef based on the condition
        if (inputRefTyre1.current) {
          inputRefTyre1.current.value = tyre1;
          console.log('no Change value for Tyre1:', inputRefTyre1.current.value);
        }else {
         
          const isInputRefTyre1Exist = !!inputRefTyre1.current; 
        }
  
        if (inputRefTyre2.current) {
          inputRefTyre2.current.value = tyre2;
          console.log('no Change value for Tyre2:', inputRefTyre2.current.value);
        }
        if (inputRefTyre3.current) {
          inputRefTyre3.current.value = tyre3;
          console.log('no Change value for Tyre3:', inputRefTyre3.current.value);
        }
  
        if (inputRefTyre4.current) {
          inputRefTyre4.current.value = tyre4;
          console.log('no Change value for Tyre4:', inputRefTyre4.current.value);
        }
  
        
      }  else if (value === 'confirm') {
        console.log('Changed values:');
        
       
        if (inputRefTyre1.current) {
          console.log('Tyre1:', inputRefTyre1.current.value);
         
        }
  
        if (inputRefTyre2.current) {
          console.log('Tyre2:', inputRefTyre2.current.value);
        }
        if (inputRefTyre3.current) {
          console.log('Tyre3:', inputRefTyre3.current.value);
        }
        if (inputRefTyre4.current) {
          console.log('Tyre4:', inputRefTyre4.current.value);
         
        }
          
        console.log('Confirm button clicked');
          const dialog = document.querySelector('dialog');
          
         
        //  const dialog= document.getElementById("myDialog");
          
        if (dialog) {
          // To show the dialog
          dialog.style.display = 'block';
        
          // To hide the dialog
          dialog.style.display = 'none';
        }
        }
      };
      
      const inputStyle={
        height:'50px',
        width:'20%',
        margin:'20px'
      }
      
    

    return (
        <dialog open={isOpen} id='myDialog' className="dialogContainer" style={{ display: isOpen ? 'block' : 'none' }} >
      <form method="dialog"  >
    <div className="labelRow" >
      <label >
        Tyre1:
        <input type="text" defaultValue={tyre1}  ref={inputRefTyre1}  className="dialogInput" style={inputStyle}  disabled={!inputRefTyre1.current}/>
      </label>

      <label>
        Tyre2:
        <input type="text" defaultValue={tyre2} ref={inputRefTyre2} className="dialogInput" style={inputStyle} disabled={!inputRefTyre2.current} />
      </label>
    </div>

    <div className="labelRow" >
      <label>
        Tyre3:
        <input type="text" defaultValue={tyre3} ref={inputRefTyre3}  className="dialogInput"  style={inputStyle} disabled={!inputRefTyre3.current}/>
      </label>

      <label>
        Tyre4:
        <input type="text" defaultValue={tyre4} ref={inputRefTyre4} className="dialogInput"  style={inputStyle} disabled={!inputRefTyre4.current} />
      </label>
    </div>

    <div className="buttonContainer">
      <button type="button" onClick={() => handleButtonClick('cancel')} className="Dialogbutton">Cancel</button>
      <button type="button" onClick={() => handleButtonClick('confirm')} className="Dialogbutton">Confirm</button>
    </div>
  </form>
    </dialog>
    );
    
  }
  

export default Dialog;