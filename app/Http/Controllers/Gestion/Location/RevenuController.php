<?php

namespace App\Http\Controllers\Gestion\Location;

use App\Http\Controllers\Controller;
use App\Models\Devise;
use App\Models\Location;
use App\Models\Loyer;
use App\Models\Revenu;
use App\Models\Societe;
use http\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RevenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index($locationId)
    {
        return Inertia::render("Gestion/Location/Revenu/Index");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create($userId,$locationId)
    {
        $location = Location::where('id', $locationId)->with('locataire','bien.typeBien','bien.ville',"devise")->first();

        $revenus=Revenu::where("location_id", $locationId)->get();

        $loyers=Loyer::where("location_id", $locationId)->where('status', 'NON PAYE')->with('location.locataire','location.bien.ville',"devise")->get()->groupBy('tranche')->toArray();

        //dd($loyers);

        $societe=Societe::first();

        return Inertia::render("Gestion/Location/Revenu/Create",['revenus'=>$revenus,'location'=>$location,"loyers"=>$loyers,'societe'=>$societe]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,$userId,Location $location)
    {
        //dd($request->all());

        DB::beginTransaction();

        try {

            foreach ($request->loyers as $l)
            {
                $loyer=Loyer::find($l['id']);

                $devise=Devise::where('id',$loyer->devise->id)->first();


                Revenu::create([
                    "code" => uniqid("Revenu_"),
                    "montant" => $loyer->resteApayer,
                    "date" => $request->date,
                    "location_id"=>$location->id,
                    "locataire_id"=>$location->locataire->id,
                    "loyer_id" => $loyer->id,
                    "devise_id" => $devise->id,
                    "montantGNF" => $loyer->resteApayer*$devise->taux,
                    'societe_id'=>session("societe")['id'],
                ]);

                $loyer->payer += $loyer->resteApayer;
                $loyer->status = "PAYE";

                $loyer->save();
            }

            DB::commit();

            return redirect()->back()->with("success","Paiement enregistré avec succès");
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
