<form method="POST" action="{{ route('ServiceSave', ['service_id' => $service->id]) }}">

    @csrf

    <input type="hidden" name="enabled" value="{{ $company->isServiceProviderActive($service->id) }}">
    <input type="hidden" name="company_id" value="{{ $company->id }}">

    <div class="modal-header">
        <h5 class="modal-title">{{ $service->name }}</h5>
    </div>

    <div class="modal-body p-15">
        <div class="form-group">
            <label>API-ключ</label>
            <input name="key" class="form-control" value="{{ $company->serviceproviders->find($service->id)->pivot->key ?? '' }}" />
        </div>
    </div>

    <div class="modal-footer" style="height: 60px;">
        <button type="button" onclick="settings.saveService(this)" class="button float-right">{{ $company->isServiceProviderActive($service->id) ? 'Деактивировать' : 'Активировать' }}</button>
    </div>

</form>
