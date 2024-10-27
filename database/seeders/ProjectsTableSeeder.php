<?php

// namespace Database\Seeders;

// use App\Models\Project;
// use App\Models\ProjectDetail;
// use App\Models\Skill;
// use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
// use Illuminate\Database\Seeder;
// use Illuminate\Support\Facades\Storage;

// class ProjectsTableSeeder extends Seeder
// {
//     /**
//      * Run the database seeds.
//      */
//     public function run(): void
//     {
//         // Supongamos que ya tienes usuarios en la base de datos
//         $users = User::all();

//         // Verificar que las habilidades existan en la base de datos
//         $existingSkills = ['HTML', 'CSS', 'JavaScript', 'Laravel', 'PHP', 'React', 'MySQL', 'SASS', 'Tailwind CSS', 'Git', 'Docker'];
//         foreach ($existingSkills as $skillName) {
//             Skill::firstOrCreate(['name' => $skillName]);
//         }

//         // Array de proyectos que deseas insertar manualmente, incluyendo skills por nombre y detalles del proyecto
//         $projects = [
//             [
//                 'title' => 'Portfolio',
//                 'description' => 'Este proyecto es mi portafolio personal, diseñado para mostrar mis habilidades y proyectos en desarrollo web. Incluye funcionalidades modernas, diseño responsive y optimización para SEO.',
//                 'urlGitHub' => 'https://github.com/christianrodriguez1795/Portfolio_Christian',
//                 'urlSitio' => 'https://github.com/christianrodriguez1795/Portfolio_Christian',
//                 'image' => 'storage/app/public/proyectos/imagenes/Portfolio-Portfolio.png',
//                 'skills' => [
//                     'JavaScript',
//                     'PHP',
//                     'Laravel',
//                     'React',
//                     'Inertia.js',
//                     'CSS',
//                     'MySQL',
//                     'SASS',
//                     'Tailwind CSS',
//                     'Git',
//                     'Inertia'
//                 ],
//                 'details' => [
//                     // Detalles del proyecto
//                     [
//                         'type' => 'detail',
//                         'content' => 'Desarrollé una plataforma interactiva para la gestión de contenido profesional utilizando 
//                         una arquitectura monolítica con Inertia.js, que permitió integrar tanto el frontend como el backend en 
//                         un solo proyecto, optimizando su mantenimiento y despliegue.',
//                         'order' => 1
//                     ],
//                     [
//                         'type' => 'detail',
//                         'content' => 'En el frontend, empleé <strong>React 18.x</strong> y <strong>JavaScript ES6+</strong> para 
//                         crear una interfaz dinámica y completamente responsive. La implementación de <strong>Tailwind CSS 3.x</strong> 
//                         junto con <strong>SASS</strong> permitió un control avanzado de los estilos, asegurando un diseño moderno, 
//                         intuitivo y escalable que mejora la experiencia de usuario.',
//                         'order' => 2
//                     ],
//                     [
//                         'type' => 'detail',
//                         'content' => 'El backend fue desarrollado utilizando <strong>PHP 8.x</strong> y <strong>Laravel 11.x</strong>, 
//                         gestionando eficientemente la lógica de negocio y facilitando la integración con la base de datos <strong>MySQL 8.x</strong>. 
//                         Esto permitió una administración fluida de los datos y garantizó la escalabilidad del sistema.',
//                         'order' => 3
//                     ],
//                     [
//                         'type' => 'detail',
//                         'content' => 'Utilicé <strong>GitHub</strong> para el control de versiones, manteniendo un flujo de trabajo 
//                         ágil y colaborativo, asegurando la trazabilidad y la organización del código durante todo el ciclo de desarrollo.',
//                         'order' => 4
//                     ],
//                     [
//                         'type' => 'detail',
//                         'content' => 'Esta plataforma destaca por su <strong>modularidad</strong> y <strong>escalabilidad</strong>, 
//                         ofreciendo una solución robusta y flexible que garantiza un rendimiento óptimo y facilita el mantenimiento 
//                         a largo plazo.',
//                         'order' => 5
//                     ],

//                     // Dificultades ampliadas
//                     [
//                         'type' => 'difficulty',
//                         'content' => 'La principal dificultad fue la integración de Inertia.js para gestionar las rutas y estados 
//                         de manera reactiva entre Laravel y React, sin recargar la página. Inicialmente, la sincronización entre el 
//                         estado de React y el backend de Laravel no funcionaba de manera eficiente, lo que provocaba actualizaciones 
//                         desincronizadas y múltiples recargas innecesarias de la página.',
//                         'order' => 1
//                     ],
//                     [
//                         'type' => 'difficulty',
//                         'content' => 'Otro reto fue manejar el rendimiento cuando la base de datos de MySQL empezó a crecer. A 
//                         medida que se añadían más datos y más usuarios interactuaban con la plataforma, surgieron problemas de 
//                         lentitud en las consultas y carga de páginas, especialmente durante las operaciones de escritura y lectura 
//                         simultáneas.',
//                         'order' => 2
//                     ],
//                     [
//                         'type' => 'difficulty',
//                         'content' => 'La optimización del diseño responsive también presentó un desafío. Asegurar que Tailwind CSS 
//                         y SASS cooperaran de manera efectiva en dispositivos con diferentes tamaños de pantalla requería mucho ajuste, 
//                         sobre todo para mantener la consistencia en todos los navegadores y mejorar la experiencia de usuario.',
//                         'order' => 3
//                     ],

//                     // Soluciones ampliadas
//                     [
//                         'type' => 'solution',
//                         'content' => 'La solución a la integración de Inertia.js fue configurar correctamente los controladores de 
//                         Laravel para gestionar las rutas de Inertia y React como una sola entidad, eliminando la necesidad de recargas 
//                         de página y mejorando la reactividad entre el backend y el frontend. Esto incluyó la implementación de un 
//                         middleware que gestionaba eficientemente la comunicación entre los estados de React y Laravel.',
//                         'order' => 1
//                     ],
//                     [
//                         'type' => 'solution',
//                         'content' => 'Para resolver el problema de rendimiento en MySQL, se implementaron índices en las tablas más 
//                         consultadas y se optimizaron las consultas SQL para reducir el tiempo de respuesta. También se utilizó el 
//                         lazy loading en el frontend para cargar los datos más pesados de manera progresiva, mejorando así la velocidad 
//                         de la plataforma, especialmente en dispositivos móviles y conexiones lentas.',
//                         'order' => 2
//                     ],
//                     [
//                         'type' => 'solution',
//                         'content' => 'Para asegurar un diseño responsive optimizado, ajusté las clases de Tailwind CSS y los mixins 
//                         de SASS para que respondieran mejor a las condiciones específicas de cada tipo de pantalla, lo que garantizó 
//                         una experiencia de usuario coherente y fluida. También realicé pruebas en diferentes navegadores para asegurar 
//                         que las propiedades CSS funcionaran de forma uniforme.',
//                         'order' => 3
//                     ]
//                 ]
//             ],
//             [
//                 'title' => 'TalentSphere',
//                 'description' => 'TalentSphere es una aplicación de gestión de recursos humanos diseñada para mejorar la eficiencia y 
//                  precisión en la gestión del capital humano de las empresas permitiendo gestionar empleados, contratos, solicitudes y fichajes
//                  mediante una plataforma moderna, escalable y robusta.',
//                 'urlGitHub' => 'https://talentsphere.christianrodriguezdev.es/',
//                 'urlSitio' => 'https://talentsphere.christianrodriguezdev.es/',
//                 'image' => 'storage/app/public/proyectos/imagenes/TalentSphere-Negro.jpg',
//                 'skills' => [
//                     'JavaScript',
//                     'PHP',
//                     'Laravel',
//                     'HTML',
//                     'CSS',
//                     'MySQL',
//                     'Git',
//                     'Docker',
//                     'Tailwind CSS'
//                 ],
//                 'details' => [
//                     // Objetivos
//                     [
//                         'type' => 'objective',
//                         'content' => 'Los objetivos de esta apliacion se seria los siguientes:',
//                         'order' => 0
//                     ],
//                     [
//                         'type' => 'objective',
//                         'content' => 'Desarrollar un sistema moderno y escalable que permita gestionar empleados, fichajes, contratos y solicitudes de forma eficiente.',
//                         'order' => 1
//                     ],
//                     [
//                         'type' => 'objective',
//                         'content' => 'Integrar las funcionalidades esenciales para la gestión de recursos humanos como el seguimiento de asistencia, manejo de nóminas, y creación de reportes.',
//                         'order' => 2
//                     ],
//                     [
//                         'type' => 'objective',
//                         'content' => 'Documentar el sistema de forma completa para facilitar el mantenimiento futuro.',
//                         'order' => 3
//                     ],
//                     // Tecnologías empleadas
//                     // [
//                     //     'type' => 'technologies',
//                     //     'content' => 'Las tecnologias utilizas paraa el proyecto son:',
//                     //     'order' => 0
//                     // ],
//                     [
//                         'type' => 'technologies',
//                         'content' => '<div>
//     <h3 class="text-xl font-semibold">Backend</h3>
//     <p class="text-lg ">
//         PHP 8.x con Laravel 9.x: mejora el rendimiento y ofrece rutas
//         intuitivas.
//     </p>
//     <ul class="list-inside list-disc">
//         <li class="font-semibold">Ventajas:</li>
//         <ul class="list-inside list-disc pl-5">
//             <li>Uso fácil y sintaxis clara.</li>
//             <li>Ecosistema robusto.</li>
//             <li>Seguridad integrada.</li>
//         </ul>
//     </ul>
// </div>

// <div>
//     <h3 class="text-xl font-semibold">Frontend</h3>
//     <p class="text-lg ">Blade, HTML5, CSS3, Tailwind CSS y JavaScript.</p>
//     <ul class="list-inside list-disc">
//         <li class="font-semibold">Ventajas:</li>
//         <ul class="list-inside list-disc pl-5">
//             <li>Componentes reutilizables.</li>
//             <li>Diseño responsivo.</li>
//             <li>Interactividad mejorada.</li>
//         </ul>
//     </ul>
// </div>

// <div>
//     <h3 class="text-xl font-semibold">Base de Datos</h3>
//     <p class="text-lg ">MySQL 8.x: sistema de gestión relacional.</p>
//     <ul class="list-inside list-disc">
//         <li class="font-semibold">Ventajas:</li>
//         <ul class="list-inside list-disc pl-5">
//             <li>Alto rendimiento.</li>
//             <li>Escalabilidad fácil.</li>
//             <li>Seguridad robusta.</li>
//         </ul>
//     </ul>
// </div>

// <div>
//     <h3 class="text-xl font-semibold">Control de Versiones</h3>
//     <p class="text-lg ">GitHub: plataforma para colaboración.</p>
//     <ul class="list-inside list-disc">
//         <li class="font-semibold">Ventajas:</li>
//         <ul class="list-inside list-disc pl-5">
//             <li>Colaboración ágil.</li>
//             <li>Historial completo.</li>
//             <li>Integración continua.</li>
//         </ul>
//     </ul>
// </div>

// <div>
//     <h3 class="text-xl font-semibold">Entorno de Desarrollo</h3>
//     <p class="text-lg ">
//         Docker y Laravel Sail: simplifican entornos de desarrollo.
//     </p>
//     <ul class="list-inside list-disc">
//         <li class="font-semibold">Ventajas:</li>
//         <ul class="list-inside list-disc pl-5">
//             <li>Entorno reproducible.</li>
//             <li>Aislamiento de aplicaciones.</li>
//             <li>Uso fácil de Docker.</li>
//         </ul>
//     </ul>
// </div>

// ',
//                         'order' => 0
//                     ],
//                     [
//                         'type' => 'technologies',
//                         'content' => 'Backend: PHP 8.x con el framework Laravel 9.x.',
//                         'order' => 1
//                     ],
//                     [
//                         'type' => 'technologies',
//                         'content' => 'Frontend: Blade como motor de plantillas, junto con HTML5, CSS3, Tailwind CSS y JavaScript.',
//                         'order' => 2
//                     ],
//                     [
//                         'type' => 'technologies',
//                         'content' => 'Base de Datos: MySQL 8.x.',
//                         'order' => 3
//                     ],
//                     [
//                         'type' => 'technologies',
//                         'content' => 'Control de Versiones: GitHub.',
//                         'order' => 4
//                     ],
//                     [
//                         'type' => 'technologies',
//                         'content' => 'Entorno de Desarrollo: Docker y Laravel Sail para crear un entorno reproducible entre desarrollo y producción.',
//                         'order' => 5
//                     ],
//                     // Funcionalidades principales
//                     [
//                         'type' => 'functionality',
//                         'content' => 'Los requsitos funcioanes de la aplicacion son:',
//                         'order' => 0
//                     ],
//                     [
//                         'type' => 'functionality',
//                         'content' => 'Gestión de Empleados: Alta, baja, modificación y visualización de empleados con filtros y búsqueda.',
//                         'order' => 1
//                     ],
//                     [
//                         'type' => 'functionality',
//                         'content' => 'Gestión de Asistencia: Registro de entradas y salidas, generación de reportes de asistencia.',
//                         'order' => 2
//                     ],
//                     [
//                         'type' => 'functionality',
//                         'content' => 'Gestión de Solicitudes: Solicitudes de permisos o vacaciones por parte de los empleados, con aprobación o rechazo por los gerentes.',
//                         'order' => 3
//                     ],
//                     [
//                         'type' => 'functionality',
//                         'content' => 'Sistema de Roles: Administrador, gerente de departamento y empleado, cada uno con diferentes permisos.',
//                         'order' => 4
//                     ],
//                     // Arquitectura
//                     [
//                         'type' => 'architecture',
//                         'content' => 'Monolítica, donde frontend y backend están integrados en un único proyecto para facilitar su despliegue y mantenimiento.',
//                         'order' => 1
//                     ],
//                     // Dificultades
//                     [
//                         'type' => 'difficulty',
//                         'content' => 'La principal dificultad fue gestionar la interacción entre las diversas funcionalidades, como la gestión de contratos 
//                           y el calendario interactivo, dentro de una arquitectura monolítica.',
//                         'order' => 1
//                     ],
//                     [
//                         'type' => 'difficulty',
//                         'content' => 'Garantizar la escalabilidad y modularidad fue un reto importante a medida que se implementaron nuevas funcionalidades 
//                           y se manejaron grandes volúmenes de datos.',
//                         'order' => 2
//                     ],
//                     [
//                         'type' => 'difficulty',
//                         'content' => 'El manejo de roles y permisos fue complicado debido a la asignación de accesos específicos a cada tipo de usuario.',
//                         'order' => 3
//                     ],
//                     // Soluciones
//                     [
//                         'type' => 'solution',
//                         'content' => 'La solución fue utilizar Laravel Modules para estructurar el código de manera modular. Esto permitió dividir las funcionalidades 
//                           como la gestión de empleados, solicitudes y el calendario en módulos independientes, facilitando el mantenimiento y la escalabilidad.',
//                         'order' => 1
//                     ],
//                     [
//                         'type' => 'solution',
//                         'content' => 'También se utilizó Docker para facilitar el desarrollo colaborativo y garantizar que todos los desarrolladores trabajaran en un entorno homogéneo.',
//                         'order' => 2
//                     ],
//                     [
//                         'type' => 'solution',
//                         'content' => 'Para los roles y permisos, se utilizó Spatie Permissions de Laravel, asegurando que cada usuario tuviera acceso solo a las funcionalidades correspondientes a su rol.',
//                         'order' => 3
//                     ],
//                 ]
//             ],
//         ];

//         foreach ($users as $user) {
//             foreach ($projects as $projectData) {
//                 // Creación del proyecto
//                 $project = new Project([
//                     'title' => $projectData['title'],
//                     'description' => $projectData['description'],
//                     'urlGitHub' => $projectData['urlGitHub'],
//                     'urlSitio' => $projectData['urlSitio'],
//                     'user_id' => $user->id,
//                 ]);
//                 $project->save();

//                 // Guardar la imagen si es proporcionada
//                 if (isset($projectData['image'])) {
//                     $imageFilePath = $projectData['image'];
//                     $projectFolderPath = 'projects/' . $project->id . '/images';
//                     $imageName = 'portada-' . $project->id . '.' . pathinfo($imageFilePath, PATHINFO_EXTENSION);

//                     // Verifica si el directorio ya existe, si no, créalo
//                     if (!Storage::disk('public')->exists($projectFolderPath)) {
//                         Storage::disk('public')->makeDirectory($projectFolderPath);
//                     }

//                     // Mover la imagen al directorio del proyecto
//                     Storage::disk('public')->put($projectFolderPath . '/' . $imageName, file_get_contents($imageFilePath));

//                     // Actualiza la ruta de la imagen en el proyecto
//                     $project->image = '/storage/' . $projectFolderPath . '/' . $imageName;
//                     $project->save();
//                 }

//                 // Asignación de habilidades (skills) por nombre
//                 $skillNames = $projectData['skills'];
//                 $skills = Skill::whereIn('name', $skillNames)->get();

//                 if ($skills->isNotEmpty()) {
//                     foreach ($skills as $skill) {
//                         $project->skills()->attach($skill->id);
//                     }
//                 }

//                 // Agregar detalles del proyecto a la tabla project_details
//                 if (isset($projectData['details'])) {
//                     foreach ($projectData['details'] as $detail) {
//                         ProjectDetail::create([
//                             'project_id' => $project->id,
//                             'type' => $detail['type'],
//                             'content' => $detail['content'],
//                             'order' => $detail['order'],
//                         ]);
//                     }
//                 }
//             }
//         }
//     }
// }





namespace Database\Seeders;

use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use App\Models\Objective;
use App\Models\Technology;
use App\Models\Functionality;
use App\Models\Difficulty;
use App\Models\ProjectDetail;
use App\Models\Solution;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener los usuarios existentes
        $users = User::all();

        // Verificar que las habilidades existan en la base de datos
        $existingSkills = ['HTML', 'CSS', 'JavaScript', 'Laravel', 'PHP', 'React', 'MySQL', 'SASS', 'Tailwind CSS', 'Git', 'Docker'];
        foreach ($existingSkills as $skillName) {
            Skill::firstOrCreate(['name' => $skillName]);
        }

        // Lista de proyectos
        $projects = [
            [
                'title' => 'Portfolio',
                'description' => 'Portafolio personal con diseño responsive y optimización para SEO.',
                'urlGitHub' => 'https://github.com/christianrodriguez1795/Portfolio_Christian',
                'urlSitio' => null,
                'image' => 'storage/app/public/proyectos/imagenes/Portfolio-Portfolio.png',
                'skills' => [
                    'JavaScript',
                    'PHP',
                    'Laravel',
                    'React',
                    'Inertia.js',
                    'CSS',
                    'MySQL',
                    'SASS',
                    'Tailwind CSS',
                    'Git'
                ],
                'details' => json_encode([
                    [
                        "category" => "Tecnologias",
                        "type" => 2,
                        "description" => "PHP 8.x con Laravel 9.x.",
                        "advantages" => [
                            'Facilidad de uso con sintaxis clara.',
                            'Ecosistema robusto con Eloquent ORM y Laravel Mix.',
                            'Seguridad integrada.'
                        ],
                        "title" => "Backend"
                    ],
                    [
                        "category" => "Tecnologias",
                        "type" => 2,
                        "description" => "React, Inertia.js y Tailwind CSS.",
                        "advantages" => [
                            'Reutilización de componentes.',
                            'Diseño responsivo.',
                            'Interactividad con JavaScript.'
                        ],
                        "title" => "Frontend"
                    ],
                    [
                        "category" => "Objetivos",
                        "type" => 1,
                        "descriptions" => [
                            "Desarrollar un portafolio moderno y funcional.",
                            "Mostrar proyectos y habilidades con optimización para SEO."
                        ]
                    ],
                    [
                        "category" => "Funcionalidades",
                        "type" => 3,
                        "descriptions" => [
                            "Sistema de gestión de proyectos y habilidades con filtrado avanzado."
                        ]
                    ],
                    [
                        "category" => "Dificultades",
                        "type" => 4,
                        "descriptions" => [
                            "Sincronización de estados entre Inertia.js y React."
                        ]
                    ],
                    [
                        "category" => "Soluciones",
                        "type" => 5,
                        "descriptions" => [
                            "Optimización de consultas SQL y lazy loading en el frontend."
                        ]
                    ]
                ]),
            ],
            [
                'title' => 'TalentSphere',
                'description' => 'TalentSphere es una aplicación de gestión de recursos humanos diseñada para mejorar la eficiencia y precisión en la gestión del capital humano de las empresas permitiendo gestionar empleados, contratos, solicitudes y fichajes mediante una plataforma moderna, escalable y robusta.',
                'urlGitHub' => null,
                'urlSitio' => 'https://talentsphere.christianrodriguezdev.es/',
                'image' => 'storage/app/public/proyectos/imagenes/TalentSphere-Negro.jpg',
                'skills' => [
                    'JavaScript',
                    'PHP',
                    'Laravel',
                    'HTML',
                    'CSS',
                    'MySQL',
                    'Git',
                    'Docker',
                    'Tailwind CSS'
                ],
                'details' => json_encode([
                    [
                        "category" => "Tecnologias",
                        "type" => 2,
                        "description" => "PHP 8.x con Laravel 11.x, el framework más popular de PHP para el desarrollo web moderno.",
                        "advantages" => [
                            'Facilidad de uso y curva de aprendizaje rápida.',
                            'Ecosistema robusto con Eloquent ORM, facilitando la interacción con bases de datos.',
                            'Seguridad avanzada con protección contra ataques CSRF, XSS y autenticación JWT integrada.',
                            'Compatibilidad con microservicios y arquitecturas modulares.',
                            'Amplia comunidad y soporte.'
                        ],
                        "title" => "Backend"
                    ],
                    [
                        "category" => "Tecnologias",
                        "type" => 2,
                        "description" => "Blade (motor de plantillas de Laravel), HTML5, CSS3, Tailwind CSS para el diseño, y JavaScript para la interactividad.",
                        "advantages" => [
                            'Diseño responsive optimizado para dispositivos móviles.',
                            'Componentes reutilizables y fáciles de mantener con Blade y Tailwind CSS.',
                            'Interactividad mejorada gracias al uso de JavaScript y frameworks como Alpine.js.',
                            'Facilidad para integrar con otros frameworks de JavaScript como Vue.js o React.'
                        ],
                        "title" => "Frontend"
                    ],
                    [
                        "category" => "Tecnologias",
                        "type" => 2,
                        "description" => "MySQL 8.x, un sistema de gestión de bases de datos relacional robusto y ampliamente utilizado.",
                        "advantages" => [
                            'Alto rendimiento y escalabilidad para grandes cantidades de datos.',
                            'Compatibilidad total con Eloquent ORM para operaciones simplificadas en Laravel.',
                            'Soporte para transacciones, procedimientos almacenados y vistas.',
                            'Fuerte enfoque en la seguridad y la integridad de los datos.'
                        ],
                        "title" => "Bases de datos"
                    ],
                    [
                        "category" => "Tecnologias",
                        "type" => 2,
                        "description" => "Docker y Laravel Sail, proporcionando un entorno de desarrollo contenedorizado y reproducible entre desarrollo y producción.",
                        "advantages" => [
                            'Configuración simplificada del entorno con Docker, eliminando problemas de dependencias.',
                            'Entorno reproducible que garantiza consistencia entre desarrollo, pruebas y producción.',
                            'Facilidad para escalar el entorno o integrarlo con servicios externos como bases de datos o cachés.',
                            'Compatibilidad con servicios en la nube, ideal para despliegues automatizados en plataformas como AWS o Heroku.'
                        ],
                        "title" => "Entorno de Desarrollo"
                    ],
                    [
                        "category" => "Objetivos",
                        "type" => 1,
                        "descriptions" => [
                            'Desarrollar un sistema moderno y escalable que permita gestionar empleados, fichajes, contratos y solicitudes de forma eficiente.',
                            'Integrar las funcionalidades esenciales para la gestión de recursos humanos como el seguimiento de asistencia, manejo de nóminas, y creación de reportes.',
                            'Documentar el sistema de forma completa para facilitar el mantenimiento futuro.'
                        ]
                    ],
                    [
                        "category" => "Funcionalidades",
                        "type" => 3,
                        "descriptions" => [
                            'Sistema de Roles: Administrador, gerente de departamento y empleado, cada uno con diferentes permisos.',
                            'Gestión de Empleados: Alta, baja, modificación y visualización de empleados con filtros y búsqueda.',
                            'Gestión de Asistencia: Registro de entradas y salidas, generación de reportes de asistencia.',
                            'Gestión de Solicitudes: Solicitudes de permisos o vacaciones por parte de los empleados, con aprobación o rechazo por los gerentes.'
                        ]
                    ],
                    [
                        "category" => "Dificultades",
                        "type" => 4,
                        "descriptions" => [
                            'La principal dificultad fue gestionar la interacción entre las diversas funcionalidades, como la gestión de contratos y el calendario interactivo, dentro de una arquitectura monolítica.',
                            'Garantizar la escalabilidad y modularidad fue un reto importante a medida que se implementaron nuevas funcionalidades y se manejaron grandes volúmenes de datos.',
                            'El manejo de roles y permisos fue complicado debido a la asignación de accesos específicos a cada tipo de usuario.'
                        ]
                    ],
                    [
                        "category" => "Soluciones",
                        "type" => 5,
                        "descriptions" => [
                            'La solución fue utilizar Laravel Modules para estructurar el código de manera modular. Esto permitió dividir las funcionalidades como la gestión de empleados, solicitudes y el calendario en módulos independientes, facilitando el mantenimiento y la escalabilidad.',
                            'También se utilizó Docker para facilitar el desarrollo colaborativo y garantizar que todos los desarrolladores trabajaran en un entorno homogéneo.',
                            'Para los roles y permisos, se utilizó Spatie Permissions de Laravel, asegurando que cada usuario tuviera acceso solo a las funcionalidades correspondientes a su rol.'
                        ]
                    ]
                ]),
            ],
            [
                'title' => 'The Time App',
                'description' => 'Aplicación para comprobar el estado del tiempo mediante el consumo de la api de eltiempo.es.',
                'urlGitHub' => 'https://github.com/christianrodriguez1795/The_Time_App',
                'urlSitio' => 'https://thetimeapp.christianrodriguezdev.es/',
                'image' => 'storage/app/public/proyectos/imagenes/TalentSphere-Negro.jpg',
                'skills' => [
                    'JavaScript',
                    'HTML',
                    'CSS',
                    'Git',
                    'Tailwind CSS'
                ],
                'details' => json_encode([]),
            ],
        ];

        foreach ($users as $user) {
            foreach ($projects as $projectData) {
                // Crear el proyecto
                $project = Project::create([
                    'title' => $projectData['title'],
                    'description' => $projectData['description'],
                    'urlGitHub' => $projectData['urlGitHub'],
                    'urlSitio' => $projectData['urlSitio'],
                    'user_id' => $user->id,
                ]);

                // Guardar la imagen
                if (isset($projectData['image'])) {
                    $imageFilePath = $projectData['image'];
                    $projectFolderPath = 'projects/' . $project->id . '/images';
                    $imageName = 'portada-' . $project->id . '.' . pathinfo($imageFilePath, PATHINFO_EXTENSION);

                    if (!Storage::disk('public')->exists($projectFolderPath)) {
                        Storage::disk('public')->makeDirectory($projectFolderPath);
                    }

                    Storage::disk('public')->put($projectFolderPath . '/' . $imageName, file_get_contents($imageFilePath));

                    $project->image = '/storage/' . $projectFolderPath . '/' . $imageName;
                    $project->save();
                }

                // Asignar habilidades
                $skills = Skill::whereIn('name', $projectData['skills'])->get();
                if ($skills->isNotEmpty()) {
                    $project->skills()->attach($skills);
                }

                $details = $projectData['details'];

                if ($details) {
                    ProjectDetail::create([
                        'project_id' => $project->id,
                        'details' => $details,
                    ]);
                }
            }
        }
    }
}
