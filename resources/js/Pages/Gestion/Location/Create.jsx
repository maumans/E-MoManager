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
    Checkbox, FormGroup
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
import WarningIcon from "@mui/icons-material/Warning";



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

function Create({auth,errors,typeBails,locataire,bien,devises}) {

    const myHeaders = new Headers();
    myHeaders.append("apikey", "ev03bMWv1nXIaCXWua4FMcgDRaashdg0");

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    const [exchangeData,setExchangeData]=useState(null)
    const [rateUSD,setRateUSD]=useState()
    const [rateEUR,setRateEUR]=useState()

   /* useEffect(()=>{
        fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=USD,EUR&base=GNF",requestOptions)
            .then(response => response.json())
            .then(result => {
                setExchangeData(result)
            })
            .catch(error => console.log('error', error));
    },[])

    useEffect(()=>{
        console.log(exchangeData)
    },[exchangeData])*/

    /*fetch("https://api.apilayer.com/exchangerates_data/convert?to=USD,EUR&from=GNF&amount={10000}", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));*/

    const {data,setData, post, processing}=useForm({
        "dateDebutBail":format(new Date(Date.now()),"yyyy-MM-dd"),
        "dateFinBail":format(new Date(Date.now()),"yyyy-MM-dd"),
        "devise":bien ?bien?.devise?.code : "GNF",
        "frequence":"",
        "type":"VIDE",
        "moyenPaiement":"",
        //"code":"",
        "renouvellable":false,
        "locataire":null,
        "bien":null,
        "loyerHC":null,
        "charges":null,
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

       /* Inertia.get(route('allBien'))*/

        axios.get(route('allBien')).then((response) => {
            setBiens(response.data)
            setOpenBien(true);
            setOpenBackdrop(false)
        }).catch((err) => {
            console.log(err)
        });
    };



    const [openBien, setOpenBien] = React.useState(false);

    const handleCloseBien = () => {
        setOpenBien(false);
    };

    function handleChoixBien(bien) {
        setData("bien",bien)
    }

    useEffect(()=>{
        data.bien && setData("devise",data.bien?.devise?.code)
    },[data.bien])

    function handleChoixLocataire(locataire) {
        setData("locataire",locataire)
    }

    useEffect(()=>{
        data.locataire && handleCloseLocataire()
    },[data.locataire])

    useEffect(()=>{
        locataire && setData("locataire",locataire)
        bien && setData("bien",bien)
    },[locataire,bien])


    useEffect(()=>{

        data.bien && handleCloseBien()

        data.bien && setData((data)=>({
            ...data,
            "loyerHC":data.bien.loyerHC,
            "charges":data.bien.charges,
            "type":data.bien.typeLocation ? data.bien.typeLocation : 'VIDE',
        }))
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
    return (
        <AdminPanelLayout
            auth={auth}
            errors={errors}
            active={"location"}
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
                            data.locataire ?
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
                                            data.locataire.photo &&

                                            <div className={"lg:w-3/12 md:w-5/12"}>
                                                <img className={"object-cover w-full"} style={{maxHeight:500,height:200}}  src={data.locataire.photo} alt=""/>
                                            </div>
                                        }

                                        <div className={'break-words flex flex-col gap-4  p-2'} style={{height:200}}>
                                            <div className={'flex gap-x-3 flex-wrap text-xl font-bold'}>
                                                <div> {data.locataire.prenom}</div>
                                                <div className={"uppercase"}> {data.locataire.nom}</div>
                                            </div>
                                            <div className={"emoFont appThemeColor text-xl"}> {data.locataire.code}</div>

                                            <div className={"flex gap-x-3 font-bold"}>
                                                <PlaceIcon className={'appThemeColor1'}/>
                                                <div> {data.locataire.ville?.nom}</div>
                                                <div> {data.locataire.adresse}</div>
                                            </div>

                                            <div>
                                                <button type={"button"} className="bg-red-500 hover:bg-red-700 text-white rounded p-3" onClick={handleRetireLocataire}>
                                                    Retirer <CancelIcon/>
                                                </button>
                                            </div>
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

                        {
                            !openBackdrop &&
                            <Dialog open={openLocataire} onClose={handleCloseLocataire}>
                                <DialogTitle>
                                    <div className={"emoFont appThemeColor w-fit p-2"}>
                                        CHOIX DU LOCATAIRE
                                    </div>
                                </DialogTitle>
                                <DialogContent className={"w-full"}>
                                    {/*<DialogContentText>
                                    Choix du locataire
                                </DialogContentText>*/}
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
                                {/* <DialogActions>
                                <button type={"button"} className="bg-red-500 hover:bg-red-700 text-white rounded p-3" onClick={handleCloseLocataire}>Annuler</button>
                                <button type={"button"} className="bg-green-500 hover:bg-green-700 text-white rounded p-3">Enregistrer</button>
                            </DialogActions>*/}
                            </Dialog>

                        }
                    </div>

                    <div className={"bg-white p-5 gap-5"}>
                        <div className={"emoFont md:col-span-2 appThemeColor w-fit p-2"}>
                            BIEN
                        </div>
                        {
                            data.bien ?
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
                                            data.bien.images &&

                                            <div className={"lg:w-3/12 md:w-5/12"}>
                                                <img style={{maxHeight:500,height:200}} className={"w-full object-cover "}  src={data.bien.images[0]?.url} alt=""/>
                                            </div>

                                        }

                                        <div className={'space-y-2 p-2'}>
                                            <div className={"emoFont appThemeColor text-xl"}> {data.bien.code}</div>
                                            <div className={"flex space-x-5 font-bold"}>
                                                <PlaceIcon className={'appThemeColor1'}/>
                                                <div> {data.bien.ville?.nom}</div>
                                                <div> {data.bien.adresse}</div>
                                            </div>
                                            <div className={'flex gap-x-5 flex-wrap'}>
                                                {
                                                    data.bien.surface &&
                                                    <div className={'font-bold'}>
                                                        {data.bien.surface+' m² '}
                                                    </div>
                                                }
                                                {
                                                    data.bien.batiment &&
                                                    <div>
                                                        Batiment {data.bien.batiment+', '}
                                                    </div>
                                                }
                                                {
                                                    data.bien.nombreChambres &&
                                                    <div>
                                                        {data.bien.nombreChambres+' '} Chambres
                                                    </div>
                                                }

                                                {
                                                    data.bien.salleDeBain &&
                                                    <div>
                                                        {data.bien.salleDeBain+' '} Salle de bain
                                                    </div>
                                                }
                                            </div>

                                            <div>
                                                <button type={"button"} className="bg-red-500 hover:bg-red-700 text-white rounded p-3" onClick={handleRetireBien}>
                                                    Retirer <CancelIcon/>
                                                </button>
                                            </div>
                                            <div className={"break-words"}>
                                                {data.bien.description}
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

                        {
                            !openBackdrop &&
                            <Dialog open={openBien} onClose={handleCloseBien}>
                                <DialogTitle>
                                    <div className={"emoFont appThemeColor w-fit p-2"}>
                                        CHOIX DU BIEN
                                    </div>
                                </DialogTitle>
                                <DialogContent className={"w-full"}>
                                    {/*<DialogContentText>
                                    Choix du locataire
                                </DialogContentText>*/}
                                    <div className={"grid grid-cols-1 gap-5 w-full"}>
                                        {biens?.length>0 ? biens?.map((bien,i)=>(
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
                                                            <img style={{height:200}} className={"w-full object-cover "}  src={bien.images[0]?.url} alt=""/>
                                                        </div>
                                                    }

                                                    <div className={'space-y-5 p-5'}>
                                                        <div className={"emoFont appThemeColor text-xl mt-5"}> {bien.code}</div>
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
                                                        <div>
                                                            <button type={"button"} className="bg-green-500 hover:bg-green-700 text-white rounded p-3" onClick={()=>handleChoixBien(bien)}>Choisir</button>
                                                        </div>
                                                        <div className={"break-words"}>
                                                            {bien.description}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>

                                        ))
                                            :
                                            <div className={"p-5 text-red-500"}>
                                                <WarningIcon/> Aucun bien disponible en location
                                            </div>
                                        }
                                    </div>
                                </DialogContent>
                                {/* <DialogActions>
                                <button type={"button"} className="bg-red-500 hover:bg-red-700 text-white rounded p-3" onClick={handleCloseLocataire}>Annuler</button>
                                <button type={"button"} className="bg-green-500 hover:bg-green-700 text-white rounded p-3">Enregistrer</button>
                            </DialogActions>*/}
                            </Dialog>

                        }
                    </div>

                    <div className={"bg-white p-5 grid md:grid-cols-2 gap-5"}>

                        <div className={"emoFont md:col-span-2 appThemeColor w-fit p-2"}>
                            INFOS GENERALES
                        </div>

                        {/*<div className={"w-full"}>
                            <TextField className={"w-full"} label="Code" name="code" onChange={onHandleChange} required/>
                            <InputError message={errors.code}/>
                        </div>*/}

                        <div>
                            <FormControl className={"w-full"}>
                                <InputLabel id={"demo-simple-select-label"}>Type de location</InputLabel>
                                <Select
                                    labelId={"demo-simple-select-label"}
                                    id={"demo-simple-select"}
                                    className={"w-full"}
                                    label={"Type de location"}
                                    value={data.type}
                                    onChange={(e)=>setData("type",e.target.value)}
                                >
                                    <MenuItem value={"VIDE"}>Vide</MenuItem>
                                    <MenuItem value={"MEUBLE"}>Meublée</MenuItem>
                                </Select>
                            </FormControl>
                            <div className={"flex my-2 text-red-600"}>{errors?.type}</div>
                        </div>

                        <DesktopDatePicker
                            className="w-full"
                            value={data.dateDebutBail}
                            label="Date de debut du bail"
                            renderInput={(params) => <TextField {...params} />}
                            onChange={(date)=>setData('dateDebutBail',date)}
                            required
                        />

                        <DesktopDatePicker
                            className="w-full"
                            value={data.dateFinBail}
                            label="Date de fin du bail"

                            renderInput={(params) => <TextField {...params} />}
                            onChange={(date)=>setData('dateFinBail',date)}
                            required
                        />

                        <div>
                            <FormControl className={"w-full"}>
                                <InputLabel id="demo-simple-select-standard-label">Fréquence</InputLabel>
                                <Select
                                    className={"w-full"}
                                    labelId="demo-simple-select-label"
                                    label={"Fréquence"}

                                    value={data.frequence}
                                    onChange={(e)=>setData("frequence",e.target.value)}
                                >
                                    <MenuItem value={"MENSUELLE"}>MENSUELLE</MenuItem>
                                     <MenuItem value={"TRIMESTRIELLE"}>TRIMESTRIELLE</MenuItem>
                                    <MenuItem value={"SEMESTRIELLE"}>SEMESTRIELLE</MenuItem>
                                    <MenuItem value={"ANNUELLE"}>ANNUELLE</MenuItem>
                                    <MenuItem value={"ALEATOIRE"}>ALEATOIRE</MenuItem>

                                </Select>
                            </FormControl>
                            <div className={"flex my-2 text-red-600"}>{errors?.frequence}</div>
                        </div>

                        {/*<div
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
                        </div>*/}

                        <div className={"sm:col-span-2"}>
                            Renouvellable: <Checkbox name={"renouvellable"} onChange={onHandleChange} />
                        </div>

                        <div className={"w-full"}>
                            <TextField
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                    inputProps:{
                                        max:31,
                                        name:"jourPaiement",
                                        devise:" "

                                    },
                                }}
                                className={"w-full"} label="Jour de paiement" name="jourPaiement" onChange={onHandleChange} required/>
                            <InputError message={errors.jourPaiement}/>
                        </div>

                        <div>
                            <FormControl className={"w-full"}>
                                <InputLabel id={"demo-simple-select-label"}>Moyen de paiement</InputLabel>

                                <Select
                                    labelId={"demo-simple-select-label"}
                                    id={"demo-simple-select"}
                                    className={"w-full"}
                                    label={"Moyen de paiement"}
                                    value={data.moyenPaiement}
                                    name="moyenPaiement"
                                    onChange={onHandleChange}
                                >
                                    <MenuItem value={"VIREMENT"}>Virement</MenuItem>
                                    <MenuItem value={"CHEQUE"}>Chèque</MenuItem>
                                    <MenuItem value={"ESPECE"}>Espèce</MenuItem>
                                    <MenuItem value={"CARTE CREDIT"}>Carte de crédit</MenuItem>
                                    <MenuItem value={"PRELEVEMENT AUTOMATIQUE"}>Prélèvement automatique</MenuItem>
                                    <MenuItem value={"TOUT"}>Tout</MenuItem>
                                </Select>
                            </FormControl>
                            <div className={"flex my-2 text-red-600"}>{errors?.type}</div>
                        </div>

                        <div className={"w-full"}>
                            <div className={"flex gap-2"}>
                                <TextField
                                    value={data.loyerHC}
                                    InputLabelProps={{
                                        shrink:true
                                    }}
                                    InputProps={{
                                        /*endAdornment:<InputAdornment position="end" >

                                        </InputAdornment>,*/
                                        inputComponent: NumberFormatCustom,
                                        inputProps:{
                                            max:1000000000,
                                            name:"loyerHC",
                                            devise:" "

                                        },
                                    }}
                                    className={"w-full"} label="Loyer hors charges" name="loyerHC" onChange={onHandleChange}/>
                                    <Select
                                        className={"bg-white"}
                                        value={data.devise}
                                        name="devise"
                                        onChange={onHandleChange}
                                    >
                                        <MenuItem value={"GNF"}>GNF</MenuItem>
                                        <MenuItem value={"USD"}>$</MenuItem>
                                        <MenuItem value={"EUR"}>€</MenuItem>
                                    </Select>
                            </div>

                            <InputError message={errors.loyerHC}/>
                        </div>

                        <div className={"w-full"}>

                            <div className={"flex gap-2"}>
                                <TextField
                                    value={data.charges}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    InputProps={{
                                        /*endAdornment:<InputAdornment position="end" >

                                        </InputAdornment>,*/
                                        inputComponent: NumberFormatCustom,
                                        inputProps:{
                                            max:1000000000,
                                            name:"charges",
                                            devise:" "

                                        },
                                    }}
                                    className={"w-full"} label="Charges" name="charges" onChange={onHandleChange}/>
                                <Select
                                    className={"bg-white"}
                                    value={data.devise}
                                    name="devise"
                                    onChange={onHandleChange}
                                >
                                    <MenuItem value={"GNF"}>GNF</MenuItem>
                                    <MenuItem value={"USD"}>$</MenuItem>
                                    <MenuItem value={"EUR"}>€</MenuItem>
                                </Select>
                            </div>

                            <InputError message={errors.charges}/>
                        </div>

                        {
                            (data?.loyerHC && data?.charges) &&
                            <div className={"sm:col-span-2"}>
                                <span className={"font-bold text-xl"}>Loyer total: </span>{formatNumber(parseInt(data?.loyerHC) + parseInt(data?.charges))+" "+ (data.devise=='EUR'?"EURO":data.devise)}
                            </div>
                        }

                        <div className={"w-full"}>

                            <div className={"flex gap-2"}>
                                <TextField
                                    InputProps={{
                                        /*endAdornment:<InputAdornment position="end" >
                                        </InputAdornment>,*/
                                        inputComponent: NumberFormatCustom,
                                        inputProps:{
                                            max:(1000000000),
                                            name:"montantDepotGarantie",
                                            devise:" "

                                        },
                                    }}
                                    className={"w-full pr-0"} label="Montant de depot garantie" name="montantDepotGarantie" onChange={onHandleChange}/>
                                <Select
                                    className={"bg-white"}
                                    value={data.devise}
                                    name="devise"
                                    onChange={onHandleChange}
                                >
                                    <MenuItem value={"GNF"}>GNF</MenuItem>
                                    <MenuItem value={"USD"}>$</MenuItem>
                                    <MenuItem value={"EUR"}>€</MenuItem>
                                </Select>
                            </div>

                            <InputError message={errors.montantDepotGarantie}/>
                        </div>

                        <div className={"w-full"}>

                            <div className={"flex gap-2"}>
                                <TextField
                                    InputProps={{
                                       /* endAdornment:<InputAdornment position="end" >
                                        </InputAdornment>,*/
                                        inputComponent: NumberFormatCustom,
                                        inputProps:{
                                            max:(1000000000),
                                            name:"penaliteRetard",
                                            devise:" "

                                        },
                                    }}
                                    className={"w-full"} label="Pénalité de retard" name="penaliteRetard" onChange={onHandleChange}/>
                                <Select
                                    className={"bg-white"}
                                    value={data.devise}
                                    name="devise"
                                    onChange={onHandleChange}
                                >
                                    <MenuItem value={"GNF"}>GNF</MenuItem>
                                    <MenuItem value={"USD"}>$</MenuItem>
                                    <MenuItem value={"EUR"}>€</MenuItem>
                                </Select>
                            </div>

                            <InputError message={errors.penaliteRetard}/>
                        </div>

                        <div>
                            <PrimaryButton processing={processing}>
                                Valider
                            </PrimaryButton>
                        </div>
                    </div>

                </form>

            </motion.div>
        </AdminPanelLayout>
    );
}

export default Create;
