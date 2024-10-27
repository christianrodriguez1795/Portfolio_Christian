import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const CustomSelect = ({ options = [], value = [], onChange = () => { }, label = '', error = '', darkMode = false, multiple = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState(value || []);
    const [filterText, setFilterText] = useState('');
    const selectRef = useRef();

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(filterText.toLowerCase())
    );

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
        event.preventDefault();
        setIsOpen(!isOpen);
        setFilterText(''); // Reset filter text when opening the dropdown
    };

    const handleSelect = (optionValue) => {
        let newValues;
        if (multiple) {
            newValues = selectedValues.includes(optionValue)
                ? selectedValues.filter(v => v !== optionValue)
                : [...selectedValues, optionValue];
        } else {
            newValues = [optionValue];
            setIsOpen(false);
        }
        setSelectedValues(newValues);
        onChange(newValues);
    };
    const buttonRef = useRef(null);
    const [buttonWidth, setButtonWidth] = useState(0);

    useEffect(() => {
        // Verifica si el botón tiene una referencia antes de obtener el ancho
        if (buttonRef.current) {
            setButtonWidth(buttonRef.current.offsetWidth);
        }
    }, []);   

    return (
        <div className={`relative flex-grow ${isOpen ? '' : 'overflow-hidden'}`} ref={selectRef}>
            <label
                onClick={handleToggle}
                htmlFor="custom-select"
                className={`w-full absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200 
                    transform ${selectedValues.length ? '-translate-y-6 scale-75' : 'scale-100 translate-y-0'} origin-left 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 hover:cursor-pointer`}
            >
                {label}
            </label>
            <div className=" w-full ">

                <button
                    ref={buttonRef}
                    onClick={handleToggle}
                    className={`peer pl-0 p-3 pt-5 w-full text-left border-b-2 border-t-0 border-l-0 border-r-0 border-[#757575] bg-transparent
                        text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0 focus:border-[#2c2c2c] dark:focus:border-[#A9A9A9]
                        dark:border-white dark:bg-transparent flex justify-between items-center overflow-hidden`}
                    type="button"
                >
                    {/* <span className={`truncate pr-3 `} style={{ maxWidth: `${buttonWidth - 14}px ` }}>
                            {selectedValues.length ? selectedValues.map(val => options.find(option => option.value === val)?.label).join(', ') : ''}
                        </span> */}


                    <span className="whitespace-nowrap text-ellipsis pr-3 overflow-hidden">
                        {selectedValues.length ? selectedValues.map((val, index) => {
                            const label = options.find(option => option.value === val)?.label;
                            return index < 3 ? label : null;
                        }).filter(Boolean).join(', ') + (selectedValues.length > 3 ? ', ...' : '') : ''}
                    </span>

                    <span className={`transform duration-500 ${isOpen ? 'rotate-180' : ''} transition-transform text-[#757575] dark:text-white`}>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                </button>

                {/* {isOpen && ( */}
                <div className={`transition-all duration-300 ease-in-out absolute w-full border border-gray-300  dark:border-[#6e6e6e] rounded-md bg-white dark:bg-[#ffffff] 
                    z-10 ${darkMode ? 'scrollbarGenerico-dark' : 'scrollbarGenerico-light'}  scrollbarGenerico ${isOpen ? 'h-fit p-2 mt-2 opacity-100' : 'h-0 opacity-0'} overflow-hidden`}>
                    <div className={`pb-2 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="text-black dark:text-black peer w-full border border-[#757575] dark:border-[#757575] 
                                bg-transparent rounded-lg focus:outline-none focus:ring-0 focus:border-black dark:focus:border-[#2c2c2c] 
                                dark:bg-transparent placeholder-[#757575] dark:placeholder-[#757575] shadow-lg"
                        />


                    </div>
                    <ul className={`list-none p-0 m-0 max-h-[205px] overflow-y-auto scrollbarGenerico ${darkMode ? 'scrollbarGenerico-dark' : 'scrollbarGenerico-light'}`}>
                        {filteredOptions.length ? (
                            filteredOptions.map((option) => (
                                <li
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    className={`px-4 py-2 mr-1 cursor-pointer rounded-md transition-all duration-300 mb-[1px]
                                            ${selectedValues.includes(option.value) ? 'text-white bg-[#2c2c2c] dark:text-white dark:bg-[#2c2c2c] hover:bg-[#757575] dark:hover:bg-[#757575]' : 'hover:text-white hover:bg-[#757575] dark:hover:text-white dark:hover:bg-[#757575]'}`}
                                >
                                    {option.label}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-black dark:text-black">No hay opciones</li>
                        )}
                    </ul>
                </div>
                {/* )} */}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

    );
};

// CustomSelect.propTypes = {
//     options: PropTypes.arrayOf(
//         PropTypes.shape({
//             label: PropTypes.string.isRequired,
//             value: PropTypes.string.isRequired,
//         })
//     ).isRequired,
//     value: PropTypes.arrayOf(PropTypes.string),
//     onChange: PropTypes.func.isRequired,
//     label: PropTypes.string.isRequired,
//     error: PropTypes.string,
//     darkMode: PropTypes.bool,
//     multiple: PropTypes.bool,
// };

export default CustomSelect;
