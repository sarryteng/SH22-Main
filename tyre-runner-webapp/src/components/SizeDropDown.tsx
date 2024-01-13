import "../assets/styles/app.css"
import { useState } from 'react';

function SizeDropDown ({ onSelect }) {
    const tyreSize: { value: string; label: string }[] = [
        { value: "10", label: "10" },
        { value: "20", label: "20" }
    ];
    const [value, setValue] = useState<string | undefined>(undefined);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setValue(selectedValue);
        onSelect(selectedValue);
    };

    return (
        <div className="dropdown">
            <select
                value={value ?? ''}
                onChange={handleSelectChange}
            >
                <option value="">Select tyre size</option>
                {tyreSize.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SizeDropDown;
