<?php

namespace App\Http\Controllers;

use App\Models\Organizations;
use Illuminate\Http\Request;

class OrganizationsController extends Controller
{
    function index(){
        return Organizations::all();
    }
}
