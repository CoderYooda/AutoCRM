@php $class = 'selectProviderOrderDialog' @endphp
<div id="selectProviderOrderDialog" class="dialog white" style="width:1100px;">
    <div class="titlebar">Поиск заявки поставщику</div>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
    <div class="navbar white no-radius box-shadow pos-rlt">
        <form class="flex">
            @if($request['refer'])
            <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
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
                {{--<input id="providerorder_search" type="text" class="form-control form-control-sm search" placeholder="Поиск товара" required="">--}}
                <span class="input-group-append">
                    <button onclick="openDialog('providerorderDialog')" class="btn btn-default btn-sm no-shadow" type="button">Новая заявка</button>
                </span>
            </div>
        </form>
    </div>
    <div>

        <div id="search_providerorder_results" class="nlborder list-group box mb-0" >
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
            {{--<div class="row">--}}
                {{--<div class="col-6">1</div>--}}
                {{--<div class="col-6">2</div>--}}
            {{--</div>--}}
            @include('provider_orders.dialog.select_providerorder_inner')
        </div>
    </div>
    <div class="modal-footer white">
        <button class="btn success" onclick="{{ $class }}.addProductsToList()">Добавить</button>
        <button class="btn success" onclick="closeDialog(event)">Закрыть</button>
    </div>
</div>
