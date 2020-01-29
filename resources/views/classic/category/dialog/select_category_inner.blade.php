<div class="modal-header white with_border">
    @if(!$searching)
        <h5 class="modal-title">
            @if($category->id != $root)
                <a onclick="selectCategoryDialog.select({{ $category->category_id }})" class="ajax-nav"><i class="fa fa-chevron-left"></i> {{ $category->name }}</a>
            @else
                {{ $category->name }}
            @endif
        </h5>
        <button onclick="try{window.{{$request['refer']}}.selectCategory({{ $category->id }})}catch (e) {}" class="pick_button light show">
            выбрать
        </button>
    @else
        <h5 class="modal-title">Поиск</h5>
    @endif
</div>

<div class="box-body inscroll">
    <div class="" data-simplebar style="max-height: 400px;">
        <ul class="nav select-list-modal categories_list">
            @if(!$searching)
                @foreach($category->childs as $child)
                    <li onclick="selectCategoryDialog.select({{ $child->id }})" id="category_item_{{ $child->id }}" class="pointer d-flex " >
                        <div class="list-title">
                            {{ $child->name }}
                        </div>
                        <div class="list-body">
                            @if($request['refer'] != null && strpos($request['refer'], 'partner') !== false)
                                <button class="pick_button" onclick="try{window.{{$request['refer']}}.selectCategory({{ $child->id }})}catch (e) {}">выбрать</button>
                            @else
                                <button class="pick_button" onclick="try{window.{{$request['refer']}}.selectCategory({{ $child->id }})}catch (e) {}">выбрать</button>
                            @endif
                        </div>
                    </li>
                @endforeach
            @else
                @foreach($categories as $category)
                    <li onclick="selectCategoryDialog.select({{ $category->id }})" id="category_item_{{ $category->id }}" class="pointer d-flex " >
                        <div class="list-title">
                            {{ $category->name }}
                        </div>
                        <div class="list-body">
                            @if($request['refer'] != null && strpos($request['refer'], 'partner') !== false)
                                <button class="pick_button" onclick="try{window.{{$request['refer']}}.selectCategory({{ $category->id }})}catch (e) {}">выбрать</button>
                            @else
                                <button class="pick_button" onclick="try{window.{{$request['refer']}}.selectCategory({{ $category->id }})}catch (e) {}">выбрать</button>
                            @endif
                        </div>
                    </li>
                @endforeach
            @endif
        </ul>
    </div>
</div>
<div class="modal-footer">
    <button class="button white" onclick="window.selectCategoryDialog.finitaLaComedia(this)">Закрыть</button>
</div>
<div class="system_message">

</div>
