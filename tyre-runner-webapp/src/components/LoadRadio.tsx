import "../assets/styles/app.css"

function LoadRadio ({ selectedValue, handleChange }: { selectedValue: string | null, handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
    console.log(selectedValue);
    return(
    <div className="radioWrapper">
        <input name='load' type="radio" value='normal' id='normal' style={{width:"auto", marginLeft:"20px", marginRight:"20px",transform:"scale(2)"}} checked={selectedValue === 'normal'}
                onChange={handleChange}
            />
        <label htmlFor='normal' className="text" style={{marginRight:"40px"}}>Normal Load</label>
        <input name='load' type="radio" value='heavy' id='heavy' style={{width:"auto", marginLeft:"20px", marginRight:"20px",transform:"scale(2)"}} checked={selectedValue === 'heavy'}
                onChange={handleChange}
            />
        <label htmlFor='heavy' className="text" style={{marginRight:"40px"}}>Heavy Load</label>
    </div>
    )

}
export default LoadRadio