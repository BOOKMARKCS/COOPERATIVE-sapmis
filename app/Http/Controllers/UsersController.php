<?php

namespace App\Http\Controllers;

use App\Models\Organizations;
use App\Models\Positions;
use App\Models\Roles;
use App\Models\User;
use App\Models\UsersRoles;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('api', ['except' => ['login']]);
    }

    public function index(): Collection|array
    {
//        return User::join('positions', 'users.position_id', '=', 'positions.id')
//            ->join('organizations', 'users.organization_id', '=', 'organizations.id')
//            ->leftJoin('users_roles', 'users.id', '=', 'users_roles.user_id')
//            ->leftJoin('roles', 'users_roles.role_id', '=', 'roles.id')
//            ->select('users.*', 'positions.name as position_name', 'organizations.name as organization_name', 'roles.name as role_name')
//            ->get();
        return User::with(['position:id,name', 'organization:id,name', 'role:name'])->get();
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone_number' => 'required|string|max:255',
            'organization_id' => 'required|integer|exists:organizations,id',
            'position_id' => 'required|integer|exists:positions,id',
            'academic_year_id' => 'required|integer',
            'role_id' => 'required|integer'
        ]);

        $user = User::create([
            'name_surname' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_number' => $request->phone_number,
            'organization_id' => $request->organization_id,
            'position_id' => $request->position_id,
            'academic_year_id' => $request->academic_year_id,
        ]);

        UsersRoles::create([
            'user_id' => $user->id,
            'role_id' => $request->role_id
        ]);

        return response()->json(['message' => 'User created successfully'], 201);
    }


    public function master(): array
    {
        return [
            'positions' => Positions::pluck('name', 'id'),
            'organizations' => Organizations::pluck('name', 'id'),
            'roles' => Roles::pluck('name', 'id')
        ];
    }
}
