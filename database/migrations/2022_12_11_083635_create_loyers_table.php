/<?php

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
        Schema::create('loyers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("loyerHC")->nullable();
            $table->bigInteger("charges")->nullable();
            $table->bigInteger("payer")->default(0)->nullable();
            $table->bigInteger("resteApayer")->nullable();
            $table->integer("mois")->nullable();
            $table->integer("annee")->nullable();
            $table->integer("tranche")->nullable();
            $table->boolean("finTranche")->default(false)->nullable();
            $table->bigInteger("montantGNF")->nullable();
            $table->foreignId('devise_id')->nullable()->constrained("devises")->cascadeOnDelete();
            $table->foreignId("location_id")->nullable()->constrained('locations');
           /* $table->foreignId("annee_id")->nullable()->constrained('annees');
            $table->foreignId("mois_id")->nullable()->constrained('mois');*/
            $table->enum("status",["NON PAYE","PAYE"])->default("NON PAYE")->nullable();
            $table->foreignId('societe_id')->nullable()->constrained("societes")->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.p
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('loyers');
    }
};
