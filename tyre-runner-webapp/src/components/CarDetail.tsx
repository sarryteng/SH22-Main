import "../assets/styles/app.css"
import { useState, useEffect } from 'react';


const CarDetail =()=> {
    const [size, setSize] = useState<string>('');
    const [load, setLoad] = useState<string>('');
    const [ModelNo, setModelNo] = useState<string>('');
    const [PlateNo, setPlateNo] = useState<string>('');
    useEffect(() => {
        const getQueryParams = () => {
          const queryParams = new URLSearchParams(window.location.search);
          const sizeParam = queryParams.get('size')||'';
          const loadParam = queryParams.get('load')||'';
          const ModelNoParam = queryParams.get('mno')||'';
          const PlateNoParam = queryParams.get('pno')||'';

          setSize(sizeParam);
          setLoad(loadParam);
          setModelNo(ModelNoParam);
          setPlateNo(PlateNoParam);
        };
    
        getQueryParams();
      }, []);
    return (
        <div className="CarDetail">  
          <div className="CarDetailHead">
            <div className="DetailText">
              <p style={{paddingTop:"20px", paddingBottom:"10px"}}>Car Details:</p>
            </div>
            </div> 
              <div className="DetailText">
                <p>Model: {ModelNo}</p>
                <p>Pate Number: {PlateNo}</p>
                <p>Size: {size}</p>
                <p>Load: {load}</p>
              </div> 
                <br/>
        </div>
    )
}

export default CarDetail