@php $class = 'selectProductDialog' @endphp
<div id="selectProductDialog" class="dialog white" style="width:580px;">
    <div class="titlebar">Поиск товаров</div>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
    <div class="navbar white no-radius box-shadow pos-rlt">
        <form class="flex">
            @if($request['refer'])
            <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
            @endif
            @if($request['store_id'])
            <input id="store_id" type="hidden" name="store_id" value="{{ $request['store_id'] }}">
            @endif
            <div class="input-group">
                {{--<span class="input-group-prepend">--}}
                    {{--<select id="product_search_store" name="store_id" class="store_select form-control form-control-sm input-c">--}}
                        {{--<option value="">Все товары</option>--}}
                        {{--@foreach($stores as $store)--}}
                            {{--<option value="{{ $store->id }}">{{ $store->name }}</option>--}}
                        {{--@endforeach--}}
                    {{--</select>--}}
                {{--</span>--}}
                <input id="product_search" type="text" class="form-control form-control-sm search" placeholder="Поиск товара" required="">
                <span class="input-group-append">
                    <button onclick="openDialog('productDialog')" class="btn btn-default btn-sm no-shadow" type="button">Новый товар</button>
                </span>
            </div>
        </form>
    </div>
    <div id="partner_list" class="mh50-dialog" data-simplebar style="max-height: 400px">
        <div id="search_product_results" class="nlborder list-group box mb-0" >
            {{--<table class="table table-hover mb-0">--}}
                {{--<thead>--}}
                {{--<tr>--}}
                    {{--<th style="width:50%;" class="text-left">Наименование</th>--}}
                    {{--<th style="width:30%;">Артикул</th>--}}
                    {{--<th style="width:20%;"></th>--}}
                {{--</tr>--}}
                {{--</thead>--}}
                {{--<tbody>--}}
                    {{----}}
                {{--</tbody>--}}
            {{--</table>--}}
            @include('product.dialog.select_product_inner')
        </div>
    </div>
    234
    <div class="modal-footer white">
        <button class="btn success" onclick="closeDialog(event)">Закрыть</button>
    </div>
</div>
