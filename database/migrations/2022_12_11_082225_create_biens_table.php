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
        Schema::create('biens', function (Blueprint $table) {
            $table->id();
            $table->string('code')->nullable();

            //ADRESSE
            $table->string("adresse")->nullable();
            $table->string("batiment")->nullable();
            $table->integer("niveau")->nullable();
            $table->integer("numero")->nullable();

            //Information Loctive (Type de location proposé)
            $table->enum("typeLocation",['VIDE','MEUBLE'])->nullable();
            $table->bigInteger("loyerHC")->nullable();
            $table->bigInteger("charges")->nullable();
            $table->bigInteger("loyerTotal")->nullable();

            //DESCRIPTION
            $table->string("surface")->nullable();
            $table->integer("nombrePieces")->nullable();
            $table->integer("nombreChambres")->nullable();
            $table->longText('description')->nullable();
            $table->integer("salleDeBain")->nullable();
            $table->integer("anneeConstruction")->nullable();

            $table->bigInteger("montantGNF")->nullable();
            $table->foreignId('devise_id')->nullable()->constrained("devises")->cascadeOnDelete();
            $table->foreignId('lot_id')->nullable()->constrained("lots")->cascadeOnDelete();
            $table->foreignId('immeuble_id')->nullable()->constrained("immeubles")->cascadeOnDelete();
            $table->foreignId('type_bien_id')->nullable()->constrained("type_biens")->cascadeOnDelete();
            $table->foreignId('ville_id')->nullable()->constrained("villes")->cascadeOnDelete();
            $table->foreignId('societe_id')->nullable()->constrained("societes")->cascadeOnDelete();
            $table->boolean("status")->default(true)->nullable();
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
        Schema::dropIfExists('biens');
    }
};
