import {
    faGithub,
    faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import {
    faBriefcase,
    faBinoculars,
    faBalanceScale,
    faLightbulb,
    faBrain,
    faCheckCircle,
    faPalette,
    faMountain,
    faSyncAlt,
    faComments,
    faChessKnight,
    faHandshake,
    faRocket,
    faUsers,
    faHeart
} from '@fortawesome/free-solid-svg-icons';

export const datosCv = [
    {
        id: 'cvDesarrollador',
        titulo: 'Curriculum desarrollador Full-stack',
        datosPersonales: [
            {
                nombre: 'CHRISTIAN RODRÍGUEZ PONCE DE LEÓN',
                telefono: '675441414',
                email: 'christian.rodriguez.1795@christianrodriguezdev.es',
            },
        ],
        sobreMi: [
            {
                content: `Soy desarrollador Full-Stack con sólidos conocimientos en React 18.x, Laravel 11.x y Docker, además de experiencia
                    en bases de datos SQL/NoSQL. Me especializo en crear aplicaciones escalables, centradas en ofrecer una experiencia
                    de usuario de alta calidad. La innovación constante y el trabajo colaborativo son clave para obtener resultados
                    eficientes y de gran impacto.`,
            },
        ],
        educacion: [
            {
                titulo: 'Excelencia académica en el curso de D.A.W',
                institucion: 'I.E.S. San Sebastián',
                fecha: '06/2024',
                descripcion: 'Reconocimiento al estudiante con mejores notas del cursos 23/24 del curso de Desarrollo de Aplicaciones Web.',
                aosDelay: 1000,
            },
            {
                titulo: 'C.F.G.S. en Desarrollo de Aplicaciones Web',
                institucion: 'I.E.S. San Sebastián',
                fecha: '09/2022 - 06/2024',
                descripcion: 'Enfocado en el desarrollo full-stack, aplicaciones web dinámicas y metodologías ágiles.',
                aosDelay: 1000,
            },
            {
                titulo: 'C.F.G.S. en Mecatrónica Industrial',
                institucion: 'C.P.I.F.P. Profesor José Luis Graíño',
                fecha: '09/2019 - 06/2021',
                descripcion: 'Especialización en automatización y sistemas robóticos industriales.',
                aosDelay: 1500,
            },
        ],
        experienciaLaboral: [
            {
                titulo: 'Practicas como Desarrollador Full-Stack',
                empresa: 'Integración de Metodologías y Sistemas',
                fecha: '03/2024 - 06/2024',
                descripcion: [
                    'Empresa encargada del desarrollo del sistema de gestión de recursos humanos Open HR.',
                ],
                aosDelay: 1000,
            },
            {
                titulo: 'Tecnico de especialista de mantenimiento',
                empresa: 'TK Elevadores',
                fecha: '01/2022 - 07/2022',
                descripcion: [
                    `Líder global en soluciones de movilidad vertical, especializada en el diseño, fabricación, 
                mantenimiento y modernización de ascensores y escaleras mecánicas para edificios comerciales 
                y residenciales.`
                ],
                aosDelay: 1000,
            },
        ],
        hardSkills: [
            {
                stack: 'Front-End',
                skills: [
                    'HTML5',
                    'CSS3',
                    'JavaScript ES6+',
                    'React 18.x',
                    'Tailwind CSS',
                    'SASS',
                    'jQuery 3.x'
                ]
            },
            {
                stack: 'Back-End',
                skills: [
                    'PHP 8.x',
                    'Java 11',
                    'Node.js 16.x',
                    'Laravel 9.x/11.x'
                ]
            },
            {
                stack: 'Bases de Datos',
                skills: [
                    'MySQL 8.x',
                    'PostgreSQL 13.x',
                    'MongoDB 5.x',
                    'Oracle 19c'
                ]
            },
            {
                stack: 'DevOps',
                skills: [
                    'Docker 20.x',
                    'Apache 2.x',
                    'Git 2.x'
                ]
            },
            {
                stack: 'Otros Lenguajes y Técnicas',
                skills: [
                    'Kotlin 1.5',
                    'XML',
                    'JSON',
                    'AJAX'
                ]
            },
        ],
        idiomas: [
            {
                nombre: 'Español',
                nivel: 'Nativo'
            },
            {
                nombre: 'Inglés',
                nivel: 'Técnico'
            },
        ],
        proyectos: [
            {
                titulo: 'Portfolio Personal',
                descripcion: [
                    `Desarrollé una plataforma de gestión de contenido profesional utilizando Inertia.js, con frontend en React 18.x y 
                JavaScript ES6+, y backend en PHP 8.x con Laravel 11.x.`,
                ],
            },
            {
                titulo: 'TalentSphere',
                descripcion: [
                    `Desarrollé una aplicación de gestión de recursos humanos utilizando Blade, HTML5, Tailwind CSS 3.x y 
                JavaScript en el frontend, y PHP 8.x con Laravel 11.x y MySQL 8.x en el backend, gestionando contenedores 
                con Docker y Laravel Sail.`,
                ],
            },
        ],
        softSkills: [
            {
                titulo: 'Ética Profesional',
                icono: faBriefcase,
            },
            {
                titulo: 'Visión a Largo Plazo',
                icono: faBinoculars,
            },
            {
                titulo: 'Tolerancia a la Ambigüedad',
                icono: faBalanceScale,
            },
            {
                titulo: 'Innovación',
                icono: faLightbulb,
            },
            {
                titulo: 'Pensamiento Crítico',
                icono: faBrain,
            },
            {
                titulo: 'Responsabilidad',
                icono: faCheckCircle,
            },
            {
                titulo: 'Creatividad',
                icono: faPalette,
            },
            {
                titulo: 'Perseverancia',
                icono: faMountain,
            },
            {
                titulo: 'Adaptabilidad',
                icono: faSyncAlt,
            },
            {
                titulo: 'Comunicación Efectiva',
                icono: faComments,
            },
        ],
        socialLinks: [
            {
                nombre: "LinkedIn",
                href: "https://www.linkedin.com/in/christianrodriguezdev/",
                icon: faLinkedin,
            },
            {
                nombre: "GitHub",
                href: "https://github.com/christianrodriguez1795",
                icon: faGithub,
            },
            {
                nombre: "Portfolio",
                href: "https://christianrodriguezdev.es/",
                icon: faBriefcase,
            },
        ],
    },
    {
        id: 'cvMozoAlmacen',
        titulo: 'Curriculum Mozo de almacen',
        datosPersonales: [
            {
                nombre: 'CHRISTIAN RODRÍGUEZ PONCE DE LEÓN',
                telefono: '675441414',
                email: 'christian.rodriguez.1795@gmail.com',
            },
        ],
        sobreMi: [
            {
                content: `Soy una persona comprometida, organizada y con experiencia en trabajos de equipo, lo que me permite adaptarme 
                rápidamente a diferentes tareas y entornos. Durante mis estudios en Mecatrónica Industrial, adquirí conocimientos en la 
                gestión de almacenes y repuestos, lo que incluye el manejo de inventarios y la optimización del almacenamiento de materiales. 
                Tengo habilidad para el manejo de materiales, inventarios y preparación de pedidos, asegurando siempre un alto nivel de precisión 
                y eficiencia. Además, me destaco por mi actitud proactiva y capacidad para trabajar bajo presión, siempre enfocado en cumplir 
                con los objetivos y plazos establecidos. Busco una oportunidad en la que pueda seguir desarrollando estas habilidades y aportar 
                valor en el ámbito logístico.`,
            },
        ],
        educacion: [
            {
                titulo: 'Excelencia académica en el curso de D.A.W',
                institucion: 'I.E.S. San Sebastián',
                fecha: '06/2024',
                descripcion: 'Reconocimiento al estudiante con mejores notas del cursos 23/24 del curso de Desarrollo de Aplicaciones Web.',
                aosDelay: 1000,
            },
            {
                titulo: 'C.F.G.S. en Desarrollo de Aplicaciones Web',
                institucion: 'I.E.S. San Sebastián',
                fecha: '09/2022 - 06/2024',
                descripcion: 'Enfocado en el desarrollo full-stack, aplicaciones web dinámicas y metodologías ágiles.',
                aosDelay: 1000,
            },
            {
                titulo: 'C.F.G.S. en Mecatrónica Industrial',
                institucion: 'C.P.I.F.P. Profesor José Luis Graíño',
                fecha: '09/2019 - 06/2021',
                descripcion: 'Especialización en automatización y sistemas robóticos industriales.',
                aosDelay: 1500,
            },
        ],
        experienciaLaboral: [
            {
                titulo: 'Practicas como Desarrollador Full-Stack',
                empresa: 'Integración de Metodologías y Sistemas',
                fecha: '03/2024 - 06/2024',
                descripcion: [
                    'Empresa encargada del desarrollo del sistema de gestión de recursos humanos Open HR.',
                ],
                aosDelay: 1000,
            },
            {
                titulo: 'Tecnico de especialista de mantenimiento',
                empresa: 'TK Elevadores',
                fecha: '01/2022 - 07/2022',
                descripcion: [
                    `Líder global en soluciones de movilidad vertical, especializada en el diseño, fabricación, 
                mantenimiento y modernización de ascensores y escaleras mecánicas para edificios comerciales 
                y residenciales.`
                ],
                aosDelay: 1000,
            },
        ],
        hardSkills: [
            {
                stack: 'Gestión de Almacén',
                skills: [
                    'Inventarios',
                    'Recepción y despacho',
                    'Almacenamiento',
                ]
            },
            {
                stack: 'Documentación Logística',
                skills: [
                    'Albaranes',
                    'Control de stock',
                    'Facturas',
                ]
            },
            {
                stack: 'Seguridad y Normativas',
                skills: [
                    'Prevención de riesgos',
                ]
            },
        ],
        idiomas: [
            {
                nombre: 'Español',
                nivel: 'Nativo'
            },
            {
                nombre: 'Inglés',
                nivel: 'Técnico'
            },
        ],
        proyectos: [

        ],
        softSkills: [
            {
                titulo: 'Ética Profesional',
                icono: faBriefcase,
            },
            {
                titulo: 'Visión a Largo Plazo',
                icono: faBinoculars,
            },
            {
                titulo: 'Tolerancia a la Ambigüedad',
                icono: faBalanceScale,
            },
            {
                titulo: 'Innovación',
                icono: faLightbulb,
            },
            {
                titulo: 'Pensamiento Crítico',
                icono: faBrain,
            },
            {
                titulo: 'Responsabilidad',
                icono: faCheckCircle,
            },
            {
                titulo: 'Creatividad',
                icono: faPalette,
            },
            {
                titulo: 'Perseverancia',
                icono: faMountain,
            },
            {
                titulo: 'Adaptabilidad',
                icono: faSyncAlt,
            },
            {
                titulo: 'Comunicación Efectiva',
                icono: faComments,
            },
        ],
        socialLinks: [

        ],
    },
];
