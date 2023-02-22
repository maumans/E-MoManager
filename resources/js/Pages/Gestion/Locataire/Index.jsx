import React from 'react';
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import {TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import PlaceIcon from '@mui/icons-material/Place';

import {Inertia} from "@inertiajs/inertia";
import SnackBar from "@/Components/SnackBar";
import {AnimatePresence, motion} from "framer-motion";
import CancelIcon from "@mui/icons-material/Cancel";
import {Visibility} from "@mui/icons-material";
import Vide from "@/Components/Vide";


function Index({auth,success,errors,locataires}) {

    function handleClick() {
        Inertia.get(route("gestion.locataire.create",[auth.user.id]),{preserveScroll:true})
    }

    function handleClickLocation(locataireId) {
        Inertia.get(route("gestion.location.locataire.bien.create",[auth.user.id,0,locataireId,0]),{preserveScroll:true})
    }

    function handleShow(locataireId) {
        Inertia.get(route("gestion.locataire.show",[auth.user.id,locataireId]),{preserveScroll:true})
    }

    return (
        <AdminPanelLayout
            auth={auth}
            errors={errors}
            active={"locataire"}
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
                        Locataire <AddCircleOutlineIcon/>
                    </button>
                </div>
            </div>

            <Vide auth={auth} titre={"locataire"} liste={locataires} />

            <div className={"mt-20 grid grid-cols-1 gap-5 w-full"}>
                {locataires?.map((locataire,i)=>(
                    locataire &&
                    <AnimatePresence key={i}>
                        <motion.div
                            initial={{x:-10-i*100,opacity:0}}
                            animate={{x:0,opacity:1}}
                            transition={{
                                duration:0.5,
                                type:"spring",
                            }}
                            className={"bg-white md:flex rounded md:pb-0 pb-5 w-full"}>

                            {
                                locataire.photo &&
                                <div>
                                    <img className={"object-cover w-full max-w-xl"} style={{maxHeight:500,height:200}}  src={locataire.photo} alt=""/>
                                </div>
                            }

                            <div className={'break-words flex flex-col justify-between  p-2'} style={{height:200}}>
                                <div className={'flex gap-x-3 flex-wrap text-xl font-bold'}>
                                    <div> {locataire.prenom}</div>
                                    <div className={"uppercase"}> {locataire.nom}</div>
                                </div>
                                <div className={"emoFont appThemeColor text-xl"}> {locataire.code}</div>

                                <div className={"flex gap-x-3 font-bold"}>
                                    <PlaceIcon className={'appThemeColor1'}/>
                                    <div> {locataire.ville?.nom}</div>
                                    <div> {locataire.adresse}</div>
                                </div>

                                <div className={'space-x-5'}>
                                    <button onClick={()=>handleShow(locataire.id)} className="bg-blue-500 hover:bg-blue-00 text-white h-full py-2 px-4 rounded z-50">
                                        <Visibility/>
                                    </button>
                                    <button onClick={()=>handleClickLocation(locataire.id)} className="bg-green-500 hover:green text-white h-full py-2 px-4 rounded mx-2">
                                        Location <AddCircleOutlineIcon/>
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
