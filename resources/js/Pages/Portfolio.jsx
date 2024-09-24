import React, { useState, useEffect, useRef, useCallback } from 'react';
import SectionContainer from '@/Components/SectionContainer';
import SwitchTheme from '@/Components/SwitchTheme';
import { Link, Head } from '@inertiajs/react';
import Proyectos from '@/Components/Projects';
import ContactForm from '@/Components/Formularios/ContactForm';
import { Snackbar, Alert } from '@mui/material';
import useTypewriter from '@/Hooks/useTypewriter';
import SkillCategory from '@/Components/Portfolio/SkillCategory';
import SoftSkills from '@/Components/Portfolio/SoftSkills';
import SocialLink from '@/Components/Portfolio/SocialLink';
import { educacion, experienciaLaboral, socialLinks } from '@/Hooks/datosPorfolio';

export default function Portfolio({ auth, proyectos }) {
    const [checked, setChecked] = useState(() => {
        const localTheme = localStorage.getItem('theme');
        return localTheme ? localTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const sectionsRef = useRef([]);
    const scrollTimeout = useRef(null);

    const handleScroll = useCallback((event) => {
        if (event.ctrlKey) return;

        event.preventDefault();
        clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
            const direction = event.deltaY > 0 ? 'down' : 'up';
            const currentSectionIndex = sectionsRef.current.findIndex(section => {
                const rect = section.getBoundingClientRect();
                return rect.top >= 0 && rect.top < window.innerHeight;
            });

            if (direction === 'down' && currentSectionIndex < sectionsRef.current.length - 1) {
                sectionsRef.current[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
            } else if (direction === 'up' && currentSectionIndex > 0) {
                sectionsRef.current[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }, []);

    useEffect(() => {
        window.addEventListener('wheel', handleScroll, { passive: false });
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [handleScroll]);

    const handleToggleChange = (e) => {
        const newValue = e.target.checked;
        setChecked(newValue);
        localStorage.setItem('theme', newValue ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newValue);
    };

    useEffect(() => {
        document.documentElement.classList.toggle('dark', checked);
    }, [checked]);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleClose = useCallback(() => {
        setSnackbar(prev => ({ ...prev, open: false }));
    }, []);

    const technologies = ['HTML', 'CSS', 'JavaScript', 'Java', 'PHP'];
    const typedText = useTypewriter(technologies, 200);    

    return (
        <>
            <Head title="Portfolio" />
            <header className="bg-transparent flex justify-end items-center gap-2 px-4 py-4 fixed z-30 w-full">
                <nav className="flex justify-end items-center">
                    {auth.user && (
                        <Link
                            href={route('dashboard')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Panel de control
                        </Link>
                    )}
                    <SwitchTheme
                        name="theme"
                        value=""
                        checked={checked}
                        onChange={handleToggleChange}
                    />
                </nav>
            </header>
            <main className="bg-white text-black dark:bg-black dark:text-white scrollbarNav scrollbarGenerico-light">

                <SectionContainer ref={el => sectionsRef.current[0] = el} className="video-container section h-screen flex justify-center items-center lg:overflow-y-hidden overflow-x-hidden">
                    <video autoPlay loop muted className="video-background" preload="auto">
                        <source src="/storage/loopLetras.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="relative text-black dark:text-white flex flex-col justify-center items-center flex-grow z-[2] h-full">
                        <div className='flex flex-col gap-4'>
                            <h1 data-aos="fade-down" className='px-2 md:p-0 text-4xl md:text-7xl font-bold text-center'>Christian Rodríguez Ponce de León</h1>
                            <p data-aos="fade-left" className='hidden md:block px-2 md:p-0 text-xl md:text-4xl text-center'>Desarrollador Fullstack | {typedText}</p>
                            <p data-aos="fade-left" className='md:hidden px-2 md:p-0 text-xl md:text-4xl text-center'>Desarrollador Fullstack</p>
                            <p data-aos="fade-left" className='md:hidden px-2 md:p-0 text-xl md:text-4xl text-center'>| {typedText}</p>
                            <p data-aos="fade-up" className='px-2 md:px-0 text-xl md:text-4xl italic font-thin text-center pt-8'>“Primero resuelve el problema, después escribe el código”</p>
                        </div>
                    </div>
                </SectionContainer>

                <SectionContainer ref={el => sectionsRef.current[1] = el} title={'SOBRE MI'} className="section h-screen flex justify-center lg:overflow-y-hidden overflow-x-hidden">
                    <div className='flex flex-col gap-6 flex-grow'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6'>
                            <img data-aos="fade-right" className='w-full lg:h-full object-cover rounded-md' src="/storage/Foto_Generica_Sobre_Mi.jpg" alt="" />
                            <div data-aos="fade-left" className='sm:text-sm md:text-[19px] w-full md:text-justify flex-grow lg:px-6'>
                                <p className='pb-3 md:pb-10'>¡Hola! Soy Christian, un apasionado desarrollador Full-Stack con experiencia en la creación y mantenimiento de aplicaciones web. Mi enfoque principal es combinar estética y funcionalidad para crear soluciones tecnológicas innovadoras.</p>
                                <p className='pb-3 md:pb-10 hidden xs:block'>Desde muy joven, siempre me ha fascinado cómo la tecnología puede transformar la manera en que vivimos y trabajamos.</p>
                                <p className='pb-3 md:pb-10 hidden lg:block'>Además de mis habilidades técnicas, también valoro la importancia de la comunicación efectiva y el trabajo en equipo.</p>
                                <p className='hidden lg:block'>Fuera del trabajo, siempre busco aprender y crecer profesionalmente.</p>
                            </div>
                        </div>
                    </div>
                </SectionContainer>

                <SectionContainer ref={el => sectionsRef.current[2] = el} title={'EDUCACIÓN'} className="section h-screen flex flex-col justify-center items-center lg:overflow-y-hidden overflow-x-hidden">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:px-44 gap-4 md:gap-20'>
                        <div className='flex flex-col md:gap-12  w-full'>
                            <div data-aos="fade-up" className="text-xl md:text-4xl font-bold text-center mb-4 md:mb-12">Formación Académica</div>

                            <div className='flex justify-center'>
                                <div className="relative w-fit">

                                    <div data-aos="fade-up-right" className="absolute inset-0 flex justify-start">
                                        <div className="w-1 bg-black dark:bg-white"></div>
                                    </div>

                                    {educacion.map((item, index) => (
                                        <div key={index} className="relative mb-4 md:mb-10 ml-10">
                                            <div data-aos="fade-up-right" className="absolute w-6 h-6 bg-black dark:bg-white rounded-full -left-[50px]"></div>
                                            <h3 data-aos="fade-up" data-aos-duration={item.aosDelay} className="text-lg md:text-2xl font-semibold">{item.titulo}</h3>
                                            <span data-aos="fade-up" data-aos-duration={item.aosDelay + 200} className="block text-sm md:text-md text-gray-500 dark:text-gray-400 italic mb-2">{item.institucion} ({item.fecha})</span>
                                            <p data-aos="fade-up" data-aos-duration={item.aosDelay + 400} className="hidden xs:block text-xs md:text-base text-gray-700 dark:text-gray-300">{item.descripcion}</p>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col md:gap-12  w-full'>
                            <div data-aos="fade-up" className="text-xl md:text-4xl font-bold text-center mb-4 md:mb-12">Experiencia laboral</div>

                            <div className='flex justify-center'>
                                <div className="relative w-fit">

                                    <div data-aos="fade-up-right" className="absolute inset-0 flex justify-start">
                                        <div className="w-1 bg-black dark:bg-white"></div>
                                    </div>

                                    {experienciaLaboral.map((item, index) => (
                                        <div key={index} className="relative mb-4 md:mb-10 ml-10">
                                            <div data-aos="fade-up-right" className="absolute w-6 h-6 bg-black dark:bg-white rounded-full -left-[50px]"></div>
                                            <h3 data-aos="fade-up" data-aos-duration={item.aosDelay} className="text-lg md:text-2xl font-semibold">{item.titulo}</h3>
                                            <span data-aos="fade-up" data-aos-duration={item.aosDelay + 200} className="block text-sm md:text-md text-gray-500 dark:text-gray-400 italic mb-2">{item.empresa} {item.fecha ? '(' + item.fecha + ')' : ''}</span>
                                            <p data-aos="fade-up" data-aos-duration={item.aosDelay + 400} className="hidden xs:block text-xs md:text-base text-gray-700 dark:text-gray-300">{item.descripcion}</p>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </SectionContainer>


                <SectionContainer ref={el => sectionsRef.current[3] = el} title={'HABILIDADES'} className="section h-screen flex justify-center items-center lg:overflow-y-hidden overflow-x-hidden">
                    <div className='flex flex-col gap-6 md:gap-14 flex-grow lg:px-44'>
                        <div className='flex flex-col gap-6'>
                            <div data-aos="fade-down" className='text-3xl text-center font-bold '>Hard</div>
                            <div className='grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-14'>
                                <SkillCategory title="Front-End" skills={['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'SASS']} />
                                <SkillCategory title="Back-End" skills={['PHP', 'Java', 'Laravel']} />
                                <SkillCategory title="Bases de datos" skills={['SQL', 'NoSQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Oracle']} className="col-span-2" />
                            </div>
                            <div className='grid grid-cols-2 md:grid-cols-2 gap-6 pt-[32px]'>
                                <SkillCategory title="DevOps" skills={['Docker', 'Apache', 'Git']} />
                                <SkillCategory title="Otros" skills={['Kotlin', 'XML', 'JSON']} />
                            </div>
                        </div>

                        <div data-aos="fade-up" className="flex flex-col gap-1 md:gap-6 flex-grow group">
                            <div className="text-3xl text-center font-bold">Soft</div>
                            <SoftSkills />
                        </div>
                    </div>
                </SectionContainer>


                <SectionContainer ref={el => sectionsRef.current[4] = el} title={'PROYECTOS'} className="section h-screen flex lg:overflow-y-hidden overflow-x-hidden">
                    <Proyectos proyectos={proyectos} />
                </SectionContainer>
                <SectionContainer ref={el => sectionsRef.current[5] = el} title={'CONTACTO'} className="section h-screen justify-center items-center lg:overflow-y-hidden overflow-x-hidden">
                    <div className='flex h-full flex-col flex-grow md:justify-between'>
                        <div data-aos="fade-left" className='w-full flex justify-center'>
                            <ContactForm setSnackbar={setSnackbar} />
                        </div>
                        <footer className="bg-white text-black dark:bg-black dark:text-white pt-8 md:pt-0 md:py-16 text-center text-sm flex-grow md:flex-grow-0">
                            <p data-aos="fade-down">© 2024 Christian Rodríguez Ponce de León. Todos los derechos reservados.</p>
                            <div className="flex justify-center mt-2 md:mt-4">
                                {socialLinks.map((item, index) => (
                                    <SocialLink key={index} href={item.href} icon={item.icon} animation={item.animation} />
                                ))}
                            </div>
                        </footer>
                    </div>
                </SectionContainer>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </main >
        </>
    );
}


