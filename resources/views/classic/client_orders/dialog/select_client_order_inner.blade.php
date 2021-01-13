<div class="col-sm-12">
    @if($clientOrders->count())
        <div class="" data-simplebar style="max-height: 400px;">
            <div class="box-body">
                <ul class="nav select-list-modal mb-0">
                    @foreach($clientOrders as $clientOrder)
                        <li id="client_order_item_{{ $clientOrder->id }}" onclick="try{window.{{$request['refer']}}.selectClientOrder({{ $clientOrder->id }}@if(isset($request['target']) && $request['target'] != null), '{{$request['target']}}' @endif)}catch (e) {}" class="pointer d-flex " >
                            <div class="list-title" style="max-width: unset;">
                                Заказ клиента № {{ $clientOrder->id }}
                                <div class="secondary">Покупатель: {{ $clientOrder->partner->outputName() }}</div>
                            </div>
                            <div class="list-body">
                                <div class="date">Сумма: {{ $clientOrder->itogo }} р.</div>
                                <div class="secondary">Дата: {{ $clientOrder->created_at->format('d.m.Y') }}</div>
                            </div>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>

        <div class="mt-5 mb-5">
            {{ $clientOrders->links('vendor.pagination.client_orders.index') }}
        </div>

    @elseif($request && $request['string'] != null)
        <div class="padding text-center">
            <div>
                <div class="out_of_search"></div>
                <div class="mb-15">
                    Заказов клиентов по запросу <b>{{ $request['string'] }}</b> не найдено
                </div>
            </div>
            <button onclick="openDialog('clientorderDialog')" class="button success mb-15">Новый заказ клиента</button>
        </div>
    @else
        <div class="padding text-center">
            <div>
                <div class="out_of_search"></div>
                <div class="mb-15">
                    Заказов клиентов нет
                </div>
            </div>
            <button onclick="openDialog('clientorderDialog')" class="button success mb-15">Новый заказ клиента</button>
        </div>
    @endif
</div>


