import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from "@inertiajs/inertia-react";
import NavLink from "@/Components/NavLink";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import {Inertia} from "@inertiajs/inertia";

//Mui Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import DomainIcon from '@mui/icons-material/Domain';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PlaceIcon from '@mui/icons-material/Place';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {frFR} from '@mui/material/locale';
import {frFR as dgfrFR} from '@mui/x-data-grid';

//import { ConfirmDialogProvider } from 'react-mui-confirm';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PaidIcon from '@mui/icons-material/Paid';
import {padding} from "@mui/system";
import {fr} from "date-fns/locale";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";



const theme = createTheme(
    {
        typography: {
            "fontFamily": `"BioRhyme", sans-serif`,
            "fontSize": 14,
            "fontWeightLight": 300,
            "fontWeightRegular": 400,
            "fontWeightMedium": 500
        },
        palette: {
            primary: {main: '#1976d2'},
        },
    },
    frFR,
    dgfrFR
);

const drawerWidth = 240;

export default function AdminPanelLayout(props) {

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function handleClick(r,id1,id2,active)
    {
        if(active==="adminSociete")
        {
            id2=props.auth.societe.id
        }

       Inertia.get( route(r,[id1,id2],{replace:false}))
    }

    function profilSwitch(libelle)
    {
        switch(libelle)
        {
            case "Comptable":
                return "Comptable"
            case "Gestionnaire":
                return "Gestionnaire"
            default:
                return <span className="capitalize">{libelle}</span>

        }
    }


    const drawer = (
        <div>
            <Toolbar className="appThemeBackgroundColor text-xl text-white font-bold p-0 m-0">
                <Link href={"/"}>
                    E-MoManager
                </Link>
            </Toolbar>
            <List style={{padding:0}}>

                { props.auth.gestionnaire &&
                    [{routeLink:"gestionnaireDashboard.index",text:'Tableau de bord',active:"gestionnaireDashboard",icon:<DashboardIcon/>},
                        //{routeLink:"gestion.user.index",text:'Utilisateur',active:"user",icon:<PersonIcon/>},
                        //{routeLink:"gestion.role.index",text:'Role',active:"role",icon:<GroupsIcon/>},
                        //{routeLink:"gestion.immeuble.index",text:'Immeuble',active:"immeuble",icon:<DomainIcon/>},
                        {routeLink:"gestion.lot.index",text:'Lot',active:"lot",icon:<DomainIcon/>},
                        {routeLink:"gestion.bien.index",text:'Bien',active:"bien",icon:<Diversity2Icon/>},
                        {routeLink:"gestion.locataire.index",text:'Locataire',active:"locataire",icon:<PersonIcon/>},
                        {routeLink:"gestion.location.index",text:'Location',active:"location",icon:<PlaceIcon/>},
                        {routeLink:"gestion.revenu.index",text:'Revenus',active:"revenu",icon:<PaidIcon/>},
                        {routeLink:"gestion.depense.index",text:'Depenses',active:"depense",icon:<PaidIcon/>},
                       ]
                        .map(({routeLink,text,active,icon}, index) => (
                    <ListItem key={text} className={`${props.active===active ? "appThemeBackgroundColorSub appThemeBorderRightColor" : "text-black"}`} disablePadding >
                        <ListItemButton onClick={()=>handleClick(routeLink,props.auth.user.id,null,)}>
                            <ListItemIcon   className={`${props.active===active ? "appThemeBackgroundColorSub" : "text-black"}`}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider className={"pt-20"} />
            <ListItemButton>
                <ListItemIcon >
                    <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText className={"capitalize"} primary={<> {props.auth.user?.prenom} <span className="uppercase">{props.auth.user?.nom} </span> </> } />
            </ListItemButton>
            <ListItemButton onClick={() => Inertia.get(route('profilSociete'))}>
                <ListItemIcon >
                    <SupervisorAccountIcon/>
                </ListItemIcon>
                <ListItemText primary={"Changer de profil"} />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon >
                    <SettingsIcon/>
                </ListItemIcon>
                <ListItemText primary={"Paramètre"} />
            </ListItemButton>
            <ListItemButton onClick={() => Inertia.post(route('logout'))}>
                <ListItemIcon >
                    <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary={"Deconnexion"} />
            </ListItemButton>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider adapterLocale={fr} dateAdapter={AdapterDateFns}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        sx={{
                            width: { sm: `calc(100% - ${drawerWidth}px)` },
                            ml: { sm: `${drawerWidth}px` },
                            boxShadow:"inherit",
                            backgroundColor:"inherit"
                        }}
                    >
                        <nav className="bg-white appThemeBorderBottomColor h-full w-full">
                            <div className="max-w-9xl xl:px-60 lg:px-32 md:px-8 sm:px-6">
                                <div className="flex justify-between h-15">
                                    <div className="flex">
                                        <Toolbar>
                                            <IconButton
                                                aria-label="open drawer"
                                                edge="start"
                                                onClick={handleDrawerToggle}
                                                sx={{ display: { sm: 'none' } }}
                                            >
                                                <MenuIcon className="appThemeColor" />
                                            </IconButton>
                                            <div className="appThemeColor flex items-center text-xl font-bold cursor-default">
                                                {[{text:'Tableau de bord',active:"gestionnaireDashboard"},{text:'Utilisateur',active:"user"},
                                                    {text:'Immeuble',active:"immeuble"},
                                                    {text:'Lot',active:"lot"},
                                                    {text:'Bien',active:"bien"},
                                                    {text:'Bien Immobilier',active:"bienImmobilier"},
                                                    {text:'Location',active:"location"},
                                                    {text:'Locataire',active:"locataire"},
                                                    {text:'Revenu',active:"revenu"},
                                                    {text:'Depense',active:"depense"},
                                                    {text:"Role",active:"role"}
                                                ].map(({text,active}, index) => (
                                                    props.active===active  && (props.titre || text)
                                                ))}
                                            </div>
                                        </Toolbar>

                                    </div>

                                    <div className="hidden sm:flex sm:items-center sm:ml-16">
                                        <div className="ml-3 relative">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        <div>
                                                            <div className="font-bold">
                                                                <span className="capitalize">{props.auth.user?.prenom}</span> <span className="uppercase">{props.auth.user?.nom} </span>
                                                            </div>
                                                        <div className="flex items-center space-x-1 pt-2">
                                                            <div className={"appThemeBackgroundColor rounded-full p-1 w-fit h-fit"}></div>
                                                            <div className={"appThemeColor"}>
                                                                {
                                                                    profilSwitch(props.auth.profil)
                                                                }
                                                            </div>
                                                        </div>
                                                        </div>

                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                                </Dropdown.Trigger>

                                                <Dropdown.Content>
                                                    <Dropdown.Link className="appThemeBackgroundColorSubHover" href={route('profilSociete')} method="get" as="button">
                                                        Changer de profil
                                                    </Dropdown.Link>

                                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                                        Deconnexion
                                                    </Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>

                    </AppBar>
                    <Box
                        component="nav"
                        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                        aria-label="mailbox folders"
                    >
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                            }}
                        >
                            {drawer}
                        </Drawer>
                        <Drawer
                            variant="permanent"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                            }}
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Box>
                    <Box
                        className={"bg-gray-100 min-h-screen flex flex-col justify-between"}
                        component="main"
                        sx={{flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                    >
                        <div className={"my-16 xl:px-60 lg:px-32 md:px-8 sm:px-6"}>
                            {props.children}
                        </div>

                        <div className={'text-center appThemeColor'}>
                        <span>
                            Copyright © 2022, par Mau de la Mans corp.
                        </span>
                        </div>
                    </Box>
                </Box>
            </LocalizationProvider>

        </ThemeProvider>
    );
}

AdminPanelLayout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
}
