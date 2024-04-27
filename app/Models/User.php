<?php

namespace App\Models;

use App\Helpers\CaseConverter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['id', 'email', 'password', 'signature', 'role_id', 'type'];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // ให้ใช้ method booted เพื่อกำหนดค่าเริ่มต้นของรหัสผ่าน
    protected static function booted()
    {
        static::creating(fn($user) => $user->password = bcrypt('password'));
    }

    public static function create(array $attributes = [])
    {
        $user = static::query()->create($attributes);
        return User::where('email', $user->email)->first();
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function getUser()
    {
        return CaseConverter::convertToCamelCase(User::with(auth()->user()->type ,'role')->where('id',auth()->id())->first());
    }

    public function officer(): HasOne
    {
        return $this->hasOne(Officer::class)->select('user_id', 'name', 'phone_number', 'signature', 'profile');
    }

    public function advisor(): HasOne
    {
        return $this->hasOne(Advisor::class)->with('faculty');
    }

    /**
     * Get the students for the user.
     */
    public function student(): HasOne
    {
        return $this->hasOne(Student::class)->with('faculty');
    }


    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class)->select('id', 'permission', 'organization_id', 'position_id')->with('organization', 'position');
    }

}

