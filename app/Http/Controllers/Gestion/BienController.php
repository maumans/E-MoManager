<?php

namespace App\Http\Controllers\Gestion;

use App\Http\Controllers\Controller;
use App\Models\Bien;
use App\Models\Devise;
use App\Models\Image;
use App\Models\Lot;
use App\Models\TypeBien;
use App\Models\Ville;
use http\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BienController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $biens=Bien::with('images','ville')->orderByDesc("created_at")->get();
        return Inertia::render('Gestion/Bien/Index',['biens'=>$biens]);
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

        return Inertia::render('Gestion/Bien/Create',['villes'=>$villes,"typeBiens"=>$typeBiens]);
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
            $devise=Devise::where('code',$request->devise)->first();


            $bien=Bien::create([
                "code"=>uniqid("Bien_"),
                "type_bien_id" => $request->typeBien["id"],
                "typeLocation" => $request->typeLocation,
                "adresse" => $request->adresseBien,
                "batiment" => $request->batimentBien,
                //"escalier" => $request->escalierBien,
                "numero" => $request->numeroBien,
                "niveau" => $request->niveauBien,
                "ville_id" => $request->villeBien["id"],
                "loyerHC" => $request->loyerHCBien,
                "charges" => $request->chargesBien,
                "loyerTotal" => $request->loyerHCBien+$request->chargesBien,
                "surface" => $request->surfaceBien,
                "nombrePieces" => $request->nombrePiecesBien,
                "nombreChambres" => $request->nombreChambresBien,
                "salleDeBain" => $request->salleDeBainBien,
                "anneeConstruction" => $request->anneeConstructionBien,
                "description" => $request->descriptionBien,
                "devise_id" => $devise->id,
                "montantGNF" => ($request->loyerHCBien+$request->chargesBien)*$devise->taux,
            ]);

            foreach ($request->images as $image)
            {
                $nom=$image->store("Bien","public");
                $img=Storage::url($nom);

                Image::create([
                    "url"=>$img,
                    'bien_id'=>$bien->id
                ]);
            }

            DB::commit();

            return redirect()->action([\App\Http\Controllers\Gestion\BienController::class,'index'],[Auth::id(),0])->with("success","Bien ajouté avec succès");
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
        $bien=Bien::where('id',$id)->with('images','ville',"devise","typeBien")->first();
        return Inertia::render('Gestion/Bien/Show',['bien'=>$bien]);

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
