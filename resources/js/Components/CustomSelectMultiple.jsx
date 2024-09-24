import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const CustomSelectMultiple = ({ options, value, onChange, label, error, darkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState(value || []);
    const selectRef = useRef();

    useEffect(() => {
        setSelectedValues(value || []);
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleToggle = (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto
        setIsOpen(!isOpen);
    };

    const handleSelect = (optionValue) => {
        const newValues = selectedValues.includes(optionValue)
            ? selectedValues.filter(v => v !== optionValue)
            : [...selectedValues, optionValue];

        setSelectedValues(newValues);
        onChange(newValues);
    };

    return (
        <div className="relative flex-grow" ref={selectRef}>
            <label
                htmlFor="custom-select"
                className={`absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200 
                    transform ${selectedValues.length ? '-translate-y-6 scale-75' : 'scale-100 translate-y-0'} origin-left 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
            >
                {label}
            </label>
            <div className="relative w-full flex-grow">
                <button
                    onClick={handleToggle}
                    className={`peer pl-0 p-3 pt-5 w-full text-left border-b-2 border-t-0 border-l-0 border-r-0 border-black bg-transparent
                        text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0 focus:border-[#A9A9A9] dark:focus:border-[#A9A9A9]
                        dark:border-white dark:bg-transparent flex justify-between items-center`}
                    type="button" // Asegura que el botón no envíe formularios por accidente
                >
                    <span className="truncate">
                        {selectedValues.length ? selectedValues.map(val => options.find(option => option.value === val)?.label).join(', ') : ''}
                    </span>
                    <span className={`transform ${isOpen ? 'rotate-180' : ''} transition-transform`}>
                        ▼
                    </span>
                </button>
                {isOpen && (
                    <div className={`absolute w-full border border-gray-300 rounded-md bg-white mt-2 z-10 ${darkMode ? 'scrollbarGenerico-dark' : 'scrollbarGenerico-light'} max-h-60 overflow-y-auto scrollbarGenerico`}>
                        <ul className="list-none p-0 m-0">
                            {options.length ? (
                                options.map((option) => (
                                    <li
                                        key={option.value}
                                        onClick={() => handleSelect(option.value)}
                                        className={`px-4 py-2 cursor-pointer rounded-md ${selectedValues.includes(option.value) ? 'bg-blue-400 hover:bg-blue-500' : 'hover:bg-gray-200'}`}
                                    >
                                        {option.label}
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-2 text-gray-500">No options available</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

CustomSelectMultiple.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    darkMode: PropTypes.bool, // Añadido para permitir el cambio de clase basado en el modo oscuro
};

export default CustomSelectMultiple;
