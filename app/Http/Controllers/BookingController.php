<?php

namespace App\Http\Controllers;

use App\Booking;
use App\Http\Traits\ControllerHelper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    use ControllerHelper;

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $query = Booking::orderBy('created_at', 'desc')
            ->with('comments', 'asset', 'user');

        if ($assetId = $request->get('asset')) {
            $query->where('asset_id', $assetId);
        }

        if ($userId = $request->get('user')) {
            $query->where('user_id', $userId);
        }

        $bookings = $query->paginate(10);

        return response()->json($bookings);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'asset_id' => 'required|exists:assets,id',
            'user_id' => 'required|exists:users,id',
            'from' => 'required|date',
            'to' => 'required|date'
        ]);
        $booking = Booking::create($this->filterRequest($request)->toArray());
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
        $booking->load('comments', 'asset', 'user');
        return response()->json($booking);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Booking $booking
     * @return JsonResponse
     * @throws
     */
    public function update(Request $request, Booking $booking)
    {
        $this->validate($request, [
            'asset_id' => 'required|exists:assets,id',
            'user_id' => 'required|exists:users,id',
            'from' => 'required|date',
            'to' => 'required|date'
        ]);
        $booking->update($this->filterRequest($request)->toArray());
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
