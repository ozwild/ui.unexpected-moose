<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    protected $fillable = ['name', 'description'];

    public function requests()
    {
        return $this->hasMany('App\BookingRequest');
    }

    public function bookings()
    {
        return $this->hasMany('App\Booking');
    }

    public function comments()
    {
        return $this->morphMany('App\Comment','commentable');
    }

}
