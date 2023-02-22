<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string("code")->nullable();
            $table->enum("type",['VIDE','MEUBLE'])->nullable();
            $table->enum("status",["ACTIF","INACTIF"])->default("ACTIF")->nullable();
            $table->date("dateDebutBail")->nullable();
            $table->date("dateFinBail")->nullable();
            $table->boolean("renouvellable")->nullable();
            $table->integer("jourPaiement")->nullable();
            $table->enum("moyenPaiement",["VIREMENT","CHEQUE","ESPECE","CARTE CREDIT","PRELEVEMENT AUTOMATIQUE",'TOUT'])->nullable();
            $table->bigInteger("loyerHC")->nullable();
            $table->bigInteger("charges")->nullable();
            $table->bigInteger("loyerTotal")->nullable();
            $table->bigInteger("montantGNF")->nullable();

            $table->bigInteger("montantDepotGarantie")->nullable();
            $table->bigInteger("penaliteRetard")->nullable();
            $table->foreignId("type_bail_id")->nullable()->constrained("type_bails")->cascadeOnDelete();
            //$table->foreignId("lot_id")->nullable()->constrained("lots")->cascadeOnDelete();
            $table->enum('frequence',["MENSUELLE","TRIMESTRIELLE","SEMESTRIELLE","ANNUELLE","ALEATOIRE"])->default('ALEATOIRE')->nullable();
            $table->foreignId('devise_id')->nullable()->constrained("devises")->cascadeOnDelete();
            $table->foreignId("bien_id")->nullable()->constrained("biens")->cascadeOnDelete();
            $table->foreignId("locataire_id")->nullable()->constrained("locataires")->cascadeOnDelete();
            $table->foreignId('societe_id')->nullable()->constrained("societes")->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('locations');
    }
};
