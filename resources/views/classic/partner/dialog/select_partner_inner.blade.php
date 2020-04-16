<div id="search_partner_categories" class="col-sm-3 no-pr">
    @include(env('DEFAULT_THEME', 'classic') . '.category.modal_categories')
</div>
<div class="col-sm-9 no-pl">
    @if($partners->count() > 0)
        <div class="" data-simplebar style="max-height: 400px;">
            <div class="box-body">
                <ul class="nav select-list-modal mb-0">
                    @foreach($partners as $partner)
                        <li id="providerorder_item_{{ $partner->id }}" onclick="try{window.{{$request['refer']}}.selectPartner({{ $partner->id }}@if(isset($request['target']) && $request['target'] != null), '{{$request['target']}}' @endif)}catch (e) {}" class="pointer d-flex " >
                            <div class="ring-ico">
                                <span class="first_letter">{{ $partner->firstLetterOfName() }}</span>
                            </div>
                            <div class="list-title">
                                {{ $partner->outputName() }}
                                <div class="secondary">{{ $partner->firstActivePhoneNumber() }}</div>
                            </div>
                            <div class="list-body">
                                <div class="date">Дисконт: в разработке</div>
                                <div class="secondary">Тип: {{ $partner->isflText() }}</div>
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
                    Контактов по запросу <b>{{ $request['string'] }}</b> не найдено
                </div>

            </div>
            <button onclick="openDialog('partnerDialog', '&category_select={{ $categories['parent']->id }}')" class="button success mb-15">Новый контакт</button>
        </div>
    @else
        <div class="padding text-center">
            <div>
                <div class="out_of_search"></div>
                <div class="mb-15">
                    Контактов в этой категории нет
                </div>
            </div>
            <button onclick="openDialog('partnerDialog', '&category_select={{ $categories['parent']->id }}')" class="button success mb-15">Новый контакт</button>
        </div>
    @endif
</div>


