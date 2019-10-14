<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = ['user_id', 'asset_id', 'from', 'to', 'processed_at'];

    /**
     * @param $value
     * @return mixed
     * @throws \Exception
     */
    public function getProcessedAtAttribute($value)
    {
        return (new Carbon($value))->toDateTimeLocalString();
    }

    /**
     * @param $value
     * @return mixed
     * @throws \Exception
     */
    public function getFromAttribute($value)
    {
        return (new Carbon($value))->toDateTimeLocalString();
    }

    /**
     * @param $value
     * @throws \Exception
     */
    public function setFromAttribute($value)
    {
        $this->attributes['from'] = (new Carbon($value))->toDateTimeString();
    }

    /**
     * @param $value
     * @return mixed
     * @throws \Exception
     */
    public function getToAttribute($value)
    {
        return (new Carbon($value))->toDateTimeLocalString();
    }

    /**
     * @param $value
     * @throws \Exception
     */
    public function setToAttribute($value)
    {
        $this->attributes['to'] = (new Carbon($value))->toDateTimeString();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function asset()
    {
        return $this->belongsTo('App\Asset');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function comments()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }

}
