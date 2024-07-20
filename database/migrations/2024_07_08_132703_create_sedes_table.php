<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sedes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('imagen')->nullable();
            $table->string('direccion');
            $table->string('telefono');
            $table->string('telefonoDos')->nullable();
            $table->string('telefonoTres')->nullable();
            $table->string('email');
            $table->string('encargado');
            $table->text('coordenadas');
            $table->string('diasSemana');
            $table->string('horario');
            $table->enum('estado', ['activa', 'inactiva', 'mantenimiento'])->default('activa');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sedes');
    }
};
