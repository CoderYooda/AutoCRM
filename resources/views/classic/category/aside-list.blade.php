<div class="box-header {{ $class }}">
    @if($request['search'] == null || $request['search'] == '' || $request['search'] == 'undefined')
        @if(isset($cat_info) && $cat_info != NULL)
            @if($categories['parent']->id != $cat_info['root_id'])
                <a class="category-back-button" onclick="window.{{ $class }}.loadCategory({{ $categories['parent']->category_id }}, true, true)">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    <span title="{{ $categories['parent']->name }}">{{ $categories['parent']->name }}</span>
                </a>
            @else
                {{ $categories['parent']->name }}
            @endif
        @endif
    @else
        Поиск
    @endif
</div>
{{--data-simplebar style="max-height: 100%;"--}}
<div class="box-content" data-simplebar style="max-height: calc(100% - 54px);">
    <ul class="nav" id="category-block">
        @if($request['search'] == null || $request['search'] == '' || $request['search'] == 'undefined')
            @foreach($categories['stack'] as $category)
                @include(env('DEFAULT_THEME', 'classic') . '.category.aside-element')
            @endforeach
        @else
            <li>
                @if(isset($cat_info) && $cat_info != NULL)
                    <a onclick="window.{{ $class }}.loadCategory({{ $cat_info['root_id'] }}, true, true)" class="ajax-nav d-flex text-ellipsis" style="flex: auto;">
                        <span class="nav-text text-ellipsis"><i class="fa fa-chevron-left"></i> К категориям</span>
                    </a>
                @endif
            </li>
        @endif
    </ul>
</div>
