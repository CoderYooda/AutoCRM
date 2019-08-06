<div id="createProductCategory" class="dialog" style="width:480px; height:240px;">
    <div class="titlebar">Новая категория</div>
    <button onclick="closeDialog(event)">x</button>
    <form action="{{ route('StoreCategory') }}" method="POST">
        <div class="row no-gutters align-items-stretch">
            <div class="col-md-12 light lt">
                <div class="form-group">
                    <label>Кат</label>
                    <input type="text" name="category_id" class="form-control" placeholder="Кат">
                </div>
                <div class="form-group">
                    <label>Наименование</label>
                    <input type="text" name="name" class="form-control" placeholder="Наименование (не более 255 символов)">
                </div>
            </div>
            <div class="col-md-12 p-3">
                <button type="submit" onclick="axform.send(this)" class="btn success pull-right">Сохранить</button>
            </div>
        </div>
    </form>
</div>