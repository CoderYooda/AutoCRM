@extends('shop.layout.app')

@section('content')

    <div class="body">

        @include('shop.includes.breadcrumbs')

        <div class="universal-text container bg-white">
            <div class="title">
                <h2>Гарантии и возврат</h2>
                @if($shop->warranty_desc)
                    <div class="d-flex">
                        <div class="text">{!! $shop->warranty_desc !!}</div>
                    </div>
                @else
                    <div class="empty_table">Раздел на стадии заполнения</div>
                @endif
            </div>
        </div>
    </div>

@endsection
