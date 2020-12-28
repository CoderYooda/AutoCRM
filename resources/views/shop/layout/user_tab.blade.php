<div class="user_form">

    <div class="tab_name mt-0 mb-32">Личные данные</div>

    <div class="user_fields">
        <div class="form-group-flex">
            <label>Телефон</label>
            <div class="fields float-r w-50">
                <div class="display">
                    <span>{{ display_phone(auth()->user()->phone) }}</span>
                </div>
            </div>
        </div>

        <div class="form-group-flex">
            <label>ФИО</label>
            <div class="fields float-r w-50">
                <div class="display">
                    <span>{{ auth()->user()->companyPartner->fio }}</span>
                    <div class="edit_button" onclick="user.editField(this);"></div>
                </div>
                <div class="edit d-none">
                    <input type="text" name="fio" value="{{ auth()->user()->companyPartner->fio }}" />
                    <div class="accept_button" onclick="user.saveField(this);"></div>
                </div>
            </div>
        </div>

        <div class="form-group-flex">
            <label>Дата рождения</label>
            <div class="fields float-r w-50">
                <div class="display">
                    <span>{{ auth()->user()->companyPartner->birthday ?? 'Не указано'}}</span>
                    <div class="edit_button" onclick="user.editField(this);"></div>
                </div>
                <div class="edit d-none">
                    <input type="text" name="birthday" value="{{ auth()->user()->companyPartner->birthday }}" />
                    <div class="accept_button" onclick="user.saveField(this);"></div>
                </div>
            </div>
        </div>

        <div class="form-group-flex">
            <label>Электронная почта</label>
            <div class="fields float-r w-50">
                <div class="display">
                    <span>{{ auth()->user()->companyPartner->email }}</span>
                    <div class="edit_button" onclick="user.editField(this);"></div>
                </div>
                <div class="edit d-none">
                    <input type="email" name="email" value="{{ auth()->user()->companyPartner->email }}" />
                    <div class="accept_button" onclick="user.saveField(this);"></div>
                </div>
            </div>
        </div>

        <div class="form-group-flex">
            <label>Пароль</label>
            <div class="fields float-r w-50">
                <div class="display">
                    <span>********</span>
                    <div class="edit_button" onclick="user.editField(this);"></div>
                </div>
                <div class="edit d-none">
                    <input type="text" name="password" value="" />
                    <div class="accept_button" onclick="user.saveField(this);"></div>
                </div>
            </div>
        </div>

    </div>

    @if(auth()->user()->companyPartner->type != 0)
        <div class="requisites">

            <div class="tab_name mb-32">Реквизиты</div>

            @if(auth()->user()->companyPartner->type == 2)

                <div class="form-group-flex">
                    <label>Наименование компании</label>
                    <div class="fields float-r w-50">
                        <div class="display">
                            <span>
                                @if(strlen(auth()->user()->companyPartner->opf) || strlen(auth()->user()->companyPartner->companyName))
                                    {{ auth()->user()->companyPartner->opf . ' ' . auth()->user()->companyPartner->companyName }}
                                @else
                                    Не указано
                                @endif
                            </span>
                            <div class="edit_button" onclick="user.editField(this);"></div>
                        </div>
                        <div class="edit d-none">
                            <input type="text" class="mr-10" name="opf" maxlength="3" value="{{ auth()->user()->companyPartner->opf }}" placeholder="ОАО" style="max-width: 30px;" />
                            <input type="text" name="companyName" placeholder="Рога и Копыта" value="{{ auth()->user()->companyPartner->companyName }}" />
                            <div class="accept_button" onclick="user.saveField(this);"></div>
                        </div>
                    </div>
                </div>

            @endif

            <div class="form-group-flex">
                <label>ИНН</label>
                <div class="fields float-r w-50">
                    <div class="display">
                        <span>{{ auth()->user()->companyPartner->inn ?? 'Не указано' }}</span>
                        <div class="edit_button" onclick="user.editField(this);"></div>
                    </div>
                    <div class="edit d-none">
                        <input type="text" name="inn" value="{{ auth()->user()->companyPartner->inn }}" />
                        <div class="accept_button" onclick="user.saveField(this);"></div>
                    </div>
                </div>
            </div>

            <div class="form-group-flex">
                <label>ОГРНИП</label>
                <div class="fields float-r w-50">
                    <div class="display">
                        <span>{{ auth()->user()->companyPartner->ogrn ?? 'Не указано' }}</span>
                        <div class="edit_button" onclick="user.editField(this);"></div>
                    </div>
                    <div class="edit d-none">
                        <input type="text" name="ogrn" value="{{ auth()->user()->companyPartner->ogrn }}" />
                        <div class="accept_button" onclick="user.saveField(this);"></div>
                    </div>
                </div>
            </div>

            <div class="form-group-flex">
                <label>БИК</label>
                <div class="fields float-r w-50">
                    <div class="display">
                        <span>{{ auth()->user()->companyPartner->bik ?? 'Не указано' }}</span>
                        <div class="edit_button" onclick="user.editField(this);"></div>
                    </div>
                    <div class="edit d-none">
                        <input type="text" name="bik" value="{{ auth()->user()->companyPartner->bik }}" />
                        <div class="accept_button" onclick="user.saveField(this);"></div>
                    </div>
                </div>
            </div>

            <div class="form-group-flex">
                <label>Банк</label>
                <div class="fields float-r w-50">
                    <div class="display">
                        <span>{{ auth()->user()->companyPartner->bank ?? 'Не указано' }}</span>
                        <div class="edit_button" onclick="user.editField(this);"></div>
                    </div>
                    <div class="edit d-none">
                        <input type="text" name="bank" value="{{ auth()->user()->companyPartner->bank }}" />
                        <div class="accept_button" onclick="user.saveField(this);"></div>
                    </div>
                </div>
            </div>

            <div class="form-group-flex">
                <label>Корреспондентский счет</label>
                <div class="fields float-r w-50">
                    <div class="display">
                        <span>{{ auth()->user()->companyPartner->cs ?? 'Не указано' }}</span>
                        <div class="edit_button" onclick="user.editField(this);"></div>
                    </div>
                    <div class="edit d-none">
                        <input type="text" name="cs" value="{{ auth()->user()->companyPartner->cs }}" />
                        <div class="accept_button" onclick="user.saveField(this);"></div>
                    </div>
                </div>
            </div>

            <div class="form-group-flex">
                <label>Расчетный счет</label>
                <div class="fields float-r w-50">
                    <div class="display">
                        <span>{{ auth()->user()->companyPartner->rs ?? 'Не указано' }}</span>
                        <div class="edit_button" onclick="user.editField(this);"></div>
                    </div>
                    <div class="edit d-none">
                        <input type="text" name="rs" value="{{ auth()->user()->companyPartner->rs }}" />
                        <div class="accept_button" onclick="user.saveField(this);"></div>
                    </div>
                </div>
            </div>

            <div class="form-group-flex">
                <label>Фактический адрес</label>
                <div class="fields float-r w-50">
                    <div class="display">
                        <span>{{ auth()->user()->companyPartner->actual_address ?? 'Не указано' }}</span>
                        <div class="edit_button" onclick="user.editField(this);"></div>
                    </div>
                    <div class="edit d-none">
                        <input type="text" name="actual_address" value="{{ auth()->user()->companyPartner->actual_address }}" />
                        <div class="accept_button" onclick="user.saveField(this);"></div>
                    </div>
                </div>
            </div>

            <div class="form-group-flex">
                <label>Юридический адрес</label>
                <div class="fields float-r w-50">
                    <div class="display">
                        <span>{{ auth()->user()->companyPartner->ur_address ?? 'Не указано' }}</span>
                        <div class="edit_button" onclick="user.editField(this);"></div>
                    </div>
                    <div class="edit d-none">
                        <input type="text" name="ur_address" value="{{ auth()->user()->companyPartner->ur_address }}" />
                        <div class="accept_button" onclick="user.saveField(this);"></div>
                    </div>
                </div>
            </div>

        </div>
    @endif

    <div class="delivery">

        <div class="tab_name mb-32">Адреса доставки</div>

        <div class="addresses">

            <div class="form-group-flex d-none copy">
                <div class="fields">
                    <div class="edit">
                        <input type="text" name="addresses[]" value="" />
                        <div class="remove_button" onclick="user.removeField(this);"></div>
                    </div>
                </div>
            </div>

            @foreach($deliveryAddresses as $address)

                <div class="form-group-flex">
                    <div class="fields">
                        <div class="edit">
                            <input type="text" name="addresses[]" value="{{ $address->text }}" />
                            <div class="remove_button" onclick="user.removeField(this);"></div>
                        </div>
                    </div>
                </div>

            @endforeach

        </div>

        <div class="actions">

            <div class="add_address @if(count($deliveryAddresses) >= 3) d-none @endif" onclick="user.addAddress(this);">
                <div class="button"></div>
                <span class="text">Добавить адрес доставки</span>
            </div>

            <div class="save_addresses" onclick="user.saveAddresses(this);">Сохранить</div>

        </div>

    </div>

</div>
