import React from 'react';

const SoftSkills = () => {
    const softSkills = [
        'Ética Profesional', 'Visión a Largo Plazo', 'Auto-motivación', 'Tolerancia a la Ambigüedad', 
        'Perseverancia', 'Gestión de Conflictos', 'Pensamiento Estratégico', 'Innovación', 
        'Habilidades Interpersonales', 'Comunicación Efectiva', 'Adaptabilidad', 'Pensamiento Crítico', 
        'Creatividad', 'Responsabilidad', 'Empatía'
    ];

    return (
        <div className="flex flex-col gap-3 flex-grow">
            <div className="text-xs md:text-[20px] flex flex-wrap gap-1 md:gap-3 justify-center overflow-y-auto touch-pan-y">
                {softSkills.map((skill) => (
                    <div key={skill} className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded text-center font-semibold">
                        {skill}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SoftSkills;
