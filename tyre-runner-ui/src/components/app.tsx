// import QRcode from "./QRCodeBox/test.tsx";
import BlackBox from "./QRCodeBox/box.tsx";
import "../assets/styles/app.css";
import logo from '../assets/Images/logo_transparent.png'
import Contact from "./contact.tsx";
import { useEffect } from 'react';


function App() {

  return (
    <div className="Center">
      {/* <img src= 'https://cdn.discordapp.com/attachments/941167937799225345/1173766943103266816/gfFsIGaVY6lqAAAAABJRU5ErkJggg.png?ex=656526a6&is=6552b1a6&hm=a702834f5a2c99b6dddf16983ba35bc7ffd50a8ce27736694a3ed4b1dbcf55b2&' alt="Banner" /> */}
      <img src={logo.src} style={{ width: '630px'}}alt="logo" />
      <div className="QuoteText">Check Your Pressure</div>
      {/* <QRcode /> */}
      <div style={{height:'100px'}}/>
      <BlackBox />
      <div style={{height:'300px'}}/>
      <Contact />
    </div>
  );
}

export default App;
