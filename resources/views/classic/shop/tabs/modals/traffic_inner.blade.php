<form action="{{ route('ShopUpdateAnalytics') }}" method="POST">

    <label>{{ $info['name'] }}</label>

    @foreach($info['fields'] as $fieldName => $params)

        <div data-error="{{ $fieldName }}" class="input-group mb-10 method">
            <input type="text" name="{{ $fieldName }}" class="form-control mr-5" placeholder="{{ $params['placeholder'] }}" value="{{ $params['value'] }}">
        </div>

    @endforeach

    <div class="form-group">

        <button class="button float-left" data-dismiss="modal" type="button">Закрыть</button>
        <button class="button green float-right" onclick="shop.saveAnalytics(this);" type="button">Сохранить</button>

    </div>

</form>
