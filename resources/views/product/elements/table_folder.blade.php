<a href="{{ route('StoreIndex', ['category_id' => $category->id]) }}" class="folder-link list-group-item ajax-nav">
    <i class="fa fa-folder"></i><span class="float-right badge warning">{{ $category->childs()->count() }}</span> {{ $category->name }}
</a>