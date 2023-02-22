import React from 'react';
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import {Inertia} from "@inertiajs/inertia";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AnimatedNumbers from "react-animated-numbers";
import {AnimatePresence, motion} from "framer-motion";

function Index({auth,errors,revenuTotal,revenuMensuel}) {
    return (
        <AdminPanelLayout
            auth={auth}
            errors={errors}
            active={"revenu"}
            titre={"Vue d'ensemble"}
        >

            <div>
                <AnimatePresence>
                    <motion.div
                        initial={{x:-100,opacity:0}}
                        animate={{x:0,opacity:1}}
                        transition={{
                            duration:0.5,
                            type:"spring",
                        }}
                        className={"grid xs:grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 mt-5"}>
                        <div>
                            <div onClick={()=>Inertia.get(route("gestion.immeuble.index",auth.user.id))} className={"p-5 bg-green-600 text-white rounded relative cursor-pointer"}>
                                <div className={"absolute bg-white text-green-600 p-5 rounded text-green-600 border border-green-500"} style={{right:5,top:-30}}>
                                    <CurrencyExchangeIcon/>
                                </div>
                                <div>
                                    Revenu total
                                </div>
                                <AnimatedNumbers
                                    includeComma
                                    animateToNumber={revenuTotal}
                                    fontStyle={{ fontSize: 32 }}
                                    configs={(number, index) => {
                                        return { mass: 1, tension: 1000 * (index + 1), friction: 140, };
                                    }}
                                ></AnimatedNumbers>
                                <div className={"text-xl"}>
                                    FG
                                </div>
                            </div>
                        </div>

                        <div>
                            <div onClick={()=>Inertia.get(route("gestion.immeuble.index",auth.user.id))} className={"p-5 bg-yellow-500 text-white rounded relative cursor-pointer"}>
                                <div className={"absolute bg-white text-yellow-500 p-5 rounded text-yellow-500 border border-yellow-500"} style={{right:5,top:-30}}>
                                    <CurrencyExchangeIcon/>
                                </div>
                                <div>
                                    Ce mois-ci
                                </div>
                                <AnimatedNumbers
                                    includeComma
                                    animateToNumber={revenuMensuel}
                                    fontStyle={{ fontSize: 32 }}
                                    configs={(number, index) => {
                                        return { mass: 1, tension: 1000 * (index + 1), friction: 140, };
                                    }}
                                ></AnimatedNumbers>
                                <div className={"text-xl"}>
                                    FG
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div>
                    <motion.div
                        initial={{x:-100,opacity:0}}
                        animate={{x:0,opacity:1}}
                        transition={{
                            duration:0.5,
                            type:"spring",
                        }}
                        className={"grid xs:grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 mt-5"}>

                    </motion.div>

                </div>
            </div>

        </AdminPanelLayout>
    );
}

export default Index;
