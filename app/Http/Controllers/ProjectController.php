<?php

namespace App\Http\Controllers;

use App\Enums\ProjectStatus;
use App\Helpers\CaseConverter;
use App\Models\CongruenceIdentityGroup;
use App\Models\Project;
use App\Models\ProjectAdvisor;
use App\Models\ProjectApproval;
use App\Models\ProjectDetail;
use App\Models\ResponsibleStudent;
use App\Models\StrategicTalentDetails;
use App\Models\TsuTalentGroup;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CaseConverter::convertToCamelCase(Project::with('projectDetails')
            ->orWhereHas('projectDetails', fn($query) => $query->where('user_id', auth()->id())->orWhereHas('projectApprovals'))
            ->orWhereHas('projectDetails', fn($query) => $query->where('user_id', auth()->id())->orWhereHas('projectAdvisors'))
            ->orWhereHas('projectDetails', fn($query) => $query->where('user_id', auth()->id())->orWhereHas('responsibleStudents'))
            ->orWhere('status', $this->getProjectStatus())
            ->where('academic_year', auth()->user()->getUser()[auth()->user()->type]['academicYear'])
            ->get());
    }

    public function getProjectStatus(): ?int
    {
        $status = null;
        $user = (new User)->getUser();
        if ($user['role']['organizationId'] == '5') {
            switch ($user['role']['permission']) {
                case "Proposer":
                    $status = ProjectStatus::StudentClub_Proposer;
                    break;
                case "Responsible" :
                    $status = ProjectStatus::StudentClub_Responsible;
                    break;
                case "Advisor" :
                    $status = ProjectStatus::StudentClub_Advisor;
                    break;
                case "Endorser" :
                    $status = ProjectStatus::studentClub_StudentClub;
                    break;
            }
        }
        return $status;
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate(
            ['project' => 'required|array', 'projectDetail' => 'required|array', 'projectDetail.responsibleStudents' => 'required|array', 'projectDetail.projectAdvisors' => 'required|array'],
            ['project.required' => 'โปรดระบุข้อมูลโปรเจค', 'projectDetail.required' => 'โปรดระบุข้อมูลรายละเอียดโปรเจค', 'projectDetail.responsibleStudents.required' => 'โปรดระบุข้อมูลนักศึกษาที่รับผิดชอบ', 'projectDetail.projectAdvisors.required' => 'โปรดระบุข้อมูลที่ปรึกษาโปรเจค']
        );
        DB::beginTransaction();
        try {
            $project = Project::create(CaseConverter::convertToSnakeCase($request->project))->latest()->first();
            $projectDetail = ProjectDetail::store(CaseConverter::convertToSnakeCase($request['projectDetail']), $project->id);
            ResponsibleStudent::store($request->projectDetail['responsibleStudents'], $projectDetail->id);
            ProjectAdvisor::store($request->projectDetail['projectAdvisors'], $projectDetail->id);
//            TsuTalents::store($request['projectDetail']['tsuTalent']['tsuTalentDetailId'], $projectDetail->id);
//            StrategicTalents::store($request->projectDetail['strategicTalent']['strategicTalentDetailId'], $projectDetail->id);
//            CongruenceIdentity::store($request->projectDetail['congruenceIdentity']['congruenceIdentityDetailId'], $projectDetail->id);
            DB::commit();
            return response()->json('บันทึกข้อมูลโครงการสำเร็จ', 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([$e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return "edit";
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $project = Project::find($id);
        if (!$project) return response()->json(['error' => 'Project not found'], 404);
        $project->update(['status' => ProjectStatus::StudentClub_Advisor]);
        ProjectApproval::create(['project_detail_id' => $request->id, 'user_id' => auth()->id(), 'comment' => 'Certify', 'status' => 1]);
        return response()->json(['data' => $project]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    function mapToNameId($data)
    {
        return $data->map(fn($name, $id) => compact('id', 'name'))->values();
    }

    public function master()
    {
        return CaseConverter::convertToCamelCase([
            'tsuTalents' => TsuTalentGroup::with(['talentDetails'])->get(),
            'strategicTalents' => $this->mapToNameId(StrategicTalentDetails::pluck('name', 'id')),
            'congruenceIdentities' => CongruenceIdentityGroup::with('congruenceIdentityDetail')->get(),
            'responsibleStudents' => User::with('role')
                ->whereRelation('role', 'permission', '=', 'Responsible')->get()
                ->map(fn($user) => $user->load($user->type)),
            'projectAdvisors' => User::with('role')
                ->whereRelation('advisor', 'faculty_id', '=', (new User())->getUser()[auth()->user()->type]['facultyId'])
                ->where('type', 'advisor')->get()
                ->map(fn($user) => $user->load($user->type))
        ]);
    }
}
