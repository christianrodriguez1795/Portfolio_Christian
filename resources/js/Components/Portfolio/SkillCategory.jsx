import React from 'react';

const SkillCategory = ({ title, skills, className }) => (
    <div data-aos="fade-right" className={`flex flex-col hover:gap-3 md:gap-3 flex-grow group ${className}`}>
        <h6 className='text-lg font-bold text-center'>{title}</h6>
        <div className='text-xs md:text-[20px] flex flex-wrap gap-1 justify-center transition-all duration-300 md:flex max-h-0 md:max-h-full overflow-hidden group-hover:max-h-40'>
            {skills.map((skill) => (
                <div key={skill} className='bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded text-center'>
                    {skill}
                </div>
            ))}
        </div>
    </div>
);

export default SkillCategory;
