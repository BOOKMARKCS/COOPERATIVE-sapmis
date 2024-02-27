<?php

use App\Models\ProjectDetail;
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
        Schema::create('congruence_identities', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('project_detail_id');
            $table->json('groups');
            $table->json('details');
            $table->timestamps();
        });
        DB::unprepared('
            CREATE TRIGGER set_congruence_identities_id BEFORE INSERT ON congruence_identities
            FOR EACH ROW
            BEGIN
                DECLARE next_id INT;
                SELECT COUNT(*) + 1 INTO next_id FROM congruence_identities;
                SET NEW.id = next_id;
            END
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('congruence_identities');
        DB::unprepared('DROP TRIGGER IF EXISTS set_congruence_identities_id');
    }
};
