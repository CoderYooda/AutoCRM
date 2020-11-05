@extends('shop.layout.app')

@section('content')
<div class="body">

    @include('shop.includes.breadcrumbs')

    <div class="in-category container bg-white">
        <div class="title">
            <h2>Избранное</h2>
        </div>

        <div class="in-category-container">
            @include('shop.includes.product_list')
        </div>

    </div>
</div>
@endsection
