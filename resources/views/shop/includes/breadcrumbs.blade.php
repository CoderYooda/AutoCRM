<div class="pagination container bg-white">
    <div class="paginator">
        <span class="item"><a href="{{ route('pages.index') }}">Главная</a></span>

        @if(request()->routeIs('user.registerForm'))
            <span class="item">Регистрация</span>
        @endif

        @if(request()->routeIs('user*'))
            <span class="item">Личный кабинет</span>
        @endif

        @if(request()->routeIs('pages.personalData'))
            <span class="item">Обработка персональных данных</span>
        @endif

        @if(request()->routeIs('pages.catalogue'))
            <span class="item">Каталог</span>
        @endif

        @if(request()->routeIs('orders.success'))
            <span class="item">Заказ №{{ $order->id }}</span>
        @endif

        @if(request()->routeIs('cart.index'))
            <span class="item">Корзина</span>
        @endif

        @if(request()->routeIs('favorites.index'))
            <span class="item">Избранное</span>
        @endif

        @if(request()->routeIs('pages.search'))
            <span class="item">Поиск</span>
        @endif

        @if(request()->routeIs('pages.path'))
            <span class="item" ><a href="{{ route('pages.catalogue') }}">Каталог</a></span>

            @foreach($selectedCategory->getAncestors() as $parentCategory)
                <span class="item" ><a href="{{ $parentCategory->path() }}">{{ $parentCategory->name }}</a></span>
            @endforeach

            @isset($product)
                <span class="item"><a href="{{ $selectedCategory->path() }}">{{ $selectedCategory->name }}</a></span>
                <span class="item">{{ $product->name }}</span>
            @else
                <span class="item">{{ $selectedCategory->name }}</span>
            @endisset

        @endif

        @if(request()->routeIs('pages.about'))
            <span class="item" >О компании</span>
        @endif

        @if(request()->routeIs('pages.delivery'))
            <span class="item" >Оплата и доставка</span>
        @endif

        @if(request()->routeIs('pages.warranty'))
            <span class="item" >Гарантия и возврат</span>
        @endif

        @if(request()->routeIs('pages.contacts'))
            <span class="item" >Контакты</span>
        @endif

    </div>
</div>
