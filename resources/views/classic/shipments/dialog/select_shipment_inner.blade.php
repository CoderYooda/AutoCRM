<div class="col-sm-12">
    @if($shipments->count() > 0)
        <div class="" data-simplebar style="max-height: 400px;">
            <div class="box-body">
                <ul class="nav select-list-modal mb-0">
                    @foreach($shipments as $shipment)
                        <li id="shipment_item_{{ $shipment->id }}"
                            onclick="try{window.{{$request['refer']}}.selectShipment({{ $shipment->id }}
                            @if(isset($request['target']) && $request['target'] != null),'{{$request['target']}}' @endif)}
                                catch (e) {}"
                            onmouseenter="setTimeout(function() {  window.{{ $class }}.shipmentDescription({{$shipment}})}, 800)"
                            class="pointer d-flex ">
                            <div class="list-title" style="max-width: unset;">
                                Продажа № {{ $shipment->id }}
                                <div class="secondary">Покупатель: {{ $shipment->partner->outputName() }}</div>
                            </div>
                            <div class="list-body">
                                <div class="date">Сумма: {{ $shipment->itogo }} р.</div>
                                <div class="secondary">Дата: {{ $shipment->created_at->format('d.m.Y') }}</div>
                            </div>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    @elseif($request && $request['string'] != null)
        <div class="padding text-center">
            <div>
                <div class="out_of_search"></div>
                <div class="mb-15">
                    Продаж по запросу <b>{{ $request['string'] }}</b> не найдено
                </div>
            </div>
            <button onclick="openDialog('shipmentDialog')" class="button success mb-15">Новая продажа</button>
        </div>
    @else
        <div class="padding text-center">
            <div>
                <div class="out_of_search"></div>
                <div class="mb-15">
                    Продаж нет
                </div>
            </div>
            <button onclick="openDialog('shipmentDialog')" class="button success mb-15">Новая продажа</button>
        </div>
    @endif
</div>


