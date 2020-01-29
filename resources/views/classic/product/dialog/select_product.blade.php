@php $class = 'selectProductDialog' @endphp
<div id="selectProductDialog" class="dialog white" style="width:580px;">
    <div class="titlebar">Поиск товаров</div>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>

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
    <div class="modal-footer white">
        <button class="btn success" onclick="closeDialog(event)">Закрыть</button>
    </div>
</div>
