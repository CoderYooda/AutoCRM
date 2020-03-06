@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') . '.layouts.XHR' : 'classic.layouts.main')

@section('title', $page ?? 'Планировщик')

@section('content')
    <div id="schedule_index_page" class="w-100 box m-15 p-15">

        {{--<h2 class="mt-0 mb-0 style_header">Расписание сотрудников</h2>--}}
        <div class="d-flex">
            <div class="form-group w-128 mr-15">
                <label>Дата начала</label>
                <input type="text" name="date_start" class="form-control date_picker_start" placeholder="Выберите дату">
            </div>
            <div class="form-group w-128 mr-15">
                <label>Дата окончания</label>
                <input type="text" name="date_end" class="form-control date_picker_end" placeholder="Выберите дату">
            </div>
            <div class="form-group w-128 mr-15">
                <button class="button primary mt-30">Показать</button>
            </div>
            <div class="form-group mr-15">
                <label>Режим</label>
                <div class="btn-group">
                    <button type="button" class="button primary d-block-f-left brr-0 br-trans">Изменить день</button>
                    <button type="button" class="button primary brl-0">Установить по шаблону</button>
                </div>
            </div>
            <div class="form-group w-128 mr-15">
                <label>Шаблон</label>
                <div onclick="openDialog('scheduletemplateDialog')" class="pointer h-32-text">Шаблон</div>
            </div>
        </div>
        <div style="height: calc(100vh - 192px);">
            <div id="dates"></div>
        </div>


    </div>
@endsection

