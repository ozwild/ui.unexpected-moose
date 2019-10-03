<?php

namespace App\Http\Controllers;

use App\BookingRequest;
use App\Http\Traits\ControllerHelper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingRequestController extends Controller
{
    use ControllerHelper;

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $requests = BookingRequest::orderBy('created_at', 'desc')
            ->with('comments', 'asset', 'user')
            ->paginate(10);
        return response()->json($requests);
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
            'to' => 'required|date',
            'is_pending'=>'boolean'
        ]);

        $bookingRequest = BookingRequest::create($this->filterRequest($request)->toArray());
        return response()->json($bookingRequest);
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
     * @throws
     */
    public function update(Request $request, BookingRequest $bookingRequest)
    {
        $this->validate($request, [
            'asset_id' => 'required|exists:assets,id',
            'user_id' => 'required|exists:users,id',
            'from' => 'required|date',
            'to' => 'required|date',
            'is_pending'=>'boolean'
        ]);
        $bookingRequest->update($this->filterRequest($request)->toArray());
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
