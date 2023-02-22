import React, {useEffect, useState} from 'react';
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import {
    RadioGroup,
    TextField,
    Radio,
    Autocomplete,
    TextareaAutosize,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions, Button, CircularProgress, Backdrop, InputAdornment,
    Checkbox, Modal
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';
import {Inertia} from "@inertiajs/inertia";
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/inertia-react";
import {AnimatePresence, motion} from "framer-motion";
import {NumericFormat} from "react-number-format";
import PrimaryButton from "@/Components/PrimaryButton";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {format} from "date-fns";
import {formatNumber} from "chart.js/helpers";
import PlaceIcon from "@mui/icons-material/Place";
import getMois from "@/Utils/getMois";
import {MuiConfirmDialogForm} from "@/Components/MuiConfirmDialog";
import SnackBar from "@/Components/SnackBar";
import Save from "@/Components/Pdfrender";
import Box from "@mui/material/Box";
import {VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    minWidth: 400,
    bgcolor: 'background.paper',
    borderRadius:2,
    boxShadow: 24,
    p: 4,
};

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            isAllowed={(values) => {
                const {floatValue} = values;
                return ((floatValue >= 0 &&  floatValue <= props.max) || floatValue === undefined);
            }}
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator={true}

            suffix={props.devise==="eur"?" €":props.devise==="usd"?" $":props.devise==="%"?" %" :props.devise===" "?"":" FG"

            }
        />
    );
});

function Create({auth,errors,location,revenus,societe,loyers,success}) {

    const {data,setData, post, processing}=useForm({
        "date":format(new Date(Date.now()),"yyyy-MM-dd"),
        "code":"",
        "chargesLocatives":null,

    });

    const {data:dataLoyer,setData:setDataLoyer}=useForm({
        "loyerHC":[],
        "charges":[],
        "resteApayer":[],

    });

    const [locataires, setLocataires] = useState(null);
    const [biens, setBiens] = useState(null);



    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        post(route("gestion.location.store",[auth.user.id]),{preserveScroll:true})
    }

    const [openLocataire, setOpenLocataire] = React.useState(false);

    const handleCloseLocataire = () => {
        setOpenLocataire(false);
    };

    const handleOpenLocataire = () => {
        setOpenBackdrop(true)
        axios.get(route('allLocataire')).then((response) => {
            setLocataires(response.data)
            setOpenLocataire(true);
            setOpenBackdrop(false)
        }).catch((err) => {
            console.log(err)
        });
    };

    const handleOpenBien = () => {
        setOpenBackdrop(true)
        axios.get(route('allbien')).then((response) => {
            setBiens(response.data)
            setOpenbien(true);
            setOpenBackdrop(false)
        }).catch((err) => {
            console.log(err)
        });
    };

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = (loyers) => {

        setOpenModal(true);
        setData('loyers',loyers);
    }
    const handleCloseModal = () => setOpenModal(false);



    const [openBien, setOpenBien] = React.useState(false);

    const handleCloseBien = () => {
        setOpenBien(false);
    };

    function handleChoixBien(bien) {
        setData("bien",bien)
    }

    function handleChoixLocataire(locataire) {
        setData("locataire",locataire)
    }

    useEffect(()=>{
        data.locataire && handleCloseLocataire()
    },[data.locataire])

    useEffect(()=>{
        data.bien && handleCloseBien()
    },[data.bien])

    function handleRetireLocataire() {
        setData("locataire",null)
    }

    function handleRetireBien() {
        setData("bien",null)
    }

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };

    const handleToggle = () => {
        setOpenBackdrop(!open);
    };

    function handlePayer(loyers) {
        Inertia.post(route("gestion.location.revenu.store",[auth.user.id,location.id]),{'date':date,'loyers':loyers},{preserveScroll:true})
    }

    /*useEffect(()=>{
        loyers.map((l)=> {
            setData(l.id+"loyerHC",l.loyerHC)
            setData(l.id+"charges",l.charges)
            setData(l.id+"resteApayer",l.resteApayer)
        })
    })*/

    ///Confirm


    const [date,setDate] = useState(format(new Date(Date.now()),"yyyy-MM-dd"));

    useEffect(()=> {
        !date && setDate(format(new Date(Date.now()), "yyyy-MM-dd"))
    },[date])

    const onHandleChangeDate = (event) => {
        setDate(event.target.value)
    };

    return (
        <AdminPanelLayout
            auth={auth}
            errors={errors}
            active={"location"}
            titre={"Location > paiement"}
        >
            <div className={"flex space-x-4 flex-wrap justify-between"}>
                <div className={"bg-white p-1 rounded flex flex-grow flex-1 min-w-lg"} >
                    <TextField className="flex-1" label={"Recherche"} size="small"/>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-full py-2 px-4 rounded mx-2">
                        <SearchIcon/>
                    </button>
                </div>
            </div>
            <motion.div
                initial={{y:-10,opacity:0}}
                animate={{y:0,opacity:1}}
                transition={{
                    duration:0.5,
                    type:"spring",
                }}

                style={{width: '100%' }} className={"flex justify-center"}
            >
                <form onSubmit={handleSubmit} className={"space-y-10 w-full rounded mt-5"}>
                    <div className={"bg-white p-5 gap-5 w-full border"}>
                        <div className={"emoFont md:col-span-2 appThemeColor w-fit p-2"}>
                            LOCATAIRE
                        </div>
                        {
                            location.locataire ?
                                <AnimatePresence>
                                    <motion.div
                                        initial={{x:-10,opacity:0}}
                                        animate={{x:0,opacity:1}}
                                        transition={{
                                            duration:0.5,
                                            type:"spring",
                                        }}
                                        className={"bg-white md:flex rounded md:pb-0 pb-5 w-full bg-gray-100"}>

                                        {
                                            location.locataire.photo &&

                                            <div className={"lg:w-3/12 md:w-5/12"}>
                                                <img className={"object-cover w-full"} style={{maxHeight:500,height:200}}  src={location.locataire.photo} alt=""/>
                                            </div>
                                        }

                                        <div className={'break-words flex flex-col gap-4  p-2'} style={{height:200}}>
                                            <div className={'flex gap-x-3 flex-wrap text-xl font-bold'}>
                                                <div> {location.locataire.prenom}</div>
                                                <div className={"uppercase"}> {location.locataire.nom}</div>
                                            </div>
                                            <div className={"emoFont appThemeColor text-xl"}> {location.locataire.code}</div>

                                            <div className={"flex gap-x-3 font-bold"}>
                                                <PlaceIcon className={'appThemeColor1'}/>
                                                <div> {location.locataire.ville?.nom}</div>
                                                <div> {location.locataire.adresse}</div>
                                            </div>

                                           {/* <div>
                                                <button type={"button"} className="bg-red-500 hover:bg-red-700 text-white rounded p-3" onClick={handleRetireLocataire}>
                                                    Retirer <CancelIcon/>
                                                </button>
                                            </div>*/}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                                :
                                <div>
                                    <button type={"button"} onClick={handleOpenLocataire} className="bg-blue-500 hover:bg-blue-700 text-white h-full py-2 px-4 rounded mx-2">
                                        Ajouter <AddCircleOutlineIcon/>
                                    </button>

                                    <Backdrop
                                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                        open={openBackdrop}
                                        onClick={handleCloseBackdrop}
                                    >
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                </div>
                        }

                        {/*{
                            !openBackdrop &&
                            <Dialog open={openLocataire} onClose={handleCloseLocataire}>
                                <DialogTitle>
                                    <div className={"emoFont appThemeColor w-fit p-2"}>
                                        CHOIX DU LOCATAIRE
                                    </div>
                                </DialogTitle>
                                <DialogContent className={"w-full"}>
                                    <DialogContentText>
                                    Choix du locataire
                                </DialogContentText>
                                    <div className={"grid grid-cols-1 gap-5 w-full"}>
                                        {locataires && locataires?.map((locataire,i)=>(
                                            locataire &&
                                            <AnimatePresence key={i}>
                                                <motion.div
                                                    initial={{x:-10-i*100,opacity:0}}
                                                    animate={{x:0,opacity:1}}
                                                    transition={{
                                                        duration:0.5,
                                                        type:"spring",
                                                    }}
                                                    className={"bg-gray-100 md:flex rounded md:pb-0 pb-5 w-full"}>

                                                    {
                                                        locataire.photo &&

                                                        <div className={"sm:w-5/12"}>
                                                            <img className={"object-cover w-full sm:max-w-sm"} style={{maxHeight:500,height:200}}  src={locataire.photo} alt=""/>
                                                        </div>
                                                    }

                                                    <div className={'break-words flex flex-col gap-4  p-2'} style={{height:200}}>
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
                                                        <div>
                                                            <button type={"button"} className="bg-green-500 hover:bg-green-700 text-white rounded p-3" onClick={()=>handleChoixLocataire(locataire)}>Choisir</button>
                                                        </div>

                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>
                                        ))}
                                    </div>
                                </DialogContent>
                                 <DialogActions>
                                <button type={"button"} className="bg-red-500 hover:bg-red-700 text-white rounded p-3" onClick={handleCloseLocataire}>Annuler</button>
                                <button type={"button"} className="bg-green-500 hover:bg-green-700 text-white rounded p-3">Enregistrer</button>
                            </DialogActions>
                            </Dialog>

                        }*/}
                    </div>

                    <div className={"bg-white p-5 gap-5"}>
                        <div className={"emoFont md:col-span-2 appThemeBackgroundColor text-white w-fit p-2 text-xl"}>
                            {location?.bien?.type_bien?.libelle}
                        </div>
                        {
                            location.bien ?
                                <AnimatePresence>
                                    <motion.div
                                        initial={{x:-10,opacity:0}}
                                        animate={{x:0,opacity:1}}
                                        transition={{
                                            duration:0.5,
                                            type:"spring",
                                        }}
                                        className={"bg-gray-100 md:flex bg-white rounded relative"} style={{maxHeight:500}}>

                                        {
                                            location.bien.images &&

                                            <div className={"lg:w-3/12 md:w-5/12"}>
                                                <img style={{maxHeight:500,height:200}} className={"w-full object-cover "}  src={location.bien.images[1]?.url} alt=""/>
                                            </div>

                                        }

                                        <div className={'space-y-2 p-2'}>
                                            <div className={"emoFont appThemeColor text-xl"}> {location.bien.code}</div>
                                            <div className={"flex space-x-5 font-bold"}>
                                                <PlaceIcon className={'appThemeColor1'}/>
                                                <div> {location.bien.ville?.nom}</div>
                                                <div> {location.bien.adresse}</div>
                                            </div>
                                            <div className={'flex gap-x-5 flex-wrap'}>
                                                {
                                                    location.bien.surface &&
                                                    <div className={'font-bold'}>
                                                        {location.bien.surface+' m² '}
                                                    </div>
                                                }
                                                {
                                                    location.bien.batiment &&
                                                    <div>
                                                        Batiment {location.bien.batiment+', '}
                                                    </div>
                                                }
                                                {
                                                    location.bien.nombreChambres &&
                                                    <div>
                                                        {location.bien.nombreChambres+' '} Chambres
                                                    </div>
                                                }

                                                {
                                                    location.bien.salleDeBain &&
                                                    <div>
                                                        {location.bien.salleDeBain+' '} Salle de bain
                                                    </div>
                                                }
                                            </div>

                                           {/* <div>
                                                <button type={"button"} className="bg-red-500 hover:bg-red-700 text-white rounded p-3" onClick={handleRetireBien}>
                                                    Retirer <CancelIcon/>
                                                </button>
                                            </div>*/}
                                            <div className={"break-words"}>
                                                {location.bien.description}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                                :
                                <div>
                                    <button type={"button"} onClick={handleOpenBien} className="bg-blue-500 hover:bg-blue-700 text-white h-full py-2 px-4 rounded mx-2">
                                        Ajouter <AddCircleOutlineIcon/>
                                    </button>
                                </div>
                        }

                        {/*{
                            !openBackdrop &&
                            <Dialog open={openBien} onClose={handleCloseBien}>
                                <DialogTitle>
                                    <div className={"emoFont appThemeColor w-fit p-2"}>
                                        CHOIX DU BIEN
                                    </div>
                                </DialogTitle>
                                <DialogContent className={"w-full"}>
                                    <DialogContentText>
                                    Choix du locataire
                                </DialogContentText>
                                    <div className={"grid grid-cols-1 gap-5 w-full"}>
                                        {biens && biens?.map((bien,i)=>(
                                            bien &&
                                            <AnimatePresence key={i}>
                                                <motion.div
                                                    initial={{x:-10-i*100,opacity:0}}
                                                    animate={{x:0,opacity:1}}
                                                    transition={{
                                                        duration:0.5,
                                                        type:"spring",
                                                    }}
                                                    className={"bg-gray-100 bg-white rounded relative pb-5"} style={{maxHeight:500}}>

                                                    {
                                                        bien.images &&

                                                        <div>
                                                            <img style={{height:200}} className={"w-full object-cover "}  src={bien.images[1]?.url} alt=""/>
                                                        </div>
                                                    }

                                                    <div className={'space-y-5 p-5'}>
                                                        <div className={"emoFont appThemeColor text-xl mt-5"}> {bien.code}</div>
                                                        <div className={"flex space-x-5 font-bold"}>
                                                            <PlaceIcon className={'appThemeColor1'}/>
                                                            <div> {bien.ville?.nom}</div>
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
                                                        <div>
                                                            <button type={"button"} className="bg-green-500 hover:bg-green-700 text-white rounded p-3" onClick={()=>handleChoixBien(bien)}>Choisir</button>
                                                        </div>
                                                        <div className={"break-words"}>
                                                            {bien.description}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>

                                        ))}
                                    </div>
                                </DialogContent>
                                 <DialogActions>
                                <button type={"button"} className="bg-red-500 hover:bg-red-700 text-white rounded p-3" onClick={handleCloseLocataire}>Annuler</button>
                                <button type={"button"} className="bg-green-500 hover:bg-green-700 text-white rounded p-3">Enregistrer</button>
                            </DialogActions>
                            </Dialog>

                        }*/}
                    </div>
                    {console.log(Object.entries(loyers))}

                    {/*{
                        for (const [key,lg] of Object.entries(loyers)) {
                            return
                        }
                    }*/}

                    {


                        Object.values(loyers).map((lg,i)=>(
                            <div key={i}>
                                <div className={"p-5 bg-white"}>

                                    <div className={"emoFont md:col-span-2 appThemeBackgroundColor text-white w-fit p-2 text-xl"}>
                                        Tranche {lg[0].tranche}
                                    </div>
                                </div>
                                <div>
                                    {
                                        lg.map(l=>(
                                            <div key={l.id} className={"bg-white grid p-5 gap-5"}>
                                    <span className={"p-3 appThemeBackgroundColor text-white md:col-span-2"}>
                                        {getMois(l.mois)} {l.annee}
                                    </span>

                                                <span className={"p-3 bg-gray-400 text-white rounded"}>
                                        Loyers(HC): {formatNumber(l.loyerHC)} {l.devise?.symbole}
                                    </span>

                                                <span className={"p-3 bg-gray-400 text-white rounded"}>
                                        Charges: {formatNumber(l.charges)} {l.devise?.symbole}
                                    </span>

                                                <span className={"p-3 bg-gray-400 text-white rounded"}>
                                        Total à payer:  {formatNumber(l.resteApayer)} {l.devise?.symbole}
                                    </span>

                                                <div className={"md:col-span-2 flex w-full"}>
                                                    {/*<div>
                                        <TextField
                                            value={data[l.id+"loyerHC"]}
                                            InputProps={{
                                                endAdornment:<InputAdornment position="end" >FG</InputAdornment>,
                                                inputComponent: NumberFormatCustom,
                                                inputProps:{
                                                    max:1000000000,
                                                    name:l.id+"resteApayer",
                                                    devise:" "

                                                },
                                            }}
                                            className={"w-full"} label="Reste à payer" name={l.id+"loyerHC" } onChange={onHandleChange}/>
                                        <InputError message={errors[l.id+"resteApayer"]}/>
                                    </div>*/}

                                                    {/*
                                    <button disabled={i!==0} type={"button"} onClick={(id)=>handlePayer(l.id)} className="disabled:bg-gray-400 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ml-auto">
                                        Enregistrer le paiement
                                    </button>*/}
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={"p-5 bg-white"}>
                                    <MuiConfirmDialogForm index={i} onHandleChangeDate={onHandleChangeDate} date={date} onHandleChange={onHandleChange} titre={"Enregistrer le paiement"} buttonText={'Enregistrer le paiement'}  message={"Voulez-vous enregister le paiement du loyer de la tranche ?"} handleAction={(id)=>handlePayer(lg)} />

                                    <button type="button" disabled={i!==0} onClick={()=>handleOpenModal(lg)} className={"disabled:text-gray-400 disabled:border-gray-400 disabled:bg-white ml-5 p-2 text-blue-400 border border-blue-400 hover:bg-blue-500 hover:text-white transition duration-500 rounded"}>
                                        <VisibilityOutlined/> Facture
                                    </button>
                                </div>

                                <Modal
                                    keepMounted
                                    open={openModal}
                                    onClose={handleCloseModal}
                                    aria-labelledby="keep-mounted-modal-title"
                                    aria-describedby="keep-mounted-modal-description"
                                >
                                    <Box sx={style}>
                                        {

                                            data.loyers &&
                                            <Save
                                                infos={
                                                    {
                                                        societe,
                                                        location,
                                                        loyers:data.loyers
                                                    }
                                                }
                                            />
                                        }
                                    </Box>
                                </Modal>

                                {

                                    lg &&
                                    <Save
                                        infos={
                                            {
                                                societe,
                                                location,
                                                loyers:lg
                                            }
                                        }
                                    />
                                }
                            </div>

                        ))
                    }

{/*
                    <div className={"bg-white p-5 grid md:grid-cols-2 gap-5"}>

                        <div className={"emoFont md:col-span-2 appThemeColor w-fit p-2"}>
                            INFOS DU PAIEMENT
                        </div>

                        <DesktopDatePicker
                            className="w-full"
                            value={data.date}
                            label="Date de la transaction"
                            renderInput={(params) => <TextField {...params} />}
                            onChange={(date)=>setData('date',date)}
                            required
                        />

                        <div className={"w-full"}>
                            <TextField
                                InputProps={{
                                    endAdornment:<InputAdornment position="end" >FG</InputAdornment>,
                                    inputComponent: NumberFormatCustom,
                                    inputProps:{
                                        max:1000000000,
                                        name:"loyer",
                                        devise:" "

                                    },
                                }}
                                className={"w-full"} label="Montant reçu" name="montant" onChange={onHandleChange}/>
                            <InputError message={errors.montant}/>
                        </div>

                        <div
                            className={"w-full"}
                            >
                            <Autocomplete
                                className={"w-full"}
                                onChange={(e,val)=>setData("typeBail",val)}
                                disablePortal={true}
                                options={typeBails}
                                getOptionLabel={(option)=>option.nom}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params)=><TextField  fullWidth {...params} placeholder={"Type de bail"} label={params.nom} required/>}
                            />
                            <div className={"flex text-red-600"}>{errors?.typeBail}</div>
                        </div>

                        <div className={"w-full"}>
                            <TextField
                                InputProps={{
                                    endAdornment:<InputAdornment position="end" >FG</InputAdornment>,
                                    inputComponent: NumberFormatCustom,
                                    inputProps:{
                                        max:1000000000,
                                        name:"chargesLocatives",
                                        devise:" "

                                    },
                                }}
                                className={"w-full"} label="Charges " name="charges" onChange={onHandleChange}/>
                            <InputError message={errors.chargesLocatives}/>
                        </div>

                        <div className="md:col-span-2 mt-10">
                            <PrimaryButton processing={processing}>
                                Valider
                            </PrimaryButton>
                        </div>
                    </div>
*/}

                </form>

                {
                    success &&
                    <SnackBar success={success}/>
                }

            </motion.div>
        </AdminPanelLayout>
    );
}

export default Create;
