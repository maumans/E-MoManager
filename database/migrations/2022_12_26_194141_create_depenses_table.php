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
        Schema::create('depenses', function (Blueprint $table) {
            $table->id();
            $table->string("code")->nullable();
            $table->bigInteger("montant")->nullable();
            $table->date("date")->nullable();
            $table->longText('motif')->nullable();
            $table->bigInteger("montantGNF")->nullable();
            $table->foreignId('devise_id')->nullable()->constrained("devises")->cascadeOnDelete();
            $table->bigInteger("chargesLocatives")->nullable();
            $table->foreignId("location_id")->nullable()->constrained('locations');
            $table->foreignId("locataire_id")->nullable()->constrained('locataires');
            $table->foreignId("loyer_id")->nullable()->constrained('loyers');
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
        Schema::dropIfExists('depenses');
    }
};
