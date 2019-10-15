@extends('layouts.auth')

@section('content')
    <div class="py-5 text-center">
        <div class="mx-auto w-xxl w-auto-xs">
            <div class="px-3">
                <div class="mb-5 text-center">
                    <h5 class="mt-4 font-bold text-center">Авторизация</h5>
                </div>
                <form method="POST" action="{{ route('login') }}">
                    @csrf

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
                        <input id="password" type="password" class="md-input" name="password" value="{{ old('password') }}" onkeyup="this.setAttribute('value', this.value);" required>
                        @error('password')
                        <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                        @enderror
                        <label>Пароль</label>
                    </div>

                    <button type="submit" class="btn primary">Войти</button>
                </form>
                <div class="py-4 text-center">
                    <div>
                        <a href="{{ route('register') }}" class="text-primary _600">Создать аккаунт</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
