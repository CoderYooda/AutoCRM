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
    <div class="lk container bg-white">
        <div class="title">
            <h2>Личный кабинет (Гараж)</h2>
        </div>
        <div class="lk-container">
            <div class="left-info">
                <div class="user-card">
                    <div class="name"></div>
                    <div class="contact"></div>
                    <div class="contact"></div>
                </div>
                <div class="info-block">
                    <div class="title">Сумма по заказам</div>
                    <div class="value">290 234.00</div>
                </div>
                <div class="info-block">
                    <div class="title">Заказов в ожидании</div>
                    <div class="value">123</div>
                </div>
                <div class="info-block">
                    <div class="title">К доплате о заказам</div>
                    <div class="value">290 234.00</div>
                </div>
            </div>
            <div class="lk-content">
                <div class="menu">
                    <a title="О компании" href="javascript:void(0)">О компании</a>
                    <a title="Оплата и доставка" href="javascript:void(0)">Оплата и доставка</a>
                    <a title="Гарантия и возврат" href="javascript:void(0)">Гарантия и возврат</a>
                    <a title="Контакты" href="javascript:void(0)">Контакты</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
