<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'cors',
    'namespace'  => 'API'
], function ($router) {
 	
 	Route::apiResources([
	    'services' => 'ServicesController',
	    'states'   => 'StatesController',
	    'cities'   => 'CitiesController',
	    'posts'    => 'PostsController'
	]);

	Route::post('testUpload', 'ServicesController@testUpload');

	Route::post('login', 'UsersController@login');
	Route::post('register', 'UsersController@register');

	Route::group(['middleware' => 'auth:api'], function(){
		Route::post('profile', 'API\UsersController@profile');
	});
});




