import React, {useEffect} from 'react';
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import {
    FormControlLabel,
    RadioGroup,
    TextField,
    Radio,
    Autocomplete,
    InputLabel,
    TextareaAutosize, MenuItem, Select, FormControl,
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
        "prenom":"",
        "prenom2":"",
        "nom":"",
        "civilite":"Mr",
        "dateNaissance":"",
        "lieu":"",
        "email":"",
        "telephone1":"",
        "telephone2":"",
        "type":"PARTICULIER",
        "code":"",
        "adresse":"",
        "ville":"",
        "image":null,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const onHandleRadioChange = (event) => {
        setData('typeLocation', event.target.value);
    };

    function handleClick() {
        Inertia.get(route("gestion.locataire.create",[auth.user.id]),{preserveScroll:true})
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route("gestion.locataire.store",[auth.user.id]),{preserveScroll:true})
    }

    function retireImage()
    {
        setData("image",null)
    }

    return (
        <AdminPanelLayout
            auth={auth}
            errors={errors}
            active={"locataire"}
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

                    <div className={"bg-white p-5 grid md:grid-cols-2 gap-5"}>

                        <div className={"emoFont md:col-span-2 appThemeColor w-fit p-2"}>
                            INFOS GENERALES
                        </div>

                        <div className={"md:col-span-2"}>

                            <FormControl className={"w-full"}>
                                <InputLabel id={"demo-simple-select-label"}>Type de locataire</InputLabel>
                                <Select
                                    labelId={"demo-simple-select-label"}
                                    id={"demo-simple-select"}
                                    className={"w-full"}
                                    label={"Type de locataire"}
                                    value={data.type}
                                    onChange={(e)=>setData("type",e.target.value)}
                                >
                                    <MenuItem value={"PARTICULIER"}>PARTICULIER</MenuItem>
                                    <MenuItem value={"SOCIETE"}>SOCIETE</MenuItem>
                                    <MenuItem value={"AUTRE"}>AUTRE</MenuItem>

                                </Select>
                            </FormControl>
                            <div className={"flex my-2 text-red-600"}>{errors?.type}</div>
                        </div>

                        <div className={"w-full"}>
                            <TextField className={"w-full"} label="Prenom" name="prenom" onChange={onHandleChange} required/>
                            <InputError message={errors.prenom}/>
                        </div>

                        <div className={"w-full"}>
                            <TextField className={"w-full"} label="Prenom 2" name="prenom2" onChange={onHandleChange}/>
                            <InputError message={errors.prenom2}/>
                        </div>

                        <div className={"w-full"}>
                            <TextField className={"w-full"} label="Nom" name="nom" onChange={onHandleChange} required/>
                            <InputError message={errors.nom}/>
                        </div>

                        <div className={"w-full"}>
                            <FormControl className={"w-full"}>
                                <InputLabel id={"demo-simple-select-label"}>Civilité</InputLabel>
                                <Select
                                    className={"w-full"}
                                    label={"Civilité"}
                                    value={data.civilite}
                                    onChange={(e)=>setData("civilite",e.target.value)}
                                >
                                    <MenuItem value={"Mr"}>Mr</MenuItem>
                                    <MenuItem value={"Mme"}>Mme</MenuItem>
                                    <MenuItem value={"Mlle"}>Mlle</MenuItem>

                                </Select>
                                <InputError message={errors.civilite}/>
                            </FormControl>
                        </div>

                        <FormControl className={"w-full"}>
                            <TextField type={"date"} className={"w-full"} InputLabelProps={{shrink:true}} name="dateNaissance" label={"Date de naissance"} onChange={onHandleChange} required/>
                            <InputError message={errors.dateNaissance}/>
                        </FormControl>

                        <div className={"w-full"}>
                            <TextField className={"w-full"} label="Lieu" name="lieu" onChange={onHandleChange} required/>
                            <InputError message={errors.lieu}/>
                        </div>

                        <div className={"w-full"}>
                            <TextField className={"w-full"} label="Email" name="email" onChange={onHandleChange}/>
                            <InputError message={errors.email}/>
                        </div>

                        <div className={"w-full"}>
                            <TextField className={"w-full"} label="Telephone 1" name="telephone1" onChange={onHandleChange}/>
                            <InputError message={errors.telephone1}/>
                        </div>

                        <div className={"w-full"}>
                            <TextField className={"w-full"} label="Telephone 2" name="telephone2" onChange={onHandleChange}/>
                            <InputError message={errors.telephone2}/>
                        </div>

                        <div className={"emoFont md:col-span-2 appThemeColor w-fit p-2 mt-5"}>
                            ADRESSE
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

                        <div className={"emoFont md:col-span-2 appThemeColor w-fit mt-5"}>
                            PHOTO DE PROFIL
                        </div>

                        <div className={"md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"}>
                            {
                                data.image
                                &&
                                <div className={"relative w-full"} >
                                    <button type="button" onClick={()=>(retireImage())} className={"text-red-600 absolute r-0 bg-white rounded-full"} style={{right: -10,top:-10}} >
                                        <CancelIcon sx={{height:50,width:50}}/>
                                    </button>
                                    <img style={{height:200}} className="w-full object-cover" src={URL.createObjectURL(data.image)} alt=""/>
                                </div>
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
