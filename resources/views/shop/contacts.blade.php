@extends('shop.layout.app')

@section('content')

    <script>
        window.coordinates = [{{ $shop->address_coords }}];
    </script>

    <div class="body">

        @include('shop.includes.breadcrumbs')

        <div class="contacts container bg-white">
            <div class="title">
                <h2>Контакты компании</h2>
            </div>
            <div class="contacts-container">
                <div class="info-block">
                    <div class="store-name">
                        {{ $shop->name }}
                    </div>
                    <div class="address">
                        {{ $shop->address_name }}
                    </div>
                    <div class="mail-phone-container">
                        @foreach($shop->phones as $phone)
                            <div class="item">
                                <div class="key">{{ $phone['desc'] }}</div>
                                <div class="value"><a href="tel: +{{ $phone['number'] }}">{{ display_phone($phone['number']) }}</a></div>
                            </div>
                        @endforeach

                        @foreach($shop->contactEmails as $email)
                            <div class="item">
                                <div class="key">{{ $email['desc'] }}</div>
                                <div class="value">
                                    <a href="mailto:{{ $email['email'] }}" >{{ $email['email'] }}</a>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
                <div class="map-holder">
                    <div id="map" class="map"></div>
                </div>
            </div>
        </div>
    </div>

@endsection
