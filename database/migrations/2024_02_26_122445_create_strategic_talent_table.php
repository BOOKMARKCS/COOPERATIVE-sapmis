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
        Schema::create('strategic_talents', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('project_detail_id');
            $table->json('details');
            $table->timestamps();
            $table->foreign('project_detail_id')->on('project_details')->references('id')->onUpdate('cascade')->onDelete('cascade');;
        });
        DB::unprepared('
            CREATE TRIGGER set_strategic_talent_id BEFORE INSERT ON strategic_talents
            FOR EACH ROW
            BEGIN
                DECLARE next_id INT;
                SELECT COUNT(*) + 1 INTO next_id FROM strategic_talents;
                SET NEW.id = next_id;
            END
        ');
        DB::unprepared('
            ALTER TABLE project_details
            ADD CONSTRAINT project_details_project_details_id_fk
            FOREIGN KEY (strategic_talent_id) REFERENCES project_details (id)
            ON UPDATE cascade ON DELETE cascade;
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('strategic_talent');
        DB::unprepared('DROP TRIGGER IF EXISTS set_strategic_talents_id');
    }
};
