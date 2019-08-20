@if(isset($categories['parent']))
    <div class="modal-header">
        <h5 class="modal-title">
            @if(!$categories['parent']->locked)
                <a href="{{ route('PartnerIndex', ['category_id' => $categories['parent']->category_id]) }}" class="ajax-nav"><i class="fa fa-caret-square-o-left"></i></a>
            @endif
            {{ $categories['parent']->name }}
        </h5>
        <a style="font-size: 18px;" onclick="openDialog('createCategory', '&category_select={{ $categories['parent']->id }}')" class="">
            <i class="fa fa-plus"></i>
        </a>
    </div>
@endif
@foreach($categories['stack'] as $category)
    @include('category.element')
@endforeach
