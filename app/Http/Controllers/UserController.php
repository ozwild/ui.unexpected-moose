<?php

namespace App\Http\Controllers;

use App\Http\Traits\ControllerHelper;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use ControllerHelper;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $requests = User::orderBy('created_at', 'desc')
            ->with(['requests', 'bookings', 'comments', 'requests.comments', 'bookings.comments'])
            ->withCount(['requests' => function ($query) {
                $query->where('is_pending', TRUE);
            }])
            ->paginate(10);
        return response()->json($requests);
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
            'phone' => 'required|regex:/[0-9]{4}-[0-9]{4}/',
            'avatar' => 'nullable|url',
        ]);

        $user = new User($this->filterRequest($request)->toArray());
        $user->password = \Hash::make(uniqid());
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
            'phone' => 'required|regex:/[0-9]{4}-[0-9]{4}/',
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
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore(User $user)
    {
        $user->restore();
        return response()->json();
    }
}
