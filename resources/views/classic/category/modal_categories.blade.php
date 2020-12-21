<div class="dialog_category_container">
    <div>
        @if($categories['parent_root'])
            <a class="category-back-button ">
                <span class="elem_text" title="{{ $categories['parent']->name }}">{{ $categories['parent']->name }}</span>
            </a>
        @else
            @if($categories['parent']->parent)
            <a class="category-back-button" onclick="window.{{ $class }}.loadCategory({{ $categories['parent']->parent->id }}, true, true)">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                <span class="elem_text" title="{{ $categories['parent']->name }}">{{ $categories['parent']->name }}</span>
            </a>
            @endif
        @endif
        <div class="w-100" data-simplebar style="max-height: 400px;">
            <ul class="nav mt-5" >
                @foreach($categories['stack'] as $category)
                    <li id="category_{{ $category->id }}" class="category-item @if($request['category_id'] == $category->id) selected @endif" data-id="{{ $category->id }}">
                        <a onclick="window.{{ $class }}.loadCategory({{ $category->id }}, true, true)" class="ajax-nav category-linked-item">
                            <i class="fa fa-folder-o" aria-hidden="true"></i>
                            <span class="elem_text" title="{{ $category->name }}">{{ $category->name }}</span>
                        </a>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
</div>
