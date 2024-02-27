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
        Schema::create('student_clubs', function (Blueprint $table) {
            $table->string('id');
            $table->string('user_id');
            $table->string('name');
            $table->foreignUlid('faculty_id')->constrained('faculties')->onUpdate('cascade')->onDelete('cascade');;
            $table->timestamps();
        });
        DB::unprepared('
            CREATE TRIGGER set_student_clubs_id BEFORE INSERT ON student_clubs
            FOR EACH ROW
            BEGIN
                DECLARE next_id INT;
                SELECT COUNT(*) + 1 INTO next_id FROM student_clubs;
                SET NEW.id = next_id;
            END
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_clubs');
        DB::unprepared('DROP TRIGGER IF EXISTS set_student_clubs_id');
    }
};
