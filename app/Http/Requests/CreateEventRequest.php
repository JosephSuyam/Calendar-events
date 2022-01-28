<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateEventRequest extends FormRequest
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
            'name' => 'required|max:100',
            'start_at' => 'required',
            'end_at' => 'required',
            // 'days' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required.',
            'start_at.required' => 'Please select start date of the event.',
            'end_at.required' => 'Please select end date of the event.',
            // 'days.required' => 'Please the days for the event.',
        ];
    }

    public function filters()
    {
        // return [
        //     'days' => 'cast:string',
        // ];
    }
}
