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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function Portfolio({ auth, proyectos }) {
    const [checked, setChecked] = useState(() => {
        const localTheme = localStorage.getItem('theme');
        return localTheme ? localTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const sectionsRef = useRef([]);
    const videoRef = useRef(null);
    const scrollTimeout = useRef(null);

    const handleScroll = useCallback((event) => {
        if (window.innerWidth < 1024) return;
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

    const scrollToContact = () => {
        sectionsRef.current[5].scrollIntoView({ behavior: 'smooth' });
    };


    useEffect(() => {
        if (videoRef.current) {
            let options = {
                root: null,
                rootMargin: "0px",
                threshold: 0.1
            };

            let observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    let video = entry.target;
                    if (entry.isIntersecting) {
                        video.play(); // Reproduce el video si es visible
                    } else {
                        video.pause(); // Pausa el video si no es visible
                    }
                });
            }, options);

            observer.observe(videoRef.current); // Observa el video referenciado

            // Cleanup al desmontar el componente
            return () => {
                if (videoRef.current) {
                    observer.unobserve(videoRef.current);
                }
            };
        }
    }, []);

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

                <SectionContainer ref={el => sectionsRef.current[0] = el} className="video-container section lg:h-screen flex justify-center items-center">
                    <video ref={videoRef} autoPlay loop muted className="video-background" preload="auto">
                        <source src="/storage/loopLetrasWeb.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="relative text-black dark:text-white flex flex-col gap-12 justify-center items-center flex-grow z-[2] h-full">
                        <div className='flex flex-col gap-4'>
                            <h1 data-aos="fade-down" className='px-2 md:p-0 text-4xl md:text-7xl font-bold text-center'>Christian Rodríguez Ponce de León</h1>
                            <p data-aos="fade-left" className='hidden md:block px-2 md:p-0 text-xl md:text-4xl text-center'>Desarrollador Fullstack | {typedText}</p>
                            <p data-aos="fade-left" className='md:hidden px-2 md:p-0 text-xl md:text-4xl text-center'>Desarrollador Fullstack</p>
                            <p data-aos="fade-left" className='md:hidden px-2 md:p-0 text-xl md:text-4xl text-center'>| {typedText}</p>
                            <p data-aos="fade-up" className='px-2 md:px-0 text-xl md:text-4xl italic font-thin text-center pt-8'>“Primero resuelve el problema, después escribe el código”</p>
                        </div>
                    </div>
                </SectionContainer>

                <SectionContainer id="about" ref={el => sectionsRef.current[1] = el} title={'SOBRE MÍ'} className="section lg:h-screen flex justify-center">
                    <div className='flex flex-col gap-6 flex-grow'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6'>
                            <img data-aos="fade-right" className='w-full lg:h-full object-cover rounded-md' src="/storage/Foto_Generica_Sobre_Mi.jpg" alt="Christian Rodríguez" />
                            <div data-aos="fade-left" className='flex flex-col gap-4 sm:text-sm md:text-[19px] w-full text-justify flex-grow lg:px-6 hyphens-auto'>
                                <p data-aos="fade-up" data-aos-duration='1200' data-aos-offset="200" className=''>
                                    ¡Hola! Soy <strong>Christian Rodríguez</strong>, desarrollador Full-Stack con experiencia en la creación de aplicaciones web escalables y modernas. Con una sólida formación en <strong>HTML5, CSS3, JavaScript, PHP</strong> y frameworks como <strong>React y Laravel</strong>, me especializo en crear soluciones eficientes que combinan <strong>estética y funcionalidad</strong>.
                                </p>
                                <p data-aos="fade-up" data-aos-duration='1500' className=''>
                                    Me apasiona cómo la <strong>tecnología</strong> tiene el poder de transformar la forma en que vivimos y trabajamos. Desde mis inicios en el desarrollo, me he dedicado a perfeccionar mi habilidad para construir plataformas que no solo funcionen, sino que brinden una <strong>experiencia de usuario única</strong>.
                                </p>
                                <p data-aos="fade-up" data-aos-duration='1700' className=''>
                                    A lo largo de mi carrera, he trabajado en proyectos como la integración de <strong>Laravel y React</strong>, usando tecnologías modernas como <strong>Inertia.js</strong> y desplegando aplicaciones con <strong>Docker</strong>. Además, tengo experiencia en bases de datos <strong>SQL y NoSQL</strong>, lo que me permite desarrollar sistemas robustos y seguros.
                                </p>
                                <p data-aos="fade-up" data-aos-duration='1900' className=''>
                                    Valoro profundamente el trabajo en equipo y la <strong>comunicación efectiva</strong>, dos aspectos clave para el éxito de cualquier proyecto. Mi enfoque siempre está en la <strong>innovación</strong> y en cómo seguir aprendiendo para adaptarme a las nuevas tecnologías.
                                </p>
                            </div>
                        </div>
                        <div className='flex justify-center items-center flex-grow'>
                            <button data-aos="fade-left"
                                onClick={scrollToContact}
                                className="md:w-fit h-fit flex flex-col flex-grow md:flex-grow-0 justify-center items-center gap-2 bg-[#00000065] dark:bg-[#ffffff63] text-white dark:text-black 
                            font-bold px-6 py-2 rounded-lg transition-all duration-1000 ease-in-out hover:bg-black dark:hover:bg-white">
                                <span className='text-base'>¿Listo para dar vida a tus ideas?</span>
                                <FontAwesomeIcon icon={faChevronDown} className="text-white dark:text-black animate-bounce-slow" />
                            </button>
                        </div>
                    </div>
                </SectionContainer>


                <SectionContainer id="education" ref={el => sectionsRef.current[2] = el} title={'EDUCACIÓN'} className="section lg:h-screen flex flex-col justify-center items-center">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:px-44 gap-4 md:gap-20'>
                        <div className='flex flex-col gap-4 md:gap-12  w-full'>
                            <div data-aos="fade-up" className="text-xl md:text-4xl font-bold text-center">Formación Académica</div>

                            <div className='flex justify-center'>
                                <div className="relative w-fit">

                                    <div data-aos="fade-up-right" className="absolute inset-0 flex justify-start">
                                        <div className="w-1 bg-black dark:bg-white"></div>
                                    </div>

                                    {educacion.map((item, index) => (
                                        <div key={index} className="relative mb-4 md:mb-10 ml-10">
                                            <div data-aos="fade-up-right" className="absolute w-6 h-6 bg-black dark:bg-white rounded-full -left-[50px]"></div>
                                            <h3 data-aos="fade-up" data-aos-duration={item.aosDelay} className="text-lg md:text-2xl font-semibold">{item.titulo}</h3>
                                            <span data-aos="fade-up" data-aos-duration={item.aosDelay + 200}
                                                className="block text-sm md:text-md text-gray-500 dark:text-gray-400 italic mb-2">
                                                {item.institucion} {item.fecha ? '(' + item.fecha + ')' : ''}
                                            </span>
                                            <p data-aos="fade-up" data-aos-duration={item.aosDelay + 400}
                                                className="hidden xs:block text-xs md:text-base text-gray-700 dark:text-gray-300">
                                                {item.descripcion}
                                            </p>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-4 md:gap-12  w-full'>
                            <div data-aos="fade-up" className="text-xl md:text-4xl font-bold text-center">Experiencia laboral</div>

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


                <SectionContainer id="skills" ref={el => sectionsRef.current[3] = el} title={'HABILIDADES'} className="section lg:h-screen flex justify-center items-center">
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


                <SectionContainer id="projects" ref={el => sectionsRef.current[4] = el} title={'PROYECTOS'} className="section lg:h-screen flex ">
                    <Proyectos proyectos={proyectos} />
                </SectionContainer>


                <SectionContainer id="contact" ref={el => sectionsRef.current[5] = el} title={'CONTACTO'} className="section lg:h-screen justify-center items-center">
                    <div className='flex h-full flex-col gap-8 md:gap-0 flex-grow justify-between items-center'>
                        <div className='max-w-2xl flex flex-col items-center text-center'>
                            <h2 data-aos="fade-up" data-aos-duration='1200' className='text-lg md:text-3xl font-bold'>
                                ¡Haz que tus ideas cobren vida!
                            </h2>
                            {/* <p data-aos="fade-up" data-aos-duration='1400' className='text-md font-semibold'>
                                Este es el impulso que tu proyecto necesita para avanzar.
                            </p> */}
                            <p data-aos="fade-up" data-aos-duration='1600' className='text-md font-semibold'>
                                ¿Te gustaría que lo hiciéramos realidad juntos?
                            </p>
                        </div>
                        <div data-aos="fade-left" className='w-full flex justify-center'>
                            <ContactForm setSnackbar={setSnackbar} />
                        </div>
                        <footer className="flex flex-col gap-2 bg-white text-black dark:bg-black dark:text-white md:pt-0 md:py-16 text-center text-sm md:flex-grow-0 h-fit justify-end">
                            <p data-aos="fade-down">© 2024 Christian Rodríguez Ponce de León. Todos los derechos reservados.</p>
                            <div className="flex justify-center">
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


