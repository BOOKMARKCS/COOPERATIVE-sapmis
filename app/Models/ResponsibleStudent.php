<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResponsibleStudent extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'project_detail_id',
        'user_id',
        'status'
    ];
    public function store($requests, $projectDetailId)
    {
        array_map(fn($req) => ResponsibleStudent::create([ 'student_id' => $req['user']['student']['id'], 'project_detail_id' => $projectDetailId, 'user_id' => $req['user']['id'] ]), $requests);
        return $projectDetailId;
    }


}
