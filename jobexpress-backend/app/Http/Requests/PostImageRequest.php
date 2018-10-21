<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostImageRequest extends FormRequest
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
            'post_images.*' => 'mimes:jpg,jpeg,png,bmp|max:2048'
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
            'post_images.*.mimes'   =>  'Images with jpg, jpeg, png, bmp are allowed only.',
            'post_images.*.max'     =>  'Image size cannot exceed 2 MB.', 
        ];

        return $msg;
    }
}
