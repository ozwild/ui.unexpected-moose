<?php

namespace App\Http\Controllers;

use App\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $bookings = Booking::orderBy('created_at', 'desc')
            ->with('comments', 'asset', 'user')
            ->get();
        return response()->json($bookings);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $booking = Booking::create($request->all());
        return response()->json($booking);
    }

    /**
     * Display the specified resource.
     *
     * @param Booking $booking
     * @return JsonResponse
     */
    public function show(Booking $booking)
    {
        return response()->json($booking);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Booking $booking
     * @return JsonResponse
     */
    public function update(Request $request, Booking $booking)
    {
        $booking->update($request->all());
        return response()->json($booking);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Booking $booking
     * @return JsonResponse
     * @throws
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();
        return response()->json();
    }
}
