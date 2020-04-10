<div
    @if(isset($store) && $store->id != NULL)
        id="storeDialog{{$store->id}}"
        @php $class = 'storeDialog' . $store->id @endphp
    @else
        id="storeDialog"
        @php $class = 'storeDialog' @endphp
    @endif
    class="dialog" style="width:300px;">
    @if(isset($store) && $store->id != NULL)
        <div class="titlebar">Редактирование '{{ $store->name }}'</div>
    @else
        <div class="titlebar">Добавление склада</div>
    @endif

    <button class="btn_close" onclick="closeDialog(event)">×</button>
    <form action="{{ route('StoreStore') }}" method="POST">
        @csrf

        @if(isset($store) && $store->id != NULL)
            <input type="hidden" name="id" value="{{ $store->id }}">
        @endif

        <div class="modal-body">
            <div class="box-body pb-0 mb-15">
                @if(isset($store) && $store->id != NULL)
                    <input type="hidden" name="id" value="{{ $store->id }}">
                @endif
                <div class="no-gutters align-items-stretch">
                    <div class="form-group mb-0">
                        <label for="category_id">Название</label>
                        <input type="text"
                               @if(isset($store))
                               value="{{ $store->name }}"
                               @endif
                               name="name" class="form-control" placeholder="Наименование (не более 255 символов)" autofocus>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-footer">
            <button type="submit" onclick="window.{{ $class }}.finitaLaComedia()" class="button white">Закрыть</button>
            <button type="submit" onclick="window.{{ $class }}.save(this)" class="button pull-right">Сохранить</button>
        </div>
        <div class="system_message"></div>
    </form>
</div>
