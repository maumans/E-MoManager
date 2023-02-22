<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Revenu extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function devise()
    {
        return $this->belongsTo(Devise::class);
    }

    public function locataire()
    {
        return $this->belongsTo(Locataire::class);
    }

    public function loyer()
    {
        return $this->belongsTo(Loyer::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
