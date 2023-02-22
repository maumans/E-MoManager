<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Annee extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function loyers()
    {
        return $this->hasMany(Loyer::class);
    }
}
