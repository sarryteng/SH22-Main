import car from '../assets/Images/car.svg'
import "../assets/styles/app.css"
import { useState } from 'react';
import LoadRadio from './LoadRadio';
import SizeDropDown from './SizeDropDown';
import "@fontsource/poppins";
import Dialog from "../components/DialogueBox";





function Select () {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [selectedSizeValue, setSelectedSizeValue] = useState<string | undefined>(undefined);
    const [mno, setmno] = useState<string>('');
    const [pno, setpno] = useState<string>('');
    const [clt, setclt] = useState<string>('');
    const [crt, setcrt] = useState<string>('');
    const [clb, setclb] = useState<string>('');
    const [crb, setcrb] = useState<string>('');
    const [rlt, setrlt] = useState<string>('');
    const [rrt, setrrt] = useState<string>('');
    const [rlb, setrlb] = useState<string>('');
    const [rrb, setrrb] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };
    
    const handleSelect = (value: string) => {
        setSelectedSizeValue(value);
        handletest();
    };
    const handletest = () => {
        setmno('Honda Civic');
        setpno('ae1234');
        setclt('10');
        setcrt('11');
        setclb('12');
        setcrb('13');
        setrlt('20');
        setrrt('21');
        setrlb('22');
        setrrb('23');
    }

    const handleSelectClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        if(!selectedValue || !selectedSizeValue) {
            return(
                alert('Please select size and load')
            );
        }
        window.location.href = `/view?size=${selectedSizeValue}&load=${selectedValue}&mno=${mno}&pno=${pno}&clt=${clt}&crt=${crt}&clb=${clb}&crb=${crb}&rlt=${rlt}&rrt=${rrt}&rlb=${rlb}&rrb=${rrb}`;
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
                
                <div style={{display:"flex",justifyContent:"center"}}>
               
                <img src={car.src} style={{ width: '40%', marginTop:"50px"}}alt="car" />
               
                </div>
                <button style={{opacity:"0", position:"absolute", top:"30%", left:"32%", transform:"translate(-50%,-50%)", width:"3%", height:"10%",backgroundColor:"red"}} onClick={() => tyreClick(1)}>
                top-left
                </button>
                <button style={{opacity:"0", position:"absolute", top:"30%", left:"68%", transform:"translate(-50%,-50%)", width:"3%", height:"10%"}} onClick={() => tyreClick(2)}>
                    top-right
                </button>
                <button style={{opacity:"0", position:"absolute", top:"69%", left:"32%", transform:"translate(-50%,-50%)", width:"3%", height:"10%"}} onClick={() => tyreClick(3)}>
                    buttom-left
                </button>
                <button style={{opacity:"0", position:"absolute", top:"69%", left:"68%", transform:"translate(-50%,-50%)", width:"3%", height:"10%"}} onClick={() => tyreClick(4)}>
                    buttom-right
                </button>
                {isDialogOpen && <Dialog isOpen={isDialogOpen} setIsOpen={setDialogOpen} tyreIndex={tyreIndex} setTyreIndex={setTyreIndex}/>}
                

                    
                <SizeDropDown onSelect={handleSelect}/>
                <LoadRadio selectedValue={selectedValue} handleChange={handleChange}/>
                <a className="button" onClick={handleSelectClick}>Select</a>
            </div>
        </div>
    )
}

export default Select;