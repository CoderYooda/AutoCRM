<div class="col-sm-12">
    @if($entrances->count())
        <div class="" data-simplebar style="max-height: 400px;">
            <div class="box-body">
                <ul class="nav select-list-modal mb-0">
                    @foreach($entrances as $entrance)
                        <li id="entrance_item_{{ $entrance->id }}"
                            onclick="
                                try{window.{{$request['refer']}}.selectEntrance({{ $entrance->id }}
                            @if(isset($request['target']) && $request['target'] != null),
                                '{{$request['target']}}'
                            @endif)
                                }
                                catch (e) {}"
                            onmouseenter="setTimeout(function() {  window.{{ $class }}.entranceDescription({{$entrance}})}, 800)"
                            class="pointer d-flex ">
                            {{--                            <div class="ring-ico">--}}
                            {{--                                <span class="first_letter">1</span>--}}
                            {{--                            </div>--}}
                            <div class="list-title" style="max-width: unset;">
                                Поступление № {{ $entrance->id }}
                                <div class="secondary">
                                    Поставщик: {{ $entrance->partner->official_name ?? 'Не указано' }}</div>
                            </div>
                            <div class="list-body">
                                {{--                                <div class="date">Сумма: {{ $entrance->itogo }} р.</div>--}}
                                <div class="secondary">Дата: {{ $entrance->created_at }}</div>
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
                    Поступлений по запросу <b>{{ $request['string'] }}</b> не найдено
                </div>
            </div>
            <button onclick="openDialog('entranceDialog')" class="button success mb-15">Новое поступление</button>
        </div>
    @else
        <div class="padding text-center">
            <div>
                <div class="out_of_search"></div>
                <div class="mb-15">
                    Поступлений с невозвращенными товарами нет
                </div>
            </div>
            <button onclick="openDialog('entranceDialog')" class="button success mb-15">Новое поступление</button>
        </div>
    @endif
</div>


