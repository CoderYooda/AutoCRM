@php $class = 'selectCategoryDialog' @endphp
<div id="selectCategoryDialog" class="dialog" style="width:480px;">
    <div class="titlebar">Выбор категории</div>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
    <div class="modal-header dark">
        <div class="input-group mb-1 mt-1">
            <input id="category_search" type="text"  name="category_search" class="form-control" placeholder="Поиск категории">
            <div class="input-group-append">
                <button onclick="{{ $class }}.openCategoryDialog()" class="btn white" type="button">Новая категория</button>
            </div>
        </div>
    </div>
    @if(isset($request['refer']))
        <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
    @endif
    @if(isset($root) && $root !== null)
        <input id="root" type="hidden" name="root" value="{{ $root }}">
    @endif
    <div id="search_category_results" class="mh50-dialog white" data-simplebar style="max-height: 400px;">
        @include('category.dialog.select_category_inner')
    </div>
</div>
