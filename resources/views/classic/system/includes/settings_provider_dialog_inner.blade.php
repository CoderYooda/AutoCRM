<form method="POST" action="{{ route('ServiceSave', ['service_id' => $service->id, 'company_id' => $company_id]) }}">

    <div class="modal-header">
        <h5 class="modal-title">{{ $service->name }}</h5>
    </div>

    <div class="modal-body p-15">
        <div class="form-group">
            <label>API-ключ</label>
            <input name="key" class="form-control" />
        </div>
    </div>

    <div class="modal-footer">
        <button class="button float-right" data-dismiss="modal">Активировать</button>
    </div>

</form>
