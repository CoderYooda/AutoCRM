@extends('shop.layout.app')

@section('content')
    <div class="body">

        @include('shop.includes.breadcrumbs')

        @foreach($errors as $error)

            {{ $error }}

        @endforeach

        <div class="in-category container bg-white mb-0">

            <div class="title">
                <h2>Регистрация</h2>
            </div>

            <div class="order_form mt-0" style="width: 80%;">

                <div id="register-tabs" class="cart_tabs">
                    <div class="tab pointer" data-target="tab_fl" onclick="cart.changeRegisterType('fl');">
                        <div class="button">
                            <div class="text">Физическое лицо</div>
                        </div>
                    </div>
                    <div class="tab pointer" data-target="tab_ip" onclick="cart.changeRegisterType('ip');">
                        <div class="button">
                            <div class="text">Индивидуальный предприниматель</div>
                        </div>
                    </div>
                    <div class="tab pointer" data-target="tab_ul" onclick="cart.changeRegisterType('ul');">
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
                            <label>Пароль <span class="required_field">*</span></label>
                            <div class="float-r">
                                <div class="field">
                                    <input type="text" class="form-control" name="password" minlength="8" placeholder="********" />
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

                        <div class="register mb-20">
                            <div class="d-flex float-r" style="width: 352px;">
                                <label class="custom_checkbox">
                                    <input type="checkbox" class="mr-20" name="rules" checked />
                                    <span></span>
                                    <a href="#">Обработка персональных данных</a>
                                </label>
                            </div>
                        </div>

                        <button type="submit">Регистарция</button>

                    </div>

                </form>

            </div>

        </div>

        </div>

    </div>

@endsection
