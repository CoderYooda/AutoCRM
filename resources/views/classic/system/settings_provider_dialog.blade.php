<div id="settings_provider_dialog" class="modal black-overlay fade" data-backdrop="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Тринити</h5>
            </div>
            <div class="modal-body p-15">

                <form method="POST" action="{{ route('ServiceSave', ['service_id' => $service->id, 'company_id' => $company_id]) }}">

                    <div class="form-group">
                        <label>API-ключ</label>
                        <input name="key" type="text" class="form-control" />
                    </div>

                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="button float-right" data-dismiss="modal">Активировать</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
</div>
