<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static pluck(string $string)
 */
class Roles extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function users(){
        return $this->belongsToMany(User::class, 'users_roles');
    }
}
