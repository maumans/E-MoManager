<?php

namespace App\Http\Controllers;

use App\Models\Caisse;
use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ProfilController extends Controller
{
    public function index()
    {
        session("profil") && session()->forget("profil");
        session("societe") && session()->forget("societe");

        $authProfil=User::where('id',Auth::id())->with('profils.role',"profils.societe")->first();

        return Inertia::render("Profil",["authProfil"=>$authProfil]);
    }

    public function connect(RoleUser $roleUser)
    {
        session()->put("profil",$roleUser->role->libelle);
        session()->put("societe",$roleUser->societe);

        switch ($roleUser->role->libelle) {
            case "Gestionnaire":
                return redirect()->route("gestionnaireDashboard.index",Auth::id());
            case "Comptable":
                return redirect()->route("gestionnaireDashboard.index",Auth::id());

        }

    }
}
