import "../assets/styles/app.css"
import { useState, useEffect } from 'react';
import car from '../assets/images/Car.svg'
import backArrow from '../assets/images/backArrow.svg'
import CarDetail from "./CarDetail";
import React from 'react';
import "../assets/styles/modal.css";



const View =()=> {
        const [size, setSize] = useState<string>('');
        const [load, setLoad] = useState<string>('');
        const [modal, setModal] = useState<boolean>(false);
        const [name, setName] = useState<string>('');
        const [currentPressure, setCurrentPressure] = useState<string>('');
        const [recommendedPressure, setRecommendedPressure] = useState<string>('');
        const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });


        const toggleModal = () => {
          
          setModal(!modal);
        }
        useEffect(() => {
            const getQueryParams = () => {
              const queryParams = new URLSearchParams(window.location.search);
              const sizeParam = queryParams.get('size')||'';
              const loadParam = queryParams.get('load')||'';
              
              setSize(sizeParam);
              setLoad(loadParam);
            };
        
            getQueryParams();
          }, []);
          const showtireLT = (event: React.MouseEvent<HTMLButtonElement>) => {
            setName('Top-Left');
            setCurrentPressure('10');
            setRecommendedPressure('10');
            const buttonRect = event.currentTarget.getBoundingClientRect();
            const buttonPosition = {
              top: buttonRect.top + buttonRect.height-100,
              left: buttonRect.left + buttonRect.width-170,
            };
            console.log(buttonPosition);
            setButtonPosition(buttonPosition);
            toggleModal();
          }
          const showtireRT = (event: React.MouseEvent<HTMLButtonElement>) => {
            setName('Top-Right');
            setCurrentPressure('20');
            setRecommendedPressure('20');
            const buttonRect = event.currentTarget.getBoundingClientRect();
            const buttonPosition = {
              top: buttonRect.top + buttonRect.height-100,
              left: buttonRect.left + buttonRect.width+140,
            };
            console.log(buttonPosition);
            setButtonPosition(buttonPosition);
            toggleModal();
          }
          const showtireLB = (event: React.MouseEvent<HTMLButtonElement>) => {
            setName('Buttom-Left');
            setCurrentPressure('30');
            setRecommendedPressure('30');
            const buttonRect = event.currentTarget.getBoundingClientRect();
            const buttonPosition = {
              top: buttonRect.top + buttonRect.height-100,
              left: buttonRect.left + buttonRect.width-170,
            };
            console.log(buttonPosition);
            setButtonPosition(buttonPosition);
            toggleModal();
          }
          const showtireRB = (event: React.MouseEvent<HTMLButtonElement>) => {
            setName('Buttom-Right');
            setCurrentPressure('40');
            setRecommendedPressure('40');
            const buttonRect = event.currentTarget.getBoundingClientRect();
            const buttonPosition = {
              top: buttonRect.top + buttonRect.height-100,
              left: buttonRect.left + buttonRect.width+140,
            };
            console.log(buttonPosition);
            setButtonPosition(buttonPosition);
            toggleModal();
          }
          const handleBack = () => {
    
            window.location.href = `/`;
        };
    return (
        <div className="View">
                <div className='Center'>
                <div className='text'>Click the tire for pressure details.</div>
                <img src={car.src} style={{ width: '40%', marginTop:"50px"}}alt="car" />
                <button style={{opacity:"0", position:"absolute", top:"40%", left:"32%", transform:"translate(-50%,-50%)", width:"3%", height:"10%"}}onClick={showtireLT}>
                top-left
                </button>
                <button style={{opacity:"0", position:"absolute", top:"40%", left:"68%", transform:"translate(-50%,-50%)", width:"3%", height:"10%"}}onClick={showtireRT}>
                    top-right
                </button>
                <button style={{opacity:"0", position:"absolute", top:"81%", left:"32%", transform:"translate(-50%,-50%)", width:"3%", height:"10%"}}onClick={showtireLB}>
                    buttom-left
                </button>
                <button style={{opacity:"0", position:"absolute", top:"81%", left:"68%", transform:"translate(-50%,-50%)", width:"3%", height:"10%"}}onClick={showtireRB}>
                    buttom-right
                </button>
                {modal && (
                     <div className="modal" onClick={toggleModal}>
                         <div className="modalContent" style={{top: buttonPosition.top, left: buttonPosition.left}}>
                             <p>Tyre-Pressure: {name}</p>
                             <p>Currently: {currentPressure}</p> 
                             <p>Recommended: {recommendedPressure}</p>
                             <div className="modalClose">
                              <button onClick={toggleModal} className="modalButton">Close</button>
                             </div>
                         </div>
                 </div>
                )}
                </div>
                <CarDetail/>
                <button onClick={handleBack} style={{position:"absolute", top:"91%", left:"80%", transform:"translate(-50%,-50%)", width:"10%", height:"18%", borderRadius:"30px",filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"}}>
                <img src={backArrow.src} style={{ width: '80%'}}alt="back" />
                </button>
        </div>
    )
}

export default View