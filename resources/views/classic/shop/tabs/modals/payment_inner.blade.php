<form action="{{ route('ShopUpdatePaymentMethods') }}" method="POST">

    <label>{{ $info['name'] }}</label>

    @foreach($info['fields'] as $fieldName => $params)

        <div data-error="methods[{{ $bank }}]" class="input-group mb-10 method">
            <input type="text" name="methods[{{ $bank }}][{{ $fieldName }}]" class="form-control mr-5" placeholder="{{ $params['placeholder'] }}" value="{{ $paymentMethods[$bank]['params'][$fieldName] ?? '' }}">
        </div>

    @endforeach

    <input type="hidden" name="methods_main" value="{{ $bank }}">

    <div class="form-group">

        <button class="button float-left" data-dismiss="modal" type="button">Закрыть</button>
        <button class="button green float-right" onclick="shop.savePaymentMethods(this);" type="button">Сохранить</button>

    </div>

</form>
