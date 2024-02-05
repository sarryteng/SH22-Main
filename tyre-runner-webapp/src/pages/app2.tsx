import "../assets/styles/app.css";
import Header from "../components/Header";
import View from "../components/View";
import CRFooter from "../components/CRFooter";





function App2() {
  return (
    <div className="Center">
        <Header />
        <View />
        <div style={{height:"300px"}}></div>
        <div className="endpage">
          <CRFooter />
        </div>
    </div>
  );
}

export default App2;
