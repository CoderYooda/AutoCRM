
@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.metaXHR' : 'classic.catalogue.index')

@section('meta')
    @include(get_template() . '.catalogue.search')
    <div style="overflow: auto" class="box-lister catalogue mt-0">
        <div id="ajax-table-store" class="">
            <div id="marksPage">
                @if( isset($result->breadcrumbs))
                    @include(get_template() . '.catalogue.breadcrumbs', ['breadcrumbs' => $result->breadcrumbs])
                @endif
                <div id="tabs-cont" class="cat-tabs-cont">

                </div>
                <div class="bricks">
                    @foreach($types as $type)
                        <div class="mark_type hide" data-type="{{ $type->value }}" data-name="{{ $type->name }}" >
                            <div class="cat_item_container">
                                @if(isset($type->marks))
                                    @foreach($type->marks as $mark)
                                        <div class="box cat_item search_link" data-search_name="{{ $mark->name }}" >
                                                <div class="bookmark" onclick="window.storecatalogs.addFavour(this)"></div>
                                                <a class="ajax-nav" href="{{ route('CatalogueMark', ['active_tab' => 'catalogue', 'type' => $type->value, 'mark' => $mark->value]) }}" >
                                                    <span>
                                                        <img src="{{ $mark->image }}" alt="">
                                                        {{ $mark->name  }}
                                                    </span>
                                                </a>
                                        </div>
                                        {{--<a class="ajax-nav search_link" data-search_name="{{ $mark->name }}" href="{{ route('CatalogueMark', ['active_tab' => 'catalogue', 'type' => $type->value, 'mark' => $mark->value]) }}">--}}
                                            {{--<div class="box cat_item">--}}
                                                {{--<div class="bookmark" onclick="window.storecatalogs.addFavour(this)"></div>--}}
                                                {{--<span>--}}
                                                    {{--<img src="{{ $mark->image }}" alt="">--}}
                                                    {{--{{ $mark->name  }}--}}
                                                {{--</span>--}}

                                            {{--</div>--}}
                                        {{--</a>--}}
                                    @endforeach
                                @endif
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
@endsection
