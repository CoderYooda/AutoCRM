@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'layouts.TabXHR' : 'cash.layout.tabs')

@section('tab')
    <div class="d-flex flex-column flex">
        <div class="navbar white no-radius box-shadow pos-rlt">
            <div class="flex">
                <div class="input-group">
                    <input id="search" type="text" value="{{ request('search') }}" class="form-control form-control-sm search"  placeholder="Поиск по складу">
                    <span class="input-group-append">
                    <button class="btn btn-default btn-sm no-shadow" type="button"><i class="fa fa-search"></i></button>
                </span>
                </div>
            </div>
            <span class="m-b btn-groups pl-1">
            <button onclick="openDialog('createCategory')" class="btn btn-sm success mb-0">Новый приходный ордер</button>
            <button onclick="openDialog('warrantDialog')" class="btn btn-sm success mb-0">Новый расходный ордер</button>
        </span>
        </div>
        <div class="d-flex flex scroll-y">
            <div class="d-flex flex-column white flex lt">
                <div id="ajax-table-cash" class="white b-r d-table">
                    <div class="box">
                        <div class="table-responsive">
                            <table class="table table-striped b-t">
                                <thead>
                                <tr>
                                    <th style="width:20px;">
                                        <label class="ui-check m-0">
                                            <input type="checkbox">
                                            <i></i>
                                        </label>
                                    </th>
                                    <th>Project</th>
                                    <th>Task</th>
                                    <th>Date</th>
                                    <th style="width:50px;"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <label class="ui-check m-0">
                                            <input type="checkbox" name="post[]">
                                            <i class="dark-white"></i>
                                        </label>
                                    </td>
                                    <td>Avatar system</td>
                                    <td>15c</td>
                                    <td>Jul 2, 2013</td>
                                    <td>
                                        <a href="#" class="active" data-toggle-class="">
                                            <i class="fa fa-check text-success d-none"></i>
                                            <i class="fa fa-times text-danger d-inline"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label class="ui-check m-0">
                                            <input type="checkbox" name="post[]">
                                            <i class="dark-white"></i>
                                        </label>
                                    </td>
                                    <td>Videodown</td>
                                    <td>4c</td>
                                    <td>Jul 1, 2013</td>
                                    <td>
                                        <a href="#" class="active" data-toggle-class="">
                                            <i class="fa fa-check text-success d-none"></i>
                                            <i class="fa fa-times text-danger d-inline"></i>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-3 b-t mt-auto">
            <div class="d-flex align-items-center">
                <div class="flex">
{{--                    {{ $partners->setPath(route('PartnerIndex'))->appends(request()->only(['active_tab', 'page', 'search', 'category_id']))->links() }}--}}
                </div>
                <div>
                    <span class="text-muted">Total:</span>
                    <span id="count"></span>
                </div>
            </div>
        </div>
    </div>
@endsection

