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
        Schema::create('kpis', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('project_detail_id');
            $table->json('quantity');
            $table->json('quality');
            $table->timestamps();
        });
        DB::unprepared('
            CREATE TRIGGER set_kpis_id BEFORE INSERT ON kpis
            FOR EACH ROW
            BEGIN
                DECLARE next_id INT;
                SELECT COUNT(*) + 1 INTO next_id FROM kpis;
                SET NEW.id = next_id;
            END
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kpis');
        DB::unprepared('DROP TRIGGER IF EXISTS set_kpis_id');
    }
};
