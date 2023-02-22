<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BienImmobilier extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function lots()
    {
        return $this->hasMany(Bien::class);
    }

    public function ville()
    {
        return $this->belongsTo(Ville::class);
    }
}
