@extends($request['view_as'] == 'json' ? 'layouts.XHR' : 'layouts.main')

@section('title', $page ?? 'crm')

@section('content')
    <div id="calendar_index_page" class="d-flex flex">
        <div id="ajax-tab-content" class="d-flex flex">
            <div class="fade aside aside-sm b-r" id="content-aside">
                <div class="modal-dialog d-flex flex-column w-md light white lt">
                    <div class="navbar no-radius pos-rlt">
                        <span class="text-md">Календарь</span>
                    </div>
                    <div class="">
                        <div class="">
                            <span class="list-item">
                                <div class="list-body">
                                    <span href="#" class="_500 pt-2">Заказы клиентов</span>
                                    <span class="float-right ml-2" style="line-height: 0;">
                                        <label class="ui-switch primary mt-1">
                                            <input type="checkbox" onchange="calendar.toggleSource(this)" data-source="clientOrderSource">
                                            <i></i>
                                        </label>
                                    </span>

                                    {{--<small class="d-block text-muted">Min Li Chan</small>--}}
                                </div>
                            </span>
                            <span class="list-item">
                                <div class="list-body">
                                    <span href="#" class="_500">Продажи</span>
                                    <span class="float-right ml-2" style="line-height: 0;">
                                        <label class="ui-switch primary mt-1">
                                            <input type="checkbox" onchange="calendar.toggleSource(this)" data-source="warrantSource">
                                            <i></i>
                                        </label>
                                    </span>
                                </div>
                            </span>
                            <span class="list-item">
                                <div class="list-body">
                                    <span href="#" class="_500">Продажи</span>
                                    <span class="float-right ml-2" style="line-height: 0;">
                                        <label class="ui-switch primary mt-1">
                                            <input type="checkbox" onchange="calendar.toggleSource(this)" data-source="warrantSource">
                                            <i></i>
                                        </label>
                                    </span>
                                </div>
                            </span>
                            <span class="list-item">
                                <div class="list-body">
                                    <span href="#" class="_500">Продажи</span>
                                    <span class="float-right ml-2" style="line-height: 0;">
                                        <label class="ui-switch primary mt-1">
                                            <input type="checkbox" onchange="calendar.toggleSource(this)" data-source="warrantSource">
                                            <i></i>
                                        </label>
                                    </span>
                                </div>
                            </span>
                            <span class="list-item">
                                <div class="list-body">
                                    <span href="#" class="_500">Продажи</span>
                                    <span class="float-right ml-2" style="line-height: 0;">
                                        <label class="ui-switch primary mt-1">
                                            <input type="checkbox" onchange="calendar.toggleSource(this)" data-source="warrantSource">
                                            <i></i>
                                        </label>
                                    </span>
                                </div>
                            </span>
                            <span class="list-item">
                                <div class="list-body">
                                    <span href="#" class="_500">Продажи</span>
                                    <span class="float-right ml-2" style="line-height: 0;">
                                        <label class="ui-switch primary mt-1">
                                            <input type="checkbox" onchange="calendar.toggleSource(this)" data-source="warrantSource">
                                            <i></i>
                                        </label>
                                    </span>
                                </div>
                            </span>
                        </div>
                    </div>
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
                <div class="d-flex flex-column flex">
                    <div class="d-flex flex scroll-y">
                        <div id="ajax-table-calendar" class="d-flex flex-column flex white lt">
                            <div id="dates" style="margin: 0 -1px;">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

