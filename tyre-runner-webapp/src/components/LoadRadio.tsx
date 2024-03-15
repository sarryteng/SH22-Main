import "../assets/styles/app.css"
import React from "react";


interface radioProps {
    selectedValue: string | null;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    ladenExist: boolean;
    isMobile: boolean;
}

function LoadRadio ({ selectedValue, handleChange, ladenExist, isMobile }: radioProps) {
    // const ladenExist = props.ladenExist;
    // console.log("ladenExist is",ladenExist);
    // console.log(selectedValue);
    
    return(
        
    <div className="radioWrapper">
        {isMobile?(
        <div> 
            <input name='load' type="radio" value='normal' id='normal' style={{width:"auto", marginLeft:"20px", marginRight:"20px",transform:"scale(2)"}} checked={selectedValue === 'normal'}
                onChange={handleChange}
            />
        <label htmlFor='normal' className="text" style={{marginRight:"40px"}}>Normal Load</label>
        <input name='load' type="radio" value='heavy' id='heavy' disabled={!ladenExist} style={{width:"auto", marginLeft:"20px", marginRight:"20px",transform:"scale(2)"}} checked={selectedValue === 'heavy'}
                onChange={handleChange}
            />
        <label htmlFor='heavy' className="text" style={{marginRight:"40px"}}>Heavy Load</label>
        </div>):(
        <div> 
            <input name='load' type="radio" value='normal' id='normal' style={{width:"auto",marginLeft:"20px", marginRight:"20px",transform:"scale(1.5)"}} checked={selectedValue === 'normal'}
                onChange={handleChange}
            />
        <label htmlFor='normal' className="text" style={{marginRight:"40px"}}>Normal Load</label>
        <input name='load' type="radio" value='heavy' id='heavy' disabled={!ladenExist} style={{width:"auto", marginLeft:"20px", marginRight:"20px",transform:"scale(1.5)"}} checked={selectedValue === 'heavy'}
                onChange={handleChange}
            />
        <label htmlFor='heavy' className="text" style={{marginRight:"40px"}}>Heavy Load</label>
        </div>)}
       
    </div>
    )

}
export default LoadRadio