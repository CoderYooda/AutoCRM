@extends(get_template() . '.layouts.auth')

@section('content')
    <div class="auth-block auth-block-login">
        <div class="auth-form-block">
            <div class="px-3">
                <div id="title" class="mb-5">
                    <h5 class="login-text">Восстановление доступа</h5>
                </div>
                <form method="POST" action="{{ route('PassResetPost') }}">
                    @csrf
                    <input type="hidden" name="hash" id="sms_hash" value="">
                    <input type="hidden" name="sms_id" id="sms_id" value="">
                    <div class="text-left">
                        <div id="phone_input_c" class="form-group  @error('phone') is-invalid @enderror">
                            <label>Номер телефона</label>
                            <input id="phone_input" class="form-control" name="phone" value="{{ old('phone') }}" onkeyup="this.setAttribute('value', this.value);" required>
                            @error('phone')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                            @enderror
                        </div>
                        <div id="sms-box" class="hide">{{--hide--}}
                            <div class="form-group">
                                <label>Код смс</label>
                                <div class="sms-wrap">
                                    <input id="sms_code" maxlength="5" class="form-control text-center register-number-confirm" type="text">
                                    <span class="sms-link" >SMS-код придет <br>в течении минуты</span>
                                </div>
                            </div>
                        </div>
                        <div id="sms_pass_input" class="form-group @error('password') is-invalid @enderror hide">
                            <label>Новый пароль</label>
                            <input type="password" name="password" id="password" class="md-input form-control" value="{{ old('password') }}"  required>
                            @error('password')
                            <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                        <div id="sms_pass_confirmation" class="form-group hide">
                            <label>Подтверждение</label>
                            <input type="password" id="password_confirmation" name="password_confirmation" class="md-input form-control" value="{{ old('password_confirmation') }}" required>
                        </div>
                        <div id="back_to_work" class="form-group hide" style="text-align: center">
                            <div class="mb-10">Пароль обновлён, можно</div>
                            <button type="button" onclick="window.passwordreset.gotoLogin()" class="button primary login-button">Приступить к работе</button>
                        </div>
                        <button id="send_sms" type="button" onclick="window.passwordreset.sendSMS()" class="button primary login-button">Далее</button>
                        <button id="recover" type="button" onclick="window.passwordreset.confirmSMS()" class="button primary login-button hide">Подтвердить</button>
                        <button id="action" type="button" onclick="window.passwordreset.changePass()" class="button primary login-button hide">Восстановить</button>
                    </div>
                </form>
                <div id="create_acc" class="create-acc-box">
                    <a href="{{ route('register') }}" class="">Создать аккаунт</a>
                </div>
            </div>
        </div>
    </div>
@endsection
