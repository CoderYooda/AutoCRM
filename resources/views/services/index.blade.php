@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'layouts.TabXHR' : 'services.layout.tabs')

@section('tab')
    <div class="d-flex flex-column flex">
        <div class="navbar white no-radius box-shadow pos-rlt">
            <div class="flex">
                <div class="input-group">
                    <input id="search" type="text" value="{{ request('search') }}" class="form-control form-control-sm search"  placeholder="Поиск по услугам">
                    <span class="input-group-append">
                    <button class="btn btn-default btn-sm no-shadow" type="button"><i class="fa fa-search"></i></button>
                </span>
                </div>
            </div>
            <span class="m-b btn-groups pl-1">
            <button onclick="openDialog('createCategory')" class="btn btn-sm success mb-0">Новый приходный ордер</button>
            <button onclick="openDialog('createProduct')" class="btn btn-sm success mb-0">Новый расходный ордер</button>
        </span>
        </div>
        <div class="d-flex flex scroll-y">
            <div class="d-flex flex-column white flex lt">
                <div id="ajax-table-cash" class="white p-3 b-r d-table">
                    В разработке
                </div>
            </div>
        </div>
    </div>
@endsection

