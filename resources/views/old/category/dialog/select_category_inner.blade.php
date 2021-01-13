<div class="modal-header">
    @if(!$searching)
        <h5 class="modal-title">
            @if($category->id != $root)
                <a onclick="selectCategoryDialog.select({{ $category->category_id }})" class="ajax-nav"><i class="fa fa-chevron-left"></i></a>
                {{--<button onclick="selectCategoryDialog.select({{ $category->category_id }})" class="btn btn-sm success"><i class="fa fa-arrow-left"></i></button>--}}
            @endif{{ $category->name }}
        </h5>
        <button onclick="try{window.{{$request['refer']}}.selectCategory({{ $category->id }})}catch (e) {}" class="btn btn-icon white float-right">
            <i class="fa fa-check"></i>
        </button>
        {{--<button onclick="window.{{$request['refer']}}.selectCategory({{ $category->id }})" class="btn btn-sm success"><i class="fa fa-check"></i></button>--}}
    @else
        <h5 class="modal-title">Поиск</h5>
    @endif
</div>

<div data-simplebar style="max-height: 300px;">
    <div class="nlborder list-group box mb-0">
        @if(!$searching)
            @foreach($category->childs as $child)
                <span class="d-flex">
                    <a class="folder-link list-group-item w-100" onclick="selectCategoryDialog.select({{ $child->id }})"><i class="fa fa-folder"></i> {{ $child->name }}</a>

                    @if($request['refer'] != null && strpos($request['refer'], 'partner') !== false)
                        <div class="sp-p">
                            <button onclick="try{window.{{$request['refer']}}.selectCategory({{ $child->id }})}catch (e) {}" class="btn btn-icon white float-right">
                                <i class="fa fa-check"></i>
                            </button>
                            {{--<button onclick="try{window.{{$request['refer']}}.selectCategory({{ $child->id }})}catch (e) {}" class="btn btn-sm success"><i class="fa fa-check"></i></button>--}}
                        </div>
                    @else
                        <div class="sp-p">
                            <button onclick="try{window.{{$request['refer']}}.selectCategory({{ $child->id }})}catch (e) {}" class="btn btn-icon white float-right">
                                <i class="fa fa-check"></i>
                            </button>
                            {{--<button onclick="try{window.{{$request['refer']}}.selectCategory({{ $child->id }})}catch (e) {}" class="btn btn-sm success"><i class="fa fa-check"></i></button>--}}
                        </div>
                    @endif
                </span>
            @endforeach
        @else
            @foreach($categories as $category)
                <span class="d-flex">
                    <a class="folder-link list-group-item w-100" onclick="selectCategoryDialog.select({{ $category->id }})"><i class="fa fa-folder"></i> {{ $category->name }}</a>

                    @if($request['refer'] != null && strpos($request['refer'], 'partner') !== false)
                        <div class="sp-p">
                            <button onclick="try{window.{{$request['refer']}}.selectCategory({{ $category->id }})}catch (e) {}" class="btn btn-sm success"><i class="fa fa-check"></i></button>
                        </div>
                    @else
                        <div class="sp-p">
                        <button onclick="try{window.{{$request['refer']}}.selectCategory({{ $category->id }})}catch (e) {}" class="btn btn-sm success"><i class="fa fa-check"></i></button>
                        </div>
                    @endif
                </span>
            @endforeach
        @endif
    </div>
</div>
