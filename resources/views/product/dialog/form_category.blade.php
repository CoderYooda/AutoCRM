<div
    @if(isset($parent))
        id="createCategory"
    @elseif(isset($category))
        id="editCategory"
    @endif

    class="dialog" style="width:380px;">
    @if(isset($category))
        <div class="titlebar">Редактируем "{{ $category->name }}"</div>
    @else
        <div class="titlebar">Новая категория</div>
    @endif

    <button class="btn_close" onclick="closeDialog(event)">x</button>
    <form action="{{ route('StoreCategory') }}" method="POST">
    <div class="box mb-0">
        <div class="box-body">
            @csrf
            <input class="category_select" type="hidden" name="category_id" value="@if(isset($parent)){{ $parent->id }}@elseif(isset($category)){{ $category->category_id }}@else 2 @endif">
            @if(isset($category))
                <input type="hidden" name="id" value="{{ $category->id }}">
            @endif
            <div class="form-group">
                <label for="category_id">В категории</label>
                <div class="input-group mb-3">
                    <select disabled name="category_id" class="category_select form-control input-c noarrow fake-disabled" readonly>
                        @if(isset($parent))
                            <option>{{ $parent->name }}</option>
                        @elseif(isset($category))
                            <option>{{ $category->parent()->first()->name }}</option>
                        @endif
                    </select>
                    <div class="input-group-append">
                        <button onclick="openDialog('selectCategory', 2)" class="btn white" type="button"><i class="fa fa-bars"></i></button>
                    </div>
                </div>
            </div>
            <div class="form-group mb-0">
                <label for="category_id">Наименование</label>
                <input type="text"
                @if(isset($category))
                    value="{{ $category->name }}"
                @endif
                       name="name" class="form-control" placeholder="Наименование (не более 255 символов)" autofocus>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn success" onclick="axform.send(this)">Создать</button>
    </div>
    </form>
</div>
