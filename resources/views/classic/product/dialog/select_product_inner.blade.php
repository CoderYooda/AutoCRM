@if($products->count() > 0)
    <div  data-simplebar style="max-height: 400px;">
        <div class="box-body">
            <ul  class="nav select-list-modal ">
                @foreach($products as $product)
                    <li id="product_item_{{ $product->id }}" data-article_id="{{ $product->id }}" onclick="{{$request['refer']}}.addProduct(this, 'selectProductDialog');" class="list-item pointer d-flex " >
                        <div class="ring-ico">
                            <i class="fa fa-cogs" style="font-size: 22px;"></i>
                        </div>
                        <div class="list-title">
                            {{ $product->name }}
                            <div class="secondary">ID {{ $product->id }}</div>
                        </div>
                        <div class="list-body">
                            <div class="date">Артикул: {{ $product->article }}</div>
                            <div class="secondary">Производитель: {{ $product->supplier()->first()->name }}</div>
                        </div>
                    </li>



                    {{--<div class="list-item inblocked" data-id="{{ $product->id }}">--}}
                        {{--<div class="inblock">--}}
                            {{--<i class="fa fa-cogs" style="font-size: 22px;"></i>--}}
                            {{--<div class="w-280 list-body b-r pr-2" style="max-height: 38px;overflow: hidden;flex: 2;">--}}
                                {{--<a onclick="openDialog('productDialog', '&product_id={{ $product->id }}' )" class="item-title _500" >{{ $product->name }}</a>--}}
                            {{--</div>--}}
                            {{--<div class="list-body">--}}
                                {{--<div class="item-except text-sm text-muted h-1x">--}}
                                    {{--<span class="badge badge-pill primary">Арт</span> {{ $product->article }}--}}
                                {{--</div>--}}
                                {{--<div class="item-except text-sm text-muted h-1x">--}}
                                    {{--<span class="badge badge-pill primary">Произв.</span> {{ $product->supplier()->first()->name }}--}}
                                {{--</div>--}}
                            {{--</div>--}}
                            {{--@if($request['refer'] != null)--}}
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
                        {{--</div>--}}
                    {{--</div>--}}
                @endforeach
            </ul>
        </div>
    </div>
@elseif($request && $request['string'] != null)
    <div class="padding text-center">
        <div class="p-15">
            Товары по запросу "{{ $request['string'] }}" не найдено
        </div>
        <button onclick="openDialog('productDialog')" class="button">Новый товар</button>
    </div>
@else
    <div class="padding text-center">
        <div class="p-15">
            Товары не найдены
        </div>
        <button onclick="openDialog('productDialog')" class="button">Новый товар</button>
    </div>
@endif
