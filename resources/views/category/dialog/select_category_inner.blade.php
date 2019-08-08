<div class="modal-header">
    <h5 class="modal-title">
        @if(!$category->locked)
            <button onclick="selectCategory({{ $category->category_id }})" class="btn btn-sm success"><i class="fa fa-arrow-left"></i></button>
        @endif{{ $category->name }}
    </h5>
    <button onclick="pickCategory({{ $category->id }}, '{{ $category->name }}', event)" class="btn btn-sm success"><i class="fa fa-check"></i></button>
</div>
<div class="">
    <div class="nlborder list-group box mb-0">
    @foreach($category->childs as $child)
        <span class="d-flex">
            <a class="folder-link list-group-item w-100" onclick="selectCategory({{ $child->id }})"><i class="fa fa-folder"></i> {{ $child->name }}</a>
            <div class="sp-p">
                <button onclick="pickCategory({{ $child->id }}, '{{ $child->name }}', event)" class="btn btn-sm success"><i class="fa fa-check"></i></button>
            </div>
        </span>
    @endforeach
    </div>
</div>