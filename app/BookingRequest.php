<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class BookingRequest extends Model
{
    protected $fillable = ['asset_id', 'user_id', 'from', 'to', 'is_pending'];

    protected $casts = [
        'is_pending' => 'boolean'
    ];

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
     * @param string $comments
     * @param string $commentTitle
     * @return Booking
     */
    private function deriveBooking($comments = "", $commentTitle = "")
    {
        $booking = new Booking();
        $booking->fill([
            "from" => $this->from,
            "to" => $this->to,
            "asset_id" => $this->asset_id,
            "user_id" => $this->user_id,
            "processed_at" => Carbon::now()
        ]);
        $booking->save();

        if ($comments) {
            $booking->comments()->create([
                "body" => $comments,
            ]);
        }

        return $booking;
    }

    /**
     * @param string $comments
     * @return \Illuminate\Http\JsonResponse
     */
    public function approve($comments = "")
    {
        try {
            $derivedBooking = $this->deriveBooking($comments, "Booking Approved");
            $this->is_pending = FALSE;
            $this->save();
            return response()->json($derivedBooking);
        } catch (\Exception $exception) {
            return response()->json([
                "message" => $exception->getMessage(),
                "error" => $exception->getCode()
            ]);
        }
    }

    /**
     * @param string $comments
     * @return \Illuminate\Http\JsonResponse
     */
    public function reject($comments = "")
    {
        try {
            $derivedBooking = $this->deriveBooking($comments, "Booking Rejected");
            $this->is_pending = FALSE;
            $this->save();
            return response()->json($derivedBooking);
        } catch (\Exception $exception) {
            return response()->json([
                "message" => $exception->getMessage(),
                "error" => $exception->getCode()
            ]);
        }
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
