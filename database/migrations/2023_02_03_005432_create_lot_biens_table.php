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
        Schema::create('lot_biens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lot_id')->nullable()->constrained("lots")->cascadeOnDelete();
            $table->foreignId('bien_id')->nullable()->constrained("biens")->cascadeOnDelete();
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
        Schema::dropIfExists('lot_biens');
    }
};
