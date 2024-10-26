
import React, { useState, useEffect } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MessageIcon from '@mui/icons-material/Message';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SwitchTheme from '@/Components/Inputs/SwitchTheme';
import DescriptionIcon from '@mui/icons-material/Description';

export default function Guest({ children }) {

    const getPreferredTheme = () => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            return localTheme === 'dark';
        } else {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    };

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
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const handleToggleChange = (e) => {
        const newValue = e.target.checked;

        // Obtener todos los elementos que tienen transiciones
        const elements = document.querySelectorAll('.transition-all');

        // Desactivar transiciones
        elements.forEach(element => {
            element.style.transition = 'none'; // Desactiva transiciones con estilo inline
        });

        // Cambiar el estado y guardar en localStorage
        setDarkMode(newValue);
        localStorage.setItem('theme', newValue ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newValue);

        // Reactivar transiciones después de un breve retraso
        setTimeout(() => {
            elements.forEach(element => {
                element.style.transition = ''; // Reactiva transiciones
            });
        }, 300); // Ajusta el tiempo según la duración de tus transiciones
    };
    return (
        <div className="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-gray-200 dark:bg-[#6e6e6e]">
            <div
            className={`
                fixed w-full transition-width duration-300 ease-in-out 
                ${darkMode ? 'bg-transparent' : 'bg-transparent'}
                z-[49] top-0 left-0
            `}
        >
            <Toolbar className="flex justify-end">
                <IconButton>
                    <SwitchTheme
                        name="theme"
                        value=""
                        checked={darkMode}
                        onChange={handleToggleChange}
                        moonColor='#757575'
                        sunColor='#757575'
                    />
                </IconButton>
            </Toolbar>
        </div>
            <div className="w-full sm:max-w-md px-6 py-4 bg-white dark:bg-[#2c2c2c] shadow-xl overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
