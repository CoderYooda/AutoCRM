<li id="category_{{ $category->id }}">
    @if(isset($cat_info) && $cat_info != NULL)
        <a onclick="window.store.loadCategory({{ $category->id }}, true, true)" class="ajax-nav" >
            <i class="fa fa-folder-o" aria-hidden="true"></i>
            <span title="{{ $category->name }}">{{ $category->name }}</span>
        </a>
    @endif
</li>

