@php $class = 'selectCategoryDialog' @endphp
<div id="selectCategoryDialog" class="dialog" style="width:650px;">
    <div class="titlebar">Выбор категории</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>


    <div class="modal-header">
        <form class="flex d-flex w-100">
            <input id="category_search" type="text"  name="category_search" class="form-control search mr-15" placeholder="Поиск категории" required="">
            <button onclick="{{ $class }}.openCategoryDialog()" class="button" type="button">Новая категория</button>
        </form>
    </div>

    @if(isset($request['refer']))
        <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
    @endif
    @if(isset($root) && $root !== null)
        <input id="root" type="hidden" name="root" value="{{ $root }}">
    @endif



    <div id="search_category_results" class="row row-sm">
        @include(get_template() . '.category.dialog.select_category_inner')
    </div>
    <div class="modal-footer">
        <button class="button white" onclick="window.selectCategoryDialog.finitaLaComedia(this)">Закрыть</button>
    </div>
    <div class="system_message">

    </div>

    {{--<div id="search_category_results" class="mh50-dialog white" data-simplebar style="max-height: 400px;">--}}
        {{--@include(get_template() . '.category.dialog.select_category_inner')--}}
    {{--</div>--}}
</div>
