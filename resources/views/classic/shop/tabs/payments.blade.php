{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин | Способы оплаты')

@section('tab')

    <div id="ajax-shop-payments" class="bottom-container" style="height: calc(100% - 30px) !important;">

        <div class="box m-15 p-15 w-100">

            <div class="paymenys">

                <div class="payment">

                    <div class="logotype"></div>

                    <div class="status">
                        <label class="ui-switch float-left"></label>
                    </div>

                </div>

            </div>

        </div>

    </div>

@endsection

