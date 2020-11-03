@extends('shop.layout.app')

@section('content')

    <div class="body user_page">

        @include('shop.includes.breadcrumbs')

        <div class="in-category container bg-white relative">
            <div class="title">
                <h2>Личный кабинет</h2>
            </div>

            <div style="position: relative; overflow: hidden;">

                <div style="display: inline-block; width: 25%; float: left;">

                    <div class="info_header">

                        <div class="name" title="{{ auth()->user()->companyPartner->fio }}">{{ auth()->user()->companyPartner->fio }}</div>
                        <div class="phone">{{ display_phone(auth()->user()->companyPartner->basePhone) }}</div>
                        <div class="email">{{ auth()->user()->companyPartner->email }}</div>

                    </div>

                    <div class="info_body">

                        <div class="title">Сумма по заказам:</div>
                        <div class="desc">{{ correct_price($ordersTotal) }} ₽</div>

                        <div class="title">Заказов в ожидании:</div>
                        <div class="desc">{{ $ordersWait }}</div>

                        <div class="title">К доплате по заказам:</div>
                        <div class="desc">{{ correct_price($ordersDebt) }} ₽</div>

                    </div>

                </div>

                <div style="width: calc(75% - 30px); float: right;">

                    <div id="user_tabs" class="user_tabs">
                        <span class="tab active" data-target="garage">Гараж</span>
                        <span class="tab" data-target="orders">Мои заказы</span>
                        <span class="tab" data-target="settings">Личные данные</span>
                    </div>

                    <div class="tabs_content">

                        <div id="garage" class="tab active">
                            @include('shop.layout.garage_tab')
                        </div>

                        <div id="orders" class="tab">
                            @include('shop.layout.orders_tab')
                        </div>

                        <div id="settings" class="tab">
                            @include('shop.layout.user_tab')
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

@endsection
