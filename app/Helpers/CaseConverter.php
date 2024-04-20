<?php

namespace App\Helpers;


class CaseConverter
{
    public static function convertToSnakeCase($properties)
    {
        return collect($properties)->mapWithKeys(fn($value, $key) => [strtolower(preg_replace('/([a-z])([A-Z])/', '$1_$2', $key)) => is_array($value) ? self::convertToSnakeCase($value) : $value])->all();
    }



    public static function convertToCamelCase($properties)
    {
        return collect($properties)->map(function ($value, $key) {
            if (is_numeric($key))  $key = rtrim($key, '0123456789');
            return is_array($value) ? self::convertToCamelCase($value) : (is_object($value) ? self::convertToCamelCase($value) : $value);
        })->mapWithKeys(fn($value, $key) => [lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $key)))) => $value])->all();
    }


}
