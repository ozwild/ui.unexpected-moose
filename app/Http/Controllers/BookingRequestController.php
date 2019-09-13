<?php

namespace App\Http\Controllers;

use App\BookingRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $requests = BookingRequest::orderBy('created_at', 'desc')
            ->with('comments', 'asset', 'user')
            ->get();
        return response()->json($requests);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $bookingRequests = BookingRequest::create($request->all());
        return response()->json($bookingRequests);
    }

    /**
     * Display the specified resource.
     *
     * @param BookingRequest $bookingRequest
     * @return JsonResponse
     */
    public function show(BookingRequest $bookingRequest)
    {
        return response()->json($bookingRequest);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param BookingRequest $bookingRequest
     * @return JsonResponse
     */
    public function update(Request $request, BookingRequest $bookingRequest)
    {
        $bookingRequest->update($request->all());
        return response()->json($bookingRequest);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param BookingRequest $bookingRequest
     * @return JsonResponse
     * @throws
     */
    public function destroy(BookingRequest $bookingRequest)
    {
        $bookingRequest->delete();
        return response()->json();
    }
}
