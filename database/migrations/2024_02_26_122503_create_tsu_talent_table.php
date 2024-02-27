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
        Schema::create('tsu_talents', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignUlid('project_detail_id')->constrained('project_details')->onUpdate('cascade')->onDelete('cascade');;
            $table->json('groups');
            $table->json('details');
            $table->timestamps();
        });
        DB::unprepared('
            CREATE TRIGGER set_tsu_talents_id BEFORE INSERT ON tsu_talents
            FOR EACH ROW
            BEGIN
                DECLARE next_id INT;
                SELECT COUNT(*) + 1 INTO next_id FROM tsu_talents;
                SET NEW.id = next_id;
            END
        ');
        DB::unprepared('
            ALTER TABLE project_details
            ADD CONSTRAINT project_details_tsu_talents_id_fk
            FOREIGN KEY (tsu_talent_id) REFERENCES tsu_talents (id)
            ON UPDATE cascade ON DELETE cascade;
');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tsu_talent');
        DB::unprepared('DROP TRIGGER IF EXISTS set_tsu_talents_id');
    }
};
