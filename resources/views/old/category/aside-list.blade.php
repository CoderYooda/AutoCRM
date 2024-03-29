<div class="d-flex flex-column">
    {{--style="height: calc(100% - 347px);"--}}

    <div class="navbar white no-radius box-shadow pos-rlt">
    {{--    @if(isset($categories['parent']))--}}
    {{--    @endif--}}
        <span class="text-md compressed" id="category_header">
            @if($request['search'] == null || $request['search'] == '' || $request['search'] == 'undefined')
                @if(isset($cat_info) && $cat_info != NULL)
                    @if($categories['parent']->id != $cat_info['root_id'])
                        <a href="{{ route($cat_info['route'], array_merge($cat_info['params'], ['category_id' => $categories['parent']->category_id])) }}" class="ajax-nav"><i class="fa fa-chevron-left"></i></a>
                    @endif
                @endif
            {{ $categories['parent']->name }}
            @else
                Поиск
            @endif
        </span>
    </div>
    <div class="d-flex flex" data-simplebar>
        <div class="sidenav mt-2">
            <nav class="nav-border b-primary" data-nav>
                <ul class="nav" id="category_list_aside" >
                    @if($request['search'] == null || $request['search'] == '' || $request['search'] == 'undefined')
                        @foreach($categories['stack'] as $category)
                            @include('category.aside-element')
                        @endforeach
                    @else
                        <li class="d-flex flex category-aside" >
                            @if(isset($cat_info) && $cat_info != NULL)
                                <a href="{{ route($cat_info['route'], ['active_tab' => request('active_tab')]) }}" class="ajax-nav d-flex text-ellipsis" style="flex: auto;">
                                    <span class="nav-text text-ellipsis"><i class="fa fa-chevron-left"></i> К категориям</span>
                                </a>
                            @endif
                        </li>
                    @endif
                </ul>
            </nav>
        </div>
    </div>
</div>