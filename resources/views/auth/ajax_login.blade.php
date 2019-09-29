<div class="mx-auto w-xl w-auto-xs animate fadeIn text-center">
    <form action="{{ route('login') }}" method="POST">
        @csrf
        <div class="mb-5">
            <div class="mt-3 font-bold title-sess">Сессия была завершена</div>
        </div>
        <div class="md-form-group">
            <input type="text" name="email" class="md-input text-center">
            <label class="block w-100">Логин</label>
        </div>
        <div class="md-form-group">
            <input type="password" name="password" class="md-input text-center">
            <label class="block w-100">Пароль</label>
        </div>
        <div class="mt-3">
            <button onclick="window.auth.save(this, event)" class="btn btn-rounded info">Вернуться к работе</button>
        </div>
    </form>
</div>