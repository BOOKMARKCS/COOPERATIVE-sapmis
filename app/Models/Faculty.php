<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Faculty extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $primaryKey = 'id';


    protected $fillable = [
        'id',
        'name',
        'campus'
    ];

    public function student(): HasMany
    {
        return $this->hasMany(Student::class);
    }
}
