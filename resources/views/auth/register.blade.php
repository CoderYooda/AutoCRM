@extends('layouts.auth')

@section('content')
    <div class="py-5 text-center" style="position: relative">
        <div class="p-4 box sms-confirm animate fadeIn">
            <h5 class="mt-4 font-bold text-center">Подтверждение номера</h5>
            <div class="form-group text-center">
                <div class="mt-4 mb-4">
                    <input class="w-200 m-auto form-control form-control-lg text-center" type="number" placeholder="Код из смс">
                </div>
            </div>
        </div>
        <div class="mx-auto w-xxl w-auto-xs">
            <div class="px-3">

                <form onsubmit="register.submitForm(event)" id="registerForm" method="POST" action="{{ route('register') }}">
                    @csrf

                    <div class="mx-auto w-xl w-auto-xs animate fadeIn text-left" >
                        <div class="mb-5 text-center">
                            <div class="mt-3 font-bold">Регистрация в системе</div>
                        </div>

                        <div class="md-form-group float-label @error('fio') is-invalid @enderror">
                            <input class="md-input" name="fio" value="{{ old('fio') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            @error('name')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            <label>Фамилия Имя Отчество</label>
                        </div>

                        <div class="md-form-group float-label @error('phone') is-invalid @enderror">
                            <input id="phone_input" class="md-input" name="phone" value="{{ old('phone') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            @error('phone')
                            <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            <label>Номер телефона</label>
                        </div>
                        <div class="md-form-group float-label @error('email') is-invalid @enderror">
                            <input type="text" name="email" class="md-input" value="{{ old('email') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            @error('email')
                            <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            <label>E-mail</label>
                        </div>
                        <div class="md-form-group float-label @error('password') is-invalid @enderror">
                            <input type="password" name="password" class="md-input" value="{{ old('password') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            @error('password')
                            <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            <label>Пароль</label>
                        </div>
                        <div class="md-form-group float-label">
                            <input type="password" name="password_confirmation" class="md-input" value="{{ old('password_confirmation') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            <label>Подтверждение</label>
                        </div>
                    </div>


                    {{--<div class="form-group">--}}
                        {{--<input id="name" placeholder="Имя" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>--}}
                        {{--@error('name')--}}
                        {{--<span class="invalid-feedback" role="alert">--}}
                                    {{--<strong>{{ $message }}</strong>--}}
                                {{--</span>--}}
                        {{--@enderror--}}
                    {{--</div>--}}

                    {{--<div class="form-group ">--}}
                        {{--<input id="phone" placeholder="phone" type="text" class="phone_input form-control @error('phone') is-invalid @enderror" name="phone" value="{{ old('phone') }}" required autocomplete="phone">--}}
                        {{--@error('phone')--}}
                        {{--<span class="invalid-feedback" role="alert">--}}
                                    {{--<strong>{{ $message }}</strong>--}}
                                {{--</span>--}}
                        {{--@enderror--}}
                    {{--</div>--}}
                    {{--<div class="form-group ">--}}
                        {{--<div class="input-group">--}}
                            {{--<input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">--}}
                            {{--<div class="input-group-append">--}}
                                {{--<button class="btn white" type="button">Button</button>--}}
                            {{--</div>--}}
                        {{--</div>--}}
                    {{--</div>--}}

                    {{--<div class="form-group ">--}}
                        {{--<input id="email" placeholder="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">--}}
                        {{--@error('email')--}}
                        {{--<span class="invalid-feedback" role="alert">--}}
                                    {{--<strong>{{ $message }}</strong>--}}
                                {{--</span>--}}
                        {{--@enderror--}}
                    {{--</div>--}}

                    {{--<div class="form-group">--}}
                        {{--<input id="password" placeholder="Пароль" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">--}}

                        {{--@error('password')--}}
                        {{--<span class="invalid-feedback" role="alert">--}}
                                    {{--<strong>{{ $message }}</strong>--}}
                                {{--</span>--}}
                        {{--@enderror--}}
                    {{--</div>--}}

                    {{--<div class="form-group ">--}}
                        {{--<input id="password-confirm" placeholder="Подтверждение" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">--}}
                    {{--</div>--}}

                    <div class="form-group mb-0">
                        <button type="submit" class="btn primary">
                            Создать аккаунт
                        </button>
                    </div>
                </form>
                <div class="py-4 text-center">
                    <div>
                        <a href="{{ route('login') }}" class="text-primary _600">Войти в аккаунт</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
