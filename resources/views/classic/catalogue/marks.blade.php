
@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.metaXHR' : 'classic.catalogue.index')

@section('meta')

    <div style="overflow: auto" class="box-lister catalogue">
        <div id="ajax-table-store" class="">
            @if( isset($result->breadcrumbs))
                @include(get_template() . '.catalogue.breadcrumbs', ['breadcrumbs' => $result->breadcrumbs])
            @endif
            @foreach($types as $type)
                <h2>{{ $type->name }}</h2>
                <div class="cat_item_container">
                    @if(isset($type->marks))
                        @foreach($type->marks as $mark)
                            <a class="ajax-nav" href="{{ route('CatalogueMark', ['active_tab' => 'catalogue', 'type' => $type->value, 'mark' => $mark->value]) }}">
                                <div class="box cat_item">
                                    <img src="{{ $mark->image }}" alt="">
                                    {{ $mark->name  }}
                                </div>
                            </a>
                        @endforeach
                    @endif
                </div>
            @endforeach
        </div>
    </div>

@endsection
