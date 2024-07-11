<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 'cost_details', 'cost_amounts', 'remuneration_details', 'remuneration_amounts', 'equipment_cost_details', 'equipment_cost_amounts', 'other', 'project_detail_id'
    ];
}
