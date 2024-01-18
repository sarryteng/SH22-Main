import car from '../assets/Images/car.svg'
import "../assets/styles/app.css"
import { useState, useEffect } from 'react';
import LoadRadio from './LoadRadio';
import SizeDropDown from './SizeDropDown';
import "@fontsource/poppins";

//http://localhost:4321/url-data?licenseplate=AO12XZP&sensorreadings=30,32,28,31
//Use PSI units
//a common tire size format is expressed as something like "215/65R16," where:
    // 215 = width
    // 65 = ratio
    // R16 = rim.

//{"dataSource":"N/A","dateTimeSaved":"2023-11-11T20:34:19.907","make":"AUDI","model":"A6 ALLROAD TDI QUATTRO A",
//"tyreOptionsWithPressure":[
    //{"loadIndex":"100","pressure":{"bar":2.3,"laden":{},"psi":33},"ratio":55,"rim":18,"speedIndex":"Y","tyreType":"FRONT","width":235},
    //{"loadIndex":"100","pressure":{"bar":2.1,"laden":{},"psi":30},"ratio":55,"rim":18,"speedIndex":"Y","tyreType":"REAR","width":235}],
//"vrm":"AO12XZP"}

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
          }, []);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };
    
    const handleSelect = (value: string) => {
        setSelectedSizeValue(value);
        handletest();
    };
    const handletest = () => {
        setmno('Honda Civic');
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
    return (
        <div className="Select">
            <div className='Center'>
                <div className='text'>Select your preference</div>
                <img src={car.src} style={{ width: '40%', marginTop:"50px"}}alt="car" />
                <SizeDropDown onSelect={handleSelect}/>
                <LoadRadio selectedValue={selectedValue} handleChange={handleChange}/>
                <a className="button" onClick={handleSelectClick}>Select</a>
            </div>
        </div>
    )
}

export default Select;