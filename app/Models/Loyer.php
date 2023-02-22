<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loyer extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function devise()
    {
        return $this->belongsTo(Devise::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function annee()
    {
        return $this->belongsTo(Annee::class);
    }

    public function mois()
    {
        return $this->belongsTo(Mois::class);
    }

    public function revenus()
    {
        return $this->hasMany(Revenu::class);
    }
}
