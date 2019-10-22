<?php


namespace App\Http\Services;


use App\Booking;
use App\BookingRequest;
use App\User;
use Carbon\Carbon;

class BookingService
{

    /**
     * @param BookingRequest $request
     * @param string $comments
     * @param string $commentTitle
     * @return Booking
     */
    private static function deriveBooking(BookingRequest $request, $comments = "", $commentTitle = "")
    {
        $booking = new Booking();
        $booking->fill([
            "from" => $request->from,
            "to" => $request->to,
            "asset_id" => $request->asset_id,
            "user_id" => $request->user_id,
            "processed_at" => Carbon::now()
        ]);
        $booking->save();

        $booking->comments()->create([
            "user_id" => UserService::getRobotUser()->id,
            "title" => $commentTitle,
            "body" => $comments,
        ]);

        return $booking;
    }

    /**
     * @param BookingRequest $request
     * @param string $comments
     * @return \Illuminate\Http\JsonResponse
     */
    public static function approve(BookingRequest $request, $comments = "")
    {
        try {
            $booking = self::deriveBooking($request, $comments, "Booking Request Approved");
            $request->is_pending = FALSE;
            $request->save();
            return response()->json($booking);
        } catch (\Exception $exception) {
            return response()->json([
                "message" => $exception->getMessage(),
                "error" => $exception->getCode()
            ]);
        }
    }

    /**
     * @param BookingRequest $request
     * @param string $comments
     * @return \Illuminate\Http\JsonResponse
     */
    public static function reject(BookingRequest $request, $comments = "")
    {
        try {
            $booking = self::deriveBooking($request, $comments, "Booking Request Rejected");
            $request->is_pending = FALSE;
            $request->save();
            return response()->json($booking);
        } catch (\Exception $exception) {
            return response()->json([
                "message" => $exception->getMessage(),
                "error" => $exception->getCode()
            ]);
        }
    }

}