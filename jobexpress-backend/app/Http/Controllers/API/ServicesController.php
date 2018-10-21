<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Service;
use App\Http\Resources\Service as ServiceResource;

class ServicesController extends Controller
{
    /**
     * Service listing
     *
     */
    public function index()
    {
    	$services = Service::all();
    	return ServiceResource::collection($services);
    }

    public function testUpload(Request $request)
    {
    	$req = $request->all();

    	echo '<pre>';
    	print_r($req);
    	exit;
    }

    public function create()
    {
        echo "Create!";
        exit;
    }

    public function update($id)
    {
        echo "update!";
        exit;
    }
}
