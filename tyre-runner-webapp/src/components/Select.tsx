import car from '../assets/Images/car.svg'
import "../assets/styles/app.css"
import { useState } from 'react';
import LoadRadio from './LoadRadio';
import SizeDropDown from './SizeDropDown';

function Select () {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const [selectedSizeValue, setSelectedSizeValue] = useState<string | undefined>(undefined);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };
    
    const handleSelect = (value: string) => {
        setSelectedSizeValue(value);
    };

    const handleSelectClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        window.location.href = `/view?size=${selectedSizeValue}&load=${selectedValue}`;
    };
    return (
        <div className="Select">
            <div className='Center'>
                <div className='text'>Select your preference</div>
                <img src={car.src} style={{ width: '500px'}}alt="car" />
                <SizeDropDown onSelect={handleSelect}/>
                <LoadRadio selectedValue={selectedValue} handleChange={handleChange}/>
                <a className="button" onClick={handleSelectClick}>Select</a>
            </div>
        </div>
    )
}

export default Select