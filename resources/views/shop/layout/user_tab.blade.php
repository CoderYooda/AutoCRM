<div class="user_form">

    <div class="tab_name mt-0 mb-32">Личные данные</div>

    <div class="user_fields">
        <div class="form-group-flex">
            <label>Телефон</label>
            <div class="fields float-r w-50">
                <div class="display">
                    <span>{{ display_phone(auth()->user()->companyPartner->basePhone) }}</span>
                    <div class="edit_button" onclick="user.editField(this);"></div>
                </div>
                <div class="edit d-none">
                    <input type="text" class="phone" name="basePhone" value="{{ auth()->user()->companyPartner->basePhone }}" />
                    <div class="accept_button" onclick="user.saveField(this);"></div>
                </div>
            </div>
        </div>

        <div class="form-group-flex">
            <label>Фамилия</label>
            <div class="fields float-r w-50">
                <div class="display">
                    <span>{{ auth()->user()->companyPartner->surname }}</span>
                    <div class="edit_button" onclick="user.editField(this);"></div>
                </div>
                <div class="edit d-none">
                    <input type="text" name="surname" value="{{ auth()->user()->companyPartner->surname }}" />
                    <div class="accept_button" onclick="user.saveField(this);"></div>
                </div>
            </div>
        </div>

        <div class="form-group-flex">
            <label>Имя</label>
            <div class="fields float-r w-50">
                <div class="display">
                    <span>{{ auth()->user()->companyPartner->name }}</span>
                    <div class="edit_button" onclick="user.editField(this);"></div>
                </div>
                <div class="edit d-none">
                    <input type="text" name="name" value="{{ auth()->user()->companyPartner->name }}" />
                    <div class="accept_button" onclick="user.saveField(this);"></div>
                </div>
            </div>
        </div>

        <div class="form-group-flex">
            <label>Отчество</label>
            <div class="fields float-r w-50">
                <div class="display">
                    <span>{{ auth()->user()->companyPartner->middlename }}</span>
                    <div class="edit_button" onclick="user.editField(this);"></div>
                </div>
                <div class="edit d-none">
                    <input type="text" name="middlename" value="{{ auth()->user()->companyPartner->middlename }}" />
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

{{--    @if(auth()->user()->companyPartner->type != 0)--}}
        <div class="requisites">

            <div class="tab_name mb-32">Реквизиты</div>

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
{{--    @endif--}}

    <div class="delivery">

        <div class="tab_name mb-32">Адреса доставки</div>

        @foreach([1, 2, 3] as $i)

            <div class="form-group-flex">
                <div class="fields">
                    <div class="display">
                        <span>г. Белгород, ул. проспект Славы, 150А, д. 54, стр. 5, под. 4, кв. 8</span>
                        <div class="edit_button" onclick="user.editField(this);"></div>
                    </div>
                    <div class="edit d-none">
                        <input type="text" name="address_{{ $loop->index }}" value="г. Белгород, ул. проспект Славы, 150А, д. 54, стр. 5, под. 4, кв. 8" />
                        <div class="accept_button" onclick="user.saveField(this);"></div>
                    </div>
                </div>
            </div>

        @endforeach

    </div>

</div>
