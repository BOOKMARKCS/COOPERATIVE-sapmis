<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UsersController;
use App\Models\Role;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//Route::middleware('auth')->get('/users', function (Request $request) {
//    return $request->user();
//});

Route::resource('user', UsersController::class);
Route::resource('project', ProjectController::class);
Route::put('project/{id}', [ProjectController::class, 'update']);
Route::post('project-temp', [ProjectController::class, 'storeTempData']);
Route::get('project-get-temp', [ProjectController::class, 'getTempData']);
Route::get('master-project', [ProjectController::class,'master']);
Route::post('login', [AuthController::class, 'login']);
Route::get('refresh', [AuthController::class, 'refresh']);
Route::get('roles', fn() => Role::pluck('name'));
Route::get('master-user', [UsersController::class, 'master']);
Route::post('logout', [AuthController::class, 'logout']);
Route::get('test', [UsersController::class, 'test']);
