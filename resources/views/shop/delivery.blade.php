@extends('shop.layout.app')

@section('content')
<script>
    window.coordinates = [52.751574, 37.573856];
</script>
<div class="body">

    @include('shop.includes.breadcrumbs')

    <div class="universal-text container bg-white">
        <div class="title">
            <h2>Оплата и доставка</h2>
            @if($shop->delivery_desc)
                <div class="d-flex">
                    <div class="text">{!! $shop->delivery_desc !!}</div>
                </div>
            @else
                <div class="empty_table">Пусто</div>
            @endif
        </div>
    </div>
</div>
@endsection
