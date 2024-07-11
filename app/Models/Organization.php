<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static pluck(string $string, string $string1)
 * @method static create(array $array)
 */
class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 'name'
    ];
}
