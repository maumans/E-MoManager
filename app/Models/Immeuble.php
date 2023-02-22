<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Immeuble extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function devise()
    {
        return $this->belongsTo(Devise::class);
    }

    public function biens()
    {
        return $this->hasMany(Bien::class);
    }

    public function ville()
    {
        return $this->belongsTo(Ville::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
