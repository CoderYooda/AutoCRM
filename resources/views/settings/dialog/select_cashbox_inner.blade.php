
@if($cashboxes->count() > 0)
    @foreach($cashboxes as $cashbox)
        <div class="list-item " data-id="item-5">
            <span class="w-40 avatar circle blue-grey">
                {{--<i class="on b-white avatar-right"></i>--}}
                <span style="font-size: 25px;" class="fa fa-money"></span>
            </span>
            <div class="list-body b-r mw-280-e">

                <a onclick="openDialog('cashboxDialog', '&cashbox_id={{ $cashbox->id }}' )" class="item-title _500" >{{ $cashbox->name }}</a>
                <div class="item-except text-sm text-muted h-1x">
                    Посл. операция. TODO
                </div>
            </div>
            <div class="list-body">
                Текущий баланс:
                <div class="item-except text-sm text-muted h-1x">
                    {{ $cashbox->balance }}
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
{{--            <button onclick="partner.pick({{ $partner->id }}, '{{ $partner->outputName() }}', event)" class="btn btn-icon white float-right">--}}
{{--                <i class="fa fa-check"></i>--}}
{{--            </button>--}}
        </div>
    @endforeach
@elseif($request && $request['string'] != null)
    <div class="padding text-center">
        <div>
            Контрагентов по запросу "{{ $request['string'] }}" не найдено
        </div>
        <button onclick="openDialog('cashboxDialog')" class="btn m-3 btn-sm success mb-0">Новый кассовый аппарат</button>
    </div>
@else
    <div class="padding text-center">
        <div>
            Контрагентов нет
        </div>
        <button onclick="openDialog('cashboxDialog')" class="btn m-3 btn-sm success mb-0">Новый кассовый аппарат</button>
    </div>
@endif
