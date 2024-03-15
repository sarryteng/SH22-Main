import car from "../assets/images/Car.svg";
import "../assets/styles/app.css";
import { useState, useEffect } from "react";
import LoadRadio from "./LoadRadio";
import SizeDropDown from "./SizeDropDown";
// import Dialog from "../components/DialogueBox";
import wheel from "../assets/images/wheel.svg";
import carNowheel from "../assets/images/carNowheel.svg";
import Loading from "./Loading";

interface URLProp {
  url: string;
}

const Select = ({ url }: URLProp) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedSizeValue, setSelectedSizeValue] = useState<
    string | undefined
  >(undefined);
  const [mno, setmno] = useState<string>("");
  const [pno, setpno] = useState<string>("");
  const [clt, setclt] = useState<string>("");
  const [crt, setcrt] = useState<string>("");
  const [clb, setclb] = useState<string>("");
  const [crb, setcrb] = useState<string>("");
  const [isclickedlt, setIsClickedlt] = useState(false);
  const [isclickedrt, setIsClickedrt] = useState(false);
  const [isclickedlb, setIsClickedlb] = useState(false);
  const [isclickedrb, setIsClickedrb] = useState(false);
  const [ladenExist, setLadenExist] = useState<boolean>(true);
  const [dataresult, setDataResult] = useState<any>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  let windowWidth = 0;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQueryParams = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const pnoParam = queryParams.get("licenseplate") || "";
      const readingParam = queryParams.get("sensorreadings") || "";

      setpno(pnoParam);
      const readArray = readingParam.split(",");
      setclt(readArray[0]);
      setcrt(readArray[1]);
      setclb(readArray[2]);
      setcrb(readArray[3]);
    };
    getQueryParams();

    async function fetchdata() {
      try {
        const response = await fetch(`${url}/${pno}`);
        const result = await response.json();
        // setResult(await response.json());
        setDataResult(result.data);
        setmno(result.data.make + " " + result.data.model);
        // console.log(result.data.make+' '+result.data.model);
        setLoading(false);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    }
    fetchdata();
    if (typeof window !== "undefined") {
      //   setWindowWidth(window.screen.width);
      windowWidth = window.screen.width;
      setIsMobile(windowWidth < 500);
    }
    const handleResize = () => {
      windowWidth = window.screen.width;
      setIsMobile(windowWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pno]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleSelect = (value: string) => {
    setSelectedSizeValue(value);
    const valueint = parseInt(value);
    if (valueint === -1) {
      setLadenExist(true);
    } else {
      setLadenExist(dataresult.frontTyres[valueint - 1].ladenOption);
    }
  };

  const handleSelectClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!selectedValue || !selectedSizeValue) {
      return alert("Please select size and load");
    }
    if (!ladenExist && selectedValue === "heavy") {
      return alert("Heavy load does not exist for this size");
    }
    let rf = dataresult.frontTyres[parseInt(selectedSizeValue) - 1].normalPSI;
    let rr = dataresult.rearTyres[parseInt(selectedSizeValue) - 1].normalPSI;
    if (selectedValue === "heavy") {
      rf = dataresult.frontTyres[parseInt(selectedSizeValue) - 1].ladenPSI;
      rr = dataresult.rearTyres[parseInt(selectedSizeValue) - 1].ladenPSI;
    }
    const tyre =
      dataresult.frontTyres[parseInt(selectedSizeValue) - 1].markings;
    window.location.href = `/view?size=${tyre}&load=${selectedValue}&mno=${mno}&pno=${pno}&clt=${clt}&crt=${crt}&clb=${clb}&crb=${crb}&rf=${rf}&rr=${rr}`;
  };
  const [isDialogOpen, setDialogOpen] = useState(false); // show dialog or not
  const [tyreIndex, setTyreIndex] = useState(0);
  function tyreClick(tyreIndex: number) {
    setDialogOpen(!isDialogOpen);
    setTyreIndex(tyreIndex);
  }

  return (
    <div className="Select">
      {loading ? (
        <>
          <Loading />

        </>
      ) : (
        <>
          {isMobile ? (
            <div className="Center">
              <div className="text">Select your preference</div>

              <img
                src={carNowheel.src}
                style={{ width: "40%", marginTop: "50px", zIndex: "2" }}
                alt="car"
              />
              <img
                src={wheel.src}
                className={isclickedlt ? "clicked" : "unclick"}
                style={{ top: "32%", left: "31.7%" }}
                alt="wheellt"
              ></img>
              <img
                src={wheel.src}
                className={isclickedrt ? "clicked" : "unclick"}
                style={{ top: "32%", left: "68.2%" }}
                alt="wheelrt"
              ></img>
              <img
                src={wheel.src}
                className={isclickedlb ? "clicked" : "unclick"}
                style={{ top: "63%", left: "31.7%" }}
                alt="wheellb"
              ></img>
              <img
                src={wheel.src}
                className={isclickedrb ? "clicked" : "unclick"}
                style={{ top: "63%", left: "68.2%" }}
                alt="wheelrb"
              ></img>
              {/* <button className="WheelButtonSelect" style={{top:"32%", left:"31.7%"}}onClick={() => tyreClick(1)}>
                tl
                </button>
                <button className="WheelButtonSelect" style={{top:"32%", left:"68.2%"}}onClick={() => tyreClick(2)}>
                    tr
                </button>
                <button className="WheelButtonSelect" style={{top:"63%", left:"31.7%"}}onClick={() => tyreClick(3)}>
                    bl
                </button>
                <button className="WheelButtonSelect" style={{top:"63%", left:"68.2%"}}onClick={() => tyreClick(4)}>
                    br
                </button> */}

              {/* {isDialogOpen && (
                <Dialog isOpen={isDialogOpen} setIsOpen={setDialogOpen} tyreIndex={tyreIndex} setTyreIndex={setTyreIndex} tyre1={clt} tyre2={crt} tyre3={clb} tyre4={crb} setTyre1={setclt} setTyre2={setcrt} setTyre3={setclb} setTyre4={setcrb}/>
                )}
                 */}
              <SizeDropDown url={url} onSelect={handleSelect}/>
              <LoadRadio
                selectedValue={selectedValue}
                handleChange={handleChange}
                ladenExist={ladenExist}
                isMobile={isMobile}
              />
              <a className="button" onClick={handleSelectClick}>
                Select
              </a>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={car.src}
                  style={{
                    width: "40%",
                    maxHeight: "500px",
                    marginTop: "50px",
                    zIndex: "2",
                  }}
                  alt="car"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "25px",
                    fontFamily: "Poppins",
                  }}
                >
                  Select your preference
                </div>
                <SizeDropDown url={url} onSelect={handleSelect} />
                <LoadRadio
                  selectedValue={selectedValue}
                  handleChange={handleChange}
                  ladenExist={ladenExist}
                  isMobile={isMobile}
                />
                <a className="button" onClick={handleSelectClick}>
                  Select
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Select;
