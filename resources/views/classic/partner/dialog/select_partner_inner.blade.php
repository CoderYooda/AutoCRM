@if($partners->count() > 0)
    <div class="" data-simplebar style="max-height: 400px;">
        <div class="box-body">
            <ul  class="nav select-list-modal ">
                @foreach($partners as $partner)
                    <li id="providerorder_item_{{ $partner->id }}" onclick="try{window.{{$request['refer']}}.selectPartner({{ $partner->id }}@if(isset($request['target']) && $request['target'] != null), '{{$request['target']}}' @endif)}catch (e) {}" class="pointer d-flex " >
                        <div class="ring-ico">
                            <span class="first_letter">{{ $partner->firstLetterOfName() }}</span>
                        </div>
                        <div class="list-title">
                            {{ $partner->outputName() }}
                            <div class="secondary">{{ $partner->firstActivePhoneNumber() }}</div>
                        </div>
                        <div class="list-body">
                            <div class="date">Дисконт: в разработке</div>
                            <div class="secondary">Тип: {{ $partner->isflText() }}</div>
                        </div>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
@elseif($request && $request['string'] != null)
    <div class="padding text-center">
        <div>
            Контрагентов по запросу "{{ $request['string'] }}" не найдено
        </div>
        <button onclick="openDialog('partnerDialog')" class="btn m-3 btn-sm white mb-0">Новый контрагент</button>
    </div>
@else
    <div class="padding text-center">
        <div>
            Контрагентов нет
        </div>
        <button onclick="openDialog('partnerDialog')" class="btn m-3 btn-sm white mb-0">Новый контрагент</button>
    </div>
@endif
