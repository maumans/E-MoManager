import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';
import rueAnimee from '/public/images/rue-animée.jpg'
import batiment from '/public/images/batiment.jpg'
import batiment2 from '/public/images/batiment 2.jpg'
import {createTheme} from "@mui/material";
import {frFR} from "@mui/material/locale";
import {ThemeProvider} from "@emotion/react";

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
            primary: {
                main: '#4f46e5',
                contrastText:'#4f46e5',
            },
        },
    },
    frFR,
    //dgfrFR
);

export default function Guest({titre, children,hiddenPhoto }) {
    return (
        <ThemeProvider theme={theme}>
            <div className="h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className="flex m-16 rounded bg-white overflow-hidden h-full md:p-0 p-10" style={{maxWidth:1000}}>
                    {
                        !hiddenPhoto &&
                        <div className="w-6/12 md:block hidden appThemeBorderColor">
                            <img src={batiment2} className="w-full h-full object-cover" alt=""/>
                        </div>
                    }
                    <div className={`flex flex-col justify-center items-center ${!hiddenPhoto && "md:w-6/12"} text-white appThemeBackgroundColor`}>
                        <div>
                            <div className="text-xl mb-5 text-center">
                                Bienvenue(e) sur
                            </div>
                            <Link href="/">
                                <div className="text-4xl emoFont text-center">
                                    E-MoManager
                                </div>
                            </Link>
                        </div>

                        {
                            titre &&
                            <div className={"mt-10 text-4xl p-1 border border-b-4 rounded"}>
                                {titre}
                            </div>
                        }

                        <div className={"w-full mt-6 md:px-6 px-2 py-4 sm:rounded-lg"}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
