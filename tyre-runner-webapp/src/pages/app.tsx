import "../assets/styles/app.css";
import Header from "../components/Header";
import Select from "../components/Select";
import CRFooter from "../components/CRFooter";
import React, { useState } from 'react';
import Dialog from "../components/DialogueBox";






function App() {
  
  const [isDialogOpen, setDialogOpen] = useState(false); // show dialog or not 
  
 

 
 
  return (
    <div className="Center">
        <Header />
       
    
          
        
        
        <Select />
        <div style={{height:"300px"}}></div>
        <div className="endpage">
          <CRFooter />
        </div>
        
    </div>
  );
}

export default App;
