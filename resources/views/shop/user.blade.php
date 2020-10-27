@extends('shop.layout.app')

@section('content')

    <div class="body">

        @include('shop.includes.breadcrumbs')

        <div class="in-category container bg-white relative">
            <div class="title">
                <h2>Личный кабинет</h2>
            </div>

            <div class="d-flex">

                <div class="flex-1">

                    <div class="info_header">

                        <div class="name">{{ auth()->user()->companyPartner->fio }}</div>
                        <div class="phone">{{ display_phone(auth()->user()->companyPartner->basePhone) }}</div>
                        <div class="email">{{ auth()->user()->companyPartner->email }}</div>

                    </div>

                    <div class="info_body">

                        <div class="title">Сумма по заказам:</div>
                        <div class="desc">21 025 478 ₽</div>

                        <div class="title">Заказов в ожидании:</div>
                        <div class="desc">140</div>

                        <div class="title">К доплате по заказам:</div>
                        <div class="desc">524 256 ₽</div>

                    </div>

                </div>

                <div class="flex-3 ml-20">

                    <div id="user_tabs" class="user_tabs">
                        <span class="tab active" data-target="garage">Гараж</span>
                        <span class="tab" data-target="orders">Мои заказы</span>
                        <span class="tab" data-target="user">Личные данные</span>
                    </div>

                    <div class="tabs_content">

                        <div id="garage" class="tab active">
                            @include('shop.layout.garage_tab')
                        </div>

                        <div id="orders" class="tab">
                            @include('shop.layout.orders_tab')
                        </div>

                        <div id="user" class="tab">
                            @include('shop.layout.user_tab')
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

@endsection
