<?php

namespace App;

use App\Http\Services\UserService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class BookingRequest extends Model
{
    protected $fillable = ['asset_id', 'user_id', 'from', 'to', 'is_pending'];

    protected $casts = [
        'is_pending' => 'boolean'
    ];

    /**
     * @var array
     */
    protected $appends = [
        'morph_class'
    ];

    /**
     * @return string
     */
    public function getMorphClassAttribute()
    {
        return $this->getMorphClass();
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
