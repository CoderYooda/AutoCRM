@if($products->count() > 0)
    <div id="product_select_accordion" >
    @foreach($products as $product)
        <div class="list-item inblocked" data-id="{{ $product->id }}">
            <div class="inblock">
                <i class="fa fa-cogs" style="font-size: 22px;"></i>
                <div class="w-280 list-body b-r pr-2" style="max-height: 38px;overflow: hidden;flex: 2;">
                    <a onclick="openDialog('productDialog', '&product_id={{ $product->id }}' )" class="item-title _500" >{{ $product->name }}</a>
                </div>
                <div class="list-body">
                    <div class="item-except text-sm text-muted h-1x">
                        <span class="badge badge-pill primary">Арт</span> {{ $product->article }}
                    </div>
                    <div class="item-except text-sm text-muted h-1x">
                        <span class="badge badge-pill primary">Произв.</span> {{ $product->supplier()->first()->name }}
                    </div>
                </div>
                @if($request['refer'] != null && ( strpos($request['refer'], 'shipment') !== false ||  strpos($request['refer'], 'clientorder') !== false))
                    <button class="btn btn-icon white float-right select_btn" data-toggle="collapse" data-target="#stores{{ $product->id }}" aria-expanded="false" aria-controls="collapseExample">
                        <i class="fa fa-caret-down"></i>
                    </button>
                @endif
                {{--@if($request['refer'] != null && strpos($request['refer'], 'clientorder') !== false)--}}
                    {{--<div class="list-body">--}}
                        {{--<div class="form-group mb-0">--}}
                            {{--<input type="number" class="form-control" name="count" placeholder="количество" value="1">--}}
                        {{--</div>--}}
                    {{--</div>--}}
                    {{--<button data-article_id="{{ $product->id }}"  onclick="{{$request['refer']}}.addProduct(this);" class="btn btn-icon white float-right select_btn">--}}
                        {{--<i class="not_selected fa fa-plus"></i>--}}
                        {{--<i class="selected fa fa-check"></i>--}}
                    {{--</button>--}}
                {{--@endif--}}
                @if($request['refer'] != null && strpos($request['refer'], 'entrance') !== false)
                    <div class="list-body">
                        <div class="form-group mb-0">
                            <input type="number" class="form-control" name="count" placeholder="количество" value="1">
                        </div>
                    </div>
                    <button data-article_id="{{ $product->id }}"  onclick="{{$request['refer']}}.addProduct(this);" class="btn btn-icon white float-right select_btn">
                        <i class="not_selected fa fa-plus"></i>
                        <i class="selected fa fa-check"></i>
                    </button>
                @endif
            </div>

            @if($request['refer'] != null && ( strpos($request['refer'], 'shipment') !== false ||  strpos($request['refer'], 'clientorder') !== false))

            <div class="no-margin collapse w-100 transition-70ms" id="stores{{ $product->id }}" data-toggle="collapse" aria-labelledby="headingOne" data-parent="#product_select_accordion">
                <table class="table mb-0">
                    <thead>
                    <tr>
                        <th style="width:60px;">Склад</th>
                        <th>Доступно</th>
                        <th>Кол-во</th>
                        <th style="width:80px;"></th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($stores as $store)
                        <tr>
                            <td class="no-wrap">{{ $store->name }}</td>
                            <td>{{ $store->getArticlesCountById($product->id) }}</td>
                            <td>
                                <div class="form-group mb-0">
                                    <input type="number" class="form-control" placeholder="количество" value="1">
                                </div>
                            </td>

                            <td >
                                @if($request['refer'] != null)
                                <button type="button" class="btn primary" data-article_id="{{ $product->id }}" data-store_id="{{ $store->id }}" onclick="{{$request['refer']}}.addProduct(this);">Добавить</button>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
            @endif
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
