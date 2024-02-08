import car from '../assets/images/Car.svg'
import "../assets/styles/app.css"
import { useState, useEffect } from 'react';
import LoadRadio from './LoadRadio';
import SizeDropDown from './SizeDropDown';
import "@fontsource/poppins";
import Dialog from "../components/DialogueBox";
import wheel from '../assets/images/wheel.svg'
import carNowheel from '../assets/images/carNowheel.svg'




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
    const [pno, setpno] = useState<string>('');
    const [clt, setclt] = useState<string>('');
    const [crt, setcrt] = useState<string>('');
    const [clb, setclb] = useState<string>('');
    const [crb, setcrb] = useState<string>('');
    const [rf, setrf] = useState<string>('');
    const [rr, setrr] = useState<string>('');
    const [isclickedlt, setIsClickedlt] = useState(false);
    const [isclickedrt, setIsClickedrt] = useState(false);
    const [isclickedlb, setIsClickedlb] = useState(false);
    const [isclickedrb, setIsClickedrb] = useState(false);
    
    useEffect(() => {
        const getQueryParams = () => {
          const queryParams = new URLSearchParams(window.location.search);
          const pnoParam = queryParams.get('licenseplate')||'';
          const readingParam = queryParams.get('sensorreadings')||'';
          
          setpno(pnoParam);
          const readArray=readingParam.split(',');
          console.log(readArray);
          setclt(readArray[0]);
          setcrt(readArray[1]);
          setclb(readArray[2]);
          setcrb(readArray[3]);
        };
        getQueryParams();
        
        async function fetchdata() {
            try {
                const response = await fetch(`http://127.0.0.1:6767/tyre-data/${pno}`);
                const result = await response.json();
                setmno(result.data.make+' '+result.data.model);
                console.log(result.data.make+' '+result.data.model);
            } catch (error) {
                console.error('Error occurred:', error);
            }
        }
        fetchdata();
          }, [pno]);
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
        if(!selectedValue || !selectedSizeValue) {
            return(
                alert('Please select size and load')
            );
        }
        window.location.href = `/view?size=${selectedSizeValue}&load=${selectedValue}&mno=${mno}&pno=${pno}&clt=${clt}&crt=${crt}&clb=${clb}&crb=${crb}&rf=${rf}&rr=${rr}`;
    };
    const sizeFromParent = 30;
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
                
                {/* <div style={{display:"flex",justifyContent:"center"}}> */}
               
                {/* <img src={car.src} style={{ width: '40%', marginTop:"50px"}}alt="car" />
               
                </div>
                <button style={{opacity:"1", position:"absolute", top:"30%", left:"32%", transform:"translate(-50%,-50%)", width:"3%", height:"10%",backgroundColor:"red"}} onClick={() => tyreClick(1)}>
                top-left
                </button>
                <button style={{opacity:"1", position:"absolute", top:"30%", left:"68%", transform:"translate(-50%,-50%)", width:"3%", height:"10%",backgroundColor:"red"}} onClick={() => tyreClick(2)}>
                    top-right
                </button>
                <button style={{opacity:"1", position:"absolute", top:"69%", left:"32%", transform:"translate(-50%,-50%)", width:"3%", height:"10%",backgroundColor:"red"}} onClick={() => tyreClick(3)}>
                    buttom-left
                </button>
                <button style={{opacity:"1", position:"absolute", top:"69%", left:"68%", transform:"translate(-50%,-50%)", width:"3%", height:"10%",backgroundColor:"red"}} onClick={() => tyreClick(4)}>
                    buttom-right
                </button> */}
                <img src={carNowheel.src} style={{ width: '40%', marginTop:"50px", zIndex:"2"}}alt="car" />
                <img src={wheel.src} className={isclickedlt ? 'clicked':'unclick'} style={{top:"32%", left:"31.7%"}}alt="wheellt"></img>
                <img src={wheel.src} className={isclickedrt? 'clicked':'unclick'} style={{top:"32%", left:"68.2%"}}alt="wheelrt"></img>
                <img src={wheel.src} className={isclickedlb?'clicked':'unclick'} style={{top:"63%", left:"31.7%"}}alt="wheellb"></img>
                <img src={wheel.src} className={isclickedrt?'clicked':'unclick'} style={{top:"63%", left:"68.2%"}}alt="wheelrb"></img>
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
                <Dialog isOpen={isDialogOpen} setIsOpen={setDialogOpen} tyreIndex={tyreIndex} setTyreIndex={setTyreIndex}/>
                )}
                

                    
                <SizeDropDown onSelect={handleSelect}/>
                <LoadRadio selectedValue={selectedValue} handleChange={handleChange}/>
                <a className="button" onClick={handleSelectClick}>Select</a>
            </div>
        </div>
    )
}

export default Select;