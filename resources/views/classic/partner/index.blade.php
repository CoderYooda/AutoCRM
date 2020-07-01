@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') . '.layouts.XHR' : env('DEFAULT_THEME', 'classic') . '.layouts.main')

@section('title', $page ?? 'Контакты')

@section('content')
    @php $class = 'partner' @endphp
    <div id="ajax-table-warrant" class="bottom-container">
        <div class="content-menu box w-290" id="category-nav">
            @include(env('DEFAULT_THEME', 'classic') . '.category.aside-list')
        </div>
        <div class="box-lister">
            <div class="w-100 box box-search mb-15">
                <input id="search" name="search" placeholder="Поиск по контактам" class="input w-100" value="{{ request('search') }}" type="text">
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
                @can('Создавать контакты')
                    <button onclick="{{ $class }}.openPartnerModal()" class="w-100 button primary mb-15">Новый контакт</button>
                @endcan
                @can('Создавать категории')
                    <button onclick="{{ $class }}.openCategoryModal()" class="w-100 button primary mb-15">Новая категория</button>
                @endcan
            </div>
            <div id="adds-card" class="hide">
                <div class="box w-290 p-15 filter-panel">
                    <div class="box-title">Карточка профиля</div>
                    <div id="contact_block"></div>
                </div>
            </div>
        </div>
    </div>
@endsection

