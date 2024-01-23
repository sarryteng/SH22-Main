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


const pressure = 'pressure';//the data to test dialogueBox
const plate = 'ABC';//the data to test dialogueBox


function App() {
  


 
  return (
    <div className="Center">
        <Header />
        <Dialog   tyrePressure={pressure} plate={plate} />//test the dialogueBox at here
        <Select />
        
        <div className="endpage">
          <CRFooter />
        </div>
        
    </div>
  );
}

export default App;
