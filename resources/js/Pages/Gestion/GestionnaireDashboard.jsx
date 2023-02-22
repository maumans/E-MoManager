import React from 'react';
import AnimatedNumbers from "react-animated-numbers";
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";

import PlaceIcon from '@mui/icons-material/Place';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DomainIcon from '@mui/icons-material/Domain';
import PaidIcon from '@mui/icons-material/Paid';
import {AnimatePresence, motion} from "framer-motion";
import {Inertia} from "@inertiajs/inertia";
function Index({auth,errors,nbreImmeubles,nbreBiens,nbreLocataires,nbreLocations}) {
    return (
        <AdminPanelLayout
            auth={auth}
            errors={errors}
            active={"gestionnaireDashboard"}
        >

            <AnimatePresence>
                <motion.div
                    initial={{x:-100,opacity:0}}
                    animate={{x:0,opacity:1}}
                    transition={{
                        duration:0.5,
                        type:"spring",
                    }}
                    className={"grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 mt-5"}>


                    <div onClick={()=>Inertia.get(route("gestion.immeuble.index",auth.user.id))} className={"p-5 appThemeBackgroundColor text-white rounded relative cursor-pointer"}>
                        <div className={"absolute bg-white appThemeColor p-5 rounded appThemeBorderColor"} style={{right:5,top:-30}}>
                            <DomainIcon/>
                        </div>
                        <AnimatedNumbers
                            includeComma
                            animateToNumber={nbreImmeubles}
                            fontStyle={{ fontSize: 32 }}
                            configs={(number, index) => {
                                return { mass: 1, tension: 1000 * (index + 1), friction: 140, };
                            }}
                        ></AnimatedNumbers>
                        <div className={"text-xl"}>
                            Immeubles
                        </div>
                    </div>

                    <div onClick={()=>Inertia.get(route("gestion.bien.index",auth.user.id))} className={"p-5 bg-green-500 text-white rounded relative cursor-pointer"}>
                        <div className={"absolute bg-white appThemeColor p-5 rounded border border-green-500 text-green-500"} style={{right:5,top:-30}}>
                            <Diversity2Icon/>
                        </div>
                        <AnimatedNumbers
                            includeComma
                            animateToNumber={nbreBiens}
                            fontStyle={{ fontSize: 32 }}
                            configs={(number, index) => {
                                return { mass: 10, tension: 1000 * (index + 1), friction: 140, };
                            }}
                        ></AnimatedNumbers>
                        <div className={"text-xl"}>
                            Biens
                        </div>
                    </div>

                    <div onClick={()=>Inertia.get(route("gestion.locataire.index",auth.user.id))} className={"p-5 bg-yellow-500 text-white rounded relative cursor-pointer"}>
                        <div className={"absolute bg-white appThemeColor p-5 rounded border border-yellow-500 text-yellow-500"} style={{right:5,top:-30}}>
                            <GroupsIcon/>
                        </div>
                        <AnimatedNumbers
                            includeComma
                            animateToNumber={nbreLocataires}
                            fontStyle={{ fontSize: 32 }}
                            configs={(number, index) => {
                                return { mass: 15, tension: 1000 * (index + 1), friction: 140, };
                            }}
                        ></AnimatedNumbers>
                        <div className={"text-xl"}>
                            Locataires
                        </div>
                    </div>

                    <div onClick={()=>Inertia.get(route("gestion.location.index",auth.user.id))} className={"p-5 bg-red-500 text-white rounded relative cursor-pointer"}>
                        <div className={"absolute bg-white appThemeColor p-5 rounded border border-red-500 text-red-500"} style={{right:5,top:-30}}>
                            <PlaceIcon/>
                        </div>
                        <AnimatedNumbers
                            includeComma
                            animateToNumber={nbreLocations}
                            fontStyle={{ fontSize: 32 }}
                            configs={(number, index) => {
                                return { mass: 1, tension: 1000 * (index + 1), friction: 140, };
                            }}
                        ></AnimatedNumbers>
                        <div className={"text-xl"}>
                            Locations
                        </div>
                    </div>

                </motion.div>

            </AnimatePresence>



           <div className={"container"}>
              {/* <AnimatedNumbers
                   includeComma
                   animateToNumber={100}
                   fontStyle={{ fontSize: 40 }}
                   configs={[
                       { mass: 1, tension: 220, friction: 100 },
                       { mass: 1, tension: 180, friction: 130 },
                       { mass: 1, tension: 280, friction: 90 },
                       { mass: 1, tension: 180, friction: 135 },
                       { mass: 1, tension: 260, friction: 100 },
                       { mass: 1, tension: 210, friction: 180 },
                   ]}
               ></AnimatedNumbers>*/}

           </div>
        </AdminPanelLayout>
    );
}

export default Index;
