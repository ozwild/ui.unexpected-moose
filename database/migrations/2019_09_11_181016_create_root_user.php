<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRootUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $user = new \App\User();
        $user->name = 'root';
        $user->email = 'aozikuma@gmail.com';
        $user->password = Hash::make('123456789');
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
        $user = \App\User::whereEmail('aozikuma@gmail.com');
        $user->forceDelete();
    }
}
