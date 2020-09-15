@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'admin.layouts.tabs')

@section('tab')

    <div id="ajax-table-users" class="bottom-container" style="height: calc(100% - 79px) !important;">

        <div class="box-lister" style="width: 1px!important;">

            <div class="search-panel box mb-15">
                <div class="search-field-container w-100 d-flex">
                    <input onkeyup="{{ $class }}.searchDebounce();" id="search" name="search" placeholder="Поиск по пользователям" class="input w-100" value="{{ request('search') }}" type="text">
                    <button type="button" onclick="{{ $class }}.searchDebounce();" class="button primary ml-10">Поиск</button>
                </div>
            </div>

            <div class="box h-100">
                <div id="table-container" class="box-content h-100">
                    <div id="users-table"></div>
                </div>
            </div>

        </div>

        <div class="content-rightside">
            <div class="box w-290 p-15 filter-panel">
                <div class="box-title">Фильтр</div>
                <div class="form-group d-flex mb-10">
                    <label class="no-wrap">Компания</label>
                    <input readonly onclick="openDialog('selectCompany', '&refer={{ $class }}');" id="company" type="text" name="company" class="form-control provider input_as_link" placeholder="выбрать">
                    <button type="button" onclick="{{ $class }}.clearCompanyList();" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div id="company_list">
                    <div class="filter_element d-flex d-none">
                        <div class="name title-elipsed" style="max-width: 215px !important;">Имя</div>
                        <button type="button" onclick="{{ $class }}.removeCompany(this);" class="right-remove" style="margin-left: auto;"><i class="fa fa-remove"></i></button>
                    </div>
                </div>
            </div>
        </div>

    </div>

@endsection
