<span id="category_{{ $category->id }}" class="d-flex lgi">
    <a href="{{ route('StoreIndex', ['category_id' => $category->id]) }}" class="flex-grow-1 folder-link ajax-nav" style="line-height: 42px">
        <i class="fa fa-folder"></i>
{{--        <span class="float-right badge warning">{{ $category->childs()->count() }}</span> --}}
        {{ $category->name }}
    </a>
    <span class="cat-but-padding float-right">
        <a onclick="openDialog('editCategory', {{ $category->id }})" class="btn btn-sm badge success text-white"><i class="fa fa-eye"></i></a>
        <a onclick="category.remove({{ $category->id }})" class="btn btn-sm badge danger text-white"><i class="fa fa-remove"></i></a>
    </span>
</span>


