<div
    @if(isset($store) && $store->id != NULL)
        id="editStore{{$store->id}}"
    @else
        id="createStore"
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
        <div class="box mb-0">
            <div class="box-body">
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
            <button class="btn success" onclick="axform.send(this)">Сохранить</button>
        </div>
        <div class="system_message"></div>
    </form>
</div>
