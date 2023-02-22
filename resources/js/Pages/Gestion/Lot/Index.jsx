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
import Vide from "@/Components/Vide";


function Index({auth,success,errors,lots}) {

    function handleClick() {
        Inertia.get(route("gestion.lot.create",[auth.user.id]),{preserveScroll:true})
    }

    return (
        <AdminPanelLayout
            auth={auth}
            errors={errors}
            active={"lot"}
        >
            <div className={"flex space-x-4 flex-wrap justify-between"}>
                <div className={"bg-white p-1 rounded flex flex-grow flex-1 min-w-lg"} >
                    <TextField className="flex-1" label={"Recherche"} size="small"/>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-full py-2 px-4 rounded mx-2">
                        <SearchIcon/>
                    </button>
                </div>
                <div className={"ml-auto"}>
                    <button onClick={handleClick} className="bg-green-500 hover:green text-white  h-full py-2 px-4 rounded mx-2">
                        Lot <AddCircleOutlineIcon/>
                    </button>
                </div>
            </div>

            <Vide auth={auth} titre={"lot"} liste={lots} />

            <div className={"mt-20 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5"}>
                {lots?.map((lot,i)=>(
                    lot &&
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
                                lot.images &&

                                <div>
                                    <img style={{height:200}} className={"w-full object-cover "}  src={lot.images[0]?.url} alt=""/>
                                </div>
                            }

                            <div className={'space-y-5 p-5'}>
                                <div className={"emoFont appThemeColor text-xl mt-5"}> {lot.code}</div>
                                <div className={"flex space-x-5 font-bold"}>
                                    <PlaceIcon className={'appThemeColor1'}/>
                                    <div> {lot.ville?.nom}</div>
                                    <div> {lot.adresse}</div>
                                </div>
                                <div className={'flex gap-x-5 flex-wrap'}>
                                    {
                                        lot.surface &&
                                        <div className={'font-bold'}>
                                            {lot.surface+' m² '}
                                        </div>
                                    }
                                </div>
                                <div className={"break-words"}>
                                    {lot.description}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                ))}
            </div>


            {/* <div className={"mt-20 space-y-5"}>
                {lots.map((lot,i)=>(
                    <motion.div
                        initial={{x:-10-i*100,opacity:0}}
                        animate={{x:0,opacity:1}}
                        transition={{
                            duration:0.5,
                            type:"spring",
                        }}
                        key={i} className={"flex space-x-10 p-5 bg-white"} style={{height:200}}>
                        <div>
                            <img style={{width:150,height:150}} className={"rounded-full object-cover"}  src={lot.images[3].url} alt=""/>
                        </div>
                        <div className={'space-y-2'}>
                            <div className={"emoFont appThemeColor text-xl"}> {lot.code}</div>
                            <div className={"flex space-x-5 font-bold"}>
                                <PlaceIcon className={'appThemeColor1'}/>
                                <div> {lot.ville.nom},</div>
                                <div> {lot.adresse}</div>
                            </div>
                            <div className={'flex gap-x-5 flex-wrap'}>
                                {
                                    lot.surface &&
                                    <div className={'font-bold'}>
                                        {lot.surface+' m² '}
                                    </div>
                                }
                                {
                                    lot.batiment &&
                                    <div>
                                        Batiment {lot.batiment+', '}
                                    </div>
                                }
                                {
                                    lot.nombreChambres &&
                                    <div>
                                        {lot.nombreChambres+' '} Chambres
                                    </div>
                                }

                                {
                                    lot.salleDeBain &&
                                    <div>
                                        {lot.salleDeBain+' '} Salle de bain
                                    </div>
                                }
                            </div>
                            <div>
                                {lot.description}
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
