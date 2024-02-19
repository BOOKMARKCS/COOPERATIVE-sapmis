<?php

namespace App\Http\Controllers;

use App\Models\Positions;
use Illuminate\Http\Request;

class PositionsController extends Controller
{
    function index()
    {
        return Positions::all();
    }
}
