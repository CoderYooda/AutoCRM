@extends('shop.layout.app')

@section('content')
<div class="body">
    <div class="pagination container bg-white">
        <div class="paginator">
            <span class="item" ><a href="javascript:void(0)">Главная</a></span>
            <span class="item" ><a href="javascript:void(0)">После главной</a></span>
            <span class="item" >Последняя</span>
        </div>
    </div>
    <div class="catalogues container bg-white">
        <div class="title">
            <h2>Каталог товаров</h2>
        </div>
        <div class="categories-container">
            @for($i = 0; $i <= 10; $i++)
                <div class="category">
                    <div class="description">
                        <div class="title">Название категории</div>
                        <div class="link">
                            <a title="Название категории сюда" href="javascript:void(0)">Перейти</a>
                        </div>
                    </div>
                    <div class="photo">
                        @if(rand(0,3))
                            <img title="Название категории сюда" src="/images/shop/category-{{ rand(1,2) }}.png" alt="">
                        @endif
                    </div>
                </div>
            @endfor
        </div>
    </div>
</div>
@endsection
