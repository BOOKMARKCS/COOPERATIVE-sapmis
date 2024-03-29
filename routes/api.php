<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrganizationsController;
use App\Http\Controllers\PositionsController;
use App\Http\Controllers\UsersController;
use App\Models\Organization;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
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
Route::post('login', [AuthController::class, 'login']);
Route::get('refresh', [AuthController::class, 'refresh']);
Route::get('roles', fn() => Role::pluck('name'));
Route::get('master-user', [UsersController::class, 'master']);
Route::post('logout', [AuthController::class, 'logout']);
//$organization = Organization::pluck('name', 'id');
//Route::get('test', fn() => $organization->search('สภานิสิต'));
Route::get('positions', [PositionsController::class, 'index']);
Route::get('organizations', [OrganizationsController::class, 'index']);
