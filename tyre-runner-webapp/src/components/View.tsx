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
        const [clt, setclt] = useState<string>('');
        const [crt, setcrt] = useState<string>('');
        const [clb, setclb] = useState<string>('');
        const [crb, setcrb] = useState<string>('');
        const [rlt, setrlt] = useState<string>('');
        const [rrt, setrrt] = useState<string>('');
        const [rlb, setrlb] = useState<string>('');
        const [rrb, setrrb] = useState<string>('');


        const toggleModal = () => {
          
          setModal(!modal);
        }
        useEffect(() => {
            const getQueryParams = () => {
              const queryParams = new URLSearchParams(window.location.search);
              const sizeParam = queryParams.get('size')||'';
              const loadParam = queryParams.get('load')||'';
              const cltParam = queryParams.get('clt')||'';
              const crtParam = queryParams.get('crt')||'';
              const clbParam = queryParams.get('clb')||'';
              const crbParam = queryParams.get('crb')||'';
              const rltParam = queryParams.get('rlt')||'';
              const rrtParam = queryParams.get('rrt')||'';
              const rlbParam = queryParams.get('rlb')||'';
              const rrbParam = queryParams.get('rrb')||'';
              
              setSize(sizeParam);
              setLoad(loadParam);
              setclt(cltParam);
              setcrt(crtParam);
              setclb(clbParam);
              setcrb(crbParam);
              setrlt(rltParam);
              setrrt(rrtParam);
              setrlb(rlbParam);
              setrrb(rrbParam);
            };
        
            getQueryParams();
          }, []);
          const showtyreLT = (event: React.MouseEvent<HTMLButtonElement>) => {
            setName('Top-Left');
            setCurrentPressure(clt);
            setRecommendedPressure(rlt);
            const buttonRect = event.currentTarget.getBoundingClientRect();
            const buttonPosition = {
              top: buttonRect.top + buttonRect.height-100,
              left: buttonRect.left + buttonRect.width-170,
            };
            setButtonPosition(buttonPosition);
            toggleModal();
          }
          const showtyreRT = (event: React.MouseEvent<HTMLButtonElement>) => {
            setName('Top-Right');
            setCurrentPressure(crt);
            setRecommendedPressure(rrt);
            const buttonRect = event.currentTarget.getBoundingClientRect();
            const buttonPosition = {
              top: buttonRect.top + buttonRect.height-100,
              left: buttonRect.left + buttonRect.width+140,
            };
            setButtonPosition(buttonPosition);
            toggleModal();
          }
          const showtyreLB = (event: React.MouseEvent<HTMLButtonElement>) => {
            setName('Buttom-Left');
            setCurrentPressure(clb);
            setRecommendedPressure(rlb);
            const buttonRect = event.currentTarget.getBoundingClientRect();
            const buttonPosition = {
              top: buttonRect.top + buttonRect.height-100,
              left: buttonRect.left + buttonRect.width-170,
            };
            setButtonPosition(buttonPosition);
            toggleModal();
          }
          const showtyreRB = (event: React.MouseEvent<HTMLButtonElement>) => {
            setName('Buttom-Right');
            setCurrentPressure(crb);
            setRecommendedPressure(rrb);
            const buttonRect = event.currentTarget.getBoundingClientRect();
            const buttonPosition = {
              top: buttonRect.top + buttonRect.height-100,
              left: buttonRect.left + buttonRect.width+140,
            };
            setButtonPosition(buttonPosition);
            toggleModal();
          }
          const handleBack = () => {
    
            window.location.href = `/`;
        };
    return (
        <div className="View">
                <div className='Center'>
                <div className='text'>Click the tyre for pressure details.</div>
                <img src={car.src} style={{ width: '40%', marginTop:"50px"}}alt="car" />     
                <button style={{opacity:"0", position:"absolute", top:"40%", left:"32%", transform:"translate(-50%,-50%)", width:"3%", height:"10%"}}onClick={showtyreLT}>
                top-left
                </button>
                <button style={{opacity:"0", position:"absolute", top:"40%", left:"68%", transform:"translate(-50%,-50%)", width:"3%", height:"10%"}}onClick={showtyreRT}>
                    top-right
                </button>
                <button style={{opacity:"0", position:"absolute", top:"81%", left:"32%", transform:"translate(-50%,-50%)", width:"3%", height:"10%"}}onClick={showtyreLB}>
                    buttom-left
                </button>
                <button style={{opacity:"0", position:"absolute", top:"81%", left:"68%", transform:"translate(-50%,-50%)", width:"3%", height:"10%"}}onClick={showtyreRB}>
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
                <button onClick={handleBack} style={{position:"absolute", top:"90%", left:"80%", transform:"translate(-50%,-50%)", width:"10%", height:"20%", borderRadius:"30px",filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"}}>
                <img src={backArrow.src} style={{ width: '80%'}}alt="back" />
                </button>
        </div>
    )
}

export default View