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

const tyreSize: { id:number; rim: string; ratio: string; width:string }[] = [
    
]

function SizeDropDown ({ onSelect }: { onSelect: (selectedValue: string) => void }) {
    const [data, setData] = useState(null);
    const [sizeArray, setSizeArray] = useState<string[]>([]);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('start requesting....'); 
        const response = await fetch('http://127.0.0.1:6767/tyre-data/AO12XZP');
        const result = await response.json();

        const tyreOptionsWithPressure = result.tyreOptionsWithPressure;

  
        let currentId = 1;
        tyreOptionsWithPressure.forEach((tyreOption: { ratio: any; rim: any; width:any;}) => {
            const ratio = JSON.stringify(tyreOption.ratio);
            const rim = JSON.stringify(tyreOption.rim);
            const width=JSON.stringify(tyreOption.width);
            
            const newElement = { id: currentId++, rim: rim, ratio: ratio, width:width };
            tyreSize.push(newElement)
          
          });
          console.log("tyreSize is",tyreSize);
        setData(result);
      } catch (error) {
        console.error('request error:', error);
      }
    };
            
    fetchData();
  }, []); 



  
    
    const [value, setValue] = useState<string | undefined>(undefined);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setValue(selectedValue);
        onSelect(selectedValue);
    };
    console.log(value);

    return (
        <div className="dropdown">
            <select
                value={value ?? ''}
                onChange={handleSelectChange}
            >
                <option value="">Select tyre size</option>
                {tyreSize.map((item) => (
                    <option key={item.id} value={item.id}>
                       ratio: {item.ratio} rim:{item.rim} width:{item.width}
                    </option>
                ))}
            </select>
        </div>
    );

}

export default SizeDropDown;
