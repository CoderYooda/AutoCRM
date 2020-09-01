<div class="col-sm-12">
    @if($warrants->count())
        <div class="" data-simplebar style="max-height: 400px;">
            <div class="box-body">
                <ul class="select-list-modal mb-0 pl-0">
                    @foreach($warrants as $warrant)
                        <li id="warrant_item_{{ $warrant->id }}" onclick="try{window.{{$request['refer']}}.selectWarrant({{ $warrant->id }}@if(isset($request['target']) && $request['target'] != null), '{{$request['target']}}' @endif)}catch (e) {}" class="pointer d-flex " >
                            <div class="list-title" style="max-width: unset;">
                                {{ $warrant->isIncoming ? 'Приходной' : 'Расходной' }} ордер № {{ $warrant->id }}
                                <div class="secondary">Менеджер: {{ $warrant->manager->outputName() }}</div>
                            </div>
                            <div class="list-body">
                                <div class="date">Сумма: {{ $warrant->summ }} р.</div>
                                <div class="secondary">Дата: {{ $warrant->created_at }}</div>
                            </div>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>

        <div class="mt-5 mb-5">
            {{ $warrants->links('vendor.pagination.warrants.index') }}
        </div>

    @elseif($request && $request['string'] != null)
        <div class="padding text-center">
            <div>
                <div class="out_of_search"></div>
                <div class="mb-15">
                    Ордеров по запросу <b>{{ $request['string'] }}</b> не найдено
                </div>
            </div>
            <button onclick="openDialog('warrantDialog')" class="button success mb-15">Новый ордер</button>
        </div>
    @else
        <div class="padding text-center">
            <div>
                <div class="out_of_search"></div>
                <div class="mb-15">
                    Ордеров нет
                </div>
            </div>
            <button onclick="openDialog('warrantDialog')" class="button success mb-15">Новый ордер</button>
        </div>
    @endif
</div>


