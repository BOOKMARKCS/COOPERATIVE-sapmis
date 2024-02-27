<?php

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
        Schema::create('users', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->string('email');
            $table->string('password');
            $table->string('phone_number');
            $table->string('signature')->nullable();
            $table->foreignUlid('organization_id')->constrained('organizations')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignUlid('position_id')->constrained('positions')->onUpdate('cascade')->onDelete('cascade');;
            $table->integer('academic_year');
            $table->string('profile')->default('anonymous.jpg');
            $table->timestamps();
            $table->unique(['email', 'academic_year']);
            $table->foreign('academic_year')->on('academic_years')->references('year')->onUpdate('cascade')->onDelete('cascade');;
        });
        DB::unprepared('
            CREATE TRIGGER set_users_id BEFORE INSERT ON users
            FOR EACH ROW
            BEGIN
                DECLARE next_id INT;
                SELECT COUNT(*) + 1 INTO next_id FROM users;
                SET NEW.id = next_id;
            END
        ');
        DB::unprepared('
            ALTER TABLE project_advisors
            ADD CONSTRAINT project_advisors_users_id_fk
            FOREIGN KEY (user_id) REFERENCES users (id)
            ON UPDATE cascade ON DELETE cascade;
        ');
        DB::unprepared('
            ALTER TABLE project_approvals
            ADD CONSTRAINT project_approvals_users_id_fk
            FOREIGN KEY (user_id) REFERENCES users (id)
            ON UPDATE cascade ON DELETE cascade;
        ');
        DB::unprepared('
            ALTER TABLE projects
            ADD CONSTRAINT projects_users_id_fk
            FOREIGN KEY (user_id) REFERENCES users (id)
            ON UPDATE cascade ON DELETE cascade;
        ');
        DB::unprepared('
            ALTER TABLE responsible_students
            ADD CONSTRAINT responsible_students_users_id_fk
            FOREIGN KEY (user_id) REFERENCES users (id)
            ON UPDATE cascade ON DELETE cascade;
        ');
        DB::unprepared('
            ALTER TABLE student_clubs
            ADD CONSTRAINT student_clubs_users_id_fk
            FOREIGN KEY (user_id) REFERENCES users (id)
            ON UPDATE cascade ON DELETE cascade;
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        DB::unprepared('DROP TRIGGER IF EXISTS set_users_id');
    }
};
