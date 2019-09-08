
@if($partners->count() > 0)
    @foreach($partners as $partner)
        <div class="list-item " data-id="item-5">
            <span class="w-40 avatar circle blue-grey">
                {{--<i class="on b-white avatar-right"></i>--}}
                {{ $partner->firstLetterOfName() }}
            </span>
            <div class="list-body b-r mw-280-e">

                <a onclick="openDialog('partnerDialog', '&partner_id={{ $partner->id }}' )" class="item-title _500" >{{ $partner->outputName() }}</a>
                <div class="item-except text-sm text-muted h-1x">
                    {{ $partner->firstActivePhoneNumber() }}
                </div>
                <div class="item-tag tag hide">
                    Team
                </div>
            </div>
            <div class="list-body">
                Тип: {{ $partner->isflText() }}
                <div class="item-except text-sm text-muted h-1x">
                    Дисконт: в разработке
                </div>
            </div>
            @if($request['refer'] != null)
                <button onclick="try{window.{{$request['refer']}}.selectPartner({{ $partner->id }})}catch (e) {}" class="btn btn-icon white float-right">
                    <i class="fa fa-check"></i>
                </button>
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
        <button onclick="openDialog('addPartner')" class="btn m-3 btn-sm success mb-0">Новый контрагент</button>
    </div>
@else
    <div class="padding text-center">
        <div>
            Контрагентов нет
        </div>
        <button onclick="openDialog('addPartner')" class="btn m-3 btn-sm success mb-0">Новый контрагент</button>
    </div>
@endif
