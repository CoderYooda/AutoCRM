@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.metaXHR' : 'classic.catalogue.index')

@section('meta')
    @include(get_template() . '.catalogue.search')
    <div style="overflow: auto" class="box-lister catalogue">
        <div id="ajax-table-store" class="">
            @if( isset($result->breadcrumbs))
                @include(get_template() . '.catalogue.breadcrumbs', ['breadcrumbs' => $result->breadcrumbs])
            @endif
            <div>
                <h1>Каталог запчастей {{ (isset($result->model) && isset($result->model->name)) ? $result->model->name : '' }}</h1>
            </div>
            <div id="cat_box" class="">
                <div class="cat_item_container">

                        @if(isset($native))
                            <div class="d-flex" style="flex-wrap: wrap;">
                                @foreach(($result->groups ?? $result->units) as $group)
                                    <div style="flex-grow: 1;width: 100%;" class="cat-fl-box">
                                    <h2>{{ $group->name }}</h2>
                                        @if(isset($group->childs) && $group->childs != null)
                                            @foreach($group->childs as $child)
                                                @if(isset($child->childs) && $child->childs != null)

                                                    <div class="flex-1 cat-row box">
                                                        <h3>{{ $child->name }}</h3>
                                                    @foreach($child->childs as $child)
                                                        <a class="ajax-nav" href="{{ './' . end($result->breadcrumbs)->url . '/' . $child->short_name ?? 'error' }}?active_tab=catalogue">
                                                            {{ $child->name }}
                                                        </a>
                                                    @endforeach
                                                    </div>
                                                @else
                                                    <a class="ajax-nav" href="">
                                                        {{ $child->name }}
                                                    </a>
                                                @endif
                                            @endforeach
                                        @endif
                                    </div>
                                @endforeach
                            </div>
                        @else

                            @foreach(($result->groups ?? $result->units) as $group)
                            {{--@dd($group)--}}
                                @php
                                    $url = (!$grp ? ('./' . $result->breadcrumbs[4]->url . '/' . ($group->id ?? $group->short_name)) : ( isset($group->hasSubgroups) && !$group->hasSubgroups ? ( ('./' . $group->parentId . '/' . $group->id) ) : './' . $group->id)) . ($request['criteria'] ? ('?criteria='.urlencode($request['criteria'])) : '') . '?active_tab=catalogue';

                                @endphp
                                <a class="ajax-nav" href="{{ $url }}">
                                    <div class="box model_item">
                                        <img src="{{ $group->img ?? $group->image ?? '/images/no-cat-img.svg' }}" alt="">
                                        {{ $group->name ?? $group->full_name ?? 'Без названия' }}
                                    </div>
                                </a>
                            @endforeach
                        @endif
                </div>
            </div>
        </div>
    </div>
@endsection
{{--<button onclick="store.model.getModels({{ $model->mark()->first()->id }})">Назад</button>--}}
{{--<div id="cat_box" class="">--}}
    {{--@foreach($modifications as $modification)--}}
        {{--<div class="box modification_item">--}}
            {{--<div class="text">{{ $modification->name }}</div>--}}
            {{--<div class="text">{{ $modification->region }}</div>--}}
            {{--<div class="text">{{ $modification->year }}</div>--}}
            {{--<div class="text">{{ $modification->description }}</div>--}}
        {{--</div>--}}
    {{--@endforeach--}}
    {{--{{ $modifications->links() }}--}}
{{--</div>--}}
