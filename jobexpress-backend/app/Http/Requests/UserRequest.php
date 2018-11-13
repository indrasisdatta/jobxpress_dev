<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name'        => 'required', 
            'last_name'         => 'required', 
            'email'             => 'required|email|unique:users', 
            'password'          => 'required', 
            'confirm_password'  => 'required|same:password'
        ];
    }

    /**
     * Custom validation messages
     *
     * @return array
     */
    public function messages()
    {
        $msg =  [
            'first_name' =>  [
                'required'  => 'First name is required.'
            ],
            'last_name' =>  [
                'required'  => 'Last name is required.'
            ],
            'email' =>  [
                'required'  =>  'Email is required.',
                'email'     =>  'Invalid email.',
                'exists'    =>  'Email already exists.'
            ],
            'password' =>  [
                'required'  => 'Password is required.'
            ],
            'confirm_password' =>  [
                'required'  => 'Confirm password is required.',
                'same'      => 'Password and Confirm password fields must match.',
            ]
        ];

        return array_dot($msg);
    }
}
