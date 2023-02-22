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
        Schema::create('locataires', function (Blueprint $table) {
            $table->id();
            $table->string("code")->nullable();
            $table->string("nom")->nullable();
            $table->string("prenom")->nullable();
            $table->string("prenom2")->nullable();
            $table->enum("civilite",["Mr ","Mme","Mlle"])->nullable();
            $table->date("dateNaissance")->nullable();
            $table->string("lieu")->nullable();
            $table->string("email")->unique()->nullable();
            $table->string("telephone1")->unique()->nullable();
            $table->string("telephone2")->unique()->nullable();
            $table->string("adresse")->nullable();
            $table->string("region")->nullable();
            $table->string("photo")->nullable();
            $table->enum("type",["PARTICULIER",'SOCIETE','AUTRE'])->nullable();
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
        Schema::dropIfExists('locataires');
    }
};
