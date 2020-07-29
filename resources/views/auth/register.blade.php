@extends(get_template() . '.layouts.auth')

@section('content')
    <div class="auth-block">
        {{--<div id="sms-box" class="black-back hide">
            <div class="p-4 box sms-confirm animate fadeIn fadeOut">
                <h2 class="mt-4 font-bold text-center">Подтверждение номера</h2>
                <span style="padding: 20px 0;display: block;">На Ваш номер выслан SMS-код для подтверждения телефона. Он придет в течение минуты.</span>
                <div class="form-group text-center">
                    <div class="mt-4 mb-4">
                        <input onkeydown="window.register.typeSms(this)" maxlength="5" class="w-200 m-auto form-control form-control-lg text-center number-confirm" type="text" placeholder="Код из смс">
                    </div>
                </div>
            </div>
        </div>--}}


        <div class="auth-form-block">
                <div class="mb-5">
                    <h5 class="login-text">Регистрация</h5>
                    @if (\Session::has('banned'))
                        <h4>{!! \Session::get('banned')[0] !!}</h4>
                    @endif
                </div>
                <form onsubmit="register.submitForm(this, event)" id="registerForm" method="POST" action="{{ route('register') }}">
                    @csrf

                    <div class="mx-auto  animate fadeIn text-left" >
                        <div class="form-group @error('fio') is-invalid @enderror">
                            <label>Фамилия Имя Отчество</label>
                            <input class="md-input form-control" name="fio" value="{{ old('fio') }}" onkeyup="this.setAttribute('value', this.value);" autofocus required>
                            @error('fio')
                            <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <div class="form-group @error('phone') is-invalid @enderror">
                            <label>Номер телефона</label>
                            <input id="phone_input" class="md-input form-control" name="phone" value="{{ old('phone') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            @error('phone')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                        <div class="form-group @error('password') is-invalid @enderror">
                            <label>Пароль</label>
                            <input type="password" name="password" class="md-input form-control" value="{{ old('password') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label>Подтверждение</label>
                            <input type="password" name="password_confirmation" class="md-input form-control" value="{{ old('password_confirmation') }}" onkeyup="this.setAttribute('value', this.value);" required>
                        </div>

                        <div id="sms-box" class="hide">{{--hide--}}
                            <div class="form-group">
                                <label>Код смс</label>
                                <div class="sms-wrap">
                                    <input onkeydown="window.register.typeSms(this)" maxlength="5" class="form-control text-center register-number-confirm" type="text">
                                    <span class="sms-link" onclick="window.register.sendSMSAgain()">Повторно отправить смс</span>
                                </div>
                                <span class="sms-desc">На Ваш номер выслан SMS-код для подтверждения телефона. Он придет в течение минуты.</span>
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

                    <p class="login-policy">
                        Регистрируясь, вы подтверждаете, что принимаете
                        <a href="https://bbcrm.ru/files/contract.pdf" target="_blank" class="login-policy-link">Договор-оферту и обработку персональных данных</a>.
                    </p>

                    <button type="submit" class="button login-button">
                        Создать аккаунт
                    </button>
                </form>
                <div class="create-acc-box">
                    <a href="{{ route('login') }}" class="">Уже есть аккаунт</a>
                </div>
                <div class="create-acc-box">
                    <a href="{{ route('PassReset') }}" class="">Восстановить пароль</a>
                </div>

        </div>
    </div>

@endsection
