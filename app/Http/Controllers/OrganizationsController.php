<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;

class OrganizationsController extends Controller
{
    function index(){
        return Organization::all();
    }
}
