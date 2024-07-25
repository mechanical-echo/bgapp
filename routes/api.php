<?php

use App\Http\Controllers\SongController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/songs/morning', [SongController::class, 'getMorning']);
Route::get('/songs/day', [SongController::class, 'getDay']);
Route::get('/songs/night', [SongController::class, 'getNight']);