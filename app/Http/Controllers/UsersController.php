<?php /** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace App\Http\Controllers;

use App\Helpers\CaseConverter;
use App\Models\Advisor;
use App\Models\Faculty;
use App\Models\Officer;
use App\Models\Organization;
use App\Models\Role;
use App\Models\Student;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('api', ['except' => ['login']],);
    }

//    public function index()
//    {
//        if (!auth()->check()) return response()->json(['message' => 'Unauthorized'], 401);
//        $users = User::with('role', 'student')->get()->map(fn($user) => $user->load($user->type));
//        $filteredUsers = auth()->user()->{'role_id'} != '1'
//            ? $users->where('role.organization_id', auth()->user()->{'role'}->organization_id)->values()->filter(fn($data) => $data->{$data->type}->faculty_id === auth()->user()->{auth()->user()->{'type'}}->faculty_id)
//            : $users->groupBy(fn($user) => optional($user->role->organization)->name);
//        return CaseConverter::convertToCamelCase($filteredUsers);
//    }
    public function index(Request $request)
    {
        if (!auth()->check()) return response()->json(['message' => 'Unauthorized'], 401);

        $query = User::with('role', 'student');

        if ($searchTerm = $request->input('search')) {
            $query->where(function ($q) use ($searchTerm) {
                $q->where('email', 'LIKE', "%{$searchTerm}%")
                    ->orWhereHas('role.organization', function ($q) use ($searchTerm) {
                        $q->where('name', 'LIKE', "%{$searchTerm}%");
                    })
                    ->orWhereHas('role.position', function ($q) use ($searchTerm) {
                        $q->where('name', 'LIKE', "%{$searchTerm}%");
                    })
                    ->orWhereHas('officer', fn($q) => $q->where('name', 'LIKE', "%{$searchTerm}%"))
                    ->orWhereHas('advisor', fn($q) => $q->where('name', 'LIKE', "%{$searchTerm}%"))
                    ->orWhereHas('student', fn($q) => $q->where('name', 'LIKE', "%{$searchTerm}%"))
                    ->orWhereHas('officer', fn($q) => $q->where('phone_number', 'LIKE', "%{$searchTerm}%"))
                    ->orWhereHas('advisor', fn($q) => $q->where('phone_number', 'LIKE', "%{$searchTerm}%"))
                    ->orWhereHas('student', fn($q) => $q->where('phone_number', 'LIKE', "%{$searchTerm}%"));

            });
        }

        $users = $query->get()->map(fn($user) => $user->load($user->type));
        $filteredUsers = auth()->user()->{'role_id'} != '1'
            ? $users->where('role.organization_id', auth()->user()->{'role'}->organization_id)->values()->filter(fn($data) => $data->{$data->type}->faculty_id === auth()->user()->{auth()->user()->{'type'}}->faculty_id)
            : $users->groupBy(fn($user) => optional($user->role->organization)->name);

        return CaseConverter::convertToCamelCase($filteredUsers);
    }


    public function store(Request $request): JsonResponse
    {
        DB::beginTransaction();
        try {
            $requestData = CaseConverter::convertToSnakeCase($request->all());
            $user = User::create($requestData);
            $userId = $user->{'id'};
            $model = match ($user->{'type'}) {
                'officer' => Officer::class,
                'advisor' => Advisor::class,
                'student' => Student::class,
                default => null
            };
            if (!$model) {
                throw new Exception('Invalid user type.');
            }
            $model::create(array_merge($requestData[$request->{'type'}], ['user_id' => $userId]));
            DB::commit();
            return response()->json(['user' => $request->all()]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    function mapToNameId($data)
    {
        return $data->map(fn($name, string $id) => compact('id', 'name'))->values();
    }

    public function master(): array
    {
        return CaseConverter::convertToCamelCase([
            'roles' => Role::with('organization', 'position')->get()->groupBy('organization_id'),
            'organizations' => $this->mapToNameId(Organization::pluck('name', 'id')),
            'faculties' => $this->mapToNameId(Faculty::pluck('name', 'id'))
        ]);
    }

    public function test()
    {
        return User::all();
    }
}
