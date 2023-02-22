<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bien extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function devise()
    {
        return $this->belongsTo(Devise::class);
    }

    public function immeuble()
    {
        return $this->belongsTo(Immeuble::class);
    }

    public function lot()
    {
        return $this->belongsTo(Lot::class);
    }

    public function locations()
    {
        return $this->hasMany(Location::class);
    }

    public function ville()
    {
        return $this->belongsTo(Ville::class);
    }

    public function typeBien()
    {
        return $this->belongsTo(TypeBien::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
