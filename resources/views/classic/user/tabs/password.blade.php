@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.user.index')

@section('tab')
    <form method="POST" action="{{ route('UserPassStore') }}">
        @csrf
        <div class="box p-15">
            <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right w-180">Старый пароль</label>
                <div class="col-md-6">
                    <input id="old_password" type="password" class="form-control" name="old_password" value="" required autofocus>
                </div>
            </div>
            <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right w-180">Новый пароль</label>
                <div class="col-md-6">
                    <input id="password" type="password" class="form-control" name="password" value="" required autofocus>
                </div>
            </div>
            <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right w-180">Подтверждение</label>
                <div class="col-md-6">
                    <input id="password_confirmation" type="password" class="form-control" name="password_confirmation" value="" required autofocus>
                </div>
            </div>
            <button onclick="window.userpasswordedit.save(this)" class="button primary">Обновить пароль</button>
        </div>
    </form>
@endsection
