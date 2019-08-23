@extends($request['view_as'] == 'json' ? 'layouts.XHR' : 'layouts.main')

@section('content')
    <div id="partner_index_page" class="d-flex flex">
        <div class="d-flex flex" id="ajax-tab-content">
            <div class="d-flex flex-column flex">
                <div class="navbar white no-radius box-shadow pos-rlt">
                    <span class="text-md">Контрагенты</span>
                    <span class="m-b btn-groups pl-1">
                        <button onclick="openDialog('createCategory', '&category_select=3')" class="btn btn-sm success mb-0">Новая категория</button>
                        <button onclick="openDialog('addPartner')" class="btn btn-sm success mb-0">Новый контрагент</button>
                    </span>
                </div>
                <div class="d-flex flex scroll-y">
                    <div class="d-flex flex-column white flex lt">
                        <div id="ajax-table" class="white p-3 b-r d-table">
                            @include('partner.elements.table_container')
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{{--{{ $articles->setPath(route('StoreIndex'))->appends(request()->only(['active_tab', 'page', 'search', 'category_id']))->links() }}--}}
@endsection

