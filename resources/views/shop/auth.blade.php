<div id="auth-tabs">
    <div class="tabs">
        <div class="tab active link-tab" data-link="login" >Вход</div>
        <div class="tab link-tab" data-link="register">Регистрация</div>
    </div>
    <div class="tabs-container">
        <div class="tab active container-tab" data-tag="login">
            <div style="width: 328px">
                <div class="form-group">
                    <input name="phone" placeholder="Номер телефона" type="text">
                </div>
                <div class="form-group">
                    <input name="password" placeholder="Пароль" type="password">
                </div>
                <div class="form-group">
                    <button type="button">Войти</button>
                    <span class="recover-link"><a href="#">Забыли пароль?</a></span>
                </div>
            </div>
        </div>
        <div class="tab container-tab" data-tag="register">
            <div style="width: 328px">
                <div class="form-group">
                    <input class="is-invalid" name="phone" placeholder="Номер телефона" type="text">
                    <span class="invalid">Что то с полем не так</span>
                </div>
                <div class="form-group">
                    <input name="password" placeholder="Пароль" type="password">
                </div>
                <div class="confirm">
                    <input type="checkbox" checked> <span>Согласие на обработку персональных данных</span>
                </div>
                <div class="form-group">
                    <button class="w-100" type="button">Зарегистрироваться</button>
                </div>
            </div>
        </div>
    </div>
</div>
