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


function Index({auth,success,errors,biens}) {

    function handleClick() {
        Inertia.get(route("gestion.bien.create",[auth.user.id]),{preserveScroll:false})
    }

    function handleClickLocation(bienId) {
        Inertia.get(route("gestion.location.locataire.bien.create",[auth.user.id,0,0,bienId]),{preserveScroll:false})
    }

    function handleShow(bienId) {
        Inertia.get(route("gestion.bien.show",[auth.user.id,bienId]),{preserveScroll:false})
    }

    return (
        <AdminPanelLayout
            auth={auth}
            errors={errors}
            active={"bien"}
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
                        Bien <AddCircleOutlineIcon/>
                    </button>
                </div>
            </div>

            <Vide auth={auth} titre={"bien"} liste={biens} />

            <div className={"mt-20 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5"}>
                {biens?.map((bien,i)=>(
                    bien &&
                    <AnimatePresence key={i}>
                        <motion.div
                            initial={{x:-10-i*100,opacity:0}}
                            animate={{x:0,opacity:1}}
                            transition={{
                                duration:0.5,
                                type:"spring",
                            }}
                            className={"bg-white bg-white rounded relative pb-5"} style={{maxHeight:500}}>

                            {
                                bien.images &&

                                <div>
                                    <img style={{height:200}} className={"w-full object-cover "}  src={bien.images[0]?.url} alt=""/>
                                </div>
                            }

                            <div  className={'space-y-5 p-5'}>
                                <div className={"flex justify-between items-center flex-wrap"}>
                                    <div className={"emoFont appThemeColor text-xl"}> {bien.code}</div>
                                </div>
                                <div className={"flex items-center flex-wrap gap-5"}>
                                    <button onClick={()=>handleShow(bien.id)} className="bg-blue-500 hover:bg-blue-00 text-white h-full py-2 px-4 rounded z-50">
                                        <Visibility/>
                                    </button>
                                    <button onClick={()=>handleClickLocation(bien.id)} className="bg-green-500 hover:green text-white h-full py-2 px-4 rounded z-50">
                                        Location <AddCircleOutlineIcon/>
                                    </button>
                                </div>
                                <div className={"flex space-x-5 font-bold"}>
                                    <PlaceIcon className={'appThemeColor1'}/>
                                    <div> {bien.ville?.nom}</div>
                                    <div> {bien.adresse}</div>
                                </div>
                                <div className={'flex gap-x-5 flex-wrap'}>
                                    {
                                        bien.surface &&
                                        <div className={'font-bold'}>
                                            {bien.surface+' m² '}
                                        </div>
                                    }
                                    {
                                        bien.batiment &&
                                        <div>
                                            Batiment {bien.batiment+', '}
                                        </div>
                                    }
                                    {
                                        bien.nombreChambres &&
                                        <div>
                                            {bien.nombreChambres+' '} Chambres
                                        </div>
                                    }

                                    {
                                        bien.salleDeBain &&
                                        <div>
                                            {bien.salleDeBain+' '} Salle de bain
                                        </div>
                                    }
                                </div>
                                <div className={"break-words"}>
                                    {bien.description}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                ))}
            </div>


           {/* <div className={"mt-20 space-y-5"}>
                {biens.map((bien,i)=>(
                    <motion.div
                        initial={{x:-10-i*100,opacity:0}}
                        animate={{x:0,opacity:1}}
                        transition={{
                            duration:0.5,
                            type:"spring",
                        }}
                        key={i} className={"flex space-x-10 p-5 bg-white"} style={{height:200}}>
                        <div>
                            <img style={{width:150,height:150}} className={"rounded-full object-cover"}  src={bien.images[3].url} alt=""/>
                        </div>
                        <div className={'space-y-2'}>
                            <div className={"emoFont appThemeColor text-xl"}> {bien.code}</div>
                            <div className={"flex space-x-5 font-bold"}>
                                <PlaceIcon className={'appThemeColor1'}/>
                                <div> {bien.ville.nom},</div>
                                <div> {bien.adresse}</div>
                            </div>
                            <div className={'flex gap-x-5 flex-wrap'}>
                                {
                                    bien.surface &&
                                    <div className={'font-bold'}>
                                        {bien.surface+' m2 '}
                                    </div>
                                }
                                {
                                    bien.batiment &&
                                    <div>
                                        Batiment {bien.batiment+', '}
                                    </div>
                                }
                                {
                                    bien.nombreChambres &&
                                    <div>
                                        {bien.nombreChambres+' '} Chambres
                                    </div>
                                }

                                {
                                    bien.salleDeBain &&
                                    <div>
                                        {bien.salleDeBain+' '} Salle de bain
                                    </div>
                                }
                            </div>
                            <div>
                                {bien.description}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>*/}

            {
                success &&
                <SnackBar success={success}/>
            }
        </AdminPanelLayout>
    );
}

export default Index;
