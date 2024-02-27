<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_participants', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignUlid('project_detail_id')->constrained('project_details')->onUpdate('cascade')->onDelete('cascade');
            $table->json('advisor');
            $table->json('student');
            $table->json('teacher');
            $table->json('other');
            $table->timestamps();
        });
        DB::unprepared('
            CREATE TRIGGER set_project_participants_id BEFORE INSERT ON project_participants
            FOR EACH ROW
            BEGIN
                DECLARE next_id INT;
                SELECT COUNT(*) + 1 INTO next_id FROM project_participants;
                SET NEW.id = next_id;
            END
        ');
        DB::unprepared('
            ALTER TABLE project_details
            ADD CONSTRAINT project_details_project_participants_id_fk
            FOREIGN KEY (project_participant_id) REFERENCES project_participants (id)
            ON UPDATE cascade ON DELETE cascade;
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_participants');
        DB::unprepared('DROP TRIGGER IF EXISTS set_project_participants_id');
    }
};
