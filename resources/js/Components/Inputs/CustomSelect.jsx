import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const CustomSelect = ({ options, value, onChange, label, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const selectRef = useRef();

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (optionValue) => {
        setSelectedValue(optionValue);
        setIsOpen(false);
        onChange(optionValue);
    };

    return (
        <div className="relative flex-grow w-12">
            <label
                htmlFor="custom-select"
                className={`absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200 
                    transform ${selectedValue ? '-translate-y-6 scale-75' : 'scale-100 translate-y-0'} origin-left 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
            >
                {label}
            </label>
            <div className="relative">
                <button
                    ref={selectRef}
                    onClick={handleToggle}
                    className={`peer pl-0 p-3 pt-5 w-full text-left border-b-2 border-t-0 border-l-0 border-r-0 border-black bg-transparent
                        text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0 focus:border-[#A9A9A9] dark:focus:border-[#A9A9A9]
                        dark:border-white dark:bg-transparent flex justify-between items-center fixed-width-select`}
                >
                    <span className="truncate">{selectedValue ? options.find(option => option.value === selectedValue)?.label : ''}</span>
                    <span className={`transform ${isOpen ? 'rotate-180' : ''} transition-transform`}>
                        ▼
                    </span>
                </button>
                {isOpen && (
                    <ul className="absolute w-full border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 mt-2 z-10">
                        <li
                            key="none"
                            onClick={() => handleSelect('')}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            {label}
                        </li>
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

CustomSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
};

export default CustomSelect;
