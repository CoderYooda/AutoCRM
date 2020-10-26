@extends('shop.layout.app')

@section('content')
    <div class="body">

        @include('shop.includes.breadcrumbs')

        @foreach($errors as $error)

            {{ $error }}

        @endforeach

        <div class="in-category container bg-white mb-0">

            <div class="title">
                <h2>Регистрация</h2>
            </div>

            @include('shop.layout.register_fields')

        </div>

        </div>

    </div>

@endsection
