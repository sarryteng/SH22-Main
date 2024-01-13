import "../assets/styles/app.css"
import { useState, useEffect } from 'react';
import car from '../assets/Images/car.svg'

const View =()=> {
        // State to store the values of size and load
        const [size, setSize] = useState<string>('');
        const [load, setLoad] = useState<string>('');
        useEffect(() => {
            // Function to parse the query parameters from the URL
            const getQueryParams = () => {
              const queryParams = new URLSearchParams(window.location.search);
              const sizeParam = queryParams.get('size')||'';
              const loadParam = queryParams.get('load')||'';
              
              // Update state with the values
              setSize(sizeParam);
              setLoad(loadParam);
            };
        
            // Call the function when the component mounts
            getQueryParams();
          }, []);
    return (
        <div className="View">
                <h1>view</h1>
                <p>Size: {size}</p>
                <p>Load: {load}</p>
                <div className='Center'>
                <div className='text'>Click the tire for pressure details or the car’s body to view all.</div>
                <img src={car.src} style={{ width: '500px'}}alt="car" />
                </div>
        </div>
    )
}

export default View