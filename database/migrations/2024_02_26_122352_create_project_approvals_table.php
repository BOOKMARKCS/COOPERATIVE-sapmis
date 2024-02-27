<?php

use App\Models\ProjectDetail;
use App\Models\User;
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
        Schema::create('project_approvals', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('project_detail_id');
            $table->string('user_id');
            $table->string('comment');
            $table->boolean('status');
            $table->timestamps();
        });
        DB::unprepared('
            CREATE TRIGGER set_project_approvals_id BEFORE INSERT ON project_approvals
            FOR EACH ROW
            BEGIN
                DECLARE next_id INT;
                SELECT COUNT(*) + 1 INTO next_id FROM project_approvals;
                SET NEW.id = next_id;
            END
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_approvals');
        DB::unprepared('DROP TRIGGER IF EXISTS set_project_approvals_id');
    }
};
