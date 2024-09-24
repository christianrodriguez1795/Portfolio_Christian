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
import SwitchTheme from '@/Components/SwitchTheme';
import DescriptionIcon from '@mui/icons-material/Description';

const drawerWidth = 240;
const miniDrawerWidth = 60;

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

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

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const drawer = (
        <div onMouseEnter={() => setDrawerOpen(true)} onMouseLeave={() => setDrawerOpen(false)} >
            <ul className="py-2">
                {[
                    { text: 'Panel de Control', icon: <DashboardIcon />, link: '/dashboard' },
                    { text: 'Mensajes', icon: <MessageIcon />, link: '/messages' },
                    { text: 'Proyectos', icon: <AssignmentIcon />, link: '/projects' },
                    { text: 'Curriculum', icon: <DescriptionIcon />, link: '/curriculum' },
                    { text: 'Portfolio', icon: <WorkOutlineIcon />, link: '/' },
                    { text: 'Blog', icon: <MailIcon />, link: '/blog' },
                ].map((item, index) => (
                    <ListItem button key={item.text} component={Link} href={item.link} className='text-black bg-white  hover:bg-neutral-700 dark:hover:bg-neutral-700 dark:text-white dark:hover:text-black '>
                        <ListItemIcon className='dark:text-white'>{item.icon}</ListItemIcon>
                        <ListItemText
                            primary={item.text}
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                transition: 'opacity 0.3s ease',
                                opacity: drawerOpen || mobileOpen ? 1 : 0,
                            }}
                            className='dark:text-white'
                        />
                    </ListItem>
                ))}
            </ul>

        </div>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }} className={darkMode ? 'dark' : ''}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: '100%',
                    transition: 'width 0.3s ease',
                    backgroundColor: darkMode ? '#2c2c2c' : 'white',
                    zIndex: 49, // Asegura que esté sobre el contenido
                }}
            >
                <Toolbar>
                    <IconButton
                        aria-label="abrir menú"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                        className='text-[#757575] dark:text-white'
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        {header}
                    </Typography>
                    <IconButton>
                        <NotificationsIcon className="text-[#757575] dark:text-white" />
                    </IconButton>
                    <IconButton>
                        <MailIcon className="text-[#757575] dark:text-white" />
                    </IconButton>
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
                    <Box sx={{ flexGrow: 0, paddingLeft: 1 }} className='px.4'>
                        <Tooltip title="Perfil">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={auth.user.name} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu} component={Link} href={route('profile.edit')}>
                                <Typography textAlign="center">Perfil</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogout} >
                                <Typography textAlign="center">Cerrar sesión</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
            {/* Agrega un Toolbar vacío para desplazar el contenido hacia abajo */}
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    pt: { xs: 0, sm: 0 },
                }}
            >
                <Box
                    component="nav"
                    sx={{
                        width: { sm: drawerOpen ? drawerWidth : miniDrawerWidth },
                        flexShrink: { sm: 0 },
                        transition: 'width 0.3s ease',
                        mt: { xs: 0, sm: 8 }, // Agrega margen superior para colocar debajo del AppBar en escritorio
                    }}
                    aria-label="carpetas del buzón"
                    className={`scrollbarGenerico ${darkMode ? 'scrollbarGenerico-dark' : 'scrollbarGenerico-light'} `}

                >


                    {/* Drawer escritorio  */}
                    <div
                        className={`hidden sm:block sm:fixed top-0 left-0 h-full ${darkMode ? 'transition-all duration-300' : 'transition-all duration-300'}  ${drawerOpen ? 'overflow-y-auto' : 'overflow-visible'}  
                        ${darkMode ? 'dark:bg-[#272727]' : 'bg-white'} ${darkMode ? 'scrollbarGenerico-dark' : 'scrollbarGenerico-light'} scrollbarGenerico z-40`}
                        style={{
                            width: drawerOpen ? drawerWidth : miniDrawerWidth,
                            marginTop: '64px',
                            boxSizing: 'border-box',
                            boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        {drawer}
                    </div>

                    {/* Drawer movil  */}
                    <div className={`sm:hidden fixed inset-0 z-50 transition-all duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'
                        } ${mobileOpen ? 'fixed' : 'hidden'}`}>
                        <div
                            className="fixed inset-0 bg-black opacity-50"
                            onClick={handleDrawerToggle}
                        ></div>
                    </div>
                    <div
                        className={`sm:hidden fixed inset-0 shadow-lg h-full transition-transform duration-300 transform 
                            ${mobileOpen ? 'overflow-y-auto' : 'overflow-visible'} overflow-y-auto 
                            ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} ${darkMode ? 'dark:bg-[#272727]' : 'bg-white'}
                            ${darkMode ? 'scrollbarGenerico-dark' : 'scrollbarGenerico-light'} scrollbarGenerico z-50`}
                        style={{ width: drawerWidth, boxSizing: 'border-box', boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)' }}
                    >
                        {drawer}
                    </div>













                </Box>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        overflow: 'auto',
                        maxHeight: 'calc(100vh - 64px)',
                        position: 'relative',
                    }}
                    className={`video-container bg-white dark:bg-black scrollbarGenerico ${darkMode ? 'scrollbarGenerico-dark' : 'scrollbarGenerico-light'}`}
                >
                    <video autoPlay loop muted className='video-background' preload="auto">
                        <source src="/storage/loopLetras.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <Box sx={{ position: 'relative', zIndex: 4 }}>
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}


