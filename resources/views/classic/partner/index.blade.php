@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') . '.layouts.XHR' : env('DEFAULT_THEME', 'classic') . '.layouts.main')

@section('title', $page ?? 'Контрагенты')

@section('content')
    @php $class = 'partner' @endphp
    <div id="ajax-table-warrant" class="bottom-container">
        <div class="content-menu box w-290" id="category-nav">
            @include(env('DEFAULT_THEME', 'classic') . '.category.aside-list')
        </div>
        <div class="box-lister">
            <div class="w-100 box box-search mb-15">
                <input id="search" name="search" placeholder="Поиск по контрагентам" class="input w-100" value="{{ request('search') }}" type="text">
                <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Очистить поиск">
                    <button class="btn_clean" onclick="window.{{$class}}.cleanSearch()"></button>
                </span>
            </div>
            <div class="box d-flex h-100">
                <div id="table-container" class="box-content partner_page_content">
                    <div id="partner-table"></div>
                </div>
            </div>
        </div>
        <div class="d-flex flex-column box m-15 ml-0" style="width: 50px">
            <div class="scrollable hover">
                <div class="text-center text-sm py-3 d-flex flex-column" id="filter">
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('а')">А</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('б')">Б</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('в')">В</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('г')">Г</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('д')">Д</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('е')">Е</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('ё')">Ё</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('ж')">Ж</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('з')">З</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('и')">И</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('Й')">Й</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('к')">К</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('л')">Л</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('м')">М</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('н')">Н</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('о')">О</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('п')">П</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('р')">Р</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('с')">С</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('т')">Т</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('у')">У</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('ф')">Ф</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('х')">Х</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('ц')">Ц</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('ш')">Ш</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('щ')">Щ</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('э')">Э</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('ю')">Ю</a>
                    <a class="letter_search ajax-nav" onclick="window.partner.searcher('я')">Я</a>
                </div>
            </div>
        </div>
        <div class="content-rightside">
            <div class="w-290">
                <button onclick="openDialog('categoryDialog', '&category_select=3')" class="w-100 button primary mb-15">Новая категория</button>
                <button onclick="openDialog('partnerDialog')" class="w-100 button primary mb-15">Новый контакт</button>
            </div>
            {{--<div class="box w-290 p-15 filter-panel">--}}
                {{--<div class="box-title">Фильтр</div>--}}
                {{--<div class="form-group d-flex mb-10">--}}
                    {{--<label class="no-wrap" for="date_filter">Период</label>--}}
                    {{--<input id="date_filter" type="text" name="date_filter" value="{{ request('dates_range') }}" class="form-control date_filter input_as_link" placeholder="за всё время">--}}
                    {{--<button type="button" onclick="window.cash.resetDate()" class="right-remove"><i class="fa fa-remove"></i></button>--}}
                {{--</div>--}}
                {{--<div class="filter_field mb-10">--}}
                    {{--<div class="form-group d-flex mb-10">--}}
                        {{--<label class="no-wrap" for="provider">Контрагент</label>--}}
                        {{--<input readonly onclick="window.cash.openSelectPartnerModal('partner')" id="partner_select" type="text" name="partner" value="{{ request('partner') }}" class="form-control partner input_as_link" placeholder="выбрать">--}}
                        {{--<button type="button" onclick="window.cash.clearList('partner', 'partner_stack')" class="right-remove"><i class="fa fa-remove"></i></button>--}}
                    {{--</div>--}}
                    {{--<div id="partner_stack"></div>--}}
                {{--</div>--}}
                {{--<hr>--}}
                {{--<div class="box-title">Контактная информация</div>--}}
                {{--<div id="contact_block"></div>--}}
                {{--<hr>--}}
                {{--<div class="box-title">Комментарий</div>--}}
                {{--<div id="comment_block"></div>--}}
            {{--</div>--}}
            <div class="box w-290 p-15 filter-panel">
                <div class="box-title">Карточка профиля</div>
                <div id="contact_block"></div>
            </div>
        </div>
    </div>
@endsection

