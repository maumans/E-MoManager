import React, {useEffect, useState,Fragment} from 'react';
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import {
    FormControlLabel,
    RadioGroup,
    TextField,
    Radio,
    Autocomplete,
    TextareaAutosize, InputAdornment,
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
import AddButton from "@/Components/AddButton";
import PlaceIcon from "@mui/icons-material/Place";
import SaveButton from "@/Components/SaveButton";

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

function Create({auth,errors,villes,typeBiens}) {

    const {data,setData, post, processing}=useForm({
        "code":"",
        "adresse":"",
        "ville":"",
        "surface":"",
        "typeLocation":"VIDE",
        "image":null,
        "images":[],
        "imageBien":null,
        "imagesBien":[],
        "biens":[]
    });

    const [creation,setCreation]=useState(false)

    function handleAddBien()
    {
        setData("biens",[...data.biens,
            {
                "code":data.codeBien,
                "typeBien":data.typeBien,
                "adresse":data.adresseBien,
                "batiment":data.batimentBien,
                "niveau":data.niveauBien,
                "numero":data.numeroBien,
                "ville":data.villeBien,
                "typeLocation":data.typeLocation,
                "loyerHC":data.loyerHCBien,
                "chargesBien":data.chargesBien,
                "images":data.imagesBien,
                "surface":data.surfaceBien,
                "nombrePieces":data.nombrePiecesBien,
                "nombreChambres":data.nombreChambresBien,
                "salleDeBain":data.salleDeBainBien,
                "anneeConstruction":data.anneeConstructionBien,
                "description":data.descriptionBien,
            }

        ])

        setCreation(false)
    }

    useEffect(()=>{
        creation && setData("imagesBien",[])
    },[creation])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const onHandleRadioChange = (event) => {
        setData('typeLocation', event.target.value);
    };

    function handleClick() {
        Inertia.get(route("gestion.immeuble.create",[auth.user.id]),{preserveScroll:true})
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route("gestion.immeuble.store",[auth.user.id]),{preserveScroll:true})
    }

    useEffect(()=>{
        data.image && setData("images",[...data.images.filter((image)=>(image!==data.image)),data.image])
    },[data.image])

    useEffect(()=>{
        data.imageBien && setData("imagesBien",[...data.imagesBien.filter((image)=>(image!==data.imageBien)),data.imageBien])
    },[data.imageBien])

    function retireImage(image)
    {
        setData("images",[...data.images.filter((img)=>(img!==image))])
    }

    function retireImageBien(imageBien)
    {
        setData("imagesBien",[...data.imagesBien.filter((img)=>(img!==imageBien))])
    }

    function retireBien(bienst)
    {
        setData("biens",[...data.biens.filter((bien)=>(bien!==bienst))])
    }

    return (
        <AdminPanelLayout
            auth={auth}
            errors={errors}
            active={"immeuble"}
        >
            <div className={"flex space-x-4 flex-wrap justify-between"}>
                <div className={"bg-white p-1 rounded flex flex-grow flex-1 min-w-lg"} >
                    <TextField className="flex-1" label={"Recherche"} size="small"/>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-full py-2 px-4 rounded mx-2">
                        <SearchIcon/>
                    </button>
                </div>
                <div>
                    <button onClick={handleClick} className="bg-green-500 hover:bg-green-700 text-white font-bold h-full py-2 px-4 rounded mx-2">
                        <AddCircleOutlineIcon/>
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

                    <div className={"bg-white p-5 grid md:grid-cols-2 gap-5"}>
                        <div className={"emoFont md:col-span-2 appThemeBackgroundColor text-center text-white p-2 appThemeBorderColor mb-5"}>
                            IMMEUBLE
                        </div>

                        <div className={"emoFont md:col-span-2 appThemeColor w-fit p-2"}>
                            INFOS DE BASES
                        </div>

                        <div className={"w-full"}>
                            <TextField className={"w-full"} label="Code" name="code" onChange={onHandleChange} required/>
                            <InputError message={errors.code}/>
                        </div>

                        <div className={"w-full"}>
                            <TextField
                                InputProps={{
                                    endAdornment:<InputAdornment position="end" >m²</InputAdornment>,
                                }}
                                className={"w-full"} label="Surface" name="surface" onChange={onHandleChange} required/>
                            <InputError message={errors.surface}/>
                        </div>

                        <div className={"w-full"}>
                            <TextField className={"w-full"} label="Adresse" name="adresse" onChange={onHandleChange} required/>
                            <InputError message={errors.adresse}/>
                        </div>

                        <div
                            className={"w-full"}
                        >
                            <Autocomplete
                                className={"w-full"}
                                onChange={(e,val)=>setData("ville",val)}
                                disablePortal={true}
                                options={villes}
                                getOptionLabel={(option)=>option.nom}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params)=><TextField  fullWidth {...params} placeholder={"Ville"} label={params.nom} required/>}
                            />
                            <div className={"flex text-red-600"}>{errors?.villes}</div>
                        </div>
                        <div className={"w-full"}>
                            <TextField className={"w-full"} label="Année de construction" name="anneeConstruction" onChange={onHandleChange}/>
                            <InputError message={errors.anneeConstruction}/>
                        </div>

                        <div className={"md:col-span-2"}>
                            <TextareaAutosize className={"w-full"} name={"description"} placeholder={"Description"} style={{height:100}} onChange={onHandleChange}
                                              autoComplete="description"
                            />
                        </div>

                        <div className={"md:col-span-2 w-fit p-2"}>
                            <div className={"font-bold flex items-end space-x-5"}>
                                <div>
                                    <ImageIcon/>
                                </div>
                                <div>
                                    Ajouter des images de l'immeuble
                                </div>
                            </div>
                        </div>

                        <div className={"md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"}>
                            {
                                data.images?.map((image,i)=>(
                                    <div key={i} className={"relative w-full"} >
                                        <button type="button" onClick={()=>(retireImage(image))} className={"text-red-600 absolute r-0 bg-white rounded-full"} style={{right: -10,top:-10}} >
                                            <CancelIcon sx={{height:50,width:50}}/>
                                        </button>
                                        <img style={{height:200}} className="w-full object-cover" src={URL.createObjectURL(image)} alt=""/>
                                    </div>
                                ))
                            }
                        </div>

                        <div className={"md:col-span-2 w-fit p-2"}>
                            <TextField
                                InputProps={{
                                    inputProps:{
                                        accept:".jpeg,.png,.gif,.jpg"
                                    },
                                }}
                                className={"w-full"} type={"file"} name="image" onChange={(e)=>setData("image", e.target.files[0])}/>
                        </div>
                    </div>


                    <div className={"bg-white p-5 grid md:grid-cols-2 gap-5"}>
                        <div className={"emoFont md:col-span-2 appThemeBackgroundColor text-center text-white p-2 appThemeBorderColor mb-5"}>
                            BIENS
                        </div>
                        <div className={"md:col-span-2 emeFont font-bold appThemeColorInfo"}>
                            L'ajout des biens à l'immeuble n'est pas obligatoire vous pouvez le faire maintenant ou plus tard <span className={"text-red-500"}>*</span>
                        </div>

                        {
                            data.biens?.length>0 &&
                            <div className={"md:col-span-2 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5"}>
                                {data.biens?.map((bien,i)=>(
                                    bien &&
                                    <AnimatePresence key={i}>
                                        <motion.div
                                            initial={{x:-10-i*100,opacity:0}}
                                            animate={{x:0,opacity:1}}
                                            transition={{
                                                duration:0.5,
                                                type:"spring",
                                            }}
                                            className={"bg-white bg-gray-100 rounded relative pb-5"} style={{maxHeight:500}}>

                                            <button type="button" onClick={()=>(retireBien(bien))} className={"text-red-600 absolute bg-white rounded-full"} style={{right: -10,top:-10}} >
                                                <CancelIcon sx={{height:40,width:40}}/>
                                            </button>
                                            {
                                                bien.images &&
                                                <div>
                                                    <img style={{height:200}} className={"object-cover w-full"} src={URL.createObjectURL(bien.images[0])} alt=""/>
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
                                                <div className={"break-words"}>
                                                    {bien.description}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                ))}
                            </div>
                        }


                        <div className={"md:col-span-2 mt-10"}>
                            <div>

                            </div>
                            {
                                !creation &&
                                <div>
                                    <AddButton className={"bg-indigo-600"} type={"button"} onClick={()=>setCreation(true)}>
                                        <div>Ajouter un bien</div>
                                    </AddButton>
                                </div>
                            }

                        </div>

                        {
                            creation &&

                            <AnimatePresence>
                                <motion.div
                                    initial={{y:-10,opacity:0}}
                                    animate={{y:0,opacity:1}}
                                    transition={{
                                        duration:0.5,
                                        type:"spring",
                                    }}

                                    style={{width: '100%' }} className={"md:col-span-2 bg-white grid md:grid-cols-2 gap-5"}
                                >
                                    <Fragment >
                                        <div className={"emoFont md:col-span-2 appThemeColor w-fit p-2"}>
                                            INFOS GENERALES
                                        </div>

                                        <div className={"w-full"}>
                                            <TextField className={"w-full"} label="Code" name="codeBien" onChange={onHandleChange} required/>
                                            <InputError message={errors.codeBien}/>
                                        </div>

                                        <div
                                            className={"w-full"}
                                        >
                                            <Autocomplete
                                                className={"w-full"}
                                                onChange={(e,val)=>setData("typeBien",val)}
                                                disablePortal={true}
                                                options={typeBiens}
                                                getOptionLabel={(option)=>option.libelle}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                renderInput={(params)=><TextField  fullWidth {...params} placeholder={"Type de bien"} label={params.libelle} required/>}
                                            />
                                            <div className={"flex text-red-600"}>{errors?.typeBiens}</div>
                                        </div>

                                        <div className={"emoFont md:col-span-2 appThemeColor w-fit p-2 mt-5"}>
                                            ADRESSE
                                        </div>


                                        <div className={"w-full"}>
                                            <TextField className={"w-full"} label="Adresse" name="adresseBien" onChange={onHandleChange} required/>
                                            <InputError message={errors.adresseBien}/>
                                        </div>

                                        <div className={"w-full"}>
                                            <TextField className={"w-full"} label="Batiment" name="batimentBien" onChange={onHandleChange}/>
                                            <InputError message={errors.batimentBien}/>
                                        </div>

                                        {/*<div className={"w-full"}>
                            <TextField className={"w-full"} label="Escalier" name="escalierBien" onChange={onHandleChange}/>
                            <InputError message={errors.escalierBien}/>
                        </div>*/}

                                        <div className={"w-full"}>
                                            <TextField className={"w-full"} label="Niveau" name="niveauBien" onChange={onHandleChange}/>
                                            <InputError message={errors.niveauBien}/>
                                        </div>

                                        <div className={"w-full"}>
                                            <TextField className={"w-full"} label="Numero" name="numeroBien" onChange={onHandleChange}/>
                                            <InputError message={errors.numeroBien}/>
                                        </div>

                                        <div
                                            className={"w-full"}
                                        >
                                            <Autocomplete
                                                className={"w-full"}
                                                onChange={(e,val)=>setData("villeBien",val)}
                                                disablePortal={true}
                                                options={villes}
                                                getOptionLabel={(option)=>option.nom}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                renderInput={(params)=><TextField  fullWidth {...params} placeholder={"Ville"} label={params.nom} required/>}
                                            />
                                            <div className={"flex text-red-600"}>{errors?.villes}</div>
                                        </div>

                                        <div className={"emoFont md:col-span-2 appThemeColor w-fit p-2 mt-5"}>
                                            INFORMATIONS LOCATIVES
                                        </div>

                                        <div className={"md:col-span-2"}>
                                            <div className={"font-bold mt-3"}>
                                                Type de location proposé
                                            </div>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-controlled-radio-buttons-group"
                                                name="row-controlled-radio-buttons-group"
                                                value={data.typeLocation}
                                                onChange={onHandleRadioChange}
                                                className={"md:col-span-2"}
                                            >
                                                <FormControlLabel value="VIDE" control={<Radio />} label="Vide" />
                                                <FormControlLabel value="MEUBLE" control={<Radio />} label="Meublé" />
                                            </RadioGroup>
                                        </div>

                                        <div className={"w-full"}>
                                            <TextField
                                                InputProps={{
                                                    inputComponent: NumberFormatCustom,
                                                    inputProps:{
                                                        max:1000000000,
                                                        name:"loyerHCBien",
                                                    },
                                                }}
                                                className={"w-full"} label="Loyer HC" name="loyerHCBien" onChange={onHandleChange}/>
                                            <InputError message={errors.loyerHCBien}/>
                                        </div>

                                        <div className={"w-full"}>
                                            <TextField
                                                InputProps={{
                                                    inputComponent: NumberFormatCustom,
                                                    inputProps:{
                                                        max:1000000000,
                                                        name:"chargesBien",

                                                    },
                                                }}
                                                className={"w-full"} label="Charges" name="chargesBien" onChange={onHandleChange}/>
                                            <InputError message={errors.chargesBien}/>
                                        </div>

                                        <div className={"emoFont md:col-span-2 appThemeColor w-fit p-2 mt-5"}>
                                            DESCRIPTION
                                        </div>

                                        <div className={"md:col-span-2 w-fit p-2"}>
                                            <div className={"font-bold flex items-end space-x-5"}>
                                                <div>
                                                    <ImageIcon/>
                                                </div>
                                                <div>
                                                    Ajouter des images du bien
                                                </div>
                                            </div>
                                        </div>

                                        <div className={"md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"}>
                                            {
                                                data.imagesBien?.map((imageBien,i)=>(
                                                    <div key={i} className={"relative w-full"} >
                                                        <button type="button" onClick={()=>(retireImageBien(imageBien))} className={"text-red-600 absolute r-0 bg-white rounded-full"} style={{right: -10,top:-10}} >
                                                            <CancelIcon sx={{height:50,width:50}}/>
                                                        </button>
                                                        <img style={{height:200}} className="w-full object-cover" src={URL.createObjectURL(imageBien)} alt=""/>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <div className={"md:col-span-2 w-fit p-2"}>
                                            <TextField
                                                InputProps={{
                                                    inputProps:{
                                                        accept:".jpeg,.png,.gif,.jpg"
                                                    },
                                                }}
                                                className={"w-full"} type={"file"} name="imageBien" onChange={(e)=>setData("imageBien", e.target.files[0])}/>
                                        </div>

                                        <div className={"w-full"}>
                                            <TextField
                                                InputProps={{
                                                    endAdornment:<InputAdornment position="end" >m²</InputAdornment>,
                                                }}
                                                className={"w-full"} label="Surface" name="surfaceBien" onChange={onHandleChange}/>
                                            <InputError message={errors.surfaceBien}/>
                                        </div>

                                        <div className={"w-full"}>
                                            <TextField className={"w-full"} label="Nombre de pièces" name="nombrePiecesBien" onChange={onHandleChange}/>
                                            <InputError message={errors.nombrePiecesBien}/>
                                        </div>

                                        <div className={"w-full"}>
                                            <TextField className={"w-full"} label="Nombre de chambres" name="nombreChambresBien" onChange={onHandleChange}/>
                                            <InputError message={errors.nombreChambresBien}/>
                                        </div>

                                        <div className={"w-full"}>
                                            <TextField className={"w-full"} label="Salle de bain" name="salleDeBainBien" onChange={onHandleChange}/>
                                            <InputError message={errors.salleDeBainBien}/>
                                        </div>

                                        <div className={"w-full"}>
                                            <TextField className={"w-full"} label="Année de construction" name="anneeConstructionBien" onChange={onHandleChange}/>
                                            <InputError message={errors.anneeConstructionBien}/>
                                        </div>

                                        <div className={"md:col-span-2"}>
                                            <TextareaAutosize className={"w-full"} name={"descriptionBien"} placeholder={"Description"} style={{height:100}} onChange={onHandleChange}
                                                              autoComplete="descriptionLogement"
                                            />
                                        </div>

                                        <div className={"md:col-span-2"}>
                                            <PrimaryButton className={"bg-indigo-600"} onClick={handleAddBien} processing={processing}>
                                                Ajouter
                                            </PrimaryButton>
                                        </div>
                                    </Fragment>
                                </motion.div>
                            </AnimatePresence>

                        }

                        <div className={"mt-20 flex md:col-span-2 justify-end"}>
                            <SaveButton className={"py-4"} processing={processing}>
                                Enregistrer
                            </SaveButton>
                        </div>
                    </div>



                </form>


            </motion.div>
        </AdminPanelLayout>
    );
}

export default Create;
