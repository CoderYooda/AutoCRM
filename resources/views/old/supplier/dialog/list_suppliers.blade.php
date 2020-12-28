<div
    @if(isset($category) && $category->id != NULL)
        id="selectSupplierDialog{{$category->id}}"
        @else
        id="selectSupplierDialog"
    @endif
    class="dialog" style="width:480px;">
    <div class="titlebar">Выбор производителя</div>
    <button class="btn_close" onclick="window.selectSupplierDialog.finitaLaComedia()">×</button>
    <div class="modal-header dark">
        <div class="input-group mb-1 mt-1">
            <input id="supplier_search" type="text"  name="supplier_search" class="form-control" placeholder="Поиск производителя">
            <div class="input-group-append">
                <button onclick="selectSupplierDialog.openSupplierDialog()" class="btn white" type="button">Новый производитель</button>
            </div>
        </div>
    </div>
    @if(isset($request['refer']))
        <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
    @endif
    <div id="search_supplier_results" class="mh50-dialog white" data-simplebar style="max-height: 400px">
        @include(env('DEFAULT_THEME', 'classic') . '.supplier.dialog.list_suppliers_inner')
    </div>
</div>
