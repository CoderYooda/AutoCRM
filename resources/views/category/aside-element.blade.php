<li class="d-flex flex category-aside" id="category_{{ $category->id }}" >

    @if(isset($cat_info) && $cat_info != NULL)
        <a href="{{ route($cat_info['route'], array_merge($cat_info['params'], ['category_id' => $category->id])) }}" class="ajax-nav d-flex text-ellipsis" style="flex: auto;">
    @else
        <a href="{{ request()->headers->get('referer') }}" class="ajax-nav d-flex text-ellipsis" style="flex: auto;">
    @endif
        <span title="{{ $category->name }}" class="nav-text text-ellipsis"><i style="padding-right: 8px;" class="fa fa-folder-o text-muted"></i>{{ $category->name }}</span>
     </a>
    @if(!$category->locked)
        <div class="actions" style="opacity: 0">
            <a onclick="openDialog('categoryDialog', '&category_id={{ $category->id }}')"><i class="fa fa-pencil"></i></a>
            {{--<a onclick="category.remove({{ $category->id }})"><i class="fa fa-remove"></i></a>--}}
            <a onclick="entity.remove('category', {{ $category->id }})"><i class="fa fa-remove"></i></a>
        </div>
    @endif
</li>
