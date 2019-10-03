<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class JWTController extends Controller
{
    /**
     * @param Request $request
     * @return array
     * @throws ValidationException
     */
    public function getToken(Request $request)
    {
        $this->validate($request, [
            "email" => "required|email|exists:users,email",
            "password" => "required"
        ]);

        $user = User::where('email', $request->email)->first();

        if (!\Hash::check($request->get('password'), $user->password)) {
            $validator = Validator::make([], []);
            $validator->errors()->add('password', 'Incorrect password');
            throw new ValidationException($validator);
        }

        return [
            "user" => $user,
            "token" => $user->api_token,
            "expiration" => Carbon::now()->add('48 hours')
        ];
    }

    public function logout()
    {

    }

    public function update(Request $request)
    {
        $token = Str::random(60);

        $request->user()->forceFill([
            'api_token' => hash('sha256', $token),
        ])->save();

        return ['token' => $token];
    }
}
