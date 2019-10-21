<div
    @if(isset($supplier) && $supplier->id != NULL)
        id="supplierDialog{{$supplier->id}}"
    @php $class = 'supplierDialog' . $supplier->id @endphp
    @else
        id="supplierDialog"
    @php $class = 'supplierDialog' @endphp
    @endif

    class="dialog" style="width:380px;">
    @if(isset($supplier))
        <div class="titlebar">Редактирование "{{ $supplier->name }}"</div>
    @else
        <div class="titlebar">Новый производитель</div>
    @endif

    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
    <form action="{{ route('StoreSupplier') }}" method="post">
        <div class="box mb-0">
            <div class="box-body">
                @csrf
                @if(isset($supplier))
                    <input type="hidden" name="id" value="{{ $supplier->id }}">
                @endif

                <div class="form-group mb-0">
                    <label for="category_id">Наименование</label>
                    <input type="text"
                    @if(isset($supplier))
                        value="{{ $supplier->name }}"
                    @endif
                           name="name" class="form-control" placeholder="Наименование (не более 255 символов)" autofocus>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn success" onclick="{{$class}}.save(this)">Сохранить</button>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
