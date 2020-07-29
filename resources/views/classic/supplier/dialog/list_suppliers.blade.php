<div
    @if(isset($category) && $category->id != NULL)
        id="selectSupplierDialog{{$category->id}}"
        @else
        id="selectSupplierDialog"
    @endif
    class="dialog" style="width:480px;">
    <div class="titlebar">Выбор производителя</div>
    <button class="btn_close" onclick="window.selectSupplierDialog.finitaLaComedia()">×</button>


    <div class="modal-header">
        <form class="flex d-flex w-100">
            <input id="supplier_search" type="text"  name="supplier_search" class="form-control search mr-15" placeholder="Поиск производителя">
            <button onclick="selectSupplierDialog.openSupplierDialog()" class="button" type="button">Новый производитель</button>
        </form>
    </div>


    @if(isset($request['refer']))
        <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
    @endif
    <div class="box-body inscroll">
        <div id="search_supplier_results" class="" data-simplebar style="max-height: 400px">
            @include(get_template() . '.supplier.dialog.list_suppliers_inner')
        </div>
    </div>
    <div class="modal-footer white">
        <button class="button white" onclick="closeDialog(event)">Закрыть</button>
    </div>
</div>
