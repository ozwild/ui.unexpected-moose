<?php

use Illuminate\Database\Migrations\Migration;

class CreateRobotUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $user = new \App\User();
        $user->name = 'bot';
        $user->email = 'bot@system.com';
        $user->password = Hash::make('123456789');
        $user->avatar = "https://api.adorable.io/avatars/285/{$user->email}";
        $user->api_token = Str::random(60);
        $user->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $user = \App\User::whereEmail('bot@system.com');
        $user->forceDelete();
    }
}
