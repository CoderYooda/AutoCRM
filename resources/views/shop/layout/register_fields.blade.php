<div class="order_form mt-0" style="width: 80%;">

    <div id="register-tabs" class="cart_tabs">
        <div class="tab pointer @if(old('register_type') == 'fl') active @endif" data-target="tab_fl" onclick="cart.changeRegisterType('fl');">
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

    <form action="{{ route(request()->routeIs('cart*') ? 'cart.order' : 'user.registerAction') }}" method="POST">

        @csrf

        <input type="hidden" name="register_type" value="{{ old('register_type') ?? 'fl' }}">

        @if(request()->routeIs('cart*'))
            <input type="hidden" name="register" value="0">
        @endif

        <div class="form-group-flex">
            <label>Телефон <span class="required_field">*</span></label>
            <div class="float-r">
                <div class="field">
                    <input type="text" class="form-control phone" name="basePhone" placeholder="+7(999)999-99-99" value="{{ old('basePhone') }}" />
                </div>
                @error('basePhone')
                <div class="error_text">{{ $message }}</div>
                <div class="error_notify">!</div>
                @enderror
            </div>
        </div>

        <div class="form-group-flex">
            <label>Пароль <span class="required_field">*</span></label>
            <div class="float-r">
                <div class="field">
                    <input type="text" class="form-control" name="password" minlength="8" placeholder="********" value="{{ old('password') }}" />
                </div>
                @error('password')
                <div class="error_text">{{ $message }}</div>
                <div class="error_notify">!</div>
                @enderror
            </div>
        </div>

        <div class="form-group-flex">
            <label>Электронная почта <span class="required_field">*</span></label>
            <div class="float-r">
                <div class="field">
                    <input type="email" class="form-control" name="email" placeholder="example@domain.ru" value="{{ old('email') }}" />
                </div>
                @error('email')
                <div class="error_text">{{ $message }}</div>
                <div class="error_notify">!</div>
                @enderror
            </div>
        </div>

        <div class="form-group-flex">
            <label>Фамилия <span class="required_field">*</span></label>
            <div class="float-r">
                <div class="field">
                    <input type="text" class="form-control" name="surname" placeholder="Иванов" value="{{ old('surname') }}" />
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
                    <input type="text" class="form-control" name="name" placeholder="Иван" value="{{ old('name') }}" />
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
                    <input type="text" class="form-control" name="middlename" placeholder="Иванович" value="{{ old('middlename') }}" />
                </div>
                @error('middlename')
                <div class="error_text">{{ $message }}</div>
                <div class="error_notify">!</div>
                @enderror
            </div>
        </div>

        <div class="tab @if(old('register_type') == 'ip') active @endif" id="tab_ip">

            <div class="form-group-flex">
                <label>ИНН <span class="required_field">*</span></label>
                <div class="float-r">
                    <div class="field">
                        <input type="text" class="form-control" name="inn" placeholder="0000000000" value="{{ old('inn') }}" />
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
                        <input type="text" class="form-control" name="ogrn" placeholder="0000000000" value="{{ old('ogrn') }}" />
                    </div>
                    @error('ogrn')
                        <div class="error_text">{{ $message }}</div>
                        <div class="error_notify">!</div>
                    @enderror
                </div>
            </div>

        </div>

        <div class="tab @if(old('register_type') == 'ul') active @endif" id="tab_ul">

            <div class="form-group-flex">
                <label>Название компании <span class="required_field">*</span></label>
                <div class="float-r">
                    <div class="field">
                        <input type="text" class="form-control" name="companyName" placeholder="Рога и Копыта" value="{{ old('companyName') }}" />
                        <input type="text" class="form-control mr-10" maxlength="3" name="opf" placeholder="ООО" style="width: 32px;" value="{{ old('opf') }}" />
                    </div>
                    @error('companyName')
                        <div class="error_text">{{ $message }}</div>
                        <div class="error_notify">!</div>
                    @enderror
                </div>
            </div>

            <div class="form-group-flex">
                <label>ИНН <span class="required_field">*</span></label>
                <div class="float-r">
                    <div class="field">
                        <input type="text" class="form-control" name="inn" placeholder="0000000000" value="{{ old('inn') }}" />
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
                        <input type="text" class="form-control" name="ogrn" placeholder="0000000000" value="{{ old('ogrn') }}" />
                    </div>
                    @error('ogrn')
                        <div class="error_text">{{ $message }}</div>
                        <div class="error_notify">!</div>
                    @enderror
                </div>
            </div>

        </div>

        @if(request()->routeIs('cart*'))

            <div class="form-group-flex">
                <label for="delivery_type">Способ доставки <span class="required_field">*</span></label>
                <select onchange="cart.changeDeliveryType(this);" name="delivery_type">
                    <option value="0">Самовывоз</option>
                    <option value="1">Доставка</option>
                </select>
            </div>

            <div class="form-group-flex @if(old('delivery_type')) d-none @endif">
                <label for="store_id">Точка получения заказа <span class="required_field">*</span></label>
                <select name="pickup_id">
                    @foreach($stores as $store)
                        <option value="{{ $store->id }}">{{ $store->name }}</option>
                    @endforeach
                </select>
            </div>

            <div class="form-group-flex @if(!old('delivery_type')) d-none @endif">
                <label for="delivery_address">Адрес доставки <span class="required_field">*</span></label>
                <div class="float-r">
                    <div class="field">
                        <input class="form-control" type="text" name="delivery_address" placeholder="Москва, ул. Конева, д. 3" value="{{ old('delivery_address') }}" />
                    </div>
                </div>
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

            <div class="form-group-flex">
                <label>Комментарий</label>
                <div class="float-r">
                    <div class="field">
                        <textarea class="form-control" name="comment" placeholder="Комментарий">{{ old('comment') }}</textarea>
                    </div>
                    @error('comment')
                        <div class="error_text">{{ $message }}</div>
                        <div class="error_notify">!</div>
                    @enderror
                </div>
            </div>

        @endif

        <div class="register mb-20" style="height: 32px;">
            <div class="d-flex float-r" style="width: 352px;">
                <label class="custom_checkbox">
                    <input type="checkbox" class="mr-20" name="rules" checked />
                    <span></span>
                    <a href="#">Обработка персональных данных</a>
                </label>
            </div>
        </div>

        <div class="form-group">
            <div class="float-r" style="width: 352px;">
                <button class="register_button" type="submit">{{ request()->routeIs('cart*') ? 'Оформить заказ' : 'Регистрация' }}</button>
            </div>
        </div>

    </form>

</div>
