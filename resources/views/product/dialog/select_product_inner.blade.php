
@if($products->count() > 0)
    <div id="product_select_accordion">
    @foreach($products as $product)
        <div class="list-item inblocked" data-id="{{ $product->id }}">
            <div class="inblock">
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
                <button class="btn btn-icon white float-right select_btn" data-toggle="collapse" data-target="#stores{{ $product->id }}" aria-expanded="false" aria-controls="collapseExample">
                    <i class="fa fa-caret-down"></i>
                </button>
                @if($request['refer'] != null)
                    <button data-id="{{ $product->id }}" onclick="{{$request['refer']}}.addProduct({{ $product->id }});" class="btn btn-icon white float-right select_btn">
                        <i class="not_selected fa fa-plus"></i>
                        <i class="selected fa fa-check"></i>
                    </button>
                @else

                @endif
            </div>
            <div class="collapse w-100" id="stores{{ $product->id }}" data-toggle="collapse" aria-labelledby="headingOne" data-parent="#product_select_accordion">
                <div class="">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                </div>
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
