@extends(get_template() . '.layouts.auth')

@section('content')
    <div class="auth-block auth-block-login">
        <div class="auth-form-block">
            <div class="px-3">
                <div class="mb-5">
                    <h5 class="login-text">Авторизация</h5>
                    @if (\Session::has('banned'))
                        <h4>{!! \Session::get('banned')[0] !!}</h4>
                    @endif
                </div>
                <form method="POST" action="{{ route('login') }}">
                    {{--@csrf--}}
                    <div class="text-left">
                        <div class="form-group  @error('phone') is-invalid @enderror">
                            <label>Номер телефона</label>
                            <input id="phone_input" class="form-control" name="phone" value="{{ old('phone') }}" onkeyup="this.setAttribute('value', this.value);" autofocus required>
                            @error('phone')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                            @enderror
                        </div>
                        <div class="form-group  @error('password') is-invalid @enderror">
                            <label>Пароль</label>
                            <input id="password" type="password" class="form-control" name="password" value="{{ old('password') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            @error('password')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                            @enderror
                        </div>
                        <button type="submit" class="button primary login-button">Войти</button>
                    </div>
                </form>
                <div class="create-acc-box">
                    <a href="{{ route('register') }}" class="">Создать аккаунт</a>
                </div>
                <div class="create-acc-box">
                    <a href="{{ route('PassReset') }}" class="">Восстановить пароль</a>
                </div>
            </div>
        </div>
    </div>
@endsection
