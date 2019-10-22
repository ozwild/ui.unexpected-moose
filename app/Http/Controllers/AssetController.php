<?php

namespace App\Http\Controllers;

use App\Asset;
use App\Http\Traits\ControllerHelper;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AssetController extends Controller
{
    use ControllerHelper;

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {

        $requests = Asset::orderBy('created_at', 'desc')
            ->with(['requests', 'bookings', 'comments', 'requests.comments', 'bookings.comments'])
            ->withCount(['requests' => function ($query) {
                $query->where('is_pending', TRUE);
            }])
            ->paginate(10);

        return response()->json($requests);
    }

    /**
     * Display a simple listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list()
    {
        $assets = Asset::orderBy('created_at', 'asc')
            ->where('id', '!=', 1)
            ->get();
        return response()->json($assets);
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
            'name' => 'required|string',
            'description' => 'required|string',
            'picture' => 'nullable|url',
        ]);

        $asset = Asset::create($this->filterRequest($request)->toArray());
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
        $asset->loadCount([
            'requests' => function (Builder $builder) {
                return $builder->where('is_pending', TRUE);
            },
            'bookings'
        ]);
        return response()->json($asset);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Asset $asset
     * @return JsonResponse
     * @throws
     */
    public function update(Request $request, Asset $asset)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'description' => 'required|string',
            'picture' => 'nullable|url',
        ]);

        $asset->update($this->filterRequest($request)->toArray());
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

    /**
     * @param $assetId
     * @return JsonResponse
     */
    public function restore($assetId)
    {
        $asset = Asset::onlyTrashed()->where('id', $assetId)->first();
        if (!$asset) {
            abort(404);
        }
        $asset->restore();
        return response()->json(["restored" => !$asset->trashed()]);
    }

}
