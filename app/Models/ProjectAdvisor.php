<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectAdvisor extends Model
{
    use HasFactory;
    protected $fillable = [
        'project_detail_id',
        'user_id',
        'status'
    ];

    public function store($requests,$projectDetailId)
    {
        array_map(fn($req) => ProjectAdvisor::create([ 'project_detail_id' => $projectDetailId, 'user_id' => $req['user']['id'] ]), $requests);
        return $requests;
    }
}