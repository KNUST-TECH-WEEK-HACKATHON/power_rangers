<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::controller(AuthController::class)->group(function () {
    Route::post('/signup', 'signUp');
    Route::post('/signin', 'signIn');
});


Route::group([
    'middleware' => 'auth:sanctum',
], function () {

    Route::controller(UploadController::class)->group(function () {
        Route::get('/upload', 'getUpload');
        Route::get('/files', 'getFiles');
        Route::post('/upload', 'upload');
        Route::post('/model', 'model');
    });

});
