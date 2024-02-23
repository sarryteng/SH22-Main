import "../assets/styles/app.css"
import { useState, useEffect } from 'react';
import backArrow from '../assets/images/backArrow.svg'
import CarDetail from "./CarDetail";
import React from 'react';
import "../assets/styles/modal.css";
import wheel from '../assets/images/wheel.svg'
import car from '../assets/images/Car.svg'
import carNowheel from '../assets/images/carNowheel.svg'
import "@fontsource/poppins";



const View =()=> {
        const [modal, setModal] = useState<boolean>(false);
        const [name, setName] = useState<string>('');
        const [currentPressure, setCurrentPressure] = useState<string>('');
        const [recommendedPressure, setRecommendedPressure] = useState<string>('');
        const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
        const [clt, setclt] = useState<string>('');
        const [crt, setcrt] = useState<string>('');
        const [clb, setclb] = useState<string>('');
        const [crb, setcrb] = useState<string>('');
        const [rf, setrf] = useState<string>('');
        const [rr, setrr] = useState<string>('');
        const [pno, setpno] = useState<string>('');
        const [textlt, setTextlt] = useState('');
        const [textrt, setTextrt] = useState('');
        const [textlb, setTextlb] = useState('');
        const [textrb, setTextrb] = useState('');
        const [isclickedlt, setIsClickedlt] = useState(false);
        const [isclickedrt, setIsClickedrt] = useState(false);
        const [isclickedlb, setIsClickedlb] = useState(false);
        const [isclickedrb, setIsClickedrb] = useState(false);
        const[isshownlt, setIsShownlt] = useState(true);
        const[isshownrt, setIsShownrt] = useState(true);
        const[isshownlb, setIsShownlb] = useState(true);
        const[isshownrb, setIsShownrb] = useState(true);
        const [isMobile, setIsMobile] = useState<boolean>(false);
        let windowWidth = 0;

        const toggleModal = () => {
          setModal(!modal);
        }
        const newtoggleModal = () => {
          setIsClickedlb(false);
          setIsClickedrb(false);
          setIsClickedlt(false);
          setIsClickedrt(false);
          setIsShownlb(true);
          setIsShownrt(true);
          setIsShownlt(true);
          setIsShownrb(true);
          toggleModal();
        }
        useEffect(() => {
            const getQueryParams = () => {
              const queryParams = new URLSearchParams(window.location.search);
              const cltParam = queryParams.get('clt')||'';
              const crtParam = queryParams.get('crt')||'';
              const clbParam = queryParams.get('clb')||'';
              const crbParam = queryParams.get('crb')||'';
              const rfParam = queryParams.get('rf')||'';
              const rrParam = queryParams.get('rr')||'';
              const pnoParam = queryParams.get('pno')||'';
              
              setclt(cltParam);
              setcrt(crtParam);
              setclb(clbParam);
              setcrb(crbParam);
              setrf(rfParam);
              setrr(rrParam);
              setpno(pnoParam);
              
            };
            getQueryParams();

              async function yourFunction() {
                if (clt > rf) {
                  setTextlt('Higher than recommended');
                } else if (clt < rf) {
                  setTextlt('Lower than recommended');
                } else {
                  setTextlt('');
                }
              
                if (crt > rf) {
                  setTextrt('Higher than recommended');
                } else if (crt < rf) {
                  setTextrt('Lower than recommended');
                } else {
                  setTextrt('');
                }
              
                if (clb > rr) {
                  setTextlb('Higher than recommended');
                } else if (clb < rr) {
                  setTextlb('Lower than recommended');
                } else {
                  setTextlb('');
                }
              
                if (crb > rr) {
                  setTextrb('Higher than recommended');
                } else if (crb < rr) {
                  setTextrb('Lower than recommended');
                } else {
                  setTextrb('');
                }
              }
              
              yourFunction();

              if (typeof window !== 'undefined') {
                //   setWindowWidth(window.screen.width);
                windowWidth = window.screen.width;
                  setIsMobile(windowWidth < 500);
                }
        const handleResize = () => {
            windowWidth = window.screen.width;
            setIsMobile(windowWidth < 500);
            console.log("window width",windowWidth);
          };
      
          window.addEventListener('resize', handleResize);

          return () => {
            window.removeEventListener('resize', handleResize);

          };
          }, [clt, crt, clb, crb, rf, rr]);
          const showtyreLT = (event: React.MouseEvent<HTMLButtonElement>) => {
            setIsClickedlt((prevIsClicked) => !prevIsClicked);
            setName('Front-Left');
            setCurrentPressure(clt);
            setRecommendedPressure(rf);
            const buttonRect = event.currentTarget.getBoundingClientRect();
            const buttonPosition = {
              top: buttonRect.top + buttonRect.height-100,
              left: buttonRect.left + buttonRect.width-170,
            };
            setButtonPosition(buttonPosition);
            setIsShownlt(false);
            toggleModal();
          }
          const showtyreRT = (event: React.MouseEvent<HTMLButtonElement>) => {
            setIsClickedrt((prevIsClicked) => !prevIsClicked);
            setName('Front-Right');
            setCurrentPressure(crt);
            setRecommendedPressure(rf);
            const buttonRect = event.currentTarget.getBoundingClientRect();
            const buttonPosition = {
              top: buttonRect.top + buttonRect.height-100,
              left: buttonRect.left + buttonRect.width+140,
            };
            setButtonPosition(buttonPosition);
            setIsShownrt(false);
            toggleModal();
          }
          const showtyreLB = (event: React.MouseEvent<HTMLButtonElement>) => {
            setIsClickedlb((prevIsClicked) => !prevIsClicked);
            setName('Rear-Left');
            setCurrentPressure(clb);
            setRecommendedPressure(rr);
            const buttonRect = event.currentTarget.getBoundingClientRect();
            const buttonPosition = {
              top: buttonRect.top + buttonRect.height-100,
              left: buttonRect.left + buttonRect.width-170,
            };
            setButtonPosition(buttonPosition);
            setIsShownlb(false);
            toggleModal();
          }
          const showtyreRB = (event: React.MouseEvent<HTMLButtonElement>) => {
            setIsClickedrb((prevIsClicked) => !prevIsClicked);
            setName('Rear-Right');
            setCurrentPressure(crb);
            setRecommendedPressure(rr);
            const buttonRect = event.currentTarget.getBoundingClientRect();
            const buttonPosition = {
              top: buttonRect.top + buttonRect.height-100,
              left: buttonRect.left + buttonRect.width+140,
            };
            setButtonPosition(buttonPosition);
            setIsShownrb(false);
            toggleModal();
          }
          const handleBack = () => {
    
            // window.location.href = `/`;
            window.location.href = `/url-data?licenseplate=${pno}&sensorreadings=${clt},${crt},${clb},${crb}`;
          };
    return (
        <div className="View">
          {isMobile ?(<div>
                <div className='Center'>
                <div className='text'>Click the tyre for pressure details.</div>
                <img src={carNowheel.src} style={{ width: '40%', marginTop:"50px", zIndex:"2"}}alt="car" />
                <img src={wheel.src} className={isclickedlt ? 'clicked':'unclick'} style={{top:"41%", left:"31.7%"}}alt="wheellt"></img>
                <img src={wheel.src} className={isclickedrt ? 'clicked':'unclick'} style={{top:"41%", left:"68.2%"}}alt="wheelrt"></img>
                <img src={wheel.src} className={isclickedlb ? 'clicked':'unclick'} style={{top:"82%", left:"31.7%"}}alt="wheellb"></img>
                <img src={wheel.src} className={isclickedrb ? 'clicked':'unclick'} style={{top:"82%", left:"68.2%"}}alt="wheelrb"></img>

                <div className={isshownlt ? 'OptimalWarn' : 'HideWarn'} style={{top:"30%", left:"20%"}}>
                    {textlt}
                </div>
                <div className={isshownrt ? 'OptimalWarn' : 'HideWarn'} style={{top:"30%", left:"80%"}}>
                    {textrt}
                </div>
                <div className={isshownlb ? 'OptimalWarn' : 'HideWarn'} style={{top:"70%", left:"20%"}}>
                    {textlb}
                </div>
                <div className={isshownrb ? 'OptimalWarn' : 'HideWarn'} style={{top:"70%", left:"80%"}}>
                    {textrb}
                </div>
                <button className="WheelButton" style={{top:"41%", left:"31.7%"}}onClick={showtyreLT}>
                tl
                </button>
                <button className="WheelButton" style={{top:"41%", left:"68.2%"}}onClick={showtyreRT}>
                    tr
                </button>
                <button className="WheelButton" style={{top:"82%", left:"31.7%"}}onClick={showtyreLB}>
                    bl
                </button>
                <button className="WheelButton" style={{top:"82%", left:"68.2%"}}onClick={showtyreRB}>
                    br
                </button>
                {modal && (
                     <div className="modal" style={{zIndex:"4"}} onClick={newtoggleModal}>
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
                <button onClick={handleBack} className="BackButton">
                <img src={backArrow.src} style={{ width: '80%', position:"absolute", transform:"translate(-50%, -50%)",top:"50%", left:"50%"}}alt="back" />
                </button></div>):(
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                  <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                      <img src={car.src} style={{ width: '40%',maxHeight:"500px", marginTop:"50px", zIndex:"2"}}alt="car" />
                  </div> 
                  <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                  <CarDetail/>
                <button onClick={handleBack} className="BackButtonpc" style={{zIndex:"3"}}>
                <img src={backArrow.src} style={{ width: '20%', position:"absolute", transform:"translate(-50%, -50%)",top:"50%", left:"50%"}}alt="back" />
                </button>
                </div>
                <div style={{zIndex:"2", width:"100%", height:"100%", position:"absolute"}}>
                         <div className="modalContent" style={{top:"31%", left:"12%", width:'15%', height:'15%'}}>
                             <p>Tyre-Pressure: Front left</p>
                             <p>Currently: {clt}</p> 
                             <p>Recommended: {rf}</p>
                         </div>
                         </div>
                         <div style={{zIndex:"2", width:"100%", height:"100%", position:"absolute"}}>
                         <div className="modalContent" style={{top:"31%", left:"38%", width:'15%', height:'15%'}}>
                             <p>Tyre-Pressure: Front right</p>
                             <p>Currently: {crt}</p> 
                             <p>Recommended: {rf}</p>
                         </div>
                         </div>
                         <div style={{zIndex:"2", width:"100%", height:"100%", position:"absolute"}}>
                         <div className="modalContent" style={{top:"75%", left:"12%", width:'15%', height:'15%'}}>
                             <p>Tyre-Pressure: Rear left</p>
                             <p>Currently: {clb}</p> 
                             <p>Recommended: {rr}</p>
                         </div>
                         </div>
                         <div style={{zIndex:"2", width:"100%", height:"100%", position:"absolute"}}>
                         <div className="modalContent" style={{top:"75%", left:"38%", width:'15%', height:'15%'}}>
                             <p>Tyre-Pressure: Rear right</p>
                             <p>Currently: {crb}</p> 
                             <p>Recommended: {rr}</p>
                         </div>
                         </div>
                  </div>
                )}
        </div>
    )
}

export default View