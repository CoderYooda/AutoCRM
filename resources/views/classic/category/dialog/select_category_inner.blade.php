<div id="search_partner_categories" class="col-sm-4 no-pr">
    @include(env('DEFAULT_THEME', 'classic') . '.category.modal_categories')
</div>

<div class="col-sm-8 no-pl">
    @if($cats->count())
    <div class="box-body inscroll">
        <div class="" data-simplebar style="max-height: 400px;">
            <ul class="nav select-list-modal categories_list">
                @foreach($cats as $child)
                    <li
                        @if($request['refer'] != null && strpos($request['refer'], 'partner') !== false)
                            onclick="try{window.{{$request['refer']}}.selectCategory({{ $child->id }})}catch (e) {}"
                        @else
                            onclick="try{window.{{$request['refer']}}.selectCategory({{ $child->id }})}catch (e) {}"
                        @endif
                        id="category_item_{{ $child->id }}" class="pointer d-flex " >
                        <div class="list-title">
                            {{ $child->name }}
                        </div>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
    @elseif($request && $request['string'] != null)
        <div class="padding text-center">
            <div>
                <div class="out_of_search"></div>
                <div class="mb-15">
                    Категорий по запросу <b>{{ $request['string'] }}</b> не найдено
                </div>

            </div>
            <button onclick="openDialog('partnerDialog')" class="button success mb-15">Новая категория</button>
        </div>
    @else
        <div class="padding text-center">
            <div>
                <div class="out_of_search"></div>
                <div class="mb-15">
                    Категорий в этой категории нет
                </div>
            </div>
            <button onclick="openDialog('partnerDialog')" class="button success mb-15">Новая категория</button>
        </div>
    @endif
</div>

