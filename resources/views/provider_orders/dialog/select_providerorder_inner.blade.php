@if($providerorders->count() > 0)
    <div>
    @foreach($providerorders as $providerorder)
        <div class="list-item inblocked" data-id="{{ $providerorder->id }}">
            <div class="inblock">
                <i class="fa fa-cogs" style="font-size: 22px;"></i>
                <div class="w-280 list-body b-r pr-2" style="max-height: 38px;overflow: hidden;flex: 2;">
                    <a onclick="openDialog('productDialog', '&product_id={{ $providerorder->id }}' )" class="item-title _500" > Заявка № {{ $providerorder->id }}</a>
                </div>
                <div class="list-body">
                    <div class="item-except text-sm text-muted h-1x">
                        <span class="badge badge-pill primary">Арт</span> 
                    </div>
                    <div class="item-except text-sm text-muted h-1x">
                        {{--<span class="badge badge-pill primary">Произв.</span> {{ $product->supplier()->first()->name }}--}}
                    </div>
                </div>
                @if($request['refer'] != null)
                    <div class="list-body">
                        <div class="form-group mb-0">
                            <input type="number" class="form-control" name="count" placeholder="количество" value="1">
                        </div>
                    </div>
                    <button data-article_id="{{ $providerorder->id }}"  onclick="{{$request['refer']}}.addProduct(this);" class="btn btn-icon white float-right select_btn">
                        <i class="not_selected fa fa-plus"></i>
                        <i class="selected fa fa-check"></i>
                    </button>
                @endif
            </div>
        </div>
    @endforeach
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
