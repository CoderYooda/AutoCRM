@extends('shop.layout.app')

@section('content')
    <div class="body">

        @include('shop.includes.breadcrumbs')

        <div class="in-category container bg-white mb-0">

            <div class="title">
                <h2>Восстановление доступа</h2>
            </div>

            <div class="restore_form mt-0" style="width: 80%;">

                <form action="{{ route('restore.sendCode') }}" method="POST">

                    @csrf

                    <div class="form-group">
                        <label>Телефон <span class="required_field">*</span></label>
                        <div class="input-group">
                            <div class="field">
                                <input type="text" class="form-control phone" name="phone" placeholder="+7(999)999-99-99" />
                            </div>
                            <div class="error">12345</div>
                            <div class="sms_actions">
                                <div class="timer d-none">
                                    Повторно через: <span id="seconds">30</span> сек.
                                </div>
                                <div class="resend">
                                    <a href="#" onclick="auth.restoreCode(this);">Отправить SMS</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Код подтверждения <span class="required_field">*</span></label>
                        <div class="input-group">
                            <div class="field">
                                <input type="text" class="form-control" name="code" placeholder="****" />
                            </div>
                            <div class="error">12345</div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Новый пароль <span class="required_field">*</span></label>
                        <div class="input-group">
                            <div class="field">
                                <input type="text" class="form-control" name="password" placeholder="********" />
                            </div>
                            <div class="error">12345</div>
                        </div>
                    </div>

                    <div class="restore_button">
                        <button class="register_button" onclick="auth.confirmCode(this);" type="button">Восстановить</button>
                    </div>

                </form>

            </div>


        </div>

        </div>

    </div>

@endsection
