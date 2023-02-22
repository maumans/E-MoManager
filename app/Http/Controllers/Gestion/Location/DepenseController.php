<?php

namespace App\Http\Controllers\Gestion\Location;

use App\Http\Controllers\Controller;
use App\Models\Depense;
use App\Models\Devise;
use App\Models\Location;
use App\Models\Loyer;
use App\Models\Revenu;
use App\Models\Societe;
use http\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DepenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($userId,$locationId)
    {
        $location = Location::where('id', $locationId)->with('locataire','bien.typeBien','bien.ville',"devise")->first();

        $revenus=Revenu::where("location_id", $locationId)->get();

        $loyers=Loyer::where("location_id", $locationId)->where('status', 'NON PAYE')->with('location.locataire','location.bien.ville',"devise")->get()->groupBy('tranche')->toArray();

        $devises=Devise::all();

        $societe=Societe::first();

        return Inertia::render("Gestion/Location/Depense/Create",['revenus'=>$revenus,'location'=>$location,"loyers"=>$loyers,'societe'=>$societe,'devises'=>$devises]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,$user,Location $location)
    {
        DB::beginTransaction();

        try {

            Depense::create([
                "code" => uniqid("Depense_"),
                "montant" => $request->montant,
                "montantGNF" => $request->montant*$request['devise']['taux'],
                "date" => $request->date,
                "motif" => $request->motif,
                "devise_id" => $request['devise']['id'],
                "location_id"=>$location->id,
                "locataire_id"=>$location->locataire->id,
                //"loyer_id" => $location->loyer->id,
            ]);

            DB::commit();

            return redirect()->back()->with("success","Dépense enregistrée avec succès");
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
