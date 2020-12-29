@extends('shop.layout.app')

@section('title', $selectedCategory->name)

@section('content')
<div class="body">

    @include('shop.includes.breadcrumbs')

    <div class="in-category container bg-white">
        <div class="title">
            <h2>{{ $selectedCategory->name }}</h2>
        </div>

        <div class="in-category-container">
            <div class="left-menu-container">
                <div class="button_back">
                    @if($selectedCategory->category_id != 2)
                        <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                        <a href="{{ $selectedCategory->parent->path() }}">Назад</a>
                    @endif
                </div>

                @if(count($selectedCategory->childs))
                    <ul>
                        @foreach($selectedCategory->childs as $category)
                            <li @if($category->id == $selectedCategory->id) class="active" @endif>
                                <a title="{{ $category->name }}" href="{{ $category->path() }}">{{ $category->name }}</a>
    {{--                            @if($category->id == $selectedCategory->id && count($category->childs))--}}
    {{--                                <ul>--}}
    {{--                                    @foreach($category->childs as $childrenCategory)--}}
    {{--                                        <li>--}}
    {{--                                            <a href="{{ $childrenCategory->path() }}">{{ $childrenCategory->name }}</a>--}}
    {{--                                        </li>--}}
    {{--                                    @endforeach--}}
    {{--                                </ul>--}}
    {{--                            @endif--}}
                            </li>
                        @endforeach
                    </ul>
                @endif
            </div>

            @include('shop.includes.product_list')

        </div>

    </div>
</div>
@endsection
