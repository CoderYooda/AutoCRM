@extends(get_template() . '.layouts.auth')

@section('content')
    <div class="auth-block text-center">
        <div id="sms-box" class="black-back hide">
            <div class="p-4 box sms-confirm animate fadeIn fadeOut">
                <h2 class="mt-4 font-bold text-center">Подтверждение номера</h2>
                <span style="padding: 20px 0;display: block;">На Ваш номер выслан SMS-код для подтверждения телефона. Он придет в течение минуты.</span>
                <div class="form-group text-center">
                    <div class="mt-4 mb-4">
                        <input onkeydown="window.register.typeSms(this)" maxlength="5" class="w-200 m-auto form-control form-control-lg text-center number-confirm" type="text" placeholder="Код из смс">
                    </div>
                </div>
            </div>
        </div>
        <div class="auth-form-block">
            <div class="px-3">
                <div class="mb-5 text-center">
                    <h5 class="login-text">Регистрация</h5>
                    @if (\Session::has('banned'))
                        <h4>{!! \Session::get('banned')[0] !!}</h4>
                    @endif
                </div>
                <form onsubmit="register.submitForm(this, event)" id="registerForm" method="POST" action="{{ route('register') }}">
                    @csrf

                    <div class="mx-auto  animate fadeIn text-left" >
                        <div class="form-group row row-sm @error('fio') is-invalid @enderror">
                            <label class="col-sm-5">Фамилия Имя Отчество</label>
                            <div class="col-sm-7">
                                <input class="md-input form-control" name="fio" value="{{ old('fio') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            </div>
                            @error('fio')
                            <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror

                        </div>

                        <div class="form-group row row-sm float-label">
                            <label class="col-sm-5">Страна</label>
                            <div class="col-sm-7">
                                <select id="country" class="md-input form-control" name="country" onchange="window.register.changeCountry(this)" required>
                                    <option value="7">Россия</option>
                                    <option value="375">Беларусь</option>
                                    <option value="380">Украина</option>
                                    <option value="7">Казахстан</option>
                                </select>
                            </div>

                        </div>

                        <div class="form-group row row-sm @error('phone') is-invalid @enderror">
                            <label class="col-sm-5">Номер телефона</label>
                            <div class="col-sm-7">
                                <input id="phone_input" class="md-input form-control" name="phone" value="{{ old('phone') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            </div>
                            @error('phone')
                            <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                        <div class="form-group row row-sm @error('password') is-invalid @enderror">
                            <label class="col-sm-5">Пароль</label>
                            <div class="col-sm-7">
                                <input type="password" name="password" class="md-input form-control" value="{{ old('password') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            </div>
                            @error('password')
                            <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                        <div class="form-group row row-sm float-label">
                            <label class="col-sm-5">Подтверждение</label>
                            <div class="col-sm-7">
                                <input type="password" name="password_confirmation" class="md-input form-control" value="{{ old('password_confirmation') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            </div>
                        </div>
                    </div>
                    <div id="info" class="box-color danger pos-rlt hide">
                        <div class="box-body">
                            b-danger
                        </div>
                    </div>


                    @error('sms')
                    <div class="alert alert-success">
                        <ul>
                            <li>{{ $message }}</li>
                        </ul>
                    </div>
                    @enderror

                    <button type="submit" class="button login-button">
                        Создать аккаунт
                    </button>
                </form>
                <div class="create-acc-box">
                    <a href="{{ route('login') }}" class="">Авторизация</a>
                </div>
            </div>
        </div>
    </div>



    {{--<div class="py-5 text-center" style="position: relative">--}}

        {{--<div class="mx-auto w-xxl w-auto-xs">--}}
            {{--<div class="px-3">--}}

                {{--<form onsubmit="register.submitForm(this, event)" id="registerForm" method="POST" action="{{ route('register') }}">--}}
                    {{--@csrf--}}

                    {{--<div class="mx-auto  animate fadeIn text-left" >--}}
                        {{--<div class="mb-5 text-center">--}}
                            {{--<h5 class="mt-4 font-bold text-center">Регистрация</h5>--}}
                        {{--</div>--}}

                        {{--<div class="md-form-group float-label @error('fio') is-invalid @enderror">--}}
                            {{--<input class="md-input" name="fio" value="{{ old('fio') }}" onkeyup="this.setAttribute('value', this.value);" required>--}}
                            {{--@error('fio')--}}
                                {{--<span class="invalid-feedback" role="alert">--}}
                                    {{--<strong>{{ $message }}</strong>--}}
                                {{--</span>--}}
                            {{--@enderror--}}
                            {{--<label>Фамилия Имя Отчество</label>--}}
                        {{--</div>--}}

                        {{--<div class="md-form-group float-label">--}}
                            {{--<select id="country" class="md-input" name="country" onchange="window.register.changeCountry(this)" required>--}}
                                {{--<option value="7">Россия</option>--}}
                                {{--<option value="375">Беларусь</option>--}}
                                {{--<option value="380">Украина</option>--}}
                                {{--<option value="7">Казахстан</option>--}}
                            {{--</select>--}}
                            {{--<label>Страна</label>--}}
                        {{--</div>--}}

                        {{--<div class="md-form-group float-label @error('phone') is-invalid @enderror">--}}
                            {{--<input id="phone_input" class="md-input" name="phone" value="{{ old('phone') }}" onkeyup="this.setAttribute('value', this.value);" required>--}}
                            {{--@error('phone')--}}
                                {{--<span class="invalid-feedback" role="alert">--}}
                                    {{--<strong>{{ $message }}</strong>--}}
                                {{--</span>--}}
                            {{--@enderror--}}
                            {{--<label>Номер телефона</label>--}}
                        {{--</div>--}}
                        {{--<div class="md-form-group float-label @error('password') is-invalid @enderror">--}}
                            {{--<input type="password" name="password" class="md-input" value="{{ old('password') }}" onkeyup="this.setAttribute('value', this.value);" required>--}}
                            {{--@error('password')--}}
                            {{--<span class="invalid-feedback" role="alert">--}}
                                    {{--<strong>{{ $message }}</strong>--}}
                                {{--</span>--}}
                            {{--@enderror--}}
                            {{--<label>Пароль</label>--}}
                        {{--</div>--}}
                        {{--<div class="md-form-group float-label">--}}
                            {{--<input type="password" name="password_confirmation" class="md-input" value="{{ old('password_confirmation') }}" onkeyup="this.setAttribute('value', this.value);" required>--}}
                            {{--<label>Подтверждение</label>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                    {{--<div id="info" class="box-color danger pos-rlt hide">--}}
                        {{--<div class="box-body">--}}
                            {{--b-danger--}}
                        {{--</div>--}}
                    {{--</div>--}}


                    {{--@error('sms')--}}
                        {{--<div class="alert alert-success">--}}
                            {{--<ul>--}}
                                {{--<li>{{ $message }}</li>--}}
                            {{--</ul>--}}
                        {{--</div>--}}
                    {{--@enderror--}}


                    {{--<div class="form-group mb-0">--}}
                        {{--<button type="submit" class="btn primary">--}}
                            {{--Создать аккаунт--}}
                        {{--</button>--}}
                    {{--</div>--}}
                {{--</form>--}}
                {{--<div class="py-4 text-center">--}}
                    {{--<div>--}}
                        {{--<a href="{{ route('login') }}" class="text-primary _600">Войти в аккаунт</a>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</div>--}}
@endsection
