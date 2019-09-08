<li class="d-flex flex category-aside" id="category_{{ $category->id }}" >

    @if(isset($cat_info) && $cat_info != NULL)
        <a href="{{ route($cat_info['route'], array_merge($cat_info['params'], ['category_id' => $category->id])) }}" class="ajax-nav d-flex text-ellipsis" style="flex: auto;">
    @else
        <a href="{{ request()->headers->get('referer') }}" class="ajax-nav d-flex text-ellipsis" style="flex: auto;">
    @endif
        <span class="nav-text text-ellipsis">{{ $category->name }}</span>
     </a>
    <div class="d-none actions" style="flex: none">
        <a onclick="openDialog('editCategory', '&category_id={{ $category->id }}')"><i class="fa fa-pencil"></i></a>
        <a onclick="category.remove({{ $category->id }})"><i class="fa fa-remove"></i></a>
    </div>
</li>