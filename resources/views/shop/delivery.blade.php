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
            <div class="d-flex">
                <div class="text">{!! $shop->delivery_desc !!}</div>
            </div>
        </div>
    </div>
</div>
@endsection
