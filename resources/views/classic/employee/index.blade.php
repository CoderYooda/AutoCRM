@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') . '.layouts.XHR' : env('DEFAULT_THEME', 'classic') . '.layouts.main')

@section('title', $page ?? 'Сотрудники')

@section('content')

@php $category = \App\Http\Controllers\CategoryController::getCategory($request, 5) @endphp
@php $categories = \App\Http\Controllers\CategoryController::getCategories($request, 'employee') @endphp
@php $cat_info = [] @endphp
@php $cat_info['route'] = 'EmployeeIndex' @endphp
@php $cat_info['params'] = ['target' => 'ajax-tab-content'] @endphp
@php $cat_info['root_id'] = 5 @endphp

<div id="ajax-table-warrant" class="bottom-container">
    <div class="box-lister box">
        <div id="table-container" class="box-content">
            <div id="warrant-table" ></div>
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
                    <label class="no-wrap" for="provider">Контакт</label>
                    <input readonly onclick="window.cash.openSelectPartnerModal('partner')" id="partner" type="text" name="partner" value="{{ request('partner') }}" class="form-control partner input_as_link" placeholder="выбрать">
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



{{--<div id="employee_index_page" class="d-flex flex">--}}
    {{--<div id="ajax-tab-content" class="d-flex flex">--}}
        {{--<div class="fade aside aside-sm b-r" id="content-aside">--}}
            {{--<div class="modal-dialog d-flex flex-column w-md light lt">--}}
                {{--@include('category.aside-list')--}}
                {{--<div class="p-2 mt-auto p-3">--}}
                    {{--<form action="{{ route('StoreCategory') }}" method="POST">--}}
                        {{--@csrf--}}
                        {{--<input class="category_select" type="hidden" name="category_id" value="@if(isset($categories['parent'])){{ $categories['parent']->id }}@else 5 @endif">--}}
                        {{--<div class="input-group">--}}
                            {{--<input type="text" name="name" class="form-control form-control-sm" placeholder="Новая категория" required>--}}
                            {{--<span class="input-group-append">--}}
                            {{--<button class="btn btn-default btn-sm no-shadow" type="button" onclick="axform.send(this)">--}}
                                {{--<i class="fa fa-plus text-muted"></i>--}}
                            {{--</button>--}}
                        {{--</span>--}}
                        {{--</div>--}}
                    {{--</form>--}}
                {{--</div>--}}
            {{--</div>--}}
        {{--</div>--}}
        {{--<div class="d-flex flex" id="content-body">--}}
            {{--<div class="d-flex flex-column flex" id="user-list">--}}
                {{--<div class="navbar white no-radius box-shadow pos-rlt">--}}
                    {{--<form class="flex">--}}
                        {{--<div class="input-group">--}}
                            {{--<input type="text" name="search" value="{{ request('search') }}" class="form-control form-control-sm search" placeholder="Поск сотрудников" required>--}}
                        {{--</div>--}}
                    {{--</form>--}}
                    {{--<span class="m-b btn-groups pl-1">--}}
                        {{--<button onclick="openDialog('categoryDialog', '&category_select=5')" class="btn btn-sm white mb-0">Новая категория</button>--}}
                        {{--<button onclick="openDialog('partnerDialog')" class="btn btn-sm white mb-0">Новый сотрудник</button>--}}
                    {{--</span>--}}
                {{--</div>--}}
                {{--<div class="d-flex flex scroll-y">--}}
                    {{--<div id="ajax-table-employee" class="d-flex flex-column flex white lt">--}}
                        {{--@include('employee.elements.list_container')--}}
                    {{--</div>--}}
                    {{--<div class="d-flex flex-column b-l" style="width: 50px">--}}
                        {{--<div class="scrollable hover">--}}
                            {{--<div class="text-center text-sm py-3 d-flex flex-column" id="filter">--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'a']) }}">А</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'б']) }}">Б</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'в']) }}">В</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'г']) }}">Г</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'д']) }}">Д</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'е']) }}">Е</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'ё']) }}">Ё</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'ж']) }}">Ж</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'з']) }}">З</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'и']) }}">И</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'й']) }}">Й</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'к']) }}">К</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'л']) }}">Л</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'м']) }}">М</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'н']) }}">Н</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'о']) }}">О</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'п']) }}">П</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'р']) }}">Р</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'с']) }}">С</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'т']) }}">Т</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'у']) }}">У</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'ф']) }}">Ф</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'х']) }}">Х</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'ц']) }}">Ц</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'ш']) }}">Ш</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'щ']) }}">Щ</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'э']) }}">Э</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'ю']) }}">Ю</a>--}}
                                {{--<a class="letter_search ajax-nav" href="{{ route('EmployeeIndex', ['search' => 'я']) }}">Я</a>--}}
                            {{--</div>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</div>--}}
{{--</div>--}}
@endsection

