<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Service;
use App\Http\Resources\Service as ServiceResource;

class ServicesController extends Controller
{
    public function getServices()
    {
    	$services = Service::all();
    	return ServiceResource::collection($services);
    }
}
