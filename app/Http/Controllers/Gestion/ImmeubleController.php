<?php

namespace App\Http\Controllers\Gestion;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Immeuble;
use App\Models\Bien;
use App\Models\TypeBien;
use App\Models\TypeLogement;
use App\Models\Ville;
use http\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImmeubleController extends Controller
{
    public function index()
    {
        $immeubles=Immeuble::with('images','ville')->orderByDesc("created_at")->get();

        return Inertia::render('Gestion/Immeuble/Index',['immeubles'=>$immeubles]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        $villes=Ville::all();
        $typeBiens=TypeBien::all();

        return Inertia::render('Gestion/Immeuble/Create',['villes'=>$villes,"typeBiens"=>$typeBiens]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {

            $immeuble=Immeuble::create([
                "code"=>uniqid("Immeuble_"),
                "adresse" => $request->adresse,
                "ville_id" => $request->ville["id"],
                "surface" => $request->surface,
                "anneeConstruction" => $request->anneeConstruction,
                "description" => $request->description,
            ]);

            if($request->images)
            {
                foreach ($request->images as $image)
                {
                    if($image)
                    {
                        $nom=$image->store("Immeuble","public");
                        $img=Storage::url($nom);

                        Image::create([
                            "url"=>$img,
                            'immeuble_id'=>$immeuble->id
                        ]);
                    }

                }
            }


            foreach ($request->biens as $bien)
            {


                $bienSt=Bien::create([
                    "code" => $bien['code'],
                    "type_bien_id" => $bien["typeBien"] ?$bien["typeBien"]["id"] : null,
                    "typeLocation" => $request->typeLocation,
                    "adresse" => $bien["adresse"],
                    "batiment" => $bien["batiment"],
                    //"escalier" => $bien[""]escalier,
                    "numero" => $bien["numero"],
                    "niveau" => $bien["niveau"],
                    "ville_id" => $bien["ville"] ? $bien["ville"]["id"] : null,
                    "loyerHC" => $bien["loyerHC"],
                    "charges" => $bien["chargesBien"],
                    "surface" => $bien["surface"],
                    "nombrePieces" => $bien["nombrePieces"],
                    "nombreChambres" => $bien["nombreChambres"],
                    "salleDeBain" => $bien["salleDeBain"],
                    "anneeConstruction" => $bien["anneeConstruction"],
                    "description" => $bien["description"],
                    "immeuble_id"=>$immeuble->id
                ]);

                foreach ($bien["images"] as $image)
                {
                    $nom=$image->store("Bien","public");
                    $img=Storage::url($nom);

                    Image::create([
                        "url"=>$img,
                        'bien_id'=>$bienSt->id
                    ]);
                }
            }

            DB::commit();

            return redirect()->action([\App\Http\Controllers\Gestion\ImmeubleController::class,'index'],[Auth::id(),0])->with("success","Immeuble ajouté avec succès");
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
    public function show($id)
    {
        //
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
