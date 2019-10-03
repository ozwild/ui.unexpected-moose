<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = ['user_id', 'asset_id', 'from', 'to'];

    public $timestamps = [
        'from', 'to'
    ];

    public function asset()
    {
        return $this->belongsTo('App\Asset');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function comments()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }

}
