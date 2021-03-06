<?php

namespace App\Http\Controllers;

use App\Http\Traits\ControllerHelper;
use App\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use ControllerHelper;

    /**
     * Display a paginated listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::orderBy('created_at', 'desc')
            ->where('id', '!=', 1)
            ->withCount(['requests' => function ($query) {
                $query->where('is_pending', TRUE);
            }])
            ->with(['comments', 'requests.comments', 'bookings.comments'])
            ->paginate(10);
        return response()->json($users);
    }

    /**
     * Display a simple listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list()
    {
        $users = User::orderBy('created_at', 'asc')
            ->where('id', '!=', 1)
            ->get();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * @throws
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'phone' => 'phone:AUTO,US,GT',
            'avatar' => 'nullable|url',
        ]);

        $user = new User($this->filterRequest($request)->toArray());
        $user->password = \Hash::make(uniqid());
        $user->api_token = \Str::random(60);
        $user->save();
        return response()->json($user);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $user->loadCount([
            'requests' => function (Builder $builder) {
                return $builder->where('is_pending', TRUE);
            },
            'bookings'
        ]);
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param User $user
     * @return \Illuminate\Http\Response
     * @throws
     */
    public function update(Request $request, User $user)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'avatar' => 'nullable|url',
            'phone' => 'phone:AUTO,US,GT',
            'email' => 'required|email|unique:users,email,' . $user->id
        ]);

        $user->update($this->filterRequest($request)->toArray());
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     * @throws
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json();
    }

    /**
     * @param $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore($userId)
    {
        $user = User::onlyTrashed()->where('id', $userId)->first();
        if (!$user) {
            abort(404);
        }
        $user->restore();
        return response()->json([
            "restored" => !$user->trashed()
        ]);
    }
}
