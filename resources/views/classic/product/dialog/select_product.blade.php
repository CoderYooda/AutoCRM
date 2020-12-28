@php $class = 'selectProductDialog' @endphp
<div id="selectProductDialog" class="dialog" style="width:850px;">
    <div class="titlebar">Поиск товаров</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
    <div class="modal-header">
        <form class="flex d-flex w-100">
            @if($request['refer'])
                <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
            @endif
            @if($request['store_id'])
                <input id="store_id" type="hidden" name="store_id" value="{{ $request['store_id'] }}">
            @endif
            @if($request['category_id'])
                <input id="category_id" type="hidden" name="category_id" value="{{ $request['category_id'] }}">
            @endif

            <input id="product_search" type="text" class="form-control search mr-15" placeholder="Поиск товара" required="">
            <button id="new_btn" onclick="openDialog('productDialog', '&category_select={{ $categories['parent']->id }}' )" class="button" type="button">Новый товар</button>
        </form>
    </div>
    <div id="product_list">
        <div id="search_product_results">
            @include(get_template() . '.product.dialog.select_product_inner')
        </div>
    </div>
    <div class="modal-footer">
        <button class="button white" onclick="closeDialog(event)">Закрыть</button>

        @if($request->refer == 'documentDialog')
            <button class="button primary pull-right" onclick="documentDialog.acceptProducts()">Печать</button>
        @endif

    </div>
    <div class="system_message"></div>
</div>
