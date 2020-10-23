<div id="auth-tabs">

    <div style="width: 328px; padding: 20px;">
        <form action="{{ route('user.loginAction') }}" onsubmit="auth.login(this);">
            @csrf
            <input type="hidden" name="company_id" value="{{ $shop->company_id }}">
            <div class="form-group">
                <input name="phone" class="phone" placeholder="Номер телефона" type="text">
            </div>
            <div class="form-group">
                <input name="password" placeholder="Пароль" type="password">
            </div>
            <div class="form-group mb-0">
                <button type="submit" onclick="auth.login(this);">Войти</button>
                <span class="recover-link"><a href="#">Забыли пароль?</a></span>
            </div>
        </form>
    </div>
</div>
