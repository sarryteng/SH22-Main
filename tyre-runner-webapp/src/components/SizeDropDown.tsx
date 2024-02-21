import "../assets/styles/app.css"
import { useEffect, useState } from 'react';

type TyreOption = {
  rim: number;
  ratio: number;
  width: number;
};

type SizeDropDownProps = {
  onSelect: (selectedValue: string, tyreOption: TyreOption) => void;
  tyreOptionsWithPressure: TyreOption[];
};

const tyreSize: { id:number; markings: string;}[] = [
    
]

function SizeDropDown ({ onSelect }: { onSelect: (selectedValue: string) => void }) {
    const [data, setData] = useState(null);
    const [sizeArray, setSizeArray] = useState<string[]>([]);
    const [pno, setpno] = useState<string>('');

    
  useEffect(() => {
    const getQueryParams = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const pnoParam = queryParams.get('licenseplate')||'';
      
      setpno(pnoParam);
    };
    getQueryParams();
    const fetchData = async () => {
      try {
        // console.log('start requesting....'); 
        const response = await fetch(`http://127.0.0.1:6767/tyre-data/${pno}`);
        const result = await response.json();
        // console.log(result.data);
        // const tyreOptionsWithPressure = result.tyreOptionsWithPressure;
        const tyreOptionsWithPressure = result.data.frontTyres;

  
        let currentId = 1;
        tyreOptionsWithPressure.forEach((tyreOption: { markings: string;}) => {
            const marking = JSON.stringify(tyreOption.markings);
            console.log("marking is",marking);
            
            const newElement = { id: currentId++, markings:marking };
            tyreSize.push(newElement)
          });
          console.log("tyreSize is",tyreSize);
        setData(result);
      } catch (error) {
        console.error('request error:', error);
      }
    };
            
    fetchData();
  }, [pno]); 



  
    
    const [value, setValue] = useState<string | undefined>(undefined);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setValue(selectedValue);
        onSelect(selectedValue);
    };
    // console.log(value);

    return (
        <div className="dropdown">
            <select
                value={value ?? ''}
                onChange={handleSelectChange}
            >
                <option value="">Select tyre size</option>
                {tyreSize.map((item) => (
                    // <option key={item.id} value={item.id}>
                    //    ratio: {item.ratio} rim:{item.rim} width:{item.width}
                    // </option>
                    <option key={item.id} value={item.id}>
                       {item.markings}
                    </option>
                ))}
            </select>
        </div>
    );

}

export default SizeDropDown;
