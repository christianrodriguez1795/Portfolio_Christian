import SectionContainer from '@/Components/SectionContainer';
import SwitchTheme from '@/Components/Inputs/SwitchTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronDown, faEye } from '@fortawesome/free-solid-svg-icons';
import { Head, Link } from '@inertiajs/react';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { iconMap } from '@/Hooks/datosPorfolio';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Details({ project }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [checked, setChecked] = useState(() => {
    const localTheme = localStorage.getItem('theme');
    return localTheme ? localTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const sectionsRef = useRef([]);
  console.log(sectionsRef);
  // Reiniciamos el array de referencias cada vez que el componente se renderiza
  sectionsRef.current = [];
  const addSectionRef = (el) => {
    // Solo agregamos la referencia si el elemento está presente (renderizado)
    if (el) {
      sectionsRef.current.push(el);
    }
  };

  const videoRef = useRef(null);
  const scrollTimeout = useRef(null);
  // Decodificar detalles JSON
  const projectDetails = project.details.length > 0 ? JSON.parse(project.details[0].details) : null;
  let sectionIndex = 0;
  console.log('project');
  console.log(project);

  // Manejar redimensionamiento de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScroll = useCallback((event) => {
    if (window.innerWidth < 1024) return;
    if (event.ctrlKey) return;

    event.preventDefault();
    clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      const direction = event.deltaY > 0 ? 'down' : 'up';
      const currentSectionIndex = sectionsRef.current.findIndex((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight;
      });
      console.log(currentSectionIndex);
      console.log(sectionsRef.current.length - 1);


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

  const scrollToVisit = () => {
    sectionsRef.current[5].scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Head title={`Project Details - ${project.title}`} />

      <header className="bg-white md:bg-transparent dark:bg-black dark:md:bg-transparent flex justify-end items-center gap-2 px-4 py-4 fixed z-30 w-full shadow-none md:shadow-none">
        <nav className="flex justify-between items-center w-full">
          <Link
            href={route('portfolio.home') + '#projects'}
            className="flex items-center rounded-md text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
          >
            <FontAwesomeIcon icon={faArrowLeft} className='w-[24px] h-[24px]' />
          </Link>

          <div data-aos="fade-down" className='block md:hidden text-black dark:text-white text-center z-50'>
            <span className="text-xl font-semibold">{project.title}</span>
          </div>

          <SwitchTheme
            name="theme"
            value=""
            checked={checked}
            onChange={handleToggleChange}
          />
        </nav>
        <div className="absolute -bottom-[14px] left-0 w-full h-4 bg-gradient-to-b md:hidden from-white to-transparent dark:from-black dark:to-transparent"></div>
      </header>

      <main className="bg-white text-black dark:bg-black dark:text-white scrollbarNav scrollbarGenerico-light overflow-hidden">


        <SectionContainer ref={addSectionRef} title={isMobile ? false : project.title}
          className="section lg:h-screen flex justify-center gap-5 md:gap-[10px] pb-12 pt-[62px] md:pt-[4px] px-5 md:px-14 relative"
          classNameContent="justify-center">
          <div className='w-full flex justify-center items-center pt-5 xs:pt-0'>
            <div className='max-w-4xl w-full flex flex-col gap-5 md:gap-8 justify-center items-center'>

              <div className='w-full flex justify-center'>
                <div data-aos="fade-up" data-aos-duration='1400'
                  className='max-w-4xl min-h-[200px] md:min-h-[532.83px] w-full flex justify-center items-center rounded-lg 
                border dark:border-white'
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              <p data-aos="fade-up" data-aos-duration='1800' className="text-base lg:text-xl text-black dark:text-white 
              text-justify hyphens-auto">
                {project.description}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {project.skills.map((tech, index) => {
                  const Icon = iconMap[tech.name];
                  return (
                    <span key={index} data-aos="fade-up" data-aos-duration={1000 + (index * 200)} className="flex gap-2 items-center 
                    bg-black dark:bg-white rounded-full px-4 py-2 text-sm font-semibold text-white dark:text-black">
                      {Icon && <Icon className="w-5 h-5" />}
                      {tech.name}
                    </span>
                  )
                })}
              </div>

              <div data-aos="fade-up" data-aos-duration='3000' className='flex justify-center items-center flex-grow'>
                <FontAwesomeIcon icon={faChevronDown} className="animate-bounce-slow" />
              </div>

            </div>
          </div>
        </SectionContainer>
        {console.log(projectDetails)}


        {projectDetails && (
          <>
            {projectDetails.find(detail => detail.category === 'Objetivos') && (
              <SectionContainer
                ref={addSectionRef}
                title={'Objetivos'}
                className="section h-screen flex justify-center items-stretch gap-5 md:gap-[52px] pb-12 md:pt-[4px] px-5 md:px-14"
              >
                <div className='w-full flex flex-col justify-end items-center h-full gap-5'>
                  <div className='flex flex-col gap-5 flex-grow justify-start md:justify-center'>
                    <ul className='max-w-4xl w-full flex flex-col gap-8 justify-center items-start list-disc list-outside'>
                      {projectDetails
                        .filter(detail => detail.category === 'Objetivos')
                        .map((detail) =>
                          detail.descriptions.map((objective, index) => (
                            <li key={index} data-aos="fade-up"
                              data-aos-duration={1000 + (index * 200)}
                              className="text-lg lg:text-xl text-black dark:text-white text-justify hyphens-auto ml-5 w-fit"
                            >
                              {objective}
                            </li>
                          ))
                        )}
                    </ul>
                  </div>
                  <div data-aos="fade-up" data-aos-duration='1500' className='flex justify-center items-center'>
                    <FontAwesomeIcon icon={faChevronDown} className="animate-bounce-slow" />
                  </div>
                </div>
              </SectionContainer>
            )}

            {projectDetails.find(detail => detail.category === 'Funcionalidades') && (
              <SectionContainer
                ref={addSectionRef}
                title={'Funcionalidades'}
                className="section h-screen flex justify-center items-stretch gap-5 md:gap-[52px] pb-12 md:pt-[4px] px-5 md:px-14"
              >
                <div className='w-full flex flex-col justify-end items-center h-full gap-5'>
                  <div className='flex flex-col gap-5 flex-grow justify-start md:justify-center'>
                    <ul className='max-w-4xl w-full flex flex-col gap-8 justify-center items-start list-disc list-outside'>
                      {projectDetails
                        .filter(detail => detail.category === 'Funcionalidades')
                        .map((detail) =>
                          detail.descriptions.map((functionality, index) => (
                            <li key={index} data-aos="fade-up"
                              data-aos-duration={1000 + (index * 200)}
                              className="text-lg lg:text-xl text-black dark:text-white text-justify hyphens-auto ml-5 w-fit"
                            >
                              {functionality}
                            </li>
                          ))
                        )}
                    </ul>
                  </div>
                  <div data-aos="fade-up" data-aos-duration='1500' className='flex justify-center items-center'>
                    <FontAwesomeIcon icon={faChevronDown} className="animate-bounce-slow" />
                  </div>
                </div>
              </SectionContainer>
            )}

            {projectDetails.find(detail => detail.category === 'Tecnologias') && (
              <SectionContainer
                ref={addSectionRef}
                title={'Tecnologias'}
                className="section lg:h-screen flex justify-center items-stretch gap-5 md:gap-[52px] pb-12 md:pt-[4px] px-5 md:px-14"
              >
                <div className='w-full flex flex-col justify-end items-center h-full gap-5'>
                  <div className='max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-5 flex-grow justify-start md:justify-center'>
                    {projectDetails
                      .filter(detail => detail.category === 'Tecnologias')
                      .map((detail, index) => (
                        <div key={index} data-aos="fade-up" data-aos-duration='1000' className='flex flex-col gap-2 p-4 flex-grow h-full rounded-lg'>
                          <h3 data-aos="fade-up" data-aos-duration='1000' className="text-xl font-semibold">{detail.title}</h3>
                          <p data-aos="fade-up" data-aos-duration='1200' className="text-base ">{detail.description}</p>
                          <ul className="flex flex-col gap-2 list-inside list-disc">
                            <span data-aos="fade-up" data-aos-duration='1400' className="font-semibold">Ventajas:</span>
                            <ul className="flex flex-col gap-2 list-outside list-disc pl-5">
                              {detail.advantages.map((advantage, advIndex) => (
                                <li key={advIndex} data-aos="fade-up" data-aos-duration={1400 + (advIndex * 200)} className='text-justify 
                                hyphens-auto'>
                                  {advantage}
                                </li>
                              ))}
                            </ul>
                          </ul>
                        </div>
                      ))}
                  </div>
                  <div data-aos="fade-up" data-aos-duration='1500' className='flex justify-center items-center'>
                    <FontAwesomeIcon icon={faChevronDown} className="animate-bounce-slow" />
                  </div>
                </div>
              </SectionContainer>
            )}

            {projectDetails.find(detail => detail.category === 'Dificultades') && (
              <SectionContainer
                ref={addSectionRef}
                title={'Dificultades'}
                className="section h-screen flex justify-center items-stretch gap-5 md:gap-[52px] pb-12 md:pt-[4px] px-5 md:px-14"
              >
                <div className='w-full flex flex-col justify-end items-center h-full gap-5'>
                  <div className='flex flex-col gap-5 flex-grow justify-start md:justify-center'>
                    <ul className='max-w-4xl w-full flex flex-col gap-8 justify-center items-start list-disc list-outside'>
                      {projectDetails
                        .filter(detail => detail.category === 'Dificultades')
                        .map((detail) =>
                          detail.descriptions.map((difficulty, index) => (
                            <li key={index} data-aos="fade-up"
                              data-aos-duration={1000 + (index * 200)}
                              className="text-lg lg:text-xl text-black dark:text-white text-justify hyphens-auto ml-5 w-fit"
                            >
                              {difficulty}
                            </li>
                          ))
                        )}
                    </ul>
                  </div>
                  <div data-aos="fade-up" data-aos-duration='1500' className='flex justify-center items-center'>
                    <FontAwesomeIcon icon={faChevronDown} className="animate-bounce-slow" />
                  </div>
                </div>
              </SectionContainer>
            )}

            {projectDetails.find(detail => detail.category === 'Soluciones') && (
              <SectionContainer
                ref={addSectionRef}
                title={'Soluciones'}
                className="section h-screen flex justify-center items-stretch gap-5 md:gap-[52px] pb-12 md:pt-[4px] px-5 md:px-14"
              >
                <div className='w-full flex flex-col justify-end items-center h-full gap-5'>
                  <div className='flex flex-col gap-5 flex-grow justify-start md:justify-center'>
                    <ul className='max-w-4xl w-full flex flex-col gap-8 justify-center items-start list-disc list-outside flex-grow'>
                      {projectDetails
                        .filter(detail => detail.category === 'Soluciones')
                        .map((detail) =>
                          detail.descriptions.map((solution, index) => (
                            <li key={index} data-aos="fade-up"
                              data-aos-duration={1000 + (index * 200)}
                              className="text-lg lg:text-xl text-black dark:text-white text-justify hyphens-auto ml-5 w-fit"
                            >
                              {solution}
                            </li>
                          ))
                        )}
                    </ul>
                    <div className='flex flex-col md:flex-row justify-center gap-6 items-center w-full'>
                      {project.urlSitio && (
                        <a data-aos={project.urlGitHub ? 'fade-up-right' : 'fade-up'}
                          data-aos-duration='1600'
                          href={project.urlSitio}
                          target='_blank'
                          className="w-full flex flex-grow md:flex-grow-0 justify-center items-center gap-2 bg-black dark:bg-[#ffffff63] 
                          text-white dark:text-black font-bold px-6 py-6 rounded-lg transition-all duration-1000 ease-in-out 
                          hover:bg-[#b6b6b6c2] hover:text-black dark:hover:bg-white ">
                          <FontAwesomeIcon icon={faEye} size='2x' className="animate-pulse" />
                          <span className='text-2xl animate-pulse'>Visitar</span>
                        </a>
                      )}

                      {project.urlGitHub && (
                        <a
                          data-aos={project.urlSitio ? 'fade-up-left' : 'fade-up'}
                          data-aos-duration='1600'
                          href={project.urlGitHub}
                          target='_blank'
                          className="w-full flex flex-grow md:flex-grow-0 justify-center items-center gap-2 bg-black dark:bg-[#ffffff63] 
                          text-white dark:text-black font-bold px-6 py-6 rounded-lg  hover:bg-[#b6b6b6c2] hover:text-black 
                          dark:hover:bg-white transition-all duration-1000 ease-in-out">
                          <FontAwesomeIcon icon={faGithub} size='2x' className="animate-pulse " />
                          <span className='text-2xl animate-pulse'>GitHub</span>
                        </a>
                      )}

                    </div>
                  </div>
                </div>
              </SectionContainer>
            )}
          </>
        )}

      </main>
    </>
  );
}

export default Details;
