import React, { useState, useEffect } from 'react';
import BlackBox from "./QRCodeBox/box.tsx";
import "../assets/styles/app.css";
import logo from '../assets/Images/logo_transparent.png';
import LoadingPage from './loading.tsx';
import Contact from "./contact.tsx";
import { getCarData } from '../services/dataHandlers.ts'; 

function App() {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const carData = await getCarData();
        if (carData.vehicleDetected==false) {
          console.log(carData.vehicleDetected);

          setLoading(true); 
        }
        else{
          setData(carData); 
          setLoading(false); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    };

    fetchData(); 
    
    const intervalId = setInterval(fetchData, 15000);//interval is 15s

   
    return () => clearInterval(intervalId);
  }, []); 

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="Center">
      <img src={logo.src} style={{ width: '630px'}} alt="logo" />
      <div className="QuoteText">Check Your Pressure</div>
      <div style={{height:'100px'}}/>
      <BlackBox />
      <div style={{height:'300px'}}/>
      <Contact />
    </div>
  );
}

export default App;
