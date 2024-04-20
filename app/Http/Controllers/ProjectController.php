<?php

namespace App\Http\Controllers;

use App\Enums\ProjectStatus;
use App\Helpers\CaseConverter;
use App\Models\CongruenceIdentity;
use App\Models\CongruenceIdentityGroup;
use App\Models\Project;
use App\Models\ProjectAdvisor;
use App\Models\ProjectApproval;
use App\Models\ProjectDetail;
use App\Models\ResponsibleStudent;
use App\Models\StrategicTalentDetails;
use App\Models\StrategicTalents;
use App\Models\TsuTalentGroup;
use App\Models\TsuTalents;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CaseConverter::convertToCamelCase(Project::with('projectDetails')->whereHas('projectDetails', fn($query) => $query->where('user_id', auth()->id())->orWhereHas('projectApprovals'))->orWhere('status', $this->getProjectStatus())->get());
    }

    public function getProjectStatus()
    {
        $status = null;
        $user = (new User)->getUser();
        if ($user['role']['organizationId'] == '5') {
            switch ($user['role']['permission']) {
                case "Proposer": $status = ProjectStatus::StudentClub_Proposer; break;
                case "Responsible" : $status = ProjectStatus::StudentClub_Responsible; break;
                case "Advisor" : $status = ProjectStatus::StudentClub_Advisor; break;
                case "Endorser" : $status = ProjectStatus::studentClub_StudentClub; break;
            }
        }
        return $status;
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $project = Project::create(CaseConverter::convertToSnakeCase($request->project))->latest()->first();
            $projectDetail = ProjectDetail::store(CaseConverter::convertToSnakeCase($request['projectDetail']),$project->id);
            ResponsibleStudent::store($request->projectDetail['responsibleStudents'], $projectDetail->id);
            ProjectAdvisor::store($request->projectDetail['projectAdvisors'], $projectDetail->id);
            TsuTalents::store($request['projectDetail']['tsuTalent']['tsuTalentDetailId'], $projectDetail->id);
            StrategicTalents::store($request->projectDetail['strategicTalent']['strategicTalentDetailId'], $projectDetail->id);
            CongruenceIdentity::store($request->projectDetail['congruenceIdentity']['congruenceIdentityDetailId'], $projectDetail->id);
            DB::commit();
            return response()->json(['data' => $request->projectDetail['projectAdvisors']], 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
            'responsibleStudents' => User::with('role')->whereRelation('role', 'permission', '=', 'Responsible')->get()->map(function ($user) {
                $user->load($user->type);
                $user[$user->type]->faculty = json_decode($user[$user->type]->faculty);
                return $user;
            }),
            'projectAdvisors' => User::with('role')->whereRelation('role', 'permission', '=', 'Advisor')->get()->map(function ($user) {
                $user->load($user->type);
                $user[$user->type]->faculty = json_decode($user[$user->type]->faculty);
                return $user;
            })
        ]);

    }

}
