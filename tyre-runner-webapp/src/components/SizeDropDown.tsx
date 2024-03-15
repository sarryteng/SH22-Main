import "../assets/styles/app.css"
import { useEffect, useState } from 'react';

type SizeDropDownProps = {
  url: string;
  onSelect: (selectedValue: string) => void;
  // tyreOptionsWithPressure: TyreOption[];
};

const tyreSize: { id:number; markings: string;}[] = []


const SizeDropDown = ({ url, onSelect}: SizeDropDownProps) => {
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
        const response = await fetch(`${url}/${pno}`);
        const result = await response.json();
        // console.log(result.data);
        // const tyreOptionsWithPressure = result.tyreOptionsWithPressure;
        const tyreOptionsWithPressure = result.data.frontTyres;

        tyreSize.length = 0;
        let currentId = 1;
        tyreOptionsWithPressure.forEach((tyreOption: { markings: string;}) => {
            const marking = JSON.stringify(tyreOption.markings).replace(/"/g, ''); 
            const newElement = { id: currentId++, markings:marking };
            tyreSize.push(newElement)
          });
        setData(result);
      } catch (error) {
        console.error('request error:', error);      }
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
                <option value="-1" key={-1}>Select tyre size</option>
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
