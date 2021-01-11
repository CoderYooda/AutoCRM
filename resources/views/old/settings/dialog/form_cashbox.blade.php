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

    <button class="btn_close" onclick="closeDialog(event)">×</button>
    <form action="{{ route('StoreCashbox') }}" method="POST">
        @csrf
        <div class="box mb-0">
            <div class="box-body">
                @if(isset($cashbox) && $cashbox->id != NULL)
                    <input type="hidden" name="id" value="{{ $cashbox->id }}">
                @endif
                <div class="no-gutters align-items-stretch">
                    <div class="form-group mb-0">
                        <label for="category_id">Название</label>
                        <input type="text"
                               @if(isset($cashbox))
                               value="{{ $cashbox->name }}"
                               @endif
                               name="name" class="form-control" placeholder="Наименование (не более 255 символов)" autofocus>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn success" onclick="window.{{ $class }}.save(this)">Сохранить</button>
        </div>
        <div class="system_message"></div>
    </form>
</div>
