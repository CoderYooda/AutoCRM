@if(isset($categories['parent']))
    <div class="box">
        <div class="box-header">
            <span class="float-right">
                <a style="font-size: 18px;" onclick="openDialog('createCategory', '&category_select={{ $categories['parent']->id }}')" class="">
                    <i class="fa fa-plus"></i>
                </a>
            </span>
            <h3>
                @if(!$categories['parent']->locked)
                    @if(isset($cat_info) && $cat_info != NULL)
                        <a href="{{ route($cat_info['route'], array_merge($cat_info['params'], ['category_id' => $categories['parent']->category_id])) }}" class="ajax-nav"><i class="fa fa-caret-square-o-left"></i></a>
                    @else
                        <a href="{{ route('PartnerIndex', ['category_id' => $categories['parent']->category_id]) }}" class="ajax-nav"><i class="fa fa-caret-square-o-left"></i></a>
                    @endif
                @endif
                {{ $categories['parent']->name }}
            </h3>
        </div>
        <div class="box-divider m-0"></div>
    </div>
{{--    <div class="modal-header">--}}
{{--        <h5 class="modal-title">--}}
{{--            @if(!$categories['parent']->locked)--}}
{{--                @if(isset($cat_info) && $cat_info != NULL)--}}
{{--                    <a href="{{ route($cat_info['route'], array_merge($cat_info['params'], ['category_id' => $categories['parent']->category_id])) }}" class="ajax-nav"><i class="fa fa-caret-square-o-left"></i></a>--}}
{{--                @else--}}
{{--                    <a href="{{ route('PartnerIndex', ['category_id' => $categories['parent']->category_id]) }}" class="ajax-nav"><i class="fa fa-caret-square-o-left"></i></a>--}}
{{--                @endif--}}
{{--            @endif--}}
{{--            {{ $categories['parent']->name }}--}}
{{--        </h5>--}}
{{--        <a style="font-size: 18px;" onclick="openDialog('createCategory', '&category_select={{ $categories['parent']->id }}')" class="">--}}
{{--            <i class="fa fa-plus"></i>--}}
{{--        </a>--}}
{{--    </div>--}}
@endif
@foreach($categories['stack'] as $category)
    @include('category.element')
@endforeach
