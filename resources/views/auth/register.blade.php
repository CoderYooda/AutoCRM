@extends('layouts.auth')

@section('content')
    <div class="py-5 text-center" style="position: relative">
        <div id="sms-box" class="p-4 box sms-confirm animate fadeIn fadeOut">
            <h5 class="mt-4 font-bold text-center">Подтверждение номера</h5>
            <div class="form-group text-center">
                <div class="mt-4 mb-4">
                    <input onkeydown="window.register.typeSms(this)" maxlength="5" class="w-200 m-auto form-control form-control-lg text-center" type="text" placeholder="Код из смс">
                </div>
            </div>
        </div>
        <div class="mx-auto w-xxl w-auto-xs">
            <div class="px-3">

                <form onsubmit="register.submitForm(this, event)" id="registerForm" method="POST" action="{{ route('register') }}">
                    @csrf

                    <div class="mx-auto  animate fadeIn text-left" >
                        <div class="mb-5 text-center">
                            <h5 class="mt-4 font-bold text-center">Регистрация</h5>
                        </div>

                        <div class="md-form-group float-label @error('fio') is-invalid @enderror">
                            <input class="md-input" name="fio" value="{{ old('fio') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            @error('fio')
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
