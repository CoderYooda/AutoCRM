<div id="croppr_dialog" class="modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Загрузка изображений</h5>
                <a data-dismiss="modal" class="close_but ml-auto">
                    <span class="text-lg l-h-1x">×</span>
                </a>
            </div>
            <div class="modal-body text-center p-lg">
                <div id="croppr-container"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="button white" data-dismiss="modal">Закрыть</button>
                <button type="button" class="button primary pull-right save" onclick="user.cropImage(window.cropdata);">Сохранить</button>
                <button type="button" class="button primary mr-15 pull-right reload" onclick="user.anotherPicture();">Другое изображение</button>
            </div>
        </div>
    </div>
</div>
