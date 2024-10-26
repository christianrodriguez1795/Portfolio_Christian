import React from 'react';
import PropTypes from 'prop-types';

/**
 * SectionContainer es un componente de contenedor para secciones que permite incluir un título y contenido con flexibilidad.
 * 
 * @param {string} id - El identificador único para la sección.
 * @param {string} title - El título que se mostrará en la sección. Si no se proporciona, no se mostrará el título.
 * @param {React.ReactNode} children - Los elementos hijos que se mostrarán dentro del contenedor de la sección.
 * @param {string} className - Clases adicionales para aplicar al contenedor de la sección.
 * @param {string} classNameContent - Clases adicionales para aplicar al contenedor interno que envuelve a los `children`.
 * @param {React.Ref} ref - La referencia pasada al elemento del contenedor para interactuar con él en otros componentes.
 * 
 * @returns {JSX.Element} El componente `SectionContainer` con su estructura interna.
 */
const SectionContainer = React.forwardRef(({ id, title, children, className, classNameContent }, ref) => {
    return (
        <section id={id} ref={ref} className={`min-w-screen min-h-screen flex flex-col lg:overflow-hidden ${className}`}>
            {title && (
                <div data-aos="fade-down" className='text-center z-0'>
                    <h3 className="text-4xl font-semibold">{title}</h3>
                </div>
            )}
            <div className={`w-full flex flex-col md:inline-flex gap-6 flex-grow h-full ${classNameContent}`}>
                {children}
            </div>
        </section>
    );
});

// SectionContainer.propTypes = {
//     /** El identificador único para la sección */
//     id: PropTypes.string,

//     /** El título que se mostrará en la sección. Si no se proporciona, no se mostrará el título */
//     title: PropTypes.string,

//     /** Los elementos hijos que se mostrarán dentro del contenedor de la sección */
//     children: PropTypes.node.isRequired,

//     /** Clases adicionales para aplicar al contenedor de la sección */
//     className: PropTypes.string,

//     /** Clases adicionales para aplicar al contenedor interno que envuelve a los `children` */
//     classNameContent: PropTypes.string,
// };

// SectionContainer.defaultProps = {
//     className: '',
//     classNameContent: '',
// };

export default SectionContainer;


