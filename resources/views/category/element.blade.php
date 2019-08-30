<span id="category_{{ $category->id }}" class="d-flex lgi">

    @if(isset($cat_info) && $cat_info != NULL)
        <a href="{{ route($cat_info['route'], array_merge($cat_info['params'], ['category_id' => $category->id])) }}" class="flex-grow-1 folder-link ajax-nav" style="line-height: 42px">
    @else
        <a href="{{ request()->headers->get('referer') }}" class="flex-grow-1 folder-link ajax-nav" style="line-height: 42px">
    @endif
        <i class="fa fa-folder"></i>
{{--        <span class="float-right badge warning">{{ $category->childs()->count() }}</span> --}}
        {{ $category->name }}
    </a>
    <span class="cat-but-padding float-right">
        <a onclick="openDialog('editCategory', '&category_id={{ $category->id }}')" class="btn btn-sm badge success text-white"><i class="fa fa-eye"></i></a>
        <a onclick="category.remove({{ $category->id }})" class="btn btn-sm badge danger text-white"><i class="fa fa-remove"></i></a>
    </span>
</span>
