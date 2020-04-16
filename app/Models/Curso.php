<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $table = "cursos";
    protected $fillable = [
        'nombre'
    ];
    public $timestamps = false;/*!< boolean  Desactivar campos por defecto create_at y updated_at*/
}
