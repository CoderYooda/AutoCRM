@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.metaXHR' : 'classic.catalogue.index')

@section('meta')
    <div style="overflow: auto" class="box-lister catalogue">
        <div id="ajax-table-store" class="">
            @if( isset($result->breadcrumbs))
                @include(get_template() . '.catalogue.breadcrumbs', ['breadcrumbs' => $result->breadcrumbs])
            @endif
            {{--@if( isset($result->breadcrumbs))--}}
                {{--<div class="breadcrumb">--}}
                    {{--@foreach($result->breadcrumbs as $breadcrumb)--}}
                        {{--<a href="{{ route('StoreIndex') . '/' . $breadcrumb->url }}">{{ $breadcrumb->name }}</a>--}}
                    {{--@endforeach--}}
                {{--</div>--}}
            {{--@endif--}}
            <div id="cat_box" class="">
                <div class="cat_item_container">
                    @foreach($result->models as $model)
                        <a class="ajax-nav" href="{{ './' . $result->breadcrumbs[2]->url . '/' . ($model->id ?? $model->short_name) . '?active_tab=catalogue' }}">
                            <div class="box model_item">
                                <img src="{{ $model->image ?? $model->img ?? asset('images/no_image.png') }}" alt="">
                                {{ $model->name ?? $model->short_name }}
                            </div>
                        </a>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
@endsection
