import React, { useState } from 'react';

const Demo = () => {
    const [checkboxes, setCheckboxes] = useState([
        false, false, false, false, false, false, false
    ]);

    const handleCheckboxChange = (index) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = !newCheckboxes[index];
        setCheckboxes(newCheckboxes);
    };

    const handleClearSelection = () => {
        setCheckboxes(Array(7).fill(false));
    };

    return (
        <div>
            {/* Checkbox 1 */}
            <input
                type="checkbox"
                checked={checkboxes[0]}
                onChange={() => handleCheckboxChange(0)}
            />
            {/* Checkbox 2 */}
            <input
                type="checkbox"
                checked={checkboxes[1]}
                onChange={() => handleCheckboxChange(1)}
            />
            {/* Checkbox 3 */}
            <input
                type="checkbox"
                checked={checkboxes[2]}
                onChange={() => handleCheckboxChange(2)}
            />
            {/* Checkbox 4 */}
            <input
                type="checkbox"
                checked={checkboxes[3]}
                onChange={() => handleCheckboxChange(3)}
            />
            {/* Checkbox 5 */}
            <input
                type="checkbox"
                checked={checkboxes[4]}
                onChange={() => handleCheckboxChange(4)}
            />
            {/* Checkbox 6 */}
            <input
                type="checkbox"
                checked={checkboxes[5]}
                onChange={() => handleCheckboxChange(5)}
            />
            {/* Checkbox 7 */}
            <input
                type="checkbox"
                checked={checkboxes[6]}
                onChange={() => handleCheckboxChange(6)}
            />
            {/* Clear Selection Button */}
            <button onClick={handleClearSelection}>Clear Selection</button>
        </div>
    );
};

export default Demo;
