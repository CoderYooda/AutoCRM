
@if($products->count() > 0)
    @foreach($products as $product)
        <div class="list-item " data-id="item-5">
{{--            <span class="w-40 avatar circle blue-grey">--}}
{{--                --}}{{--<i class="on b-white avatar-right"></i>--}}
{{--                --}}{{--                {{ mb_substr($partner->fio, 0, 1) }}--}}
{{--            </span>--}}
            <i class="fa fa-cogs" style="font-size: 22px;"></i>
            <div class="w-280 list-body b-r pr-2" style="max-height: 38px;overflow: hidden;flex: 2;">
                <a onclick="openDialog('editProduct', '&product_id={{ $product->id }}' )" class="item-title _500" >{{ $product->name }}</a>
            </div>
            <div class="list-body">
                <div class="item-except text-sm text-muted h-1x">
                    <span class="badge badge-pill primary">Арт</span> {{ $product->article }}
                </div>
                <div class="item-except text-sm text-muted h-1x">
                    <span class="badge badge-pill primary">Произв.</span> {{ $product->supplier()->first()->name }}
                </div>
            </div>
            @if($request['refer'] != null)
                <button onclick="{{$request['refer']}}.addProduct({{ $product->id }})" class="btn btn-icon white float-right">
                    <i class="fa fa-plus"></i>
                </button>
            @else

            @endif

        </div>
    @endforeach
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
