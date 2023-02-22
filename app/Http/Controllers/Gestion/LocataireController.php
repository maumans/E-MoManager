<?php

namespace App\Http\Controllers\Gestion;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Locataire;
use App\Models\Bien;
use App\Models\TypeBien;
use App\Models\Ville;
use http\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LocataireController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $locataires=Locataire::with('ville')->orderByDesc("created_at")->get();

        return Inertia::render('Gestion/Locataire/Index',["locataires"=>$locataires]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $villes=Ville::all();
        $typeBiens=TypeBien::all();

        return Inertia::render('Gestion/Locataire/Create',['villes'=>$villes,"typeBiens"=>$typeBiens]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {

        DB::beginTransaction();

        try {

            $nom=$request->image->store("Locataire","public");
            $img=Storage::url($nom);

            Locataire::create([
                "prenom"=>$request->prenom,
                "prenom2"=>$request->prenom2,
                "nom"=>$request->nom,
                "code"=>uniqid("Locataire_"),
                "civilite"=>$request->civilite,
                "dateNaissance"=>$request->dateNaissance,
                "lieu"=>$request->lieu,
                "email"=>$request->email,
                "telephone1"=>$request->telephone1,
                "telephone2"=>$request->telephone2,
                "type"=>"PARTICULIER",
                "adresse"=>$request->adresse,
                "ville_id"=>$request->ville['id'],
                "photo"=>$img,
            ]);

            DB::commit();

            return redirect()->action([\App\Http\Controllers\Gestion\LocataireController::class,'index'],[Auth::id(),0])->with("success","Locataire ajouté avec succès");
        }
        catch (Exception $exception)
        {
            DB::rollback();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($userId,$id)
    {
        $locataire=Locataire::with('ville')->first();

        return Inertia::render('Gestion/Locataire/Show',['locataire'=>$locataire]);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
