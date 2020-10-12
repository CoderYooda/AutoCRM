<div class="pagination container bg-white">
    <div class="paginator">
        <span class="item" ><a href="{{ route('pages.index') }}">Главная</a></span>

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

{{--        <span class="item" ><a href="#">После главной</a></span>--}}
{{--        <span class="item" >Последняя</span>--}}
    </div>
</div>
