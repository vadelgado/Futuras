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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 100);
            $table->text('descripcion'); 
            $table->unsignedInteger('precio'); 
            $table->unsignedInteger('stock'); 
            $table->string('imagen', 255)->nullable();
            $table->string('categoria', 50); 
            $table->string('tipoEspecificaciones', 50); 
            $table->string('valorEspecificaciones', 255); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
