import React, {useEffect} from 'react';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {Inertia} from "@inertiajs/inertia";
import {AnimatePresence, motion} from "framer-motion";

function Vide({titre,liste,message,button,route:routeComp,auth,article}) {


    function handleClick() {
        Inertia.get(route(routeComp ?route:"gestion."+titre+".create",[auth.user.id]),{preserveScroll:false})
    }

    return (
        liste?.length === 0 ?
            <AnimatePresence>
                <motion.div
                    initial={{x:-10,opacity:0}}
                    animate={{x:0,opacity:1}}
                    transition={{
                        duration:0.5,
                        type:"spring",
                    }}>
                    <div className={'bg-white appThemeColor text-xl text-center p-5 space-y-5 mt-5'}>
                        {message ?
                            message
                            :
                            <div>
                                {article?
                                    <div className={"text-2xl font-bold appThemeColor1"}>
                                        Aucune {titre} enregistrée
                                    </div>
                                    :
                                    <div className={"text-2xl font-bold appThemeColor1"}>
                                        Aucun {titre} enregistré
                                    </div>}
                                <div>
                                    Cliquez ici pour ajouter
                                </div>
                            </div>
                        }
                        {
                            button
                                ? button
                                :
                                <div>
                                    <button onClick={handleClick} className="bg-green-500 hover:green text-white h-full py-2 px-4 rounded mx-2">
                                        {titre} <AddCircleOutlineIcon/>
                                    </button>
                                </div>
                        }
                    </div>
                </motion.div>
            </AnimatePresence>
            :
            null
    );
}

export default Vide;
