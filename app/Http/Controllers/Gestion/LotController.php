<?php

namespace App\Http\Controllers\Gestion;

use App\Http\Controllers\Controller;
use App\Models\Bien;
use App\Models\Devise;
use App\Models\Image;
use App\Models\Immeuble;
use App\Models\Lot;
use App\Models\TypeBien;
use App\Models\Ville;
use http\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LotController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $lots=Lot::with('images','ville')->orderByDesc("created_at")->get();
        return Inertia::render('Gestion/Lot/Index',['lots'=>$lots]);


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

        return Inertia::render('Gestion/Lot/Create',['villes'=>$villes,"typeBiens"=>$typeBiens]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    /*public function store(Request $request)
    {

        DB::beginTransaction();

        try {

            $lot=Lot::create([
                "code" => $request->codeLot,
                "type_bien_id" => $request->typeBien["id"],
                "adresse" => $request->adresseLot,
                "batiment" => $request->batimentLot,
                //"escalier" => $request->escalierLot,
                "numero" => $request->numeroLot,
                "niveau" => $request->niveauLot,
                "ville_id" => $request->villeLot["id"],
                "loyerHC" => $request->loyerHC,
                "charges" => $request->chargesLot,
                "surface" => $request->surfaceLot,
                "nombrePieces" => $request->nombrePiecesLot,
                "nombreChambres" => $request->nombreChambresLot,
                "salleDeBain" => $request->salleDeBainLot,
                "anneeConstruction" => $request->anneeConstructionLot,
                "description" => $request->descriptionLot,
            ]);

            foreach ($request->images as $image)
            {
                $nom=$image->store("Lot","public");
                $img=Storage::url($nom);

                Image::create([
                    "url"=>$img,
                    'lot_id'=>$lot->id
                ]);
            }

            DB::commit();

            return redirect()->action([\App\Http\Controllers\Gestion\LotController::class,'index'],[Auth::id(),0])->with("success","Lot ajouté avec succès");
        }
        catch (Exception $exception)
        {
            DB::rollback();
        }
    }*/

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {

            $lot=Lot::create([
                "code"=>uniqid("Lot_"),
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
                            'lot_id'=>$lot->id
                        ]);
                    }

                }
            }


            foreach ($request->biens as $bien)
            {
                $devise=Devise::where('code',$bien['devise'])->first();


                $bienSt=Bien::create([
                    "code"=>uniqid("Bien_"),
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
                    "lot_id"=>$lot->id,
                    "devise_id" => $devise->id,
                    "montantGNF" => ($bien['loyerHC']+$bien['chargesBien'])*$devise->taux,
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

            return redirect()->action([\App\Http\Controllers\Gestion\LotController::class,'index'],[Auth::id(),0])->with("success","Lot ajouté avec succès");
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
