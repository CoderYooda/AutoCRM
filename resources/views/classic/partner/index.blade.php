@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') . '.layouts.XHR' : env('DEFAULT_THEME', 'classic') . '.layouts.main')

@section('title', $page ?? 'Контрагенты')

@section('content')


    <div id="ajax-table-warrant" class="bottom-container">
        <div class="content-menu box w-290" id="category-nav">
            @include(env('DEFAULT_THEME', 'classic') . '.category.aside-list')
        </div>
        <div class="box-lister box">
            <div id="table-container" class="box-content partner_page_content">
                <div id="partner-table"></div>
            </div>
        </div>
        <div class="d-flex flex-column box m-15 ml-0" style="width: 50px">
            <div class="scrollable hover">
                <div class="text-center text-sm py-3 d-flex flex-column" id="filter">
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'a']) }}">А</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'б']) }}">Б</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'в']) }}">В</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'г']) }}">Г</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'д']) }}">Д</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'е']) }}">Е</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'ё']) }}">Ё</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'ж']) }}">Ж</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'з']) }}">З</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'и']) }}">И</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'й']) }}">Й</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'к']) }}">К</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'л']) }}">Л</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'м']) }}">М</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'н']) }}">Н</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'о']) }}">О</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'п']) }}">П</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'р']) }}">Р</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'с']) }}">С</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'т']) }}">Т</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'у']) }}">У</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'ф']) }}">Ф</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'х']) }}">Х</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'ц']) }}">Ц</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'ш']) }}">Ш</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'щ']) }}">Щ</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'э']) }}">Э</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'ю']) }}">Ю</a>
                    <a class="letter_search ajax-nav" href="{{ route('PartnerIndex', ['search' => 'я']) }}">Я</a>
                </div>
            </div>
        </div>
        <div class="content-rightside">
            <div class="w-290">
                <button onclick="openDialog('warrantDialog', '&isIncoming=1')" class="w-100 button primary mb-15">Новый приходный ордер</button>
                <button onclick="openDialog('warrantDialog', '&isIncoming=0')" class="w-100 button primary mb-15">Новый расходный ордер</button>
            </div>

            <div class="box w-290 p-15 filter-panel">
                <div class="box-title">Фильтр</div>
                <div class="form-group d-flex mb-10">
                    <label class="no-wrap" for="date_filter">Период</label>
                    <input id="date_filter" type="text" name="date_filter" value="{{ request('dates_range') }}" class="form-control date_filter input_as_link" placeholder="за всё время">
                    <button type="button" onclick="window.cash.resetDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="filter_field mb-10">
                    <div class="form-group d-flex mb-10">
                        <label class="no-wrap" for="provider">Контрагент</label>
                        <input readonly onclick="window.cash.openSelectPartnerModal('partner')" id="partner_select" type="text" name="partner" value="{{ request('partner') }}" class="form-control partner input_as_link" placeholder="выбрать">
                        <button type="button" onclick="window.cash.clearList('partner', 'partner_stack')" class="right-remove"><i class="fa fa-remove"></i></button>
                    </div>
                    <div id="partner_stack"></div>
                </div>
                <hr>
                <div class="box-title">Контактная информация</div>
                <div id="contact_block"></div>
                <hr>
                <div class="box-title">Комментарий</div>
                <div id="comment_block"></div>
            </div>
        </div>
    </div>
@endsection

