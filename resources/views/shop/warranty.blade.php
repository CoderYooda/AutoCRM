@extends('shop.layout.app')

@section('content')

    <div class="body">

        @include('shop.includes.breadcrumbs')

        <div class="universal-text container bg-white">
            <div class="title">
                <h2>Гарантии и возврат</h2>
                <div class="d-flex">
                    <div class="text">{!! $shop->warranty_desc !!}</div>
                </div>
            </div>
        </div>
    </div>

@endsection
