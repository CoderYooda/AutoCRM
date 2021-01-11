<div
    @if(isset($cashbox) && $cashbox->id != NULL)
        @php $class = 'cashboxDialog' . $cashbox->id @endphp
        id="cashboxDialog{{$cashbox->id}}"
    @else
        @php $class = 'cashboxDialog' @endphp
        id="cashboxDialog"
    @endif
    class="dialog" style="width:300px;">
    @if(isset($cashbox) && $cashbox->id != NULL)
        <div class="titlebar">Редактирование '{{ $cashbox->name }}'</div>
    @else
        <div class="titlebar">Добавление кассового аппарата</div>
    @endif
        <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
    <form action="{{ route('StoreCashbox') }}" method="POST">
        @csrf
        <div class="box-body pb-0 mb-15">
            @if(isset($cashbox) && $cashbox->id != NULL)
                <input type="hidden" name="id" value="{{ $cashbox->id }}">
            @endif
            <div class="no-gutters align-items-stretch">
                <div class="form-group mb-0">
                    <label for="category_id">Название</label>
                    <input id="cashbox_dialog_focused" type="text"
                           @if(isset($cashbox))
                           value="{{ $cashbox->name }}"
                           @endif
                           name="name" class="form-control" placeholder="Наименование (не более 255 символов)" autofocus>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button onclick="window.{{ $class }}.finitaLaComedia()" class="button white">Закрыть</button>
            <button class="button pull-right" onclick="window.{{ $class }}.save(this)">Сохранить</button>
        </div>
        <div class="system_message"></div>
    </form>
</div>
