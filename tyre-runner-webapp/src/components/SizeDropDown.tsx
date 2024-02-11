import "../assets/styles/app.css"
import { useEffect, useState } from 'react';

// type TyreOption = {
//   rim: number;
//   ratio: number;
//   width: number;
// };

// type SizeDropDownProps = {
//   onSelect: (selectedValue: string, tyreOption: TyreOption) => void;
//   tyreOptionsWithPressure: TyreOption[];
// };



const apiUrl = 'http://127.0.0.1:6767/tyre-data/AO12XZP';


function SizeDropDown({ onSelect }: { onSelect: (selectedValue: string) => void }) {
  const [data, setData] = useState(null);
  const [sizeArray, setSizeArray] = useState<string[]>([]);
  const [pno, setpno] = useState<string>('');
  const [frontTyre, setFrontTyre] = useState([{ tyreType: "", rim: 0, ratio: 0, width: 0 }]);
  const [rearTyre, setRearTyre] = useState([{ tyreType: "", rim: 0, ratio: 0, width: 0 }]);

  useEffect(() => {
    const getQueryParams = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const pnoParam = queryParams.get('licenseplate') || '';

      setpno(pnoParam);
    };
    getQueryParams();
    const fetchData = async () => {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const tyredata = data.data
          console.log("tyre data",tyredata)
          setFrontTyre(Object.values(tyredata.frontTyres))
          setRearTyre(Object.values(tyredata.rearTyres))
         
        }
        )
        .catch(error => {

          console.error('Error:', error);
        });
    };

    fetchData();
  }, []);





  const [value, setValue] = useState<string | undefined>(undefined);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    onSelect(selectedValue);
    console.log("value",selectedValue)
  };
  console.log(value);

  return (
    <div className="dropdown">
      <select
        value={value ?? ''}
        onChange={handleSelectChange}
      >
        <option value="">Select tyre size</option>
        {frontTyre.map((item, index) => (
          <option key={index} value={`front${index}`}>
            type:{item.tyreType} ratio:{item.ratio} rim:{item.rim} width: {item.width}
          </option>
        ))}
        {rearTyre.map((item, index) => (
          <option key={index} value={`rear${index}`}>
            type:{item.tyreType} ratio:{item.ratio} rim:{item.rim} width: {item.width}
          </option>
        ))}

        

      </select>
    </div>
  );

}

export default SizeDropDown;
