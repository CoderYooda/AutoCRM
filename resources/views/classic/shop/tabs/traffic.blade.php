{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин | Посещаемость')

@section('tab')

    <div id="ajax-shop-traffic" class="bottom-container" style="height: calc(100% - 30px) !important;">

        <div class="box m-15 p-15 w-100">

            <div class="methods">

                @foreach(['yandex_metric', 'google_analytics'] as $method)

                    <div class="method" onclick="{{ $class }}.openTrafficModal('{{ $method }}');">

                        <div class="image">
                            <img src="{{ asset('/images/icons/shop-settings/' . $method . '.svg') }}" />
                        </div>

                        <div class="status">
                            <span class="ml-2">
                                <label class="ui-switch orange mt-1">
                                    <input class="d-none" onclick="event.preventDefault();" @if($isActivated[$method]) checked @endif type="checkbox"><i></i>
                                </label>
                            </span>
                        </div>

                    </div>

                @endforeach

            </div>

        </div>

    </div>

@endsection

