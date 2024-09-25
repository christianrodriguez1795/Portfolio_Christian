import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const getPreferredTheme = () => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
        return localTheme === 'dark';
    } else {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
};

const setThemeClass = (darkMode) => {
    document.documentElement.classList.toggle('dark', darkMode);
};

// Crear un componente que use hooks y envuelva el componente App de Inertia
const InertiaAppWrapper = ({ App, props }) => {
    const [darkMode, setDarkMode] = useState(getPreferredTheme);

    useEffect(() => {
        const matchDark = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            if (!localStorage.getItem('theme')) {
                setDarkMode(e.matches);
            }
        };
        matchDark.addEventListener('change', handleChange);

        return () => matchDark.removeEventListener('change', handleChange);
    }, []); // Asegúrate de tener el arreglo de dependencias vacío si no dependes de ninguna variable externa

    useEffect(() => {
        setThemeClass(darkMode);
    }, [darkMode]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 50,
        });
        return () => AOS.refresh();
    }, []);

    return <App {...props} />;
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<InertiaAppWrapper App={App} props={props} />);
    },
    progress: {
        color: getPreferredTheme() ? '#FFFFFF' : '#4B5563',
    },
});

document.addEventListener('inertia:after', () => {
    AOS.refresh();
});

document.addEventListener('pagination:click', () => {
    AOS.refreshHard(); // Desactivar AOS
});

document.addEventListener('scroll:activate', () => {
    AOS.init({ duration: 1000 }); // Reactivar AOS
    AOS.refresh();
});
