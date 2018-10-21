<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
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
            'title'         =>  'required|unique:posts|max:30',
            'description'   =>  'required|max:30',
            // 'user_id'       =>  'required|exists:users,id',
            'service_id'    =>  'required|exists:services,id',
            'city_id'       =>  'required|exists:cities,id',
            'start_date'    =>  'required|date|after:today',
            'end_date'      =>  'required|date|after:start_date',
            'postcode'      =>  'required|digits_between:6,6',
            'budget'        =>  'required|between:0,999999999.99',
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
            'user_id' =>  [
                'required'  => 'User id is required.',
                'exists'    => 'Invalid user.'
            ],
            'service_id' =>  [
                'required'  => 'Service is required.',
                'exists'    => 'Invalid service.'
            ],
            'city_id' =>  [
                'required'  => 'City is required.',
                'exists'    => 'Invalid city.'
            ],
            'title' =>  [
                'required'  => 'Title is required.',
                'unique'    => 'Title already exists.',
                'max'       =>  'Title cannot be greater than 30 characters.',
            ],
            'description' =>  [
                'required'  => 'Description is required.',
                'max'       => 'Description cannot be more than 300 characters.'
            ],
            'start_date' =>  [
                'required'  =>  'Start date is required.',
                'date'      =>  'Start date format is incorrect.',
                'after'     =>  'Start date should be greater than today.'    
            ],
            'end_date' =>  [
                'required'  =>  'End date is required.',
                'date'      =>  'End date format is incorrect.',
                'after'     =>  'End date should be greater than start date.'    
            ],
            'postcode' =>  [
                'required'          =>  'Postcode required.',
                'digits_between'    =>  'Postcode should be a 6 digit number.'   
            ],
            'budget' =>  [
                'required'  =>  'Budget required.',
                'between'   =>  'Invalid budget amount.'  
            ]
        ];

        return array_dot($msg);
    }
}
