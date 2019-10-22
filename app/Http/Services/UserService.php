<?php


namespace App\Http\Services;


use App\User;

class UserService
{

    /**
     * @return mixed
     */
    public static function getRobotUser()
    {
        return User::where('id', 1)->first();
    }

    /**
     * @return mixed
     */
    public static function getRootUser()
    {
        return User::where('id', 2)->first();
    }

}