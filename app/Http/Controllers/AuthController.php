<?php /** @noinspection ALL */

/** @noinspection PhpUndefinedMethodInspection */

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Laravel\Sanctum\Sanctum;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return JsonResponse
     */
    public function login(): JsonResponse
    {
        $credentials = request(['email', 'password']);
        if (!($token = auth()->attempt($credentials))) return response()->json(['error' => 'Unauthorized'], 401);
        return $this->respondWithToken($token);
    }

    public function register(Request $request): JsonResponse
    {

        $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone_number' => ['required'],
            'organization_id' => ['required'],
            'position_id' => ['required'],
            'academic_year_id' => ['required']
        ]);

        $user = User::create([
            'name_surname' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_number' => $request->phone_number,
            'signature' => $request->signature,
            'organization_id' => $request->organization_id,
            'position_id' => $request->position_id,
            'academic_year' => $request->academic_year,
        ]);

        event(new Registered($user));

        return response()->json([
            'status' => 'user-created'
        ]);
    }

    public function me(): JsonResponse
    {
        if (auth()->guard('api')->check()) {
            return response()->json((new User())->getUser());
        } else {
            // ตรวจสอบว่าเป็นกรณีของการหมดเวลาหรือโทเค็นไม่ถูกต้อง
            if (auth()->guard('api')->guest()) {
                return response()->json(['error' => 'Unauthorized'], 401);
            } else {
                return response()->json(['error' => 'Authentication Timeout'], 419);
            }
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return JsonResponse
     * @noinspection PhpParamsInspection
     */
    public function refresh(): JsonResponse
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return JsonResponse
     */
    protected function respondWithToken(string $token): JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
