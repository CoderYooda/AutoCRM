<div id="createProductCategory" class="dialog" style="width:480px;">
    <div class="titlebar">Новая категория</div>
    <button class="btn_close" onclick="closeDialog(event)">x</button>
    <form action="{{ route('StoreCategory') }}" method="POST">
    <div class="box mb-0">
        <div class="box-body">
            @csrf
            <div class="form-group">
                <label for="category_id">В категории</label>
                <div class="input-group mb-3">
                    <select name="category_id" class="category_select form-control input-c noarrow fake-disabled" readonly>
                        <option value="{{ $category->id }}">{{ $category->name }}</option>
                    </select>
                    <div class="input-group-append">
                        <button onclick="openDialog('selectCategory', 2)" class="btn white" type="button"><i class="fa fa-bars"></i></button>
                    </div>
                </div>
            </div>
            <div class="form-group mb-0">
                <label for="category_id">Наименование</label>
                <input type="text" name="name" class="form-control" placeholder="Наименование (не более 255 символов)" autofocus>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn success" onclick="axform.send(this)">Создать</button>
    </div>
    </form>
</div>