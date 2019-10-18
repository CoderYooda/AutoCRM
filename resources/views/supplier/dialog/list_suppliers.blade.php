<div id="selectSupplier" class="dialog" style="width:480px;">
    <div class="titlebar">Выбор производителя</div>
    <button class="btn_close" onclick="closeDialog(event)">×</button>
    <div id="supplier_list" class="mh50-dialog white">
        @include('supplier.dialog.list_suppliers_inner')
    </div>
</div>
