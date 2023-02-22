import React, {useEffect} from 'react';
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import {
    FormControlLabel,
    RadioGroup,
    TextField,
    Radio,
    Autocomplete,
    TextareaAutosize, InputAdornment, Select, MenuItem,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';
import {Inertia} from "@inertiajs/inertia";
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/inertia-react";
import {motion} from "framer-motion";
import {NumericFormat} from "react-number-format";
import PrimaryButton from "@/Components/PrimaryButton";

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
        //"code":"",
        "devise":"GNF",
        "adresse":"",
        "ville":"",
        "surface":"",
        "typeLocation":"VIDE",
        "image":null,
        "images":[],
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const onHandleRadioChange = (event) => {
        setData('typeLocation', event.target.value);
    };

    function handleClick() {
        Inertia.get(route("gestion.bien.create",[auth.user.id]),{preserveScroll:true})
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route("gestion.bien.store",[auth.user.id]),{preserveScroll:true})
    }

    useEffect(()=>{
        data.image && setData("images",[...data.images.filter((image)=>(image!==data.image)),data.image])
    },[data.image])

    function retireImage(image)
    {
        setData("images",[...data.images.filter((img)=>(img!==image))])
    }

    return (
        <AdminPanelLayout
            auth={auth}
            errors={errors}
            active={"bien"}
        >
            <div className={"flex space-x-4 flex-wrap justify-between"}>
                <div className={"bg-white p-1 rounded flex flex-grow flex-1 min-w-lg"} >
                    <TextField className="flex-1" label={"Recherche"} size="small"/>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-full py-2 px-4 rounded mx-2">
                        <SearchIcon/>
                    </button>
                </div>
                <div>
                    <button onClick={handleClick} className="bg-green-500 hover:bg-green-700 text-white h-full py-2 px-4 rounded mx-2">
                        Bien <AddCircleOutlineIcon/>
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
{/*
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
                            <TextField className={"w-full"} label="Surface" name="surface" onChange={onHandleChange} required/>
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
                    </div>
*/}

                    <div className={"bg-white p-5 grid md:grid-cols-2 gap-5"}>
                        <div className={"emoFont md:col-span-2 appThemeBackgroundColor text-center text-white p-2 appThemeBorderColor mb-5"}>
                            BIENS
                        </div>

                        <div className={"emoFont md:col-span-2 appThemeColor w-fit p-2"}>
                            INFOS GENERALES
                        </div>

                        {/*<div className={"w-full"}>
                            <TextField className={"w-full"} label="Code" name="codeBien" onChange={onHandleChange} required/>
                            <InputError message={errors.codeBien}/>
                        </div>*/}

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

                            <div className={"flex gap-2"}>
                                <TextField
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                        inputProps:{
                                            max:1000000000,
                                            name:"loyerHCBien",
                                            devise:' '

                                        },
                                    }}
                                    className={"w-full"} label="Loyer HC" name="loyerHCBien" onChange={onHandleChange}/>
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

                            <InputError message={errors.loyerHCBien}/>
                        </div>

                        <div className={"w-full"}>

                            <div className={"flex gap-2"}>
                                <TextField
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                        inputProps:{
                                            max:1000000000,
                                            name:"chargesBien",
                                            devise:' '

                                        },
                                    }}
                                    className={"w-full"} label="Charges" name="chargesBien" onChange={onHandleChange}/>
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
                                              autoComplete="descriptionBien"
                            />
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
