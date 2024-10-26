import React, { useState } from 'react';

const SkillCategory = ({ title, skills, className }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div data-aos="fade-right"
            className={`flex flex-col items-center md:gap-3 flex-grow group ${className}`}        >
            <h6 className='w-fit text-lg font-bold text-center cursor-pointer md:cursor-auto animate-pulse lg:animate-none'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                {title}
            </h6>
            <div
                className={`text-xs md:text-[20px] flex flex-wrap gap-1 justify-center transition-all duration-500 ease-in-out md:flex ${isHovered ? 'max-h-40 mt-3 lg:mt-0 opacity-100' : 'max-h-0 mt-0 opacity-0 lg:opacity-100'} lg:max-h-full overflow-hidden `}
            >
                {skills.map((skill) => (
                    <div key={skill} className='bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded text-center font-semibold'>
                        {skill}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillCategory;



