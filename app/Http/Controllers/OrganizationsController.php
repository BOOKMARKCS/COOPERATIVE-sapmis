<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;

class OrganizationsController extends Controller
{
    function index(){
        return Organization::pluck('name','id')->map(fn($name,string $id) => compact('id','name'))->values();
    }
}
