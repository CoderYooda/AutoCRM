{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин | Страницы')

@section('tab')

    <div id="ajax-shop-pages" class="bottom-container" style="height: calc(100% - 30px) !important;">

        <div class="box m-15 p-15 w-100">

            <ul class="nav" id="pages_tabs">
                <li class="nav-item active">
                    <a class="nav-link" href="#{{$class}}_tab_index" aria-controls="{{$class}}_tab_index" data-toggle="tab" data-target="#{{$class}}_tab_index">
                        Главная
                        <span class="float-right helper_danger d-none-f">
                        <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                    </span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#{{$class}}_tab_about" aria-controls="{{$class}}_tab_about" data-toggle="tab" data-target="#{{$class}}_tab_about">
                        О компании
                        <span class="float-right helper_danger d-none-f">
                        <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                    </span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#{{$class}}_tab_delivery" aria-controls="{{$class}}_tab_delivery" data-toggle="tab" data-target="#{{$class}}_tab_delivery">
                        Оплата и доставка
                        <span class="float-right helper_danger d-none-f">
                        <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                    </span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#{{$class}}_tab_warranty" aria-controls="{{$class}}_tab_warranty" data-toggle="tab" data-target="#{{$class}}_tab_warranty">
                        Гарантия и возврат
                        <span class="float-right helper_danger d-none-f">
                        <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                    </span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#{{$class}}_tab_contacts" aria-controls="{{$class}}_tab_contacts" data-toggle="tab" data-target="#{{$class}}_tab_contacts">
                        Контакты
                        <span class="float-right helper_danger d-none-f">
                        <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                    </span>
                    </a>
                </li>
            </ul>

            <div class="w-80">

                @include(get_template() . '.shop.tabs.pages.index')
                @include(get_template() . '.shop.tabs.pages.about')
                @include(get_template() . '.shop.tabs.pages.delivery')
                @include(get_template() . '.shop.tabs.pages.warranty')
                @include(get_template() . '.shop.tabs.pages.contacts')

            </div>

        </div>

    </div>

@endsection

