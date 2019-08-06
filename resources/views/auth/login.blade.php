@extends('layouts.auth')

@section('content')
    <div class="py-5 text-center">
        <div class="mx-auto w-xxl w-auto-xs">
            <div class="px-3">
                <form method="POST" action="{{ route('login') }}">
                    @csrf
                    <div class="form-group">
                        <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                        @error('email')
                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                        @error('password')
                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                        @enderror
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
