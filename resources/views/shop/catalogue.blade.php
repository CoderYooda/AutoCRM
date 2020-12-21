@extends('shop.layout.app')

@section('content')
<div class="body">

    @include('shop.includes.breadcrumbs')

    <div class="catalogues container bg-white">
        <div class="title">
            <h2>Каталог товаров</h2>
        </div>
        <div class="categories-container">

            @foreach($categories as $category)
                <div class="category pointer" onclick="window.location.href='{{ $category->path() }}';">
                    <div class="description">
                        <div class="title">{{ $category->name }}</div>
                        <div class="url">
                            <a title="{{ $category->name }}" href="{{ $category->path() }}">Перейти</a>
                        </div>
                    </div>
                    <div class="photo" @isset($category->image) style="background: url({{ $category->image_path }}) center no-repeat;" @endisset>
                    </div>
                </div>
            @endforeach

        </div>

        {{ $categories->links('shop.pagination.default') }}

    </div>
</div>
@endsection
