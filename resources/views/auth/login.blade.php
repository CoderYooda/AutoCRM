@extends(env('DEFAULT_THEME', 'classic') . '.layouts.auth')

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
                    @csrf
                    <div class="text-left">
                        {{--<div class="form-group row row-sm ">
                            <label class="col-sm-5">Страна</label>
                            <div class="col-sm-7">
                                <select id="country" class="form-control input-c" name="country" onchange="window.login.changeCountry(this)" required>
                                    <option value="7">Россия</option>
                                    <option value="375">Беларусь</option>
                                    <option value="380">Украина</option>
                                    <option value="7">Казахстан</option>
                                </select>
                            </div>
                        </div>--}}
                        <div class="form-group  @error('phone') is-invalid @enderror">
                            <label>Номер телефона</label>
                            <input id="phone_input" class="form-control" name="phone" value="{{ old('phone') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            @error('phone')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                            @enderror
                        </div>
                        <div class="form-group  @error('password') is-invalid @enderror">
                            <label>Пароль</label>
                            <input id="password" type="password" class="form-control" name="password" value="{{ old('password') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            @error('password')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
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
                    <a href="#" class="">Восстановить пароль</a>
                </div>
            </div>
        </div>
    </div>
@endsection
