import QRcode from "./test.tsx";
import BlackBox from "./box.tsx";
import "../styles/app.css";
import logo from '../../public/tyrerunner_logo.png'

function App() {
  return (
    <div className="Center">
      {/* <img src= 'https://cdn.discordapp.com/attachments/941167937799225345/1173766943103266816/gfFsIGaVY6lqAAAAABJRU5ErkJggg.png?ex=656526a6&is=6552b1a6&hm=a702834f5a2c99b6dddf16983ba35bc7ffd50a8ce27736694a3ed4b1dbcf55b2&' alt="Banner" /> */}
      <img src={logo.src} alt="logo" />
      {/* <QRcode /> */}
      <BlackBox/>
    </div>
    
  );
}

export default App;
