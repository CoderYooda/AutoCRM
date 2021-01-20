{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин | Внешний вид')

@section('tab')

    <div id="ajax-shop-appearance" class="bottom-container" style="height: calc(100% - 30px) !important;">

        <div class="box m-15 p-15 w-100">



        </div>

    </div>

@endsection

