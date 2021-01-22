{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин | Способы оплаты')

@section('tab')

    <div id="ajax-shop-payments" class="bottom-container" style="height: calc(100% - 30px) !important;">

        <div class="box m-15 p-15 w-100">

            <div class="payments">

                @foreach(['sberbank', 'tinkoff', 'yandex'] as $bank)

                    <div class="payment" onclick="{{ $class }}.openPaymentModal('{{ $bank }}');">

                        <div class="image">
                            <img src="{{ asset('/images/icons/shop-settings/' . $bank . '.svg') }}" />
                        </div>

                        <div class="status">
                            <span class="ml-2">
                                <label class="ui-switch orange mt-1">
                                    <input class="d-none" onclick="event.preventDefault();" @if($activePayment['name'] == $bank) checked @endif type="checkbox"><i></i>
                                </label>
                            </span>
                        </div>

                    </div>

                @endforeach

            </div>

        </div>

    </div>

@endsection

