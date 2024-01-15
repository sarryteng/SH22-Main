import "../assets/styles/app.css"
import { useState, useEffect } from 'react';
import car from '../assets/images/Car.svg'
import CarDetail from "./CarDetail";
import React from 'react';



const View =()=> {
        // State to store the values of size and load
        const [size, setSize] = useState<string>('');
        const [load, setLoad] = useState<string>('');
        useEffect(() => {
            // Function to parse the query parameters from the URL
            const getQueryParams = () => {
              const queryParams = new URLSearchParams(window.location.search);
              const sizeParam = queryParams.get('size')||'';
              const loadParam = queryParams.get('load')||'';
              
              // Update state with the values
              setSize(sizeParam);
              setLoad(loadParam);
            };
        
            // Call the function when the component mounts
            getQueryParams();
          }, []);

          const showtireLT = () => {
            console.log("LT");
            console.log("Size:"+size);
            console.log("Load:"+load);
          }
          const showtireRT = () => {
            console.log("RT");
            console.log("Size:"+size);
            console.log("Load:"+load);
          }
          const showtireLB = () => {
            console.log("LB");
            console.log("Size:"+size);
            console.log("Load:"+load);
          }
          const showtireRB = () => {
            console.log("RB");
            console.log("Size:"+size);
            console.log("Load:"+load);
          }
          const showtireAll = () => {
            showtireLT();
            showtireRT();
            showtireLB();
            showtireRB();
          }
    return (
        <div className="View">
                {/* <h1>view</h1>
                <p>Size: {size}</p>
                <p>Load: {load}</p> */}
                <div className='Center'>
                <div className='text'>Click the tire for pressure details or the car’s body to view all.</div>
                <img src={car.src} style={{ width: '40%', marginTop:"50px"}}alt="car" />
                <button style={{opacity:"0.5", position:"absolute", top:"40%", left:"32%", transform:"translate(-50%,-50%)", width:"3%", height:"10%"}}onClick={showtireLT}>
                top-left
                </button>
                <button style={{opacity:"0.5", position:"absolute", top:"40%", left:"68%", transform:"translate(-50%,-50%)", width:"3%", height:"10%"}}onClick={showtireRT}>
                    top-right
                </button>
                <button style={{opacity:"0.5", position:"absolute", top:"81%", left:"32%", transform:"translate(-50%,-50%)", width:"3%", height:"10%"}}onClick={showtireLB}>
                    buttom-left
                </button>
                <button style={{opacity:"0.5", position:"absolute", top:"81%", left:"68%", transform:"translate(-50%,-50%)", width:"3%", height:"10%"}}onClick={showtireRB}>
                    buttom-right
                </button>
                <button style={{opacity:"0.5", position:"absolute", top:"60%", left:"50%", transform:"translate(-50%,-50%)", width:"32%", height:"65%"}}onClick={showtireAll}>
                    All
                </button>
                </div>
                <CarDetail/>
        </div>
    )
}

export default View