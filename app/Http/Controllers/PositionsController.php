<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;

class PositionsController extends Controller
{
    function index()
    {
        return Position::all();
    }
}
