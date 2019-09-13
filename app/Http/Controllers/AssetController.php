<?php

namespace App\Http\Controllers;

use App\Asset;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AssetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $assets = Asset::orderBy('created_at', 'desc')
            ->with(['requests', 'bookings', 'comments'])
            ->withCount(['requests' => function ($query) {
                $query->where('is_pending', TRUE);
            }])
            ->get();
        return response()->json($assets);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $asset = Asset::create($request->all());
        return response()->json($asset);
    }

    /**
     * Display the specified resource.
     *
     * @param Asset $asset
     * @return JsonResponse
     */
    public function show(Asset $asset)
    {
        return response()->json($asset);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Asset $asset
     * @return JsonResponse
     */
    public function update(Request $request, Asset $asset)
    {
        $asset->update($request->all());
        return response()->json($asset);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Asset $asset
     * @return JsonResponse
     * @throws
     */
    public function destroy(Asset $asset)
    {
        $asset->delete();
        return response()->json();
    }
}
