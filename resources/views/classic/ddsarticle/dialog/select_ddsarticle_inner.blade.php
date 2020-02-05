@if($ddsarticles->count() > 0)
    <div class="" data-simplebar style="max-height: 400px;">
        <div class="box-body">
            <ul  class="nav select-list-modal ">
                @foreach($ddsarticles as $ddsarticle)
                    <li id="ddsarticle_item_{{ $ddsarticle->id }}" onclick="try{window.{{$request['refer']}}.selectDdsarticle({{ $ddsarticle->id }})}catch (e) {}" class="pointer d-flex " >
                        <div class="ring-ico">
                            <span class="first_letter"><i class="fa fa-newspaper-o" aria-hidden="true"></i></span>
                        </div>
                        <div class="list-title alone">
                            {{ $ddsarticle->name }}
                            <div class="secondary">{{ $ddsarticle->ddstype()->first()->name }}</div>
                        </div>
                        {{--<div class="list-body">--}}
                            {{--<div class="date">Дисконт: в разработке</div>--}}
                            {{--<div class="secondary">Тип: 2</div>--}}
                        {{--</div>--}}
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
@elseif($request && $request['string'] != null)
    <div class="padding text-center">
        <div>
            Статей по запросу "{{ $request['string'] }}" не найдено
        </div>
        <button onclick="openDialog('partnerDialog')" class="btn m-3 btn-sm white mb-0">Новый контрагент</button>
    </div>
@else
    <div class="padding text-center">
        <div>
            Статей нет
        </div>
        <button onclick="openDialog('partnerDialog')" class="btn m-3 btn-sm white mb-0">Новый контрагент</button>
    </div>
@endif
