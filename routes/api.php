<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')
->group(function(){

    Route::prefix('users')
        ->group(function () {

            Route::get('/', 'UserController@index');
            Route::post('/', 'UserController@store');
            Route::get('/{user}', 'UserController@show');
            Route::put('/{user}', 'UserController@update');
            Route::delete('/{user}', 'UserController@destroy');

        });

    Route::prefix('assets')
        ->group(function () {

            Route::get('/', 'AssetController@index');
            Route::post('/', 'AssetController@store');
            Route::get('/{asset}', 'AssetController@show');
            Route::put('/{asset}', 'AssetController@update');
            Route::delete('/{asset}', 'AssetController@destroy');

        });

    Route::prefix('requests')
        ->group(function () {

            Route::get('/', 'BookingRequestController@index');
            Route::post('/', 'BookingRequestController@store');
            Route::get('/{bookingRequest}', 'BookingRequestController@show');
            Route::put('/{bookingRequest}', 'BookingRequestController@update');
            Route::delete('/{bookingRequest}', 'BookingRequestController@destroy');

        });

    Route::prefix('bookings')
        ->group(function () {

            Route::get('/', 'BookingController@index');
            Route::post('/', 'BookingController@store');
            Route::get('/{booking}', 'BookingController@show');
            Route::put('/{booking}', 'BookingController@update');
            Route::delete('/{booking}', 'BookingController@destroy');

        });

});

Route::prefix('auth')
    ->group(function () {

        Route::post('login', 'JWTController@getToken');
        Route::post('logout', 'JWTController@logout');

    });