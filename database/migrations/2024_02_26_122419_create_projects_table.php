<?php

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
        Schema::create('projects', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('status');
            $table->string('user_id');
            $table->integer('academic_year');
            $table->timestamps();
            $table->foreign('academic_year')->on('academic_years')->references('year')->onUpdate('cascade')->onDelete('cascade');;
        });
        DB::unprepared('
            CREATE TRIGGER set_projects_id BEFORE INSERT ON projects
            FOR EACH ROW
            BEGIN
                DECLARE next_id INT;
                SELECT COUNT(*) + 1 INTO next_id FROM projects;
                SET NEW.id = next_id;
            END
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
        DB::unprepared('DROP TRIGGER IF EXISTS set_projects_id');
    }
};
