@extends('shop.layout.app')

@section('content')
<div class="body">

    @include('shop.includes.breadcrumbs')

    <div class="in-category container bg-white relative @if(!count($orders)) d-none @endif">
        <div class="title">
            <h2>Корзина</h2>
        </div>

        <div onclick="cart.makeOrder(this);" class="order_button">
            Оформить заказ
        </div>

        <div class="cart_stores">

            @foreach($stores as $store)
                <div class="store @if($loop->first) active @endif">
                    <div class="name">{{ $store->name }}</div>
                    <div class="total"><span id="total_store_{{ $store->id }}">{{ correct_price($storesTotal[$store->id] ?? 0) }}</span> ₽</div>
                </div>
            @endforeach

        </div>

        <div class="cart_table w-100">

            <div class="cart_body">

                @foreach($orders as $hash => $order)

                    <div class="cart_element" id="product_{{ $hash }}" @isset($order['store_id']) data-store_id="{{ $order['store_id'] }}" @endisset>

                        <div class="flex-1 photo">
                            <img src="{{ $order['image'] }}" alt="{{ $order['name'] }}" title="{{ $order['name'] }}"/>
                        </div>

                        <div class="flex-1 info ">
                            <div>{{ $order['manufacturer'] }}</div>
                            <div>{{ $order['article'] }}</div>
                        </div>

                        <div class="flex-1 name" title="{{ $order['name'] }}">
                            <div>{{ $order['name'] }}</div>
                        </div>

                        <div class="flex-1 params_first">
{{--                            <div class="old_price">{{ correct_price($order['data']['model']['hash_info']['price']) }} ₽</div>--}}
                            <div class="count"><span>{{ $order['count'] }}</span> шт.</div>
                        </div>

                        <div class="flex-1 params_second">
                            <div class="current_price"><span>{{ correct_price($order['price']) }}</span> ₽</div>
                            <div class="total_price"><span>{{ correct_price($order['price'] * $order['count']) }}</span> ₽</div>
                        </div>

                        <div class="absolute shipping-container">
                            <div class="counter-container">
                                <div class="button minus" onclick="cart.decrement(this, '{{ $hash }}');"></div>
                                <input type="text" class="counter" value="{{ $order['count'] }}" />
                                <div class="button plus" onclick="cart.increment(this, '{{ $hash }}');"></div>
                            </div>
                            <div class="cart-button incart" onclick="cart.remove(this, '{{ $hash }}');"></div>
                        </div>

                    </div>

                @endforeach

            </div>

        </div>

        <div class="relative">

            <div class="clear_cart">
                <span>Очистить корзину</span>
                <div onclick="cart.clear();" class="image"></div>
            </div>

            <div class="cart_total">
                <span>Итого:</span>
                <span id="count">{{ correct_price($totalPrice) }}</span> ₽
            </div>

        </div>

        <div class="title" style="margin-top: 62px;">
            <h2>Оформление заказа</h2>
        </div>

        <div class="order_form" style="width: 80%;">

            <div id="register-tabs" class="cart_tabs">
                <div class="tab pointer @if(old('register_type') == 'fl' || old('register_type') == null) active @endif" data-target="tab_fl" onclick="cart.changeRegisterType('fl');">
                    <div class="button">
                        <div class="text">Физическое лицо</div>
                    </div>
                </div>
                <div class="tab pointer @if(old('register_type') == 'ip') active @endif" data-target="tab_ip" onclick="cart.changeRegisterType('ip');">
                    <div class="button">
                        <div class="text">Индивидуальный предприниматель</div>
                    </div>
                </div>
                <div class="tab pointer @if(old('register_type') == 'ul') active @endif" data-target="tab_ul" onclick="cart.changeRegisterType('ul');">
                    <div class="button">
                        <div class="text">Юридическое лицо</div>
                    </div>
                </div>
            </div>

            <form action="{{ route('cart.order') }}" method="POST">

                @csrf

                <input type="hidden" name="register_type" value="fl">

                <div class="d-flex flex-column">

                    <div class="form-group-flex">
                        <label>Телефон <span class="required_field">*</span></label>
                        <div class="float-r">
                            <div class="field">
                                <input type="text" class="form-control phone" name="basePhone" placeholder="+7(999)999-99-99" />
                            </div>
                            @error('basePhone')
                                <div class="error_text">{{ $message }}</div>
                                <div class="error_notify">!</div>
                            @enderror
                        </div>
                    </div>

                    <div class="form-group-flex">
                        <label>Электронная почта <span class="required_field">*</span></label>
                        <div class="float-r">
                            <div class="field">
                                <input type="email" class="form-control" name="email" placeholder="example@domain.ru" />
                            </div>
                            @error('email')
                                <div class="error_text">{{ $message }}</div>
                                <div class="error_notify">!</div>
                            @enderror
                        </div>
                    </div>

                    <div class="tab active" id="tab_fl">

                        <div class="form-group-flex">
                            <label>Фамилия <span class="required_field">*</span></label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="surname" placeholder="Иванов" />
                                </div>
                                @error('surname')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>Имя <span class="required_field">*</span></label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="name" placeholder="Иван" />
                                </div>
                                @error('name')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>Отчество</label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="middlename" placeholder="Иванович" />
                                </div>
                                @error('middlename')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                    </div>

                    <div class="tab" id="tab_ip">

                        <div class="form-group-flex">
                            <label>Фамилия <span class="required_field">*</span></label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="surnanme" placeholder="Иванов" />
                                </div>
                                @error('surnanme')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>Имя <span class="required_field">*</span></label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="name" placeholder="Иван" />
                                </div>
                                @error('name')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>Отчество <span class="required_field">*</span></label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="middlename" placeholder="Иванович" />
                                </div>
                                @error('middlename')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>ИНН <span class="required_field">*</span></label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="inn" placeholder="0000000000" />
                                </div>
                                @error('inn')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>ОГРНИП</label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="ogrn" placeholder="00000000000000" />
                                </div>
                                @error('ogrn')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>БИК</label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="bik" placeholder="000000000" />
                                </div>
                                @error('bik')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>Банк</label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="bank" placeholder="Наименование банка" />
                                </div>
                                @error('bank')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>Корреспондентский счет</label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="cs" placeholder="00000000000000000000" />
                                </div>
                                @error('cs')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>Расчетный счет</label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="rs" placeholder="00000000000000000000" />
                                </div>
                                @error('rs')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>Фактический адрес</label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="actual_address" placeholder="г. Москва, ул. Бережная, д.9" />
                                </div>
                                @error('actual_address')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                    </div>

                    <div class="tab" id="tab_ul">

                        <div class="form-group-flex">
                            <label>Название компании <span class="required_field">*</span></label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="company_name" placeholder="Рога и Копыта" />
                                    <input type="text" class="form-control mr-10" maxlength="3" name="opf" placeholder="ООО" style="width: 32px;" />
                                </div>
                                @error('company_name')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>ИНН <span class="required_field">*</span></label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="inn" placeholder="0000000000" />
                                </div>
                                @error('inn')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>ОГРН</label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="ogrn" placeholder="00000000000000" />
                                </div>
                                @error('actual_address')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>БИК</label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="bik" placeholder="000000000" />
                                </div>
                                @error('bik')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>Банк</label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="bank" placeholder="Наименование банка" />
                                </div>
                                @error('bank')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>Корреспондентский счет</label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="cs" placeholder="00000000000000000000" />
                                </div>
                                @error('cs')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>Расчетный счет</label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="rs" placeholder="00000000000000000000" />
                                </div>
                                @error('rs')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>Юридический адрес</label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="ur_address" placeholder="г. Москва, ул. Бережная, д.9" />
                                </div>
                                @error('ur_address')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group-flex">
                            <label>Фактический адрес</label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="actual_address" placeholder="г. Москва, ул. Бережная, д.9" />
                                </div>
                                @error('actual_address')
                                    <div class="error_text">{{ $message }}</div>
                                    <div class="error_notify">!</div>
                                @enderror
                            </div>
                        </div>

                    </div>

                    <div class="form-group-flex">
                        <label for="delivery_type">Способ доставки <span class="required_field">*</span></label>
                        <select name="delivery_type">
                            <option value="0">Самовывоз</option>
                            <option value="1">Доставка</option>
                        </select>
                    </div>

                    <div class="form-group-flex">
                        <label for="store_id">Точка получения заказа <span class="required_field">*</span></label>
                        <select name="store_id">
                            @foreach($stores as $store)
                                <option value="{{ $store->id }}">{{ $store->name }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="form-group-flex">
                        <label>Способ оплаты <span class="required_field">*</span></label>
                        <div class="d-flex float-r" style="width: 352px;">
                            <label class="custom_radio" style="margin-right: 42px;">
                                При получении
                                <input type="radio" class="not_default" name="pay_type" checked value="0" />
                                <span></span>
                            </label>
                            <label class="custom_radio">
                                На сайте
                                <input type="radio" class="not_default" name="pay_type" value="1" />
                                <span></span>
                            </label>
                        </div>
                    </div>

                    <div class="register mb-20">
                        <div class="d-flex float-r" style="width: 352px;">
                            <label class="custom_checkbox">
                                <input type="checkbox" class="mr-20" name="rules" checked />
                                <span></span>
                                <a href="#">Обработка персональных данных</a>
                            </label>
                        </div>
                    </div>

                    <div class="register mb-20">
                        <div class="d-flex float-r" style="width: 352px;">
                            <label class="custom_checkbox">
                                <input type="checkbox" class="mr-20" name="register" checked />
                                <span></span>
                                Регистрация в #bbcrm
                            </label>
                        </div>
                    </div>

                    <div class="mb-16">
                        <div class="float-r" style="width: 352px;">
                            <div onclick="cart.makeOrder(this);" class="order_button relative right-0">
                                Оформить заказ
                            </div>
                        </div>
                    </div>

                </div>

            </form>

        </div>

    </div>

    <div class="empty_table @if(count($orders)) d-none @endif">
        <span>Пусто</span>
    </div>

</div>
@endsection
