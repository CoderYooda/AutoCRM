
@if($partners->count() > 0)
    @foreach($partners as $partner)
        <div class="list-item " data-id="item-5">
            <span class="w-40 avatar circle blue-grey">
                {{--<i class="on b-white avatar-right"></i>--}}
                {{ mb_substr($partner->fio, 0, 1) }}
            </span>
            <div class="list-body b-r">

                <a onclick="openDialog('editPartner', '&partner_id={{ $partner->id }}' )" class="item-title _500" >{{ $partner->fio }}</a>
                <div class="item-except text-sm text-muted h-1x">
                    {{ $partner->firstActivePhoneNumber() }}
                </div>
                <div class="item-tag tag hide">
                    Team
                </div>
            </div>
            <div class="list-body">

                <div class="item-except text-sm text-muted h-1x">
                    <span class="badge badge-pill primary">дисконт</span> 898123882383
                </div>
                <div class="item-except text-sm text-muted h-1x">
                    @if($partner->category()->first() != null)<span class="badge badge-pill success">{{ $partner->category()->first()->name }}</span>@endif
                </div>
            </div>
            <button onclick="partner.pick({{ $partner->id }}, '{{ $partner->fio }}', event)" class="btn btn-icon white float-right">
                <i class="fa fa-check"></i>
            </button>
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
