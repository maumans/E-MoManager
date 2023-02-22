<?php

namespace App\Http\Controllers\Gestion;

use App\Http\Controllers\Admin\fournisseur\CommandeController;
use App\Http\Controllers\Controller;
use App\Models\Bien;
use App\Models\Devise;
use App\Models\Locataire;
use App\Models\Location;
use App\Models\Lot;
use App\Models\Loyer;
use App\Models\Mois;
use App\Models\TypeBail;
use Carbon\CarbonPeriod;
use http\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $locations =Location::with('locataire','bien.typeBien','bien.ville','devise')->orderByDesc('created_at')->get();

        $devises=Devise::all();

        return Inertia::render('Gestion/Location/Index',['locations'=>$locations,'devises'=>$devises]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($userId,$location=null,$locataire = null,$bien=null)
    {
        //dd($location,$locataire,$bien);

        $locataire=Locataire::where("id",$locataire)->first();

        $bien=Bien::where("id",$bien)->with("images")->first();

        $typeBails=TypeBail::all();

        return Inertia::render('Gestion/Location/Create',['typeBails'=>$typeBails,'locataire'=>$locataire,'bien'=>$bien]);

    }

    public function search($locataireSearch,$bienSearch)
    {

        $locataire=Locataire::where('nom',$locataireSearch)->orWhere('prenom',$locataireSearch)->orWhere('code',$locataireSearch)->get();

        $bien=Locataire::where('nom',$locataireSearch)->orWhere('prenom',$locataireSearch)->orWhere('code',$locataireSearch)->get();

        return Inertia::render('Gestion/Location/Create');
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

        $devise=Devise::where('code',$request->devise)->first();

        try {
            $location=Location::create([
              "dateDebutBail" => Carbon::parse($request->dateDebutBail),
              "dateFinBail" => Carbon::parse($request->dateFinBail),
              "frequence" => $request->frequence,
              "type" => $request->type,
              "moyenPaiement" => $request->moyenPaiement,
              "code" => uniqid("Location_"),
              "renouvellable" => $request->renouvellable,
              "locataire_id" => $request->locataire["id"],
              "bien_id" => $request->bien["id"],
              "loyerHC" => $request->loyerHC,
              "charges" => $request->charges,
              "loyerTotal" => $request->loyerHC+$request->charges,
              "jourPaiement" => $request->jourPaiement,
              "montantDepotGarantie" => $request->montantDepotGarantie,
              "penaliteRetard" => $request->penaliteRetard,
                "devise_id" => $devise->id
            ]);

            //dd($request->all());


            $intervalle=CarbonPeriod::create($request->dateDebutBail,"1 month",$request->dateFinBail)->roundMonth();

            $moisTranche=null;
            $cpt=0;
            $tranche=1;


            switch ($request->frequence)
            {
                case "MENSUELLE":
                    $moisTranche=1;
                    break;
                case "TRIMESTRIELLE":
                    $moisTranche=3;
                    break;
                case "SEMESTRIELLE":
                    $moisTranche=6;
                    break;
                case "ANNUELLE":
                    $moisTranche=12;
                    break;
                case "ALEATOIRE":
                    $moisTranche=0;
                    break;
            }

            //$p=collect();

            foreach($intervalle as $date)
            {
                $cpt++;

                $loyer=Loyer::create([
                    "loyerHC" => $request->loyerHC,
                    "charges" => $request->charges,
                    "resteApayer" => $request->loyerHC+$request->charges,
                    "mois"=>$date->month,
                    "annee"=>$date->year,
                    "location_id"=>$location->id,
                    "tranche"=>$tranche,
                    "finTranche"=> $cpt==$moisTranche,
                    "devise_id" => $devise->id
                ]);

                //$p->push($loyer);

                if($cpt==$moisTranche)
                {
                    $cpt = 0;
                    $tranche++;
                }
            }

            //dd($p);

            DB::commit();

            return redirect()->action([LocationController::class,'index'],[Auth::id()])->with("success","Location enregistrée avec succès");
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

    public function allLocataire()
    {
        return Locataire::with('devise')->orderByDesc("created_at")->get();
    }

    public function allBien()
    {
        return Bien::doesntHave('locations','or',function($query){
            $query->where("status",'ACTIF');
        })->with("images","devise")->orderByDesc("created_at")->get();
    }
}
