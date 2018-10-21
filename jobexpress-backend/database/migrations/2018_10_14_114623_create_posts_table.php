<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned();
            $table->integer('service_id')->unsigned();
            $table->integer('city_id')->unsigned();
            $table->string('slug', 255);
            $table->string('title', 255);
            $table->text('description');
            $table->datetime('start_date');
            $table->datetime('end_date');            
            $table->string('postcode', 10);
            $table->decimal('budget', 10, 2)->nullable();
            $table->smallInteger('is_active')
                  ->tinyInteger('is_active')
                  ->default(0);
            $table->timestamps();
        });

        Schema::table('posts', function(Blueprint $table) {
            $table->foreign('service_id')->references('id')->on('services');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('city_id')->references('id')->on('cities');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
