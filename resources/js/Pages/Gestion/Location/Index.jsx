import React from 'react';
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import {TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import {Inertia} from "@inertiajs/inertia";
import SnackBar from "@/Components/SnackBar";
import {AnimatePresence, motion} from "framer-motion";
import {format} from "date-fns"
import {formatNumber} from "chart.js/helpers";

import PlaceIcon from '@mui/icons-material/Place';
import Vide from "@/Components/Vide";


function Index({auth,success,errors,locations}) {

    function handleClick() {
        Inertia.get(route("gestion.location.create",[auth.user.id]),{preserveScroll:false})
    }

    function handleClickRevenu(locationId) {
        Inertia.get(route("gestion.location.revenu.create",[auth.user.id,locationId]),{preserveScroll:false})
    }

    function handleClickDepense(locationId) {
        Inertia.get(route("gestion.location.depense.create",[auth.user.id,locationId]),{preserveScroll:false})
    }

    return (
        <AdminPanelLayout
            auth={auth}
            errors={errors}
            active={"location"}
        >
            <div className={"flex space-x-4 flex-wrap justify-between"}>
                <div className={"bg-white p-1 rounded flex flex-grow flex-1 min-w-lg"}>
                    <TextField className="flex-1" label={"Recherche"} size="small"/>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-full py-2 px-4 rounded mx-2">
                        <SearchIcon/>
                    </button>
                </div>
                <div className={"ml-auto"}>
                    <button onClick={handleClick} className="bg-green-500 hover:green text-white h-full py-2 px-4 rounded mx-2">
                        Location <AddCircleOutlineIcon/>
                    </button>
                </div>
            </div>

            <Vide article={true} auth={auth} titre={"location"} liste={locations} />

            <div className={"mt-20 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5"}>
                {locations?.map((location,i)=>(
                    location &&
                    <AnimatePresence key={i}>
                        <motion.div
                            initial={{x:-10-i*100,opacity:0}}
                            animate={{x:0,opacity:1}}
                            transition={{
                                duration:0.5,
                                type:"spring",
                            }}
                            className={"bg-white bg-white rounded relative pb-5"} style={{maxHeight:500}}>

                            <div className={'space-y-5 p-5 '}>
                                <div className={"emoFont text-white appThemeBackgroundColor p-2 rounded text-xl flex gap-3 mt-5"}>
                                    {location.code}
                                    <div>
                                        ({location.bien?.type_bien?.libelle})
                                    </div>
                                </div>

                                <div className={"flex space-x-5"}>
                                    <PlaceIcon/>
                                    <div> {location.bien?.ville?.nom}</div>
                                    <div> {location.bien?.adresse}</div>
                                </div>
                                <div className={'flex gap-x-5 flex-wrap'}>
                                    <div className={'font-bold'}>
                                        {location?.locataire?.prenom}
                                    </div>
                                    <div className={'font-bold uppercase'}>
                                        {location?.locataire?.nom}
                                    </div>

                                </div>
                                <div className={"break-words flex justify-between gap-4 flex-wrap"}>
                                    <div>
                                        Du {format(new Date(location.dateDebutBail),'dd/MM/yyyy')} au {format(new Date(location?.dateFinBail),'dd/MM/yyyy')}
                                    </div>
                                    <div>
                                        <span className={"p-2 text-white rounded font-bold appThemeBackgroundColor"}>{formatNumber(location?.loyerTotal)} {location?.devise?.symbole}</span>
                                    </div>
                                </div>

                                <div className={"flex gap-5"}>
                                    <button onClick={()=>handleClickRevenu(location.id)} className="bg-green-500 hover:bg-green-600 text-white h-full py-2 px-4 rounded">
                                        Revenu <AddCircleOutlineIcon/>
                                    </button>

                                    <button onClick={()=>handleClickDepense(location.id)} className="bg-red-500 hover:bg-red-600 text-white h-full py-2 px-4 rounded">
                                        Depense <RemoveCircleOutlineIcon/>
                                    </button>

                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                ))}
            </div>

            {
                success &&
                <SnackBar success={success}/>
            }
        </AdminPanelLayout>
    );
}

export default Index;
