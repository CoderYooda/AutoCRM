<form method="POST" action="{{ route('ServiceSave', ['service_id' => $service->id]) }}">

    @csrf

    <input type="hidden" name="enabled" value="{{ $company->isServiceProviderActive($service->key) }}">

    <div class="modal-header" style="background-color: #1D87CF;">
        <h5 class="modal-title" style="color: white;">Проценка</h5>
        <button class="btn_close float-right" onclick="window.partnerDialog.finitaLaComedia()">×</button>
    </div>

    <div class="modal-body p-15 d-flex">

        <div class="flex-2" style="margin-right: 50px; position:relative;">
            <div>
                <div><b>Подключение</b></div>
                <div class="pt-5" style="color: black">Необходимо пройти регистрацию у поставщика и получить от него API-ключ для доступа в систему. Полученный ключ ввести в поле соответствующего поставщика в системе #BBcrm</div>
            </div>

            <div class="mt-15">
                <div><b>Как работает система</b></div>
                <div class="pt-5" style="color: black">При входе в систему … вы можете смотреть актуальные цены на автозапчасти, количество на складе поставщика и сроки поставки при заказе товара.</div>
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

                    <div class="form-group" name="fields">
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
                    <button type="button" onclick="settings.saveService(this)" class="button">{{ $company->isServiceProviderActive($service->key) ? 'Деактивировать' : 'Активировать' }}</button>
                </div>

            </div>
        </div>

{{--        <div class="form-group">--}}
{{--            <label>API-ключ</label>--}}
{{--            <input name="key" class="form-control" value="{{ $company->serviceproviders->find($service->id)->pivot->key ?? '' }}" />--}}
{{--        </div>--}}
    </div>

    <div class="modal-footer" style="height: 60px;">
        <button type="button" class="button float-left">Закрыть</button>
        <button type="button" class="button float-right">Сохранить</button>
    </div>

</form>
