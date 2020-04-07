@php $class='settings'; @endphp
<div id="baseSettings" class="m-15 box">
    <form onsubmit="window.{{ $class }}.saveBaseSettingsForm(this, event)" action="{{ route('BaseSettingsStore') }}" method="POST" role="form" class="SettingsStoredListner m-14">
        <h2 class="mt-0 style_header">Основные настройки</h2>
        @csrf
        <input name="id" type="hidden" @if(isset($company))value="{{ $company->id }}" @else value="" @endif>
        <div class="form-group w-350">
            <label>Название компании</label>
            <input name="company_name" type="text" class="form-control" @if(isset($company))value="{{ $company->name }}" @else value="" @endif>
        </div>
        @foreach($settings as $setting)
            <div class="form-group w-350">
                <label>{{ $setting->name }}</label>
                @if($setting->type == 'select')
                    <select class="form-control input-c" name="{{ $setting->key }}" id="{{ $setting->key }}">
                        @if($setting->model == 'Role')
                            @foreach($roles as $role)
                                <option value="{{ $role->id }}" @if($setting->value == $role->id) selected @endif>{{ $role->name }}</option>
                            @endforeach
                        @endif
                    </select>
                @else
                    <input name="{{ $setting->key }}" type="{{ $setting->type }}" class="form-control" value="{{ $setting->value }}" >
                @endif
            </div>
        @endforeach
        @can('Редактировать настройки')
            <button type="submit" class="button m-t">Сохранить</button>
        @endcan
    </form>
</div>
