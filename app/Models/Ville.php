<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ville extends Model
{
    use HasFactory;

    protected $guarded=[];

    public function immeubles()
    {
        return $this->hasMany(Immeuble::class);
    }

    public function lots()
    {
        return $this->hasMany(Lot::class);
    }

    public function biens()
    {
        return $this->hasMany(Bien::class);
    }
}
