import React from 'react';
import {Head} from "@inertiajs/inertia-react";
import GuestLayout from "@/Layouts/GuestLayout";
import PersonIcon from '@mui/icons-material/Person';
import {Inertia} from "@inertiajs/inertia";
import {maxWidth} from "@mui/system";
import PrimaryButton from "@/Components/PrimaryButton";

/*function profilSwitch(libelle)
{
    switch(libelle)
    {
        case "admin":
            return "Administrateur"
        case "superAdmin":
            return "Super administrateur"
        case "Agent":
            return "Agent"
        case "caissierZone":
            return "Caissier de zone"
        case "caissierPrincipal":
            return "Caissier principal"
        case "caissierSecondaire":
            return "Caissier secondaire"
        default:
            return <span className="capitalize">{libelle}</span>

    }
}*/

function Profil({authProfil}) {

    function handleConnect(id) {
        Inertia.get(route("profilSociete.connect",id))
    }

    return (
        <GuestLayout
            hiddenPhoto={true}
        >
            <Head title="Profil" />
            <div className={"flex flex-col"}>
                <div className="text-center w-full text-xl font-bold">
                    Bienvenu(e) <span className={"capitalize"}>{authProfil.prenom}</span> <span className={"uppercase"}>{authProfil.nom}</span>
                </div>
                <div className="text-center my-3">
                    Avec quel profil souhaitez-vous vous connecter?
                </div>
                <div className="flex justify-center flex-wrap gap-4 py-5 rounded w-full">
                    {
                        authProfil?.profils.map(profil=>(
                           <button style={{width:200}} key={profil.id} className={"bg-white p-5 flex flex-col space-y-4 items-center rounded border-blue-500 border-2 w-full"} onClick={()=>handleConnect(profil.id)}>
                               <div className="p-5 rounded-full appThemeBackgroundColor w-fit border border-blue-500 border-2">
                                   <PersonIcon className="text-5xl" />
                               </div>
                               <div className={"appThemeColor"}>
                                   {
                                       profil.role.libelle
                                   }
                               </div>
                               {
                                   profil?.societe &&
                                   <span className={"appThemeColor"}>
                                       Chez <span className="font-bold">{profil.societe?.nom}</span>
                                   </span>
                               }
                           </button>
                        ))
                    }
                </div>
                <div className={"flex justify-center"}>
                    <button className="ml-4 bg-black p-2 rounded text-white" onClick={() =>Inertia.post(route('logout'))}>
                        Déconnexion
                    </button>
                </div>
            </div>

        </GuestLayout>
    );
}

export default Profil;
