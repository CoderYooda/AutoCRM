<div id="settings_master" class="modal" data-backdrop="false" style="display: none; background: rgba(0, 0, 0, 0.15);">
{{-- TODO display block   --}}
    <div class="modal-dialog">
        <div class="modal-content ov-hidden">
            <div class="d-flex">
                <div class="left-s">
                    <h2 class="p-15">Мастер настройки #bbcrm</h2>
                    <div id="step_1" class="p-15 pt-0 mb-15" data-simplebar style="max-height: 400px;">
                        <form class="fl-ul-tab" method="POST" style="width: 700px;" onsubmit="">
                            <h3 class="mb-10 mt-0">Данные вашей компании</h3>
                            <div class="form-group">
                                <label>Название компании</label>
                                <input type="text" name="name" class="form-control" placeholder="Название компании (не более 255 символов)" autofocus>
                            </div>
                            <div class="form-group">
                                <label>Стандартная наценка (%)</label>
                                <input name="markup" type="number" class="form-control" value="30">
                            </div>
                            <div class="d-flex">
                                <button onclick="setting_master.activeTab(this, 'fl')" class="button primary flex-1 active" >Индивидуальный предприниматель</button>
                                <button onclick="setting_master.activeTab(this, 'ul')" class="ml-15 button flex-1 primary">Юридическое лицо</button>
                            </div>

                            <div class="tab fl active">

                                <div class="form-group mt-15">
                                    <label>ФИО (полностью)</label>
                                    <input name="name" type="text" class="form-control" placeholder="ФИО" >
                                </div>

                                <div class="form-group mt-15">
                                    <label>ИНН</label>
                                    <input name="inn" type="text" class="form-control" placeholder="Ваш ИНН" >
                                </div>

                                <div class="form-group mt-15">
                                    <label>ОГРНИП</label>
                                    <input name="ogrn" type="text" class="form-control" placeholder="Ваш ОГРНИП" >
                                </div>

                                <div class="form-group mt-15">
                                    <label>БИК</label>
                                    <input name="bik" type="text" onpaste="setting_master.writingBik(this)" onchange="setting_master.writingBik(this)" class="form-control" placeholder="Ваш БИК" >
                                </div>

                                <div class="form-group mt-15">
                                    <label>Банк</label>
                                    <input name="bank" type="text" class="form-control" placeholder="Ваш банк" >
                                </div>

                                <div class="form-group mt-15">
                                    <label>Корреспондентский счет</label>
                                    <input name="cs" type="text" class="form-control" placeholder="Ваш корреспондентский счет" >
                                </div>

                                <div class="form-group mt-15">
                                    <label>Расчетный счет</label>
                                    <input name="rs" type="text" class="form-control" placeholder="Ваш расчетный счет" >
                                </div>

                            </div>
                            <div class="tab ul">

                                <div class="form-group mt-15">
                                    <label>Организация</label>
                                    <input name="name" type="text" class="form-control" placeholder="Общество с ограниченной ответственностью «ББ-СРМ»">
                                </div>

                                <div class="form-group ">
                                    <label>ИНН</label>
                                    <input name="inn" type="text" class="form-control" placeholder="Ваш ИНН" >
                                </div>

                                <div class="form-group">
                                    <label>ОГРН</label>
                                    <input name="name" type="text" class="form-control" placeholder="Ваш ОГРН" >
                                </div>

                                <div class="form-group">
                                    <label>КПП</label>
                                    <input name="kpp" type="text" class="form-control" placeholder="Ваш КПП" >
                                </div>

                                <div class="form-group">
                                    <label>Юридический адрес</label>
                                    <input name="legal_address" type="text" class="form-control" placeholder="Ваш юридический адрес" >
                                </div>

                                <div class="form-group">
                                    <label>Фактический адрес <input title="Совпадает с юридическим" name="similar_address" type="checkbox" onchange="setting_master.similarCompanyAddress(this)"></label>
                                    <input name="actual_address" type="text" class="form-control" placeholder="Ваш фактический адрес" >

                                </div>

                                <div class="form-group">
                                    <label>БИК</label>
                                    <input name="bik" type="text" onchange="setting_master.writingBik(this)" class="form-control" placeholder="Ваш БИК" >
                                </div>

                                <div class="form-group ">
                                    <label>Банк</label>
                                    <input name="bank" type="text" class="form-control" placeholder="Наименование банка" >
                                </div>

                                <div class="form-group">
                                    <label>Корреспондентский счет</label>
                                    <input name="cs" type="text" class="form-control" placeholder="Ваш корреспондентский счет" >
                                </div>

                                <div class="form-group">
                                    <label>Расчетный счет</label>
                                    <input name="rs" type="text" class="form-control" placeholder="Ваш расчетный счет" >
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
                <div class="right-s p-15">
                    <div class="info">
                        Мастер настройки - это удобный инструмент для ввода первоначальной информации в CRM. После заполнения полей можно смело приступать к работе.
                    </div>
                    <a class="skip">закрыть</a>

                    <div class="mt-15 mt-auto">
                        <button class="button white">Далее</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
