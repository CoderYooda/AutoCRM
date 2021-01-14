@php $articles = \App\Http\Controllers\ProductController::getProducts($request) @endphp
@php $category = \App\Http\Controllers\CategoryController::getCategory($request, 2) @endphp
{{--{{ dd($category) }}--}}
{{--style="height: 100%;"--}}
<div class="d-flex flex white">
    <div class="d-flex flex">
        <div class="fade aside aside-sm" id="content-aside">
            <div class="d-flex flex-column w-250 b-r white modal-dialog">
                @include('category.aside-list')
                <div class="p-2 mt-auto p-3">
                    <form onsubmit="axform.send(this)" action="{{ route('StoreCategory') }}" method="POST">
                        @csrf
                        <input class="category_select" type="hidden" name="category_id" value="@if(isset($categories['parent'])){{ $categories['parent']->id }}@else 3 @endif">
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

        <div class="content-main d-flex flex-column flex white" style="max-height: calc(100vh - 112px)">
            {!! \App\Http\Controllers\CategoryController::drawCrumbs($category, 2) !!}
            <div id="example-table" ></div>
            <div class="d-flex flex white w-100" >

            </div>
            {{--<div class="d-flex flex white" style="    height: 1px;">--}}

                {{--<div class="w-100 h-100" data-simplebar>--}}
                    {{--@if( $articles->count() > 0)--}}

                            {{--<table class="table table-hover" style="max-height: 400px">--}}
                                {{--<thead>--}}
                                {{--<tr>--}}
                                    {{--<th class="w-xxl">Модель</th>--}}
                                    {{--<th class="w-sm">Артикул</th>--}}
                                    {{--<th>Производитель</th>--}}
                                    {{--<th>Наличие</th>--}}
                                    {{--<th>Заявки</th>--}}
                                    {{--<th>Цена ( Розница )</th>--}}
                                    {{--<th class="w-62">--}}
                                        {{--@if(isset($categories['parent']))--}}
                                            {{--<a onclick="openDialog('productDialog', '&category_select={{ $categories['parent']->id }}' )" class="btn btn-sm badge success text-white w-100"><i class="fa fa-plus"></i></a>--}}
                                        {{--@endif--}}
                                    {{--</th>--}}
                                {{--</tr>--}}
                                {{--</thead>--}}
                                {{--<tbody>--}}
                                {{--@foreach($articles as $article)--}}
                                    {{--@include('store.elements.table_element')--}}
                                {{--@endforeach--}}
                                {{--</tbody>--}}
                            {{--</table>--}}

                    {{--@else--}}
                        {{--<div class="no-result">--}}
                            {{--<div class="p-4 text-center">--}}
                                {{--По данным критериям ничего нет.--}}
                            {{--</div>--}}
                        {{--</div>--}}
                    {{--@endif--}}
                {{--</div>--}}

            {{--</div>--}}
            {{--<div class="p-3 b-t mt-auto">--}}
                {{--<div class="d-flex align-items-center">--}}
                    {{--<div class="flex">--}}
                        {{--{{ $articles->setPath(route('StoreIndex'))->appends(request()->only(['active_tab', 'page', 'search', 'category_id']))->links() }}--}}
                    {{--</div>--}}
                    {{--<div>--}}
                        {{--<span class="text-muted">Total:</span>--}}
                        {{--<span id="count"></span>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</div>--}}
        </div>
    </div>
</div>
