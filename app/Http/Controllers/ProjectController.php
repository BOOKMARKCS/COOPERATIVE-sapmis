<?php /** @noinspection ALL */

namespace App\Http\Controllers;

use App\Helpers\CaseConverter;
use App\Models\Budget;
use App\Models\CongruenceIdentity;
use App\Models\CongruenceIdentityGroup;
use App\Models\Kpi;
use App\Models\Project;
use App\Models\ProjectAdvisor;
use App\Models\ProjectDetail;
use App\Models\ProjectParticipant;
use App\Models\ResponsibleStudent;
use App\Models\StrategicTalentDetails;
use App\Models\StrategicTalents;
use App\Models\TsuTalentGroup;
use App\Models\TsuTalents;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('api');
    }
    public function index()
    {
        $authUserId = auth()->id();
        $projects = Project::with('projectDetail')
            ->whereHas('projectDetail', function ($query) use ($authUserId) {
                $query->where('user_id', $authUserId)
                    ->orWhereHas('projectApprovals', fn($subQuery) => $subQuery->where('user_id', $authUserId))
                    ->orWhereHas('projectAdvisors', fn($subQuery) => $subQuery->where('user_id', $authUserId))
                    ->orWhereHas('responsibleStudents', fn($subQuery) => $subQuery->where('user_id', $authUserId));
            })->get();
        return CaseConverter::convertToCamelCase(json_decode($projects->toJson(), true));
    }


    public function create()
    {
    }

    public function store(Request $request): JsonResponse
    {
//        $request->validate(
//            ['project' => 'required|array', 'projectDetail' => 'required|array', 'projectDetail.responsibleStudents' => 'required|array', 'projectDetail.projectAdvisors' => 'required|array'],
//            ['project.required' => 'โปรดระบุข้อมูลโปรเจค', 'projectDetail.required' => 'โปรดระบุข้อมูลรายละเอียดโปรเจค', 'projectDetail.responsibleStudents.required' => 'โปรดระบุข้อมูลนักศึกษาที่รับผิดชอบ', 'projectDetail.projectAdvisors.required' => 'โปรดระบุข้อมูลที่ปรึกษาโปรเจค']
//        );
        DB::beginTransaction();
        try {
            $project = Project::create(CaseConverter::convertToSnakeCase($request->project))->latest()->first();
            $projectDetail = ProjectDetail::store(CaseConverter::convertToSnakeCase($request['projectDetail']), $project->id);
            ResponsibleStudent::store($request->projectDetail['responsibleStudents'], $projectDetail->id);
            ProjectAdvisor::store($request->projectDetail['projectAdvisors'], $projectDetail->id);
            DB::commit();
            return response()->json('บันทึกข้อมูลโครงการสำเร็จ', 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([$e->getMessage()], 400);
        }
    }

    public function show(string $id)
    {
        $w_user = User::select(DB::raw("JSON_OBJECT('id', users.id,
                               'email', users.email,
                               'role_id', users.role_id,
                               'role', JSON_OBJECT('id', r.id,
                                                   'organization_id', r.organization_id,
                                                   'organization', JSON_OBJECT('id',o.id,'name',o.name),
                                                   'permission', r.permission,
                                                   'position_id', r.position_id,
                                                   'position', JSON_OBJECT('id',p.id,'name',p.name)),
                               'type', users.type,
                               users.type, JSON_OBJECT('name', CASE users.type
                                                        WHEN 'officer' THEN officer.name
                                                        WHEN 'advisor' THEN advisor.name
                                                        WHEN 'student' THEN student.name END,
                                                    'phone_number', CASE users.type
                                                        WHEN 'officer' THEN officer.phone_number
                                                        WHEN 'advisor' THEN advisor.phone_number
                                                        WHEN 'student' THEN student.phone_number END,
                                                    'profile', CASE users.type
                                                        WHEN 'officer' THEN officer.profile
                                                        WHEN 'advisor' THEN advisor.profile
                                                        WHEN 'student' THEN student.profile END,
                                                    'signature', CASE users.type
                                                        WHEN 'officer' THEN officer.signature
                                                        WHEN 'advisor' THEN advisor.signature
                                                        WHEN 'student' THEN student.signature END,
                                                    'student_id', CASE users.type WHEN 'student' THEN student.id END)) AS user"))
            ->join('roles as r', 'users.role_id', '=', 'r.id')
            ->join('organizations as o', 'r.organization_id', '=', 'o.id')
            ->join('positions as p', 'r.position_id', '=', 'p.id')
            ->leftJoin('officers as officer', fn($join) => $join->on('users.type', '=', DB::raw("'officer'"))->on('officer.user_id', '=', 'users.id'))
            ->leftJoin('advisors as advisor', fn($join) => $join->on('users.type', '=', DB::raw("'advisor'"))->on('advisor.user_id', '=', 'users.id'))
            ->leftJoin('students as student', fn($join) => $join->on('users.type', '=', DB::raw("'student'"))->on('student.user_id', '=', 'users.id'));

        $w_responsible_students = ResponsibleStudent::select(DB::raw("JSON_OBJECT('id', id,
                               'project_detail_id', project_detail_id,
                               'user_id', user_id,
                               'user', u.user,
                               'status', status,
                               'student_id', student_id) AS responsible_students"))
            ->leftJoinSub($w_user, 'u', fn($join) => $join->on('user_id', '=', DB::raw("JSON_UNQUOTE(JSON_EXTRACT(u.user, '$.id'))")));

        $w_project_advisors = ProjectAdvisor::select(DB::raw("JSON_OBJECT('id', id,
                               'status', status,
                               'project_detail_id', project_detail_id,
                               'user_id', user_id,
                               'user', u.user) AS project_advisor"))
            ->leftJoinSub($w_user, 'u', fn($join) => $join->on('user_id', '=', DB::raw("JSON_UNQUOTE(JSON_EXTRACT(u.user, '$.id'))")));

        $w_tsu_talents = TsuTalents::select(DB::raw("JSON_OBJECT(
                                 'project_detail_id', project_detail_id,
                                 'tsu_talent_detail_id', CONCAT('[', GROUP_CONCAT(tsu_talent_detail_id), ']')) as tsu_talent"))
            ->groupBy('project_detail_id');

        $w_strategic_talents = StrategicTalents::select(DB::raw("JSON_OBJECT( 'project_detail_id', project_detail_id,
                                                                                    'strategic_talent_detail_id', CONCAT('[', GROUP_CONCAT(strategic_talent_detail_id), ']')) as strategic_talent"))
            ->groupBy('project_detail_id');

        $w_congruenceIdentities = CongruenceIdentity::select(DB::raw("JSON_OBJECT( 'project_detail_id', project_detail_id,
                                                                                         'congruence_identity_detail_id', CONCAT('[', GROUP_CONCAT(congruence_identity_detail_id), ']')) as congruenceIdentity"))
            ->groupBy('project_detail_id');

        $w_project_participants = ProjectParticipant::select(DB::raw("JSON_OBJECT('id',id,
                                             'project_detail_id',project_detail_id,
                                             'advisor',advisor,
                                             'teacher',teacher,
                                             'student',student,
                                             'other',other) as project_participant"));

        $w_budgets = Budget::select(DB::raw("JSON_OBJECT('id',id,
                                 'project_detail_id',project_detail_id,
                                 'cost_details',cost_details,
                                 'cost_amounts',cost_amounts,
                                 'equipment_cost_details',equipment_cost_details,
                                 'equipment_cost_amounts',equipment_cost_amounts,
                                 'remuneration_details',remuneration_details,
                                 'remuneration_amounts',remuneration_amounts,
                                 'other',other) as budget"));

        $w_kpi = Kpi::select(DB::raw("JSON_OBJECT('id',id,
                             'project_detail_id',project_detail_id,
                             'quality',quality,
                             'quantity',quantity) as kpi"));

        $w_project_details = ProjectDetail::select(DB::raw("JSON_OBJECT('id', id,
                                          'project_id', project_id,
                                          'project_name', project_name,
                                          'activity_group_name', activity_group_name,
                                          'responsible_students', CONCAT('[', GROUP_CONCAT(DISTINCT rs.responsible_students), ']'),
                                          'project_advisors', CONCAT('[', GROUP_CONCAT(DISTINCT  pa.project_advisor), ']'),
                                          'tsu_talent', tt.tsu_talent,
                                          'strategic_talent', st.strategic_talent,
                                          'congruence_identity', ci.congruenceIdentity,
                                          'background', background,
                                          'objectives', objectives,
                                          'activity_formats', activity_formats,
                                          'project_participant', pp.project_participant,
                                          'location',location,
                                          'duration', duration,
                                          'operations',operations,
                                          'budget',b.budget,
                                          'expected_results',expected_results,
                                          'kpi',k.kpi,
                                          'evaluates',evaluates,
                                          'created_at',created_at) AS project_detail"))
            ->leftJoinSub($w_responsible_students, 'rs', fn($join) => $join->on('id', '>=', DB::raw("JSON_EXTRACT(rs.responsible_students, '$.project_detail_id')")))
            ->leftJoinSub($w_project_advisors, 'pa', fn($join) => $join->on('id', '>=', DB::raw("JSON_EXTRACT(pa.project_advisor, '$.project_detail_id')")))
            ->leftJoinSub($w_tsu_talents, 'tt', fn($join) => $join->on('id', '>=', DB::raw("JSON_EXTRACT(tt.tsu_talent, '$.project_detail_id')")))
            ->leftJoinSub($w_strategic_talents, 'st', fn($join) => $join->on('id', '>=', DB::raw("JSON_EXTRACT(st.strategic_talent, '$.project_detail_id')")))
            ->leftJoinSub($w_congruenceIdentities, 'ci', fn($join) => $join->on('id', '>=', DB::raw("JSON_EXTRACT(ci.congruenceIdentity, '$.project_detail_id')")))
            ->leftJoinSub($w_project_participants, 'pp', fn($join) => $join->on('id', '>=', DB::raw("JSON_EXTRACT(pp.project_participant, '$.project_detail_id')")))
            ->leftJoinSub($w_budgets, 'b', fn($join) => $join->on('id', '>=', DB::raw("JSON_EXTRACT(b.budget,'$.project_detail_id')")))
            ->leftJoinSub($w_kpi, 'k', fn($join) => $join->on('id', '>=', DB::raw("JSON_EXTRACT(k.kpi, '$.project_detail_id')")))
            ->groupBy('id', 'project_id', 'project_name', 'activity_group_name', 'tt.tsu_talent', 'st.strategic_talent', 'ci.congruenceIdentity', 'background', 'objectives', 'activity_formats', 'location', 'duration', 'operations', 'expected_results', 'evaluates', 'created_at');

        $project = Project::select('projects.*', 'project_detail')
            ->joinSub($w_project_details, 'pd', fn($join) => $join->on('projects.id', '=', DB::raw("JSON_UNQUOTE(JSON_EXTRACT(pd.project_detail, '$.project_id'))")))
            ->where('id', '=', $id)
            ->orderBy(DB::raw("JSON_UNQUOTE(JSON_EXTRACT(pd.project_detail, '$.created_at'))"), 'DESC')
            ->first();

//        if ($project) {
//            $project->project_detail = json_decode($project->project_detail);
//            foreach (['tsu_talent', 'strategic_talent', 'congruence_identity'] as $attribute) if (isset($project->project_detail->$attribute->{$attribute . '_detail_id'})) $project->project_detail->$attribute->{$attribute . '_detail_id'} = json_decode($project->project_detail->$attribute->{$attribute . '_detail_id'});
//            foreach (['responsible_students', 'project_advisors'] as $attribute) $project->project_detail->$attribute = $project->project_detail->$attribute[0] ?? null;
//            return CaseConverter::convertToCamelCase($project);
//        } else return response()->json(['message' => 'ไม่พบโครงการที่ระบุ'], 400);
        if ($project) {
            $project->project_detail = json_decode($project->project_detail);
            if (isset($project->project_detail->tsu_talent)) {
                $project->project_detail->tsu_talent = json_decode($project->project_detail->tsu_talent);
                $project->project_detail->tsu_talent->tsu_talent_detail_id = json_decode($project->project_detail->tsu_talent->tsu_talent_detail_id);
            }
            if (isset($project->project_detail->strategic_talent)) {
                $project->project_detail->strategic_talent = json_decode($project->project_detail->strategic_talent);
                $project->project_detail->strategic_talent->strategic_talent_detail_id = json_decode($project->project_detail->strategic_talent->strategic_talent_detail_id);
            }
            if (isset($project->project_detail->congruence_identity)) {
                $project->project_detail->congruence_identity = json_decode($project->project_detail->congruence_identity);
                $project->project_detail->congruence_identity->congruence_identity_detail_id = json_decode($project->project_detail->congruence_identity->congruence_identity_detail_id);
            }
            if (isset($project->project_detail->project_participant)) {
                $project->project_detail->project_participant = json_decode($project->project_detail->project_participant);
                $project->project_detail->project_participant->advisor = json_decode($project->project_detail->project_participant->advisor);
                $project->project_detail->project_participant->other = json_decode($project->project_detail->project_participant->other);
                $project->project_detail->project_participant->student = json_decode($project->project_detail->project_participant->student);
                $project->project_detail->project_participant->teacher = json_decode($project->project_detail->project_participant->teacher);
            }
            if (isset($project->project_detail->kpi)) {
                $project->project_detail->kpi = json_decode($project->project_detail->kpi);
                $project->project_detail->kpi->quality = json_decode($project->project_detail->kpi->quality);
                $project->project_detail->kpi->quantity = json_decode($project->project_detail->kpi->quantity);
            }
            if (isset($project->project_detail->budget)) {
                $project->project_detail->budget = json_decode($project->project_detail->budget);
                $project->project_detail->budget->cost_details = json_decode($project->project_detail->budget->cost_details);
                $project->project_detail->budget->cost_amounts = json_decode($project->project_detail->budget->cost_amounts);
                $project->project_detail->budget->equipment_cost_details = json_decode($project->project_detail->budget->equipment_cost_details);
                $project->project_detail->budget->equipment_cost_amounts = json_decode($project->project_detail->budget->equipment_cost_amounts);
                $project->project_detail->budget->remuneration_details = json_decode($project->project_detail->budget->remuneration_details);
                $project->project_detail->budget->remuneration_amounts = json_decode($project->project_detail->budget->remuneration_amounts);
            }

            foreach (['objectives', 'activity_formats', 'operations', 'evaluates', 'expected_results', 'duration', 'project_advisors', 'responsible_students'] as $attribute) $project->project_detail->{$attribute} = json_decode($project->project_detail->{$attribute});
            return CaseConverter::convertToCamelCase($project);
        } else return response()->json(['message' => 'ไม่พบโครงการที่ระบุ'], 400);

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
        if (!$project) {
            return response()->json(['error' => 'Project not found'], 404);
        }

        // ดึงข้อมูลที่ส่งมาจาก request
        $requestData = $request->input();

        // อัปเดตข้อมูลโปรเจค
        $project->update(CaseConverter::convertToSnakeCase($requestData));

        $projectDetail = ProjectDetail::find($requestData['projectDetail']['id']);
        $updated = $projectDetail->update(CaseConverter::convertToSnakeCase($requestData['projectDetail']));

        if (isset($requestData['projectDetail']['tsuTalent'])) {
            $data = $requestData['projectDetail']['tsuTalent'];
            $id = $requestData['projectDetail']['id'];
            TsuTalents::where('project_detail_id', $id)->whereNotIn('tsu_talent_detail_id', $data['tsuTalentDetailId'])->delete();
            foreach ($data['tsuTalentDetailId'] as $tsuTalentDetailId) TsuTalents::updateOrCreate(['project_detail_id' => $id, 'tsu_talent_detail_id' => $tsuTalentDetailId]);
        }
        if (isset($requestData['projectDetail']['strategicTalent'])) {
            $data = $requestData['projectDetail']['strategicTalent'];
            $id = $requestData['projectDetail']['id'];
            StrategicTalents::where('project_detail_id', $id)->whereNotIn('strategic_talent_detail_id', $data['strategicTalentDetailId'])->delete();
            foreach ($data['strategicTalentDetailId'] as $strategicTalentDetailId) StrategicTalents::updateOrCreate(['project_detail_id' => $id, 'strategic_talent_detail_id' => $strategicTalentDetailId]);
        }
        if (isset($requestData['projectDetail']['congruenceIdentity'])) {
            $data = $requestData['projectDetail']['congruenceIdentity'];
            $id = $requestData['projectDetail']['id'];
            CongruenceIdentity::where('project_detail_id', $id)->whereNotIn('congruence_identity_detail_id', $data['congruenceIdentityDetailId'])->delete();
            foreach ($data['congruenceIdentityDetailId'] as $congruenceIdentityDetailId) CongruenceIdentity::updateOrCreate(['project_detail_id' => $id, 'congruence_identity_detail_id' => $congruenceIdentityDetailId]);
        }

        $participantData = CaseConverter::convertToSnakeCase($requestData['projectDetail']['projectParticipant']);
        $participantData['project_detail_id'] = $projectDetail->id;
        ProjectParticipant::updateOrCreate(['project_detail_id' => $participantData['project_detail_id']], $participantData);

        if (isset($requestData['projectDetail']['kpi'])) {
            $kpiData = $requestData['projectDetail']['kpi'];
            $kpiData['project_detail_id'] = $projectDetail->id;

            Kpi::updateOrCreate(
                ['project_detail_id' => $projectDetail->id],
                [
                    'quantity' => json_encode($kpiData['quantity']),
                    'quality' => json_encode($kpiData['quality']),
                ]
            );
        }

        if (isset($requestData['projectDetail']['budget'])) {
            $budgetData = CaseConverter::convertToSnakeCase($requestData['projectDetail']['budget']);
            $budgetData['project_detail_id'] = $projectDetail->id;

            Budget::updateOrCreate(
                ['id' => $budgetData['id'], 'project_detail_id' => $projectDetail->id],
                [
                    'cost_details' => json_encode($budgetData['cost_details']),
                    'cost_amount' => json_encode($budgetData['cost_amounts']),
                    'remuneration_details' => json_encode($budgetData['remuneration_details']),
                    'remuneration_amounts' => json_encode($budgetData['remuneration_amounts']),
                    'equipment_cost_details' => json_encode($budgetData['equipment_cost_details']),
                    'equipment_cost_amounts' => json_encode($budgetData['equipment_cost_amounts']),
                    'other' => json_encode($budgetData['other']),
                ]
            );
        }



//        $ProjectParticipant = ProjectParticipant::find($requestData['projectDetail']['projectParticipant']['id']);
        // ตรวจสอบว่าอัปเดตข้อมูลสำเร็จหรือไม่
//        if ($updated) {
//            return response()->json(['success' => 'Project updated successfully'], 200);
//        } else {
//            return response()->json(['error' => 'Failed to update project'], 500);
//        }
//        if ($updated) {
//            return response()->json(['success' => 'Project updated successfully', 'projectDetail' => $requestData['projectDetail'], 'duration' => $projectDetail], 200);
            if ($request->hasFile('file')) {
                // Handle file upload here
                // Example: Save the file to a storage directory
//                $file = $request->file('file');
//                $file->move(storage_path('app/public/uploads'), $file->getClientOriginalName());

                // Respond with success message
                return response()->json(['success' => 'File uploaded successfully']);
            } else {
                // Handle case where no file is uploaded
                return response()->json(['error' => 'No file uploaded']);
            }
//        } else {
//            return response()->json(['error' => 'Failed to update project'], 500);
//        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public
    function destroy(string $id)
    {
        //
    }

    function mapToNameId($data)
    {
        return $data->map(fn($name, $id) => compact('id', 'name'))->values();
    }

    public
    function master()
    {
        $organizationId = auth()->user()->{'role'}->organization_id;
        return CaseConverter::convertToCamelCase([
            'tsuTalents' => TsuTalentGroup::with(['talentDetails'])->get(),
            'strategicTalents' => $this->mapToNameId(StrategicTalentDetails::pluck('name', 'id')),
            'congruenceIdentities' => CongruenceIdentityGroup::with('congruenceIdentityDetail')->get(),
//            ResponsibleStudent::select(DB::raw("JSON_OBJECT('id', id,
//                               'project_detail_id', project_detail_id,
//                               'user_id', user_id,
//                               'user', u.user,
//                               'status', status,
//                               'student_id', student_id) AS responsible_students"))
//            'responsibleStudents' => User::with('role')
//                ->whereRelation('role', 'permission', '=', 'Responsible')->get()
//                ->map(fn($user) => $user->load($user->type)),
            'responsibleStudents' => User::with('role')
                ->whereHas('role', function ($query) use ($organizationId) {
                    $query->where('permission', '=', 'Responsible')
                        ->where('organization_id', $organizationId); // กรองด้วย organization_id ในตาราง roles
                })
                ->get()
                ->map(fn($user) => $user->load($user->type)),
            'projectAdvisors' => User::with('role')
                ->whereHas('role', function ($query) use ($organizationId) {
                    $query->where('permission', '=', 'ProjectAdvisor')
                        ->where('organization_id', $organizationId); // กรองด้วย organization_id ในตาราง roles
                })
                ->get()
                ->map(fn($user) => $user->load($user->type)),
//                ->whereRelation('advisor', 'faculty_id', '=', (new User())->getUser()[auth()->user()->type]['facultyId'])
//                ->where('type', 'advisor')->get()
//                ->map(fn($user) => $user->load($user->type))
        ]);
    }
}
