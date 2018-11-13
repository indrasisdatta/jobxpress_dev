<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Requests\UserRequest;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class UsersController extends Controller 
{
    
    public $successStatus = 200;

    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login()
    { 
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) { 
            $user = Auth::user(); 
            $data['token'] =  $user->createToken('MyApp')->accessToken; 
            return response()->json(['status' => 1, 'data' => $data], $this->successStatus); 
        } else { 
            return response()->json(['status' => 0, 'error' => 'Invalid email or password']); 
        } 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function register(UserRequest $request) 
    { 
        $input              =   $request->validated();
        $input['password']  =   bcrypt($input['password']); 
        $input['status']    =   0; 

        unset($input['confirm_password']);

        $user               =   User::create($input); 

        // Write code to send activation email here

        $data['token']      =   $user->createToken('MyApp')->accessToken; 
        $data['name']       =   $user->first_name . ' ' . $user->last_name;

        return response()->json(['status' => 1, 'data'=> $data], $this->successStatus); 
    }

    public function checkEmail($request)
    {
        $email  =   $request->email;

        $existing_email     =   User::where('email', $email)->count();

        echo $existing_email; die;
    }

    /** 
     * Profile details api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function profile() 
    { 
        $user = Auth::user(); 
        return response()->json(['status' => 1, 'data' => $user], $this->successStatus); 
    } 
}