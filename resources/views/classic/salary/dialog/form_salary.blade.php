<div id="{{ $class }}" class="dialog" style="width:640px;">
    <div class="titlebar">Зарплатные настройки</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
    {{--action="{{ route('StorePartner') }}"--}}
    @php $schemas = \App\Http\Controllers\SalarySchemaController::getSchemas() @endphp
    <form id="act_form_partner"  method="POST">
        @csrf
        {{--<div class="modal-header tab-container">--}}
            {{--123--}}
        {{--</div>--}}
        <div class="modal-body p-15">
            @foreach($schemas as $schema)
                @include(get_template() . '.salary.schemas.schema')
            @endforeach
        </div>
        <div class="modal-footer">
            <button onclick="window.{{ $class }}.finitaLaComedia()" class="button white">Закрыть</button>
            {{--<button type="button" onclick="window.{{ $class }}.save(this)" class="button pull-right">Сохранить</button>--}}
        </div>
        <div class="system_message"></div>
    </form>
</div>
