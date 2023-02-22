<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function devise()
    {
        return $this->belongsTo(Devise::class);
    }

    public function bien()
    {
        return $this->belongsTo(Bien::class);
    }

    public function locataire()
    {
        return $this->belongsTo(Locataire::class);
    }

    public function typeBail()
    {
        return $this->belongsTo(TypeBail::class);
    }

    public function loyers()
    {
        return $this->hasMany(Loyer::class);
    }

    public function revenus()
    {
        return $this->hasMany(Revenu::class);
    }
}
