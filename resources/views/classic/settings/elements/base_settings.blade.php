@php $class='settings'; @endphp
<div id="baseSettings" class="m-15 box">
    <form action="{{ route('BaseSettingsStore') }}" method="POST" role="form" class="SettingsStoredListner m-14">
        <h2 class="mt-0 style_header">Основные настройки</h2>
        @csrf
        <input name="id" type="hidden" value="{{ $company->id ?? '' }}" />
        @foreach($settings as $setting)

            <div class="form-group w-350 mt-5">
                <label>{{ $setting->name }}</label>
                @if($setting->type == 'select')
                    <select custom_select class="form-control input-c" name="{{ $setting->key }}" id="{{ $setting->key }}">
                        @if($setting->model == 'Role')
                            @foreach($roles as $role)
                                <option value="{{ $role->id }}" @if($setting->value == $role->id) selected @endif>{{ $role->name }}</option>
                            @endforeach
                        @elseif($setting->model == 'PriceSource')
                            @foreach(['purchase' => 'Закупочная цена', 'lifo' => 'По последнему поступлению'] as $key => $value)
                                <option value="{{ $key }}" @if($setting->value == $key) selected @endif>{{ $value }}</option>
                            @endforeach
                        @elseif($setting->model == 'RRC')
                            @foreach(['fifo', 'lifo'] as $type)
                                <option value="{{ $type }}" @if($type == $setting->value) selected @endif>{{ strtoupper($type) }}</option>
                            @endforeach
                        @elseif($setting->model == 'ShopEnabled')
                            @foreach(['Деактивирован', 'Активирован'] as $type)
                                <option value="{{ $loop->index }}" @if($loop->index == $setting->value) selected @endif>{{ strtoupper($type) }}</option>
                            @endforeach
                        @elseif($setting->model == 'DefaultMarkup')
                            @foreach($prices as $price)
                                <option value="{{ $price->id }}" @if($price->id == $setting->value) selected @endif>{{ strtoupper($price->name) }}</option>
                            @endforeach
                        @endif
                    </select>
                @else
                    <input name="{{ $setting->key }}" type="{{ $setting->type }}" class="form-control" value="{{ $setting->value }}" >
                @endif
            </div>
        @endforeach
        @can('Редактировать настройки')
            <button type="button" onclick="{{ $class }}.saveBaseSettingsForm(this, event)" class="button primary m-t">Сохранить</button>
        @endcan
    </form>
</div>
