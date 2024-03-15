import "../assets/styles/loading.css";
import "../assets/styles/app.css";
import { useState, useEffect } from "react";
import Logo from "../assets/images/logo_red.svg";
function LoadingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="exclude-component">
      <div className="main">
        <img id="logo" src={Logo.src} alt="logo" />

        <div className="load-wrapper">
          <p className="loading-text">Loading</p>
          <div className="loader-container">
            <iframe
              src="https://giphy.com/embed/sSgvbe1m3n93G"

              style={{ width: "30%", border: 0}}
              className="giphy-embed"
            ></iframe>
          </div>
        </div>

      </div>

      <div
            style={{
                
              textAlign: "center",
              fontFamily: "Poppins",
              fontSize: "24px",
            }}
          >
            If it's loading for more than 2 minutes, <br />
            please check the link and refresh the page
          </div>
    </div>
  );
}

export default LoadingPage;
