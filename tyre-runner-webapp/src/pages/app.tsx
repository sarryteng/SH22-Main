// import QRcode from "./QRCodeBox/test.tsx";
// import BlackBox from "../components/QRCodeBox/box.tsx";
import "../assets/styles/app.css";
// import logo from '../assets/Images/logo_transparent.png'
// import Contact from "../components/contact.tsx";
import { useEffect } from 'react';
import Header from "../components/Header";
import Select from "../components/Select";
import CRFooter from "../components/CRFooter";
import React, { useState } from 'react';
import Dialog from "../components/DialogueBox";





function App() {
  
  const [isDialogOpen, setDialogOpen] = useState(false); // show dialog or not 
  const handleButtonClick = () => {
    setDialogOpen(true);
    console.log("showed")
  };

 
 
  return (
    <div className="Center">
        <Header />
        <div>
        {isDialogOpen && <Dialog isOpen={isDialogOpen} />}
          <button onClick={handleButtonClick} style={{width:'150px',height:'50px',backgroundColor:'red',color:'white',fontSize:'large'}}>show pressure</button>

          
        </div>
        
        <Select />
        
        <div className="endpage">
          <CRFooter />
        </div>
        
    </div>
  );
}

export default App;
