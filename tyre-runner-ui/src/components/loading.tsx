import React from 'react';
import '../assets/styles/loading.css';
import { useState, useEffect } from 'react';
import Logo from '../assets/Images/logo_red.svg'
function LoadingPage() {


    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);

    //     }, 2000);
    // }, []);

    


    return (
        <div className='main' style={{ backgroundColor: 'white' }}>
        <img id='logo' src={Logo.src} alt="logo"  />
        {loading && (
            <div className='load-wrapper'>
                <p className='loading-text'>Loading</p>
                <div className="loader-container">
                    <div className="spinner">
                        <iframe src="https://giphy.com/embed/sSgvbe1m3n93G" width="30" height="30" frameBorder="0" className="giphy-embed" ></iframe>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
}

export default LoadingPage;
