<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectApproval extends Model
{
    use HasFactory;
    protected $fillable = ['project_detail_id','user_id','comment','status'];
    protected $primaryKey = 'id'; // กำหนด primary key เป็น 'id'


    public function projectDetail(): BelongsTo
    {
        return $this->belongsTo(ProjectDetail::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
