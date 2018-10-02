<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
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
    public function register(Request $request) 
    { 
        $validator = Validator::make($request->all(), [ 
            'first_name'        => 'required', 
            'last_name'         => 'required', 
            'email'             => 'required|email', 
            'password'          => 'required', 
            'confirm_password'  => 'required|same:password', 
        ]);

        if ($validator->fails()) { 
            return response()->json(['status' => 0, 'error' => $validator->errors()]);            
        }
        
        $input              =   $request->all(); 
        $input['password']  =   bcrypt($input['password']); 

        unset($input['confirm_password']);

        // $this->pr($input); die;

        $user               =   User::create($input); 
        $data['token']      =   $user->createToken('MyApp')->accessToken; 
        $data['name']       =   $user->first_name . ' ' . $user->last_name;

        return response()->json(['status' => 1, 'data'=> $data], $this->successStatus); 
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