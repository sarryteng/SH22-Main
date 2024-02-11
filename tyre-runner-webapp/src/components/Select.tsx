import car from '../assets/images/Car.svg'
import "../assets/styles/app.css"
import { useState, useEffect, useReducer } from 'react';
import LoadRadio from './LoadRadio';
import SizeDropDown from './SizeDropDown';
import "@fontsource/poppins";
import Dialog from "../components/DialogueBox";
import wheel from '../assets/images/wheel.svg'
import carNowheel from '../assets/images/carNowheel.svg'
import { tyreReducer, initialTyreState } from '../reducers/tyreReducer';
import { navigate } from 'astro:transitions/client';




//Run: http://localhost:8080/url-data?licenseplate=AO12XZP&sensorreadings=30,32,28,31

//API: http://127.0.0.1:6767/tyre-data/{platenumber}
//Example: http://127.0.0.1:6767/tyre-data/AO12XZP

//{"dataSource":"N/A","dateTimeSaved":"2023-11-11T20:34:19.907","make":"AUDI","model":"A6 ALLROAD TDI QUATTRO A",
//"tyreOptionsWithPressure":[
    //{"loadIndex":"100","pressure":{"bar":2.3,"laden":{},"psi":33},"ratio":55,"rim":18,"speedIndex":"Y","tyreType":"FRONT","width":235},
    //{"loadIndex":"100","pressure":{"bar":2.1,"laden":{},"psi":30},"ratio":55,"rim":18,"speedIndex":"Y","tyreType":"REAR","width":235}],
//"vrm":"AO12XZP"}

//Use PSI units
//a common tire size format is expressed as something like "235/55R18," where:
    // 235 = width
    // 55 = ratio
    // R18 = rim

function Select () {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [selectedSizeValue, setSelectedSizeValue] = useState<string | undefined>(undefined);
    const [mno, setmno] = useState<string>('');
    const [rf, setrf] = useState<string>('');
    const [rr, setrr] = useState<string>('');
    const [isclickedlt, setIsClickedlt] = useState(false);
    const [isclickedrt, setIsClickedrt] = useState(false);
    const [isclickedlb, setIsClickedlb] = useState(false);
    const [isclickedrb, setIsClickedrb] = useState(false);
    const [state, dispatch] = useReducer(tyreReducer, initialTyreState);

    useEffect(() => {

        dispatch({ type: 'fetchTyreState' });

        // async function fetchdata() {
        //     try {
        //         const response = await fetch(`http://127.0.0.1:6767/tyre-data/${pno}`);
        //         const result = await response.json();
        //         setmno(result.data.make+' '+result.data.model);
        //         console.log(result.data.make+' '+result.data.model);
        //     } catch (error) {
        //         console.error('Error occurred:', error);
        //     }
        // }
        // fetchdata();
          }, [state.plateNumber]);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };
    
    const handleSelect = (value: string) => {
        setSelectedSizeValue(value);
        handletest();
    };
    
    const handletest = () => {
        setrf('20');
        setrr('21');
    }
    
    const handleSelectClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        console.log(state.leftBackTyre, state.rightBackTyre, state.leftFrontTyre, state.rightFrontTyre);
        // if(!selectedValue || !selectedSizeValue) {
        //     return(
        //         alert('Please select size and load')
        //     );
        // }
        
        navigate(`/view?size=${selectedSizeValue}&
                load=${selectedValue}&
                mno=${mno}&
                pno=${state.plateNumber}&
                clt=${state.leftFrontTyre}&
                crt=${state.rightFrontTyre}&
                clb=${state.leftBackTyre}&
                crb=${state.rightBackTyre}&
                rf=${rf}&
                rr=${rr}`)
    };


    const [isDialogOpen, setDialogOpen] = useState(false); // show dialog or not 
    const [tyreIndex,setTyreIndex]=useState(0)
    function tyreClick(tyreIndex:number){
                setDialogOpen(!isDialogOpen)
                setTyreIndex(tyreIndex)
            console.log("clicked tyre",tyreIndex)
    }

    return (
        <div className="Select">
            <div className='Center'>
                <div className='text'>Select your preference</div>
                
                <img src={carNowheel.src} style={{ width: '40%', marginTop:"50px", zIndex:"2"}} alt="car" />
                <img src={wheel.src} className={isclickedlt ? 'clicked':'unclick'} style={{top:"32%", left:"31.7%"}}alt="wheellt"></img>
                <img src={wheel.src} className={isclickedrt? 'clicked':'unclick'} style={{top:"32%", left:"68.2%"}}alt="wheelrt"></img>
                <img src={wheel.src} className={isclickedlb?'clicked':'unclick'} style={{top:"63%", left:"31.7%"}}alt="wheellb"></img>
                <img src={wheel.src} className={isclickedrb?'clicked':'unclick'} style={{top:"63%", left:"68.2%"}}alt="wheelrb"></img>
                <button className="WheelButtonSelect" style={{top:"32%", left:"31.7%"}}onClick={() => tyreClick(1)}>
                tl
                </button>
                <button className="WheelButtonSelect" style={{top:"32%", left:"68.2%"}}onClick={() => tyreClick(2)}>
                    tr
                </button>
                <button className="WheelButtonSelect" style={{top:"63%", left:"31.7%"}}onClick={() => tyreClick(3)}>
                    bl
                </button>
                <button className="WheelButtonSelect" style={{top:"63%", left:"68.2%"}}onClick={() => tyreClick(4)}>
                    br
                </button>

                {isDialogOpen && (
                <Dialog isOpen={isDialogOpen} setIsOpen={setDialogOpen} tyreIndex={tyreIndex} setTyreIndex={setTyreIndex} state={state} dispatch={dispatch}/>
                )}
                
                <SizeDropDown onSelect={handleSelect}/>
                <LoadRadio selectedValue={selectedValue} handleChange={handleChange}/>
                <a className="button" onClick={handleSelectClick}>Select</a>
            </div>
        </div>
    )
}

export default Select;