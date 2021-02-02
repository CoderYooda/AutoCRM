<?php

namespace App\Http\Requests\Providers\Feedback;

use Illuminate\Foundation\Http\FormRequest;

class FeedbackRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'text' => ['required', 'string', 'max:255']
        ];
    }
}
