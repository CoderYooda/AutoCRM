<form method="POST" action="{{ route('ServiceSave', ['service_id' => $service->id]) }}">

    @csrf

    <input type="hidden" name="enabled" value="{{ $company->isServiceProviderActive($service->key) }}">

    <div class="modal-header" style="background-color: #1D87CF;">
        <h5 class="modal-title" style="color: white;">Проценка</h5>
        <button class="btn_close float-right" data-dismiss="modal">×</button>
    </div>

    <div class="modal-body p-15 d-flex">

        <div class="flex-2" style="margin-right: 50px; position:relative;">
            <div>
                <div><b>Подключение</b></div>
                <div class="pt-5" style="color: black">{!! $service->desc !!}</div>
            </div>

            <div style="position: absolute; bottom: 0;">
                <a href="{{ $service->url }}">{{ parse_url($service->url)['host'] }}</a>
            </div>
        </div>

        <div class="flex-1">
            <div class="box p-15" style="background: #F7F7F7; border-radius: 4px;">
                <div class="box text-center d-flex" style="height: 143px; background: #185C8B; border-radius: 4px; flex-direction: column;justify-content: center;">
                    <div>
                        <div class="service-modal-title">{{ $service->name }}</div>
                        <div id="url" class="service-modal-url">{{ parse_url($service->url)['host'] }}</div>
                    </div>
                </div>

                <div class="form-group pt-15 mb-3">
                    <label>Активировать API-ключ</label>
                </div>

                @foreach($service->fields as $field)

                    <div class="form-group">
                        @if($field->type == 'text')
                            <input class="form-control" name="fields[{{ $field->name }}]" onchange="settings.changeValue(this)" placeholder="{{ $field->placeholder }}" value="{{ $service->getServiceValueByField($field->id) }}">
                        @else
                            <select class="form-control" name="fields[{{ $field->name }}]">
                                @forelse($provider_service->getSelectFieldValues('sales_organization') as $text => $value)
                                    <option value="{{ $value }}" @if($service->getServiceValueByField($field->id) == $value) selected @endif>{{ $text }}</option>
                                @empty
                                    <option value="0">Не выбрано</option>
                                @endforelse
                            </select>
                        @endif
                    </div>

                @endforeach

                <div class="form-group text-center mb-0">
                    <button type="button" onclick="settings.toggleService(this, {{ $service->id }})" class="button preloader-block">{{ $company->isServiceProviderActive($service->key) ? 'Деактивировать' : 'Активировать' }}</button>
                </div>

            </div>
        </div>
    </div>

    <div class="modal-footer" style="height: 60px;">
        <button type="button" class="button float-left" data-dismiss="modal">Закрыть</button>
        <button type="button" onclick="settings.saveService(this)" class="button float-right preloader-block">Сохранить</button>
    </div>

</form>
