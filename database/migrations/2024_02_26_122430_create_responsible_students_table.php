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
        Schema::create('responsible_students', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('user_id');
            $table->string('phone_number');
            $table->boolean('status');
            $table->timestamps();
        });
        DB::unprepared('
            CREATE TRIGGER set_responsible_students_id BEFORE INSERT ON responsible_students
            FOR EACH ROW
            BEGIN
                DECLARE next_id INT;
                SELECT COUNT(*) + 1 INTO next_id FROM responsible_students;
                SET NEW.id = next_id;
            END
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('responsible_students');
        DB::unprepared('DROP TRIGGER IF EXISTS set_responsible_students_id');
    }
};
