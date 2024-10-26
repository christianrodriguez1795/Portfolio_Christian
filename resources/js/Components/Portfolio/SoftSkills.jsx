import React from 'react';
import { softSkillsPortfolio } from '@/Hooks/datosPorfolio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SoftSkills = () => {

    return (
        <div className="flex flex-col gap-3 flex-grow">
            <div className="text-xs md:text-[20px] flex flex-wrap gap-1 md:gap-3 justify-center overflow-y-auto touch-pan-y">
                {softSkillsPortfolio.map((softSkill, index) => (
                    <div key={`${softSkill}-${index}`} className="flex items-center bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded text-center font-semibold">
                        {/* {skill.titulo} */}

                        <FontAwesomeIcon icon={softSkill.icono} className=" mr-2 w-4" />
                        <p className="">{softSkill.titulo}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SoftSkills;
