@php $class='settings'; @endphp
<div class="col p-0">
    <form onsubmit="window.{{ $class }}.saveBaseSettingsForm(this, event)" action="{{ route('BaseSettingsStore') }}" method="POST" role="form" class="SettingsStoredListner p-4 col-md-6">
        @csrf
        <input name="id" type="hidden" @if(isset($company))value="{{ $company->id }}" @else value="" @endif>
        <div class="form-group">
            <label>Название компании</label>
            <input name="company_name" type="text" class="form-control" @if(isset($company))value="{{ $company->name }}" @else value="" @endif>
        </div>
        @foreach($settings as $setting)
            <div class="form-group">
                <label>{{ $setting->name }}</label>
                <input name="{{ $setting->key }}" type="{{ $setting->type }}" class="form-control" value="{{ $setting->value }}" >
            </div>
        @endforeach
        <button type="submit" class="btn success m-t">Сохранить</button>
    </form>
</div>
