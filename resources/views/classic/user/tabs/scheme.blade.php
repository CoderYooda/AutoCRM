@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.user.index')

@section('tab')
    {{--@php $user = \App\Http\Controllers\UserController::getUser($request) @endphp--}}
    {{--@php $schemas = \App\Http\Controllers\SalarySchemaController::getSchemas() @endphp--}}
    {{--{{ $user->salarySchemas()->get() }}--}}
{{--<div class="row">--}}
    {{--<div class="col-sm-6">--}}
        {{--<form action="{{ route('SyncSalarySchemaToUser') }}" method="POST">--}}
            {{--<input type="hidden" name="partner_id" value="{{ $user->id }}">--}}
            {{--<p>Начисления</p>--}}
            {{--<ul class="list-group box can_action" style="min-height: 60px;" id="shema_stored">--}}

            {{--</ul>--}}
            {{--<button type="submit"  onclick="window.user.save(this)" class="btn btn-fw white">Сохранить</button>--}}
        {{--</form>--}}
    {{--</div>--}}
    {{--<div class="col-sm-6">--}}
        {{--<p>Зарплатные преднастройки</p>--}}
        {{--<ul class="list-group box" id="available_list">--}}
            {{--@foreach($schemas as $schema)--}}

                {{--@include('salaryshema/' . $schema->template)--}}

            {{--@endforeach--}}
        {{--</ul>--}}
    {{--</div>--}}
{{--</div>--}}
    В разработке
@endsection
