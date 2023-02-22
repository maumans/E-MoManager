<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Locataire extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function locations()
    {
        return $this->hasMany(Location::class);
    }

    public function revenus()
    {
        return $this->hasMany(Revenu::class);
    }

    public function ville()
    {
        return $this->belongsTo(Ville::class);
    }
}
