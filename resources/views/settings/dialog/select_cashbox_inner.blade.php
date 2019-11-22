
@if($cashboxes->count() > 0)
    @foreach($cashboxes as $cashbox)
        <div class="list-item " data-id="item-5">
            <span>
                <img class="list-icon" src="icons/cashbox.svg" alt="Кассовый аппарат">
            </span>
            <div class="list-body b-r mw-280-e">
                <a onclick="openDialog('cashboxDialog', '&cashbox_id={{ $cashbox->id }}' )" class="item-title _500" >{{ $cashbox->name }}</a>
                <div class="item-except text-sm text-muted h-1x">
                    Баланс: <span class="@if($cashbox->balance > 0) text-success @else text-danger @endif">{{ $cashbox->balance }}</span>
                </div>
            </div>
            <div class="list-body">
                Последняя операция
                <div class="item-except text-sm text-muted h-1x">
                    {{ $cashbox->getLastOperation() }}
                </div>
            </div>
            @if($request['refer'] != null)
                @if($request['type'] != null)
                    <button onclick="try{window.{{$request['refer']}}.select{{$request['type']}}Cashbox({{ $cashbox->id }})}catch (e) {}" class="btn btn-icon white float-right">
                        <i class="fa fa-check"></i>
                    </button>
                @else
                    <button onclick="try{window.{{$request['refer']}}.selectCashbox({{ $cashbox->id }})}catch (e) {}" class="btn btn-icon white float-right">
                        <i class="fa fa-check"></i>
                    </button>
                @endif
            @else

            @endif
        </div>
    @endforeach
@elseif($request && $request['string'] != null)
    <div class="padding text-center">
        <div>
            Кассы по запросу "{{ $request['string'] }}" не найдено
        </div>
        <button onclick="openDialog('cashboxDialog')" class="btn m-3 btn-sm success mb-0">Новый кассовый аппарат</button>
    </div>
@else
    <div class="padding text-center">
        <div>
            Кассы не найдены
        </div>
        <button onclick="openDialog('cashboxDialog')" class="btn m-3 btn-sm success mb-0">Новый кассовый аппарат</button>
    </div>
@endif
