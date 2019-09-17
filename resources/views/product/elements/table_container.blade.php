<div class="content-main d-flex flex" style="height: 100%;">
    <!-- ############ Main START-->
    <div class="d-flex flex" data-plugin="chat">
        <div class="fade aside aside-sm" id="content-aside">
            <div class="d-flex flex-column w-xl b-r white modal-dialog" id="chat-nav">
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
            <div class="d-flex flex-column flex" id="chat-list">
                <div class="d-flex flex scrollable hover">
                    <div class="p-3">
                        <table class="table table-bordered table-hover table-sm mb-3" style="white-space: nowrap;">
                            <thead>
                            <tr>
                                <th class="w-xxl">Модель</th>
                                <th class="w-sm">Артикул</th>
                                <th>Бренд</th>
                                <th>Наличие</th>
                                <th>Заявки</th>
                                <th>Цена</th>
                                <th class="w-62">
                                    @if(isset($categories['parent']))
                                        <a onclick="openDialog('createProduct', '&category_select={{ $categories['parent']->id }}' )" class="btn btn-sm badge success text-white w-100"><i class="fa fa-plus"></i></a>
                                    @endif
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($articles as $article)
                                @include('product.elements.table_element')
                            @endforeach
                            </tbody>
                        </table>
                        {{ $articles->setPath(route('StoreIndex'))->appends(request()->only(['active_tab', 'page', 'search', 'category_id']))->links() }}
                    </div>
                </div>
                <div class="p-3 white lt b-t mt-auto" id="chat-form">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Say something" id="newField">
                        <span class="input-group-append">
                            <button class="btn white b-a no-shadow" type="button" id="newBtn">
                                <i class="fa fa-send text-success"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ############ Main END-->
</div>




{{--<div class="d-flex flex">--}}
{{--<div class="fade aside aside-sm" id="content-aside">--}}
{{--    <div class="d-flex flex-column w-xl b-r white modal-dialog" id="chat-nav">--}}
{{--        @include('category.aside-list')--}}
{{--        <div class="p-3 mt-auto">--}}
{{--            <span class="text-sm text-muted">Yb</span>--}}
{{--        </div>--}}
{{--    </div>--}}
{{--</div>--}}
{{--<div class="d-flex flex">--}}
{{--    <div class="d-flex flex-column flex" >--}}
{{--<table class="table table-bordered table-hover table-sm mb-3" style="white-space: nowrap;">--}}
{{--    <thead>--}}
{{--    <tr>--}}
{{--        <th class="w-xxl">Модель</th>--}}
{{--        <th class="w-sm">Артикул</th>--}}
{{--        <th>Бренд</th>--}}
{{--        <th>Наличие</th>--}}
{{--        <th>Заявки</th>--}}
{{--        <th>Цена</th>--}}
{{--        <th class="w-62">--}}
{{--            @if(isset($categories['parent']))--}}
{{--            <a onclick="openDialog('createProduct', '&category_select={{ $categories['parent']->id }}' )" class="btn btn-sm badge success text-white w-100"><i class="fa fa-plus"></i></a>--}}
{{--            @endif--}}
{{--        </th>--}}
{{--    </tr>--}}
{{--    </thead>--}}
{{--    <tbody>--}}
{{--    @foreach($articles as $article)--}}
{{--        @include('product.elements.table_element')--}}
{{--    @endforeach--}}
{{--    </tbody>--}}
{{--</table>--}}
{{--{{ $articles->setPath(route('StoreIndex'))->appends(request()->only(['active_tab', 'page', 'search', 'category_id']))->links() }}--}}
{{--    </div>--}}
{{--    </div>--}}
{{--    </div>--}}
