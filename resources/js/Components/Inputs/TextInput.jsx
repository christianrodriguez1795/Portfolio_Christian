import React from 'react';

const TextInput = ({ key = '', id, name, type = "text", value, required, onChange, label, placeholder, textarea, darkMode, aos, aosDuration = '1000', children }) => {
    return (
        <div key={key}
            className="relative flex-grow"
            {...(aos && { "data-aos": aos })}
            {...(aosDuration && { "data-aos-duration": aosDuration })}
        >
            {textarea ? (
                <textarea
                    id={id}
                    name={name}
                    rows="4"
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`peer pl-0 p-3 ${children ? 'pr-8' : ''} mt-5 pt-0 w-full border-b-2 border-t-0 border-l-0 border-r-0 border-[#757575] bg-transparent
                    focus:outline-none focus:ring-0 focus:border-[#2c2c2c] resize-none dark:focus:border-[#A9A9A9] dark:border-white dark:bg-transparent dark:text-white
                    placeholder-transparent focus:placeholder-gray-500 peer-focus:placeholder-gray-500 transition-colors duration-300 ease-in-out 
                    scrollbarGenerico ${darkMode ? 'scrollbarGenerico-dark' : 'scrollbarGenerico-light'}`}
                    placeholder={placeholder ? placeholder : ''}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`peer pl-0 p-3 ${children ? 'pr-10' : ''} pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0 border-[#757575] bg-transparent
                    focus:outline-none focus:ring-0 focus:border-[#2c2c2c] dark:focus:border-[#A9A9A9] dark:border-white 
                    dark:bg-transparent dark:text-white placeholder-transparent focus:placeholder-gray-500 
                    peer-focus:placeholder-gray-500 transition-colors duration-300 ease-in-out`}
                    placeholder={placeholder ? placeholder : ''}
                />


            )}
            <label
                htmlFor={id}
                className="absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200
                  transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                {label}
            </label>

            {children}
        </div>
    );
};

export default TextInput;
