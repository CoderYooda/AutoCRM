<div id="selectSupplier" class="dialog" style="width:480px;">
    <div class="titlebar">Выбор производителя</div>
    <button class="btn_close" onclick="closeDialog(event)">×</button>
    <div id="category_list" class="mh50-dialog">
        @include('supplier.dialog.list_suppliers_inner')
    </div>
</div>
