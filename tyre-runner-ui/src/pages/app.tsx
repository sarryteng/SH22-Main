// import QRcode from "./QRCodeBox/test.tsx";
import BlackBox from "../components/QRCodeBox/box.tsx";
import "../assets/styles/app.css";
import logo from '../assets/Images/tyrerunner_logo.png'

function App() {
  return (
    <div className="Center">
      {/* <img src= 'https://cdn.discordapp.com/attachments/941167937799225345/1173766943103266816/gfFsIGaVY6lqAAAAABJRU5ErkJggg.png?ex=656526a6&is=6552b1a6&hm=a702834f5a2c99b6dddf16983ba35bc7ffd50a8ce27736694a3ed4b1dbcf55b2&' alt="Banner" /> */}
      <img src={logo.src} alt="logo" />
      <div className="QuoteText">Check Your Pressure</div>
      {/* <QRcode /> */}
      <br></br>
      <br></br>
      <br></br>
      <BlackBox/>
    </div>
  );
}

export default App;
