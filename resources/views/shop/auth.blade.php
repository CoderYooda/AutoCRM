<div id="auth-tabs">

    <div style="width: 328px; padding: 20px;">

        <form action="{{ route('user.loginAction') }}" method="POST" onsubmit="auth.login(this);">
            @csrf
            <div class="form-group">
                <input name="phone" class="phone" placeholder="Номер телефона" type="text">
                <div class="errors">
                    <div class="error_text">текст ошибки</div>
                    <div class="error_notify">!</div>
                </div>
            </div>
            <div class="form-group">
                <input name="password" placeholder="Пароль" type="text">
                <div class="errors">
                    <div class="error_text">текст ошибки</div>
                    <div class="error_notify">!</div>
                </div>
            </div>
            <div class="form-group">
                <label class="custom_checkbox">
                    <input type="checkbox" class="mr-20" name="remember" checked />
                    <span></span>
                    <div>Запомнить меня?</div>
                </label>
            </div>
            <div class="form-group">
                <button type="submit" class="w-100" onclick="auth.login(this);">Войти</button>
            </div>
            <div class="form-group mb-0">
                <span class="recover-link mr-20"><a href="{{ route('restore.index') }}">Забыли пароль?</a></span>
                <span class="recover-link"><a href="{{ route('user.registerForm') }}">Регистрация</a></span>
            </div>
        </form>
    </div>
</div>
