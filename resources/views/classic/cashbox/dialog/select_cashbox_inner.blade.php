<div class="box-body">
    @if($cashboxes->count() > 0)
        <ul class="nav select-list-modal">
            @foreach($cashboxes as $cashbox)
                <li id="cashbox_item_{{ $cashbox->id }}" @if($request['type'] != null)onclick="try{window.{{$request['refer']}}.select{{$request['type']}}Cashbox({{ $cashbox->id }})}catch (e) {}"@else onclick="try{window.{{$request['refer']}}.selectCashbox({{ $cashbox->id }})}catch (e) {}"@endif class="pointer d-flex " >
                    <div class="ring-ico">
                        <span class="first_letter"><img class="list-icon" src="icons/cashbox.svg" alt="Кассовый аппарат"></span>
                    </div>
                    <div class="list-title">
                        {{ $cashbox->name }}
                        <div class="secondary">Баланс: <span class="@if($cashbox->balance > 0) text-success @else text-danger @endif">{{ $cashbox->balance }}</span></div>
                    </div>
                    <div class="list-body">
                        <div class="date">Последняя операция</div>
                        <div class="secondary">{{ $cashbox->getLastOperation() }}</div>
                    </div>
                </li>
            @endforeach
        </ul>
    @elseif($request && $request['string'] != null)
        <div class="padding text-center">
            <div>
                Кассы по запросу "{{ $request['string'] }}" не найдено
            </div>
            <button onclick="openDialog('cashboxDialog')" class="button primary">Новый кассовый аппарат</button>
        </div>
    @else
        <div class="padding text-center">
            <div>
                Кассы не найдены
            </div>
            <button onclick="openDialog('cashboxDialog')" class="button primary">Новый кассовый аппарат</button>
        </div>
    @endif
</div>
