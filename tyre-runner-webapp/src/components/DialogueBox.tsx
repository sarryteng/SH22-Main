import React, { useEffect, useRef, useState } from 'react';
import { getSensorReadings, getPlateReadings } from '../services/getPressurePlate';


interface DialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tyreIndex: number;
  setTyreIndex:React.Dispatch<React.SetStateAction<number>>;



}

function Dialog(props: DialogProps) {
  // const Dialog: React.FC<DialogProps> = ({ isOpen }) => {
  const tyreIndex = props.tyreIndex; //get the index of tyre which need to show pressure detail
  const isOpen = props.isOpen;
  const setIsOpen = props.setIsOpen;
  const setTyreIndex=props.setTyreIndex;
  setIsOpen(props.isOpen)
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

  const dialogs = [
   
    { tyrename: "tyre left-front", tyrecontent: tyre1, position: { top: '20%', left: '3%' } ,ref:inputRefTyre1},
    { tyrename: "tyre right-front", tyrecontent: tyre2, position: { top: '20%', left: '52%' } ,ref:inputRefTyre2},
    { tyrename: "tyre left-rear", tyrecontent: tyre3, position: { top: '50%', left: '3%' } ,ref:inputRefTyre3},
    { tyrename: "tyre right-rear", tyrecontent: tyre4, position: { top: '50%', left: '52%' } ,ref:inputRefTyre4},
  ];




  useEffect(() => {
    console.log("tyre index", tyreIndex)

    const fetchGeneratedUrl = async () => {

      try {
        // const response = await fetch('http://localhost:8000/get-data');
        // const data = await response.json();
        // setGeneratedUrl(data.url);
        // console.log("fetched url:" + data.url)
        // const sensorData = await getSensorReadings(data.url);
        // const plateData = await getPlateReadings(data.url);

        // setSensorReadings(sensorData || '');
        // setPlateReadings(plateData || '');
        // console.log("the plateReadings is ", plateReadings);
        // console.log("the sensorReadings is ", sensorData);
        // const readingsArray = sensorData?.split(',') || [];
        // setTyre1(readingsArray[0] || '');
        // setTyre2(readingsArray[1] || '');
        // setTyre3(readingsArray[2] || '');
        // setTyre4(readingsArray[3] || '');




      } catch (error) {
        console.error('Error fetching generated URL:', error);
      }
    };


    fetchGeneratedUrl();


  }, []);



  const handleButtonClick = (value: string) => {
    if (value === 'cancel') {
      console.log('cancel button clicked');
      
      DialogClose();


      // Modify the value of the specific inputRef based on the condition
      if (inputRefTyre1.current) {
        inputRefTyre1.current.value = tyre1;
        console.log('no Change value for Tyre1:', inputRefTyre1.current.value);
      } else {

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


    } else if (value === 'confirm') {
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
      
      DialogClose();
    }
  };

  function DialogClose() {
    setTyreIndex(-1);//close the dialog
    setIsOpen(!isOpen)
  };

  



  return (
    <div>
      {dialogs.map((dialog, i) => (
        <div key={i} style={{ display: tyreIndex === i + 1 ? 'block' : 'none', position: 'absolute', ...dialog.position, width: '45%',backgroundColor:"white" }} className='dialogContainer'>
          
          <form style={{display: "flex", flexDirection: "column", justifyContent: "center"  }}>
          
           
           <div className='CarDetailHead'>
            <div className='DetailText'>pressure</div>
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
              
            
              <label style={{margin:"10%",width:"80%",height:"60%",}}>{dialog.tyrename}: <input type='text' defaultValue={dialog.tyrecontent} ref={dialog.ref} style={{width:"50%",outline:"1px solid", borderRadius:"10px"}}  className="dialogInput" ></input></label>
              
              </div>
            </form>


          <div className="buttonContainer">
            <button type="button" style={{borderRadius:"30px",boxShadow:"0 2px 4px 0 rgba(0, 0, 0, 0.25)"}} onClick={() => handleButtonClick('cancel')} className="Dialogbutton">Cancel</button>
            <button type="button" style={{borderRadius:"30px",boxShadow:"0 2px 4px 0 rgba(0, 0, 0, 0.25)"}} onClick={() => handleButtonClick('confirm')} className="Dialogbutton">Confirm</button>
          </div>
        </div>

      ))}
    </div>






  );

}


export default Dialog;