// import QRcode from "./QRCodeBox/test.tsx";
// import BlackBox from "../components/QRCodeBox/box.tsx";
import "../assets/styles/app.css";
// import logo from '../assets/Images/logo_transparent.png'
// import Contact from "../components/contact.tsx";
import { useEffect } from 'react';
import Header from "../components/Header";
import Select from "../components/Select";
import CRFooter from "../components/CRFooter";




function App() {
  useEffect(() => {
    console.log(window.location.pathname);
  }, []);
  return (
    <div className="Center">
        <Header />
        <Select />
        <div className="endpage">
          <CRFooter />
        </div>
        
    </div>
  );
}

export default App;
