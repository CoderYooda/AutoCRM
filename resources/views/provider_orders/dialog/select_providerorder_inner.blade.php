@if($providerorders->count() > 0)
    <div class="row">
        <div class="col-4 no-pr" data-simplebar style="max-height: 400px;">
            <div class="b-r" style="height: 400px;">
            @foreach($providerorders as $providerorder)
                <div class="list-item inblocked mini-list-element pointer" onclick="{{ $class }}.pickProviderOrder({{ $providerorder->id }})" data-id="{{ $providerorder->id }}">
                    <div class="inblock">
                        <i class="fa fa-cubes" style="font-size: 16px;"></i>
                        <div class="w-200 list-body b-r pr-2" style="max-height: 38px;overflow: hidden;flex: 2;">
                            <span class="item-title _500" > Заявка № {{ $providerorder->id }}</span>
                        </div>
                        <div class="list-body">
                            <div class="item-except text-sm text-muted h-1x" style="width: 100px!important; text-align: center">
                                {{ $providerorder->normalizedData() }}
                            </div>
                        </div>
                        {{--@if($request['refer'] != null)--}}
                            {{--<button data-article_id="{{ $providerorder->id }}"  onclick="{{$request['refer']}}.selectProviderOrder({{ $providerorder->id }});" class="btn btn-icon white float-right select_btn">--}}
                                {{--<i class="not_selected fa fa-plus"></i>--}}
                                {{--<i class="selected fa fa-check"></i>--}}
                            {{--</button>--}}
                        {{--@endif--}}
                    </div>
                </div>
            @endforeach
            </div>
        </div>
        <div class="col-8 no-pl" id="articles_container" >
        </div>
    </div>

@elseif($request && $request['string'] != null)
    <div class="padding text-center">
        <div>
            Товары по запросу "{{ $request['string'] }}" не найдено
        </div>
        <button onclick="openDialog('productDialog')" class="btn m-3 btn-sm success mb-0">Новый товар</button>
    </div>
@else
    <div class="padding text-center">
        <div>
            Товары не найдены
        </div>
        <button onclick="openDialog('productDialog')" class="btn m-3 btn-sm success mb-0">Новый товар</button>
    </div>
@endif
