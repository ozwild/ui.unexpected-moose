<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BookingRequest extends Model
{
    protected $fillable = ['asset_id', 'user_id', 'from', 'to', 'is_pending'];

    public $timestamps = [
        'from', 'to'
    ];

    private function deriveBooking($comments = "", $commentTitle = "")
    {
        $booking = new Booking();
        $booking->fill([
            "from" => $this->from,
            "to" => $this->to,
            "asset_id" => $this->asset_id,
            "user_id" => $this->user_id
        ]);
        $booking->save();

        if ($comments) {
            $booking->comments()->create([
                "body" => $comments,
            ]);
        }

        return $booking;
    }

    public function approve($comments = "")
    {
        $this->is_pending = FALSE;
        $this->save();

        return $this->deriveBooking($comments, "Booking Approved");

    }

    public function reject($comments = "")
    {
        $this->is_pending = FALSE;
        $this->save();

        return $this->deriveBooking($comments, "Booking Rejected");
    }

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
