import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            animation: {
                'bounce-slow': 'bounce 2s infinite', // Cambia la velocidad de bounce a 2 segundos
                'bounce-fast': 'bounce 0.5s infinite', // Una versión más rápida de bounce
            },
            spacing: {
                'ws-narrow': '-2em', 
                'hyphens': 'auto'// Espacio ajustado entre palabras
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                // sans: ['Inter', ...defaultTheme.fontFamily.sans],
                // serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
                // mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono],
                titulo: [
                    'Rubik',
                    'Arial',
                    'Helvetica',
                    '"Noto Sans Devanagari"',
                    '"Noto Sans CJK SC Thin"',
                    '"Noto Sans SC"',
                    '"Noto Sans Hebrew"',
                    'sans-serif',
                ],
                parrafo: [
                    'Inter',
                    'Arial',
                    'Helvetica',
                    '"Noto Sans Devanagari"',
                    '"Noto Sans CJK SC Thin"',
                    '"Noto Sans SC"',
                    '"Noto Sans Hebrew"',
                    'sans-serif',
                ],
            },

            screens: {
                'xs': '360px',   // Define el breakpoint para extra pequeño
                'sm': '640px',   // Define el breakpoint para pequeño
                'md': '768px',   // Define el breakpoint para mediano
                'lg': '1024px',  // Define el breakpoint para grande
                'xl': '1280px',  // Define el breakpoint para extra grande
                '2xl': '1536px', // Define el breakpoint para doble extra grande
            },
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb1vLUygu574YqfnMQtAEymJmdevipi3uLQGHOqqjJ0Q&s',
            colors: {
                // Colores principales
                scrollBar: {

                    light: {
                        primary: 'grey', // Azul oscuro
                        secondary: 'white' // Azul oscuro
                    },
                    dark: {
                        primary: 'grey', // Azul oscuro
                        secondary: 'white' // Azul oscuro
                    },

                },
                header: {
                    dark: 'white', // Azul oscuro
                    light: 'white', // Azul claro (variante)
                },
                nav: {
                    dark: 'white', // Amarillo oscuro
                    light: 'white', // Amarillo claro (variante)
                },
                navLink: {
                    background: {
                        light: 'white', // Amarillo claro (variante)
                        dark: 'white', // Amarillo oscuro
                    },
                    borderColor: {
                        light: 'grey', // Amarillo claro (variante)
                        dark: 'grey', // Amarillo oscuro
                    },
                    textColor: {
                        light: 'black', // Amarillo claro (variante)
                        dark: 'black', // Amarillo oscuro
                    },
                    hoverColor: {
                        light: '#D1D5DB', // Amarillo claro (variante)
                        dark: '#D1D5DB', // Amarillo oscuro
                    }
                },
                panelServicio: {
                    light: 'white', // Gris claro (variante)
                    dark: 'white', // Gris oscuro
                },
                main: {
                    light: 'white', // Gris claro (variante)
                    dark: 'white', // Gris oscuro
                },
                // Colores de texto
                text: {
                    light: '#718096', // Gris claro
                    dark: '#1A202C', // Gris oscuro
                },
                // Colores de fondo
                background: {
                    dark: '#F7FAFC', // Gris oscuro para fondos
                    light: '#F7FAFC', // Gris claro para fondos (variante)
                },
                surface: {
                    dark: '#F3F4F6', // Gris azul oscuro para superficies
                    light: '#F3F4F6', // Gris claro para superficies (variante)
                },
            },
            fontSize: {
                'xs': '.75rem', // Tamaño de fuente extra pequeño
                'sm': '.875rem', // Tamaño de fuente pequeño
                'base': '1rem', // Tamaño de fuente base
                'lg': '1.125rem', // Tamaño de fuente grande
                'xl': '1.25rem', // Tamaño de fuente extra grande
                '2xl': '1.5rem', // Tamaño de fuente 2 veces grande
                '3xl': '1.875rem', // Tamaño de fuente 3 veces grande
                '4xl': '2.25rem', // Tamaño de fuente 4 veces grande
                '5xl': '3rem', // Tamaño de fuente 5 veces grande
                '6xl': '4rem', // Tamaño de fuente 6 veces grande
                '7xl': '5rem', // Tamaño de fuente 7 veces grande
                '8xl': '6rem', // Tamaño de fuente 8 veces grande
                '9xl': '7rem', // Tamaño de fuente 9 veces grande
                '14Custom': '14px', // Tamaño de fuente 9 veces grande
            },
            fontWeight: {
                'hairline': 100, // Grosor de fuente hairline
                'thin': 200, // Grosor de fuente delgado
                'light': 300, // Grosor de fuente ligero
                'normal': 400, // Grosor de fuente normal
                'medium': 500, // Grosor de fuente medio
                'semibold': 600, // Grosor de fuente semibold
                'bold': 700, // Grosor de fuente en negrita
                'extrabold': 800, // Grosor de fuente extrabold
                'black': 900, // Grosor de fuente negro
            },
            letterSpacing: {
                'tighter': '-0.05em', // Espaciado de letra más ajustado
                'tight': '-0.025em', // Espaciado de letra ajustado
                'normal': '0', // Espaciado de letra normal
                'wide': '0.025em', // Espaciado de letra amplio
                'wider': '0.05em', // Espaciado de letra más amplio
                'widest': '0.1em', // Espaciado de letra máximo
            },
            lineHeight: {
                'none': '1', // Altura de línea sin espacio adicional
                'tight': '1.25', // Altura de línea estrecha
                'snug': '1.375', // Altura de línea ajustada
                'normal': '1.5', // Altura de línea normal
                'relaxed': '1.625', // Altura de línea relajada
                'loose': '2', // Altura de línea holgada
            },
            width: {
                'modal': '50rem', // Tamaño fijo modal                
                'navLateral': '16rem', // Tamaño fijo modal                
            },
            height: {
                'navLateral': '43.5rem', // Tamaño fijo modal                
            },
            minWidth: {
                'modal': '45rem', // Tamaño fijo modal                
            },
            spacing: {
                '2.6': '11.7px', // Define la distancia deseada desde la parte superior
            },

        },
    },

    plugins: [forms],
};
