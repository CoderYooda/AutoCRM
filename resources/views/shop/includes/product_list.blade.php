<div class="items">

    @if(!count($products))

        <div class="empty_table">
            <span>Пусто</span>
        </div>

    @else

        <div class="products row">
            @foreach($products as $product)

                <div class="product pointer" onclick="helper.triggerClick(this);" id="product_{{ $product->id }}">

                    <a class="redirect_link d-none" href="{{ $product->path() }}"></a>

                    <img class="product-img" title="{{ $product->name }}" src="{{ $product->image_path }}" alt="{{ $product->name }}">

                    <div class="top-left-label">
                        @if($product->getEntrancesCount())
                            <div class="in-stock">В наличии</div>
                        @else
                            <div class="out-of-stock">Под заказ</div>
                        @endif
                        @if($product->sp_stock)
                             <div class="discount">
                                 Акция
                             </div>
                        @endif
                    </div>

                    <div class="name-container">
                        <div class="brand">{{ $product->supplier->name }}</div>
                        <div class="article">{{ $product->article }}</div>
                    </div>

                    <h3 class="product-name" title="{{ $product->name }}">{{ $product->name }}</h3>

                    <div class="top-right-label">
                        <div class="favour @if($favorite->isProductExists($product->id)) active @endif" onclick="favorite.toggleProduct(this, {{ $product->id }});"></div>
                        <div class="info" onclick="product.getInfo({{ $product->id }})"></div>
                    </div>

                    <div class="link">
                        <a href="{{ $product->path() }}">подробнее</a>
                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </div>
                </div>

            @endforeach
        </div>

    @endif

</div>
