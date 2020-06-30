<div id="settings_master" class="modal" data-backdrop="false" style="display: block; background: rgba(0, 0, 0, 0.15);">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="d-flex">
                <div class="left-s p-15">
                    <h2 class="">Мастер настройки BBCRM</h2>

                    <div id="step_1">
                        <formm method="POST" style="width: 700px;" onsubmit="">
                            <h3 class="mb-10">Данные вашей компании</h3>
                            <div class="form-group">
                                <label>Название компании</label>
                                <input type="text" name="name" class="form-control" placeholder="Название компании (не более 255 символов)" autofocus>
                            </div>
                            <div class="form-group">
                                <label>Стандартная наценка (%)</label>
                                <input name="markup" type="number" class="form-control" value="30">
                            </div>
                            <div class="d-flex">
                                <button style="width: 50%;" onclick="settings.activeTab(this, 'fl')" class="button primary @if(!$company->is_company) active @endif">Индивидуальный предприниматель</button>
                                <button style="width: 50%;" onclick="settings.activeTab(this, 'ul')" class="ml-15 button primary @if($company->is_company) active @endif">Юридическое лицо</button>
                            </div>
                        </formm>
                    </div>
                </div>
                <div class="right-s p-15">
                    <div class="info">
                        Мастер настройки - это удобный инструмент для ввода первоначальной информации в CRM. После заполнения полей можно смело приступать к работе.
                    </div>
                    <a class="skip">закрыть</a>

                    <div class="mt-15">
                        <button class="button primary">Далее</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
