<?php

use App\Models\Budget;
use App\Models\CongruenceIdentity;
use App\Models\Kpi;
use App\Models\ProjectParticipant;
use App\Models\StrategicTalent;
use App\Models\TsuTalent;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_details', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('project_name');
            $table->string('activity_group_name');
            $table->string('tsu_talent_id');
            $table->string('strategic_talent_id');
            $table->foreignUlid('congruence_identity_id')->constrained('congruence_identities')->onUpdate('cascade')->onDelete('cascade');
            $table->string('background');
            $table->json('objectives');
            $table->json('activity_formats');
            $table->string('project_participant_id');
            $table->string('location');
            $table->dateTime('duration_start');
            $table->dateTime('duration_end');
            $table->json('operations');
            $table->foreignUlid('budget_id')->constrained('budgets')->onUpdate('cascade')->onDelete('cascade');
            $table->json('expected_results');
            $table->foreignUlid('kpi_id')->constrained('kpis')->onUpdate('cascade')->onDelete('cascade');
            $table->json('evaluate');
            $table->timestamps();
        });
        DB::unprepared('
            CREATE TRIGGER set_project_details_id BEFORE INSERT ON project_details
            FOR EACH ROW
            BEGIN
                DECLARE next_id INT;
                SELECT COUNT(*) + 1 INTO next_id FROM project_details;
                SET NEW.id = next_id;
            END
        ');
        DB::unprepared('
            ALTER TABLE budgets
            ADD CONSTRAINT budgets_project_details_id_fk
            FOREIGN KEY (project_detail_id) REFERENCES project_details (id)
            ON UPDATE cascade ON DELETE cascade
        ');
        DB::unprepared('
            ALTER TABLE congruence_identities
            ADD CONSTRAINT congruence_identities_project_details_id_fk
            FOREIGN KEY (project_detail_id) REFERENCES project_details (id)
            ON UPDATE cascade ON DELETE cascade;
        ');
        DB::unprepared('
            ALTER TABLE kpis
            ADD CONSTRAINT kpis_project_details_id_fk
            FOREIGN KEY (project_detail_id) REFERENCES project_details (id)
            ON UPDATE cascade ON DELETE cascade;
        ');
        DB::unprepared('
            ALTER TABLE project_advisors
            ADD CONSTRAINT project_advisors_project_details_id_fk
            FOREIGN KEY (project_detail_id) REFERENCES project_details (id)
            ON UPDATE cascade ON DELETE cascade;
        ');
        DB::unprepared('
            ALTER TABLE project_approvals
            ADD CONSTRAINT project_approvals_project_details_id_fk
            FOREIGN KEY (project_detail_id) REFERENCES project_details (id)
            ON UPDATE cascade ON DELETE cascade;
');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_details');
        DB::unprepared('DROP TRIGGER IF EXISTS set_project_details_id');
    }
};
