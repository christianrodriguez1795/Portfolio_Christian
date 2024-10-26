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
import {
    SiJavascript,
    SiPhp,
    SiLaravel,
    SiReact,
    SiVuedotjs,
    SiNodedotjs,
    SiCss3,
    SiHtml5,
    SiPython,
    SiMysql,
    SiPostgresql,
    SiMongodb,
    SiGit,
    SiDocker,
    SiKubernetes,
    SiMicrosoftazure,
    SiGooglecloud,
    SiTypescript,
    SiSass,
    SiLess,
    SiBootstrap,
    SiTailwindcss,
    SiWebpack,
    SiBabel,
    SiGraphql,
    SiJenkins,
    SiJira,
    SiTrello,
    SiRedux,
    SiMobx,
    SiExpress,
    SiFlask,
    SiRubyonrails,
    SiSpringboot,
    SiDotnet,
    SiCplusplus,
    SiRust,
    SiGo,
    SiSwift,
    SiKotlin,
    SiFlutter,
    SiTensorflow,
    SiPytorch,
    SiSolidity,
    SiEthereum,
    SiBitcoinsv,
} from 'react-icons/si';

import {
    FaAws
} from 'react-icons/fa';


export const educacionPortfolio = [
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
];

export const experienciaLaboralPortfolio = [
    {
        titulo: 'Practicas como Desarrollador Full-Stack',
        empresa: 'Integración de Metodologías y Sistemas',
        fecha: '03/2024 - 06/2024',
        descripcion: [
            'Empresa encargada del desarrollo del sistema de gestión de recursos humanos Open HR.',
            // 'Durante mi tiempo en OpenHR, participé activamente en el mantenimiento y la mejora de la plataforma de gestión de recursos humanos. A lo largo de este período, adquirí y apliqué habilidades clave en desarrollo y administración de sistemas, trabajando en un entorno profesional. Entre las principales tareas que realicé, se encuentran:',
            // '-Desarrollo de funcionalidades personalizadas: Desarrollé y mantuve nuevas funcionalidades utilizando PHP 8.x, mejorando el rendimiento de la plataforma y adaptándola a las necesidades de los usuarios bajo la supervisión del equipo senior.',
            // '-Administración de bases de datos: Colaboré en el diseño y la gestión de bases de datos relacionales en PostgreSQL 14.x, optimizando las consultas SQL para mejorar la escalabilidad y garantizar tiempos de respuesta rápidos en el manejo de grandes volúmenes de datos.',
            // '-Optimización de la plataforma: Implementé soluciones de manejo de datos eficientes, contribuyendo a la optimización del rendimiento general de la plataforma y asegurando la rápida ejecución de procesos críticos.',
            // '-Trabajo en entornos ágiles: Participé activamente en reuniones de seguimiento y planificación de sprints, adquiriendo experiencia en entornos ágiles y colaborando en la consecución de los objetivos de cada fase del proyecto.',
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
];


export const softSkillsPortfolio = [
    {
        titulo: 'Ética Profesional',
        icono: faBriefcase,
    },
    {
        titulo: 'Visión a Largo Plazo',
        icono: faBinoculars,
    },
    {
        titulo: 'Auto-motivación',
        icono: faRocket,
    },
    {
        titulo: 'Tolerancia a la Ambigüedad',
        icono: faBalanceScale,
    },
    {
        titulo: 'Perseverancia',
        icono: faMountain,
    },
    {
        titulo: 'Gestión de Conflictos',
        icono: faHandshake,
    },
    {
        titulo: 'Pensamiento Estratégico',
        icono: faChessKnight,
    },
    {
        titulo: 'Innovación',
        icono: faLightbulb,
    },
    {
        titulo: 'Habilidades Interpersonales',
        icono: faUsers,
    },
    {
        titulo: 'Comunicación Efectiva',
        icono: faComments,
    },
    {
        titulo: 'Adaptabilidad',
        icono: faSyncAlt,
    },
    {
        titulo: 'Pensamiento Crítico',
        icono: faBrain,
    },
    {
        titulo: 'Creatividad',
        icono: faPalette,
    },
    {
        titulo: 'Responsabilidad',
        icono: faCheckCircle,
    },
    {
        titulo: 'Empatía',
        icono: faHeart, // Usar un corazón para representar empatía
    },
];

export const hardSkillsPortfolio = [
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
        stack: 'Otros Lenguajes',
        skills: [
            'Kotlin 1.5',
            'XML',
            'JSON',
            'AJAX'
        ]
    },
];

export const socialLinksPortfolio = [
    {
        href: "https://www.linkedin.com/in/christianrodriguezdev/",
        icon: faLinkedin,
        animation: "fade-right"
    },
    {
        href: "https://github.com/christianrodriguez1795",
        icon: faGithub,
        animation: "fade-left"
    },
];



export const iconMap = {
    JavaScript: SiJavascript,
    PHP: SiPhp,
    Laravel: SiLaravel,
    React: SiReact,
    'Vue.js': SiVuedotjs,
    'Node.js': SiNodedotjs,
    CSS: SiCss3,
    HTML: SiHtml5,
    Python: SiPython,
    Django: SiFlask, // Usando Flask como proxy para Django
    SQL: SiMysql, // Usando MySQL como genérico para SQL
    MySQL: SiMysql,
    PostgreSQL: SiPostgresql,
    MongoDB: SiMongodb,
    Git: SiGit,
    Docker: SiDocker,
    Kubernetes: SiKubernetes,
    AWS: FaAws,
    Azure: SiMicrosoftazure,
    'Google Cloud': SiGooglecloud,
    TypeScript: SiTypescript,
    SASS: SiSass,
    LESS: SiLess,
    Bootstrap: SiBootstrap,
    'Tailwind CSS': SiTailwindcss,
    Webpack: SiWebpack,
    Babel: SiBabel,
    GraphQL: SiGraphql,
    Jenkins: SiJenkins,
    JIRA: SiJira,
    Trello: SiTrello,
    Redux: SiRedux,
    MobX: SiMobx,
    'Express.js': SiExpress,
    Flask: SiFlask,
    'Ruby on Rails': SiRubyonrails,
    Java: SiSpringboot, // Usamos Spring Boot para Java
    'Spring Boot': SiSpringboot,
    'C#': SiDotnet,
    '.NET': SiDotnet,
    'C++': SiCplusplus,
    Rust: SiRust,
    Go: SiGo,
    Swift: SiSwift,
    Kotlin: SiKotlin,
    Flutter: SiFlutter,
    TensorFlow: SiTensorflow,
    PyTorch: SiPytorch,
    Solidity: SiSolidity,
    Ethereum: SiEthereum,
    Bitcoin: SiBitcoinsv,
};


export const detailsOptions = [
    {
        id: 1,
        name: 'Objetivos',
    },
    {
        id: 2,
        name: 'Tecnologias',
    },
    {
        id: 3,
        name: 'Funcionalidades',
    },
    {
        id: 4,
        name: 'Dificultades',
    },
    {
        id: 5,
        name: 'Soluciones',
    },

];