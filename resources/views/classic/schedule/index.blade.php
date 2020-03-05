@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') . '.layouts.XHR' : 'classic.layouts.main')

@section('title', $page ?? 'Планировщик')

@section('content')
    <div id="schedule_index_page" class="w-100 box m-15">
        <div class="m-15">
            {{--<h2 class="mt-0 mb-0 style_header">Расписание сотрудников</h2>--}}

            <div class="form-group">
                <label>Дата рождения</label>
                <input type="text" name="birthday"
                       @if(isset($partner)) value="{{ $partner->birthday }}" @endif
                       class="form-control date_picker entrance" placeholder="Выберите дату" @if(isset($partner) && !$partner['isfl']) disabled @endif>
            </div>

            <div id="dates">
            </div>
        </div>
    </div>
@endsection

