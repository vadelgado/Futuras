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
        Schema::create('fotos_sedes', function (Blueprint $table) {
            $table->id();
            $table->string('largeUrl')->nullable(true);
            $table->integer('width');
            $table->integer('height');
            $table->foreignId('fk_sede_id')->constrained('sedes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fotos_sedes');
    }
};
