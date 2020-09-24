{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин')

@section('tab')

    <div id="ajax-shop-warranty" class="bottom-container" style="height: calc(100% - 79px) !important;">

        <div class="box w-100 m-15 p-15">

            <form action="{{ route('ShopUpdateSettings') }}" method="POST">

                <div class="form-group">
                    <label>Гарантии и способы возврата</label>
                    <div id="editor">{!! $shop->warranty_desc ?? '' !!}</div>
                </div>

                <div>
                    <button type="button" onclick="{{ $class }}.saveWarranty(this);" class="button primary">Сохранить</button>
                </div>

            </form>

        </div>

    </div>

@endsection

