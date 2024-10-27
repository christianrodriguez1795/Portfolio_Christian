import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Projects = ({ proyectos = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [allProyectos, setAllProyectos] = useState(proyectos);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const detectInitialItemsPerPage = () => {
        if (window.innerWidth < 768) {
            return 1; // Móvil
            setIsMobile(true);
        } else if (window.innerWidth < 1024) {
            return 4; // Tableta
            setIsMobile(false);
        } else {
            return 6; // Escritorio
            setIsMobile(false);
        }
    };

    const [itemsPerPage, setItemsPerPage] = useState(detectInitialItemsPerPage());

    const updateItemsPerPage = () => {
        let newItemsPerPage;
        if (window.innerWidth < 768) {
            newItemsPerPage = 1; // Móvil
            setIsMobile(true);

        } else if (window.innerWidth < 1024) {
            newItemsPerPage = 4; // Tableta
            setIsMobile(false);
        } else {
            newItemsPerPage = 6; // Escritorio
            setIsMobile(false);
        }

        if (itemsPerPage !== newItemsPerPage) {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1); // Reiniciar a la primera página con el nuevo itemsPerPage
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateItemsPerPage);
        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
        };
    }, []);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [currentPage, itemsPerPage]);

    const paginatedProjects = allProyectos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(allProyectos.length / itemsPerPage);

    const handlePaginationClick = (page, event) => {
        event.preventDefault();
        setCurrentPage(page);
    };

    if (!allProyectos.length) {
        return (<div data-aos="fade-up" className="text-center py-8 flex-grow">No hay proyectos disponibles.</div>);
    }

    const renderPages = () => {
        const pages = [];

        if (isMobile) {
            // En pantallas móviles: Mostrar primera página, actual y última con puntos suspensivos            
            if (currentPage == 1) {
                pages.push(1); // Añade primera pagina
            }

            if (currentPage > 2 && totalPages <= 2) {
                pages.push('...'); // Puntos suspensivos si no estamos cerca del principio
            }

            if (currentPage > 1 && totalPages > 2) {
                pages.push('...'); // Puntos suspensivos si no estamos cerca del principio
            }

            if (currentPage > 1 && currentPage < totalPages) {
                pages.push(currentPage); // Página actual si no es la primera o última
            }

            if (currentPage < totalPages) {
                pages.push('...'); // Puntos suspensivos si no estamos cerca del final
            }

            if (currentPage == totalPages) {
                pages.push(totalPages); // Añade ultima pagina
            }


        } else {
            // En pantallas grandes: Mostrar primera, última, y tres páginas en el medio con puntos suspensivos
            pages.push(1); // Primera página

            if (currentPage > 3) {
                pages.push('...'); // Puntos suspensivos si estamos lejos de la primera página
            }

            // Mostrar tres páginas cercanas a la actual
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...'); // Puntos suspensivos si estamos lejos de la última página
            }

            pages.push(totalPages); // Última página
        }

        return pages.map((page, index) => (
            <a
                key={index}
                href="#"
                onClick={(e) => typeof page === 'number' && handlePaginationClick(page, e)}
                className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-transparent text-black dark:text-white'} 
                ${typeof page === 'string' ? 'pointer-events-none' : 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'}
                transition-colors duration-300`}
            >
                {page}
            </a>
        ));
    };

    return (
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:justify-between gap-4 flex-grow">
            <div className={`grid grid-cols-1 md:grid-cols-2 ${allProyectos.length > 1 ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-4`}>
                {paginatedProjects.map((proyecto, index) => {
                    const row = Math.floor(index / 3);
                    const column = index % 3;
                    let aosType = '';

                    if (row === 0) {
                        if (column === 0) aosType = 'fade-down-right';
                        if (column === 1) aosType = 'fade-down';
                        if (column === 2) aosType = 'fade-down-left';
                    } else {
                        if (column === 0) aosType = 'fade-up-right';
                        if (column === 1) aosType = 'fade-up';
                        if (column === 2) aosType = 'fade-up-left';
                    }

                    return (
                        // <a
                        //     key={proyecto.id}
                        //     // href={proyecto.urlSitio ? proyecto.urlSitio : proyecto.urlGitHub}
                        //     href={proyecto.url}
                        //     data-aos={aosType}
                        // >
                        //     <div className='min-h-[360px] block bg-white dark:bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-400 dark:shadow-transparent transition-all dark:hover:bg-gray-100 hover:bg-gray-100 hover:scale-105 duration-300 overflow-visible'>

                        //         <img src={proyecto.image} alt={proyecto.title} className="w-full h-52 object-cover rounded-t-lg mb-4" />
                        //         <div className='px-4 pb-4'>
                        //             <h2 className="text-black text-2xl font-semibold mb-2">{proyecto.title}</h2>
                        //             <div className="text-gray-700">
                        //                 {proyecto.skills.map((skill, index) => (
                        //                     <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        //                         {skill.name}
                        //                     </span>
                        //                 ))}
                        //             </div>
                        //         </div>
                        //     </div>
                        // </a>
                        <Link
                            key={proyecto.id}
                            href={route('projects.details', { id: proyecto.id })}
                            data-aos={aosType}
                        >
                            <div className='flex flex-col gap-4  min-h-[280px] 2xl:min-h-[328px] bg-white dark:bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-400 
                            dark:shadow-transparent transition-all dark:hover:bg-gray-100 hover:bg-gray-100 hover:scale-105 duration-300 overflow-visible'>

                                <img src={proyecto.image} alt={proyecto.title} className="w-full h-44 object-cover rounded-t-lg" />
                                <div className='px-4 pb-4'>
                                    <h2 className="text-black text-2xl font-semibold mb-2">{proyecto.title}</h2>
                                    <div className="text-gray-700">
                                        {proyecto.skills.map((skill, index) => (
                                            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            {/* {totalPages > 1 && (
                <div data-aos="fade-up" className="pagination flex justify-center space-x-2 ">
                    <a
                        href="#"
                        onClick={(e) => handlePaginationClick(Math.max(1, currentPage - 1), e)}
                        className={`px-4 py-2 rounded-md mx-1 bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white 
                        dark:hover:text-black transition-colors duration-300 flex items-center justify-center`}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} className='w-full h-5' />
                    </a>
                    {itemsPerPage > 1 && !isMobile && Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <a
                            key={page}
                            href="#"
                            onClick={(e) => handlePaginationClick(page, e)}
                            className={`px-4 py-2 rounded-md mx-1 ${currentPage === page ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-transparent text-black dark:text-white'} hover:bg-black hover:text-white dark:hover:bg-white 
                        dark:hover:text-black font-bold transition-colors duration-300 flex items-center justify-center`}
                        >
                            {page}
                        </a>
                    ))}
                    {isMobile && (
                        <span className="px-4 py-2 rounded-md mx-1 bg-black text-white dark:bg-white dark:text-black transition-colors duration-300 flex items-center justify-center">
                            {currentPage}
                        </span>
                    )}
                    <a
                        href="#"
                        onClick={(e) => handlePaginationClick(Math.min(totalPages, currentPage + 1), e)}
                        className={`px-4 py-2 rounded-md mx-1 bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white 
                        dark:hover:text-black transition-colors duration-300 flex items-center justify-center`}
                    >
                        <FontAwesomeIcon icon={faAngleRight} className='w-full h-5' />
                    </a>
                </div>
            )} */}

            {totalPages > 1 && (
                <div data-aos="fade-up" className="pagination flex justify-center gap-2">
                    <a
                        href="#"
                        onClick={(e) => handlePaginationClick(Math.max(1, currentPage - 1), e)}
                        className={`flex items-center px-4 py-2 rounded-md bg-transparent text-black dark:text-white dark:hover:bg-white 
                            dark:hover:text-black hover:bg-black hover:text-white transition-colors duration-300`}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} className='w-full h-5' />
                    </a>
                    {renderPages()}
                    <a
                        href="#"
                        onClick={(e) => handlePaginationClick(Math.min(totalPages, currentPage + 1), e)}
                        className={`flex items-center px-4 py-2 rounded-md bg-transparent text-black dark:text-white dark:hover:bg-white 
                            dark:hover:text-black hover:bg-black hover:text-white transition-colors duration-300`}
                    >
                        <FontAwesomeIcon icon={faAngleRight} className='w-full h-5' />
                    </a>
                </div>
            )}
        </div>
    );
};

export default Projects;