@extends($request['view_as'] == 'json' ? 'layouts.XHR' : 'layouts.main')

@section('title', $page ?? 'crm')

@section('content')

@php $category = \App\Http\Controllers\CategoryController::getCategory($request, 3) @endphp
@php $categories = \App\Http\Controllers\CategoryController::getCategories($request, 'partner') @endphp
@php $cat_info = [] @endphp
@php $cat_info['route'] = 'PartnerIndex' @endphp
@php $cat_info['params'] = ['target' => 'ajax-tab-content'] @endphp

<div id="partner_index_page" class="d-flex flex">
    <div id="ajax-tab-content" class="d-flex flex">
        <div class="fade aside aside-sm b-r" id="content-aside">
            <div class="modal-dialog d-flex flex-column w-md light lt">
                @include('category.aside-list')
                <div class="p-2 mt-auto p-3">
                    <form action="{{ route('StoreCategory') }}" method="POST">
                        @csrf
                            <input class="category_select" type="hidden" name="category_id" value="@if(isset($categories['parent'])){{ $categories['parent']->id }}@else 3 @endif">
                        @if(isset($category))
                            <input type="hidden" name="id" value="{{ $category->id }}">
                        @endif
                        <div class="input-group">
                            <input type="text" name="name" class="form-control form-control-sm" placeholder="Новая категория" required>
                            <span class="input-group-append">
                            <button class="btn btn-default btn-sm no-shadow" type="button" onclick="axform.send(this)">
                                <i class="fa fa-plus text-muted"></i>
                            </button>
                        </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="d-flex flex" id="content-body">
            <div class="d-flex flex-column flex" id="user-list">
                <div class="navbar white no-radius box-shadow pos-rlt">
                    <form class="flex">
                        <div class="input-group">
                            <input type="text" name="search" value="{{ request('search') }}" class="form-control form-control-sm search" placeholder="Поск контрагента" required>
                        </div>
                    </form>
                    <span class="m-b btn-groups pl-1">
                        <button onclick="openDialog('createCategory', '&category_select=3')" class="btn btn-sm white mb-0">Новая категория</button>
                        <button onclick="openDialog('partnerDialog')" class="btn btn-sm white mb-0">Новый контрагент</button>
                    </span>
                </div>
                <div class="d-flex flex scroll-y">
                    <div id="ajax-table-partner" class="d-flex flex-column flex white lt">
                        @include('partner.elements.list_container')
                    </div>
                    <div class="d-flex flex-column b-l" style="width: 50px">
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
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

