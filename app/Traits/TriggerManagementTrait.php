<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait TriggerManagementTrait
{
    public function createTrigger($tableName, $LPAD = 1): void
    {
        $triggerName = 'set_' . $tableName . '_id';
        DB::unprepared("
        CREATE TRIGGER $triggerName BEFORE INSERT ON $tableName
        FOR EACH ROW
        BEGIN
        IF NEW.id IS NULL OR NEW.id = '' THEN
            SET @max_id = (SELECT IFNULL(MAX(CAST(id AS UNSIGNED)), 0) + 1 FROM $tableName);
            SET NEW.id = LPAD(@max_id , $LPAD, '0');
            IF LENGTH(@max_id) < $LPAD THEN
                SET NEW.id = LPAD(@max_id , $LPAD, '0');
            ELSE
                SET NEW.id = LPAD(@max_id , LENGTH(@max_id ), '0');
            END IF;
            ELSE
                SET NEW.id = NEW.id;
            END IF;
        END;
    ");
    }


    public function dropTrigger($tableName): void
    {
        $triggerName = 'set_' . $tableName . '_id';
        DB::unprepared("DROP TRIGGER IF EXISTS $triggerName");
    }
}
