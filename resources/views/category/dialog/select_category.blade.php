<div id="selectCategory" class="dialog" style="width:480px;">
    <div class="titlebar">Выбор категории</div>
    <button class="btn_close" onclick="closeDialog(event)">×</button>
    <div id="category_list" class="mh50-dialog white">
        @include('category.dialog.select_category_inner')
    </div>
</div>
