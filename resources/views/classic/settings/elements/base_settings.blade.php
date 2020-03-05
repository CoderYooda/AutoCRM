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
                <input name="{{ $setting->key }}" type="{{ $setting->type }}" class="form-control" value="{{ $setting->value }}" >
            </div>
        @endforeach
        <button type="submit" class="button m-t">Сохранить</button>
    </form>
</div>
