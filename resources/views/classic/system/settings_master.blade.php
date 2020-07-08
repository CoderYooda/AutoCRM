<div id="settings_master" class="modal" data-backdrop="false" style=" display: block; background: rgba(0, 0, 0, 0.15);">
    <div class="modal-dialog">
        <div id="all_ready" class="hide">
            <div>
                <span>Всё готово!</span>
                <button type="button" onclick="setting_master.close()">Приступить к работе</button>
            </div>
        </div>
        <div class="modal-content ov-hidden">
            <form action="{{ route('StoreFromMaster') }}" method="POST">
                <div class="d-flex">
                    <div class="left-s">
                        <h2 class="p-15">Мастер настройки #bbcrm</h2>
                        <input type="hidden" name="company_id" value="{{ Auth::user()->company->id }}">
                        <input type="hidden" name="is_company" value="0">
                        <div data-id="1" id="step_1" class="m_step p-15 pt-0 mb-15 active" data-simplebar style="max-height: calc(100vh - 350px);">
                            <div class="fl-ul-tab">
                                <h3 class="mb-10 mt-0">Данные вашей компании</h3>
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
                                        <label>Руководитель</label>
                                        <input name="owner" type="text" class="form-control" placeholder="ФИО" >
                                    </div>

                                    <div class="form-group mt-15">
                                        <label>Название компании</label>
                                        <input name="name" type="text" class="form-control" placeholder="Название компании" >
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
                                        <input name="name" type="text" class="form-control" placeholder="Общество с ограниченной ответственностью «ББ-СРМ»" disabled>
                                    </div>

                                    <div class="form-group ">
                                        <label>ИНН</label>
                                        <input name="inn" type="text" class="form-control" placeholder="Ваш ИНН" disabled>
                                    </div>

                                    <div class="form-group">
                                        <label>ОГРН</label>
                                        <input name="ogrn" type="text" class="form-control" placeholder="Ваш ОГРН" disabled>
                                    </div>

                                    <div class="form-group">
                                        <label>КПП</label>
                                        <input name="kpp" type="text" class="form-control" placeholder="Ваш КПП" disabled>
                                    </div>

                                    <div class="form-group">
                                        <label>Юридический адрес</label>
                                        <input name="legal_address" type="text" class="form-control" placeholder="Ваш юридический адрес" disabled>
                                    </div>

                                    <div class="form-group">
                                        <label>Фактический адрес <input title="Совпадает с юридическим" name="similar_address" type="checkbox" onchange="setting_master.similarCompanyAddress(this)"></label>
                                        <input name="actual_address" type="text" class="form-control" placeholder="Ваш фактический адрес" disabled>

                                    </div>

                                    <div class="form-group">
                                        <label>БИК</label>
                                        <input name="bik" type="text" onchange="setting_master.writingBik(this)" class="form-control" placeholder="Ваш БИК" disabled>
                                    </div>

                                    <div class="form-group ">
                                        <label>Банк</label>
                                        <input name="bank" type="text" class="form-control" placeholder="Наименование банка" disabled>
                                    </div>

                                    <div class="form-group">
                                        <label>Корреспондентский счет</label>
                                        <input name="cs" type="text" class="form-control" placeholder="Ваш корреспондентский счет" disabled>
                                    </div>

                                    <div class="form-group">
                                        <label>Расчетный счет</label>
                                        <input name="rs" type="text" class="form-control" placeholder="Ваш расчетный счет" disabled>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-id="2" id="step_2" class="m_step p-15 pt-0 mb-15 hide" data-simplebar style="max-height: calc(100vh - 350px);">
                            <div class="fl-ul-tab">
                                <h3 class="mb-10 mt-0">Добавьте сотрудников</h3>
                                <div id="employees">
                                    <div class="unit_elem mb-10 p-15">
                                        <div class="form-group">
                                            <label>ФИО</label>
                                            <input type="text" name="employees[1][fio]" id="fl_dialog_focused" value="" class="form-control entrance" placeholder="ФИО">
                                        </div>
                                        <div class="form-group">
                                            <label>Номер телефона</label>
                                            <input id="phone_login_input" type="text" name="employees[1][phone]" class="form-control phone_input" value="" placeholder="Телефон">
                                        </div>
                                        <div class="form-group">
                                            <label>Доступ к системе</label>
                                            <select name="employees[1][access]" class="form-control input-c">
                                                <option value="1">Разрешен</option>
                                                <option value="0" selected="">Запрещен</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="add_more_container">
                                    <button type="button" onclick="setting_master.insertEmployee();" class="button primary">Добавить еще</button>
                                    <button type="button" onclick="setting_master.nextStep()" class="button white">Нет сотрудников</button>
                                </div>
                            </div>
                        </div>
                        <div data-id="3" id="step_3" class="m_step p-15 pt-0 mb-15 hide" data-simplebar style="max-height: calc(100vh - 350px);">
                            <div class="fl-ul-tab">
                                <h3 class="mb-10 mt-0">Добавьте поставщиков</h3>
                                <div id="partners">
                                    <div class="unit_elem mb-10 p-15">
                                        <div class="form-group">
                                            <label>Названия организации</label>
                                            <input type="text" name="partners[1][companyName]" value="" class="form-control" placeholder="Названия организации">
                                        </div>
                                        <div class="form-group">
                                            <label>Контактное лицо</label>
                                            <input type="text" name="partners[1][fio]" value="" class="form-control" placeholder="Контактное лицо">
                                        </div>
                                        <div class="form-group">
                                            <label>Номер телефона</label>
                                            <input type="text" name="partners[1][phone]" class="form-control phone_input" value="" placeholder="Телефон">
                                        </div>
                                    </div>
                                </div>
                                <div class="add_more_container">
                                    <button type="button" onclick="setting_master.insertPartner();" class="button primary">Добавить еще</button>
                                </div>
                            </div>
                        </div>
                        <div class="steps">
                            <div id="stepb_1" onclick="setting_master.goToStep(1)" class="current">
                                <div class="letter">1</div>
                            </div>
                            <div id="stepb_2" onclick="setting_master.goToStep(2)" class="wait">
                                <div class="letter">2</div>
                            </div>
                            <div id="stepb_3" onclick="setting_master.goToStep(3)" class="wait">
                                <div class="letter">3</div>
                            </div>
                        </div>
                    </div>
                    <div class="right-s p-15">
                        <div class="info">
                            Мастер настройки - это удобный инструмент для ввода первоначальной информации в CRM. После заполнения полей можно смело приступать к работе.
                        </div>
                        <a onclick="setting_master.close()" class="skip">закрыть</a>

                        <div class="mt-15 mt-auto">
                            <button type="button" onclick="setting_master.backStep()" class="button white">Назад</button>
                            <button type="button" id="next_b" onclick="setting_master.nextStep()" class="button white">Далее</button>
                            <button type="button" id="finish_b" onclick="setting_master.save(this)" class="button hide yellow">Завершить</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
