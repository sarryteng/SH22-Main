import React, { useEffect, useRef, useState } from 'react';

interface DialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tyreIndex: number;
  setTyreIndex:React.Dispatch<React.SetStateAction<number>>;
  tyre1:string;
  setTyre1:React.Dispatch<React.SetStateAction<string>>;
  tyre2:string;
  setTyre2:React.Dispatch<React.SetStateAction<string>>;
  tyre3:string;
  setTyre3:React.Dispatch<React.SetStateAction<string>>;
  tyre4:string;
  setTyre4:React.Dispatch<React.SetStateAction<string>>;
}

function Dialog(props: DialogProps) {
  const tyreIndex = props.tyreIndex; //get the index of tyre which need to show pressure detail
  const isOpen = props.isOpen;
  const setIsOpen = props.setIsOpen;
  const setTyreIndex=props.setTyreIndex;
  const tyre1=props.tyre1;
  const tyre2=props.tyre2;
  const tyre3=props.tyre3;
  const tyre4=props.tyre4;
  const setTyre1=props.setTyre1;
  const setTyre2=props.setTyre2;
  const setTyre3=props.setTyre3;
  const setTyre4=props.setTyre4;
  const inputRefTyre1 = useRef<HTMLInputElement | null>(null);
  const inputRefTyre2 = useRef<HTMLInputElement | null>(null);
  const inputRefTyre3 = useRef<HTMLInputElement | null>(null);
  const inputRefTyre4 = useRef<HTMLInputElement | null>(null);

  setIsOpen(props.isOpen)

  const dialogs = [
    { tyrename: "tyre left-front", tyrecontent: tyre1, position: { top: '20%', left: '3%' } ,ref:inputRefTyre1},
    { tyrename: "tyre right-front", tyrecontent: tyre2, position: { top: '20%', left: '52%' } ,ref:inputRefTyre2},
    { tyrename: "tyre left-rear", tyrecontent: tyre3, position: { top: '50%', left: '3%' } ,ref:inputRefTyre3},
    { tyrename: "tyre right-rear", tyrecontent: tyre4, position: { top: '50%', left: '52%' } ,ref:inputRefTyre4},
  ];

  useEffect(() => {
    console.log("tyre index", tyreIndex)
  }, []);

  const handleButtonClick = (value: string) => {
    if (value === 'cancel') {
      console.log('canceled');
      DialogClose();
    } 
    else if (value === 'confirm') {
      if (inputRefTyre1.current) {
        console.log('Tyre1:', inputRefTyre1.current.value);
        setTyre1(inputRefTyre1.current.value);
      }
      if (inputRefTyre2.current) {
        console.log('Tyre2:', inputRefTyre2.current.value);
        setTyre2(inputRefTyre2.current.value);
      }
      if (inputRefTyre3.current) {
        console.log('Tyre3:', inputRefTyre3.current.value);
        setTyre3(inputRefTyre3.current.value);
      }
      if (inputRefTyre4.current) {
        console.log('Tyre4:', inputRefTyre4.current.value);
        setTyre4(inputRefTyre4.current.value);
      }
      console.log('Confirmed');
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
              <div className='DetailText' style={{paddingBottom:"10px"}}>pressure</div>
            </div>
            <div style={{display:"flex",justifyContent:"center"}}> 
              <label style={{margin:"10%",width:"80%",height:"60%",}}>{dialog.tyrename}: <input type='text' defaultValue={dialog.tyrecontent} ref={dialog.ref} style={{width:"50%",outline:"1px solid", borderRadius:"10px"}}  className="dialogInput" >
                </input>
              </label> 
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