<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/login','Auth\AuthController@login');

Route::group(['middleware'=>'auth:api'],function (){
    Route::get('/user',function (Request $request) {
        return response()->json('dsdsd');
    });
    Route::post('/logout','Auth\AuthController@logout');
});

