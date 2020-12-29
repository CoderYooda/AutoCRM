<div id="{{ $class }}" class="dialog form_company_dialog" style="width:330px; height: 450px;">
    <div class="titlebar">Информация о компании</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
    <form action="{{ route('AdminUpdateCompany', $company->id) }}" method="POST">

        @csrf

        <div class="m-15" style="height: 320px;">

            <div data-simplebar style="height: 320px;">

                <div class="form-group">
                    <label>Название</label>
                    <div class="input-group mb-3">
                        <input type="text" onclick="this.select();" name="name" value="{{ $company->name }}" class="form-control" placeholder="Название компании" disabled />
                    </div>
                </div>

                <div class="form-group">
                    <label>Владелец</label>
                    <div class="input-group mb-3">
                        <input type="text" onclick="this.select();" name="name" value="{{ $company->getFirstCompanyMember()->name }}" class="form-control" placeholder="Владелец" disabled />
                    </div>
                </div>

                <div class="form-group">
                    <label>Телефон владельца</label>
                    <div class="input-group mb-3">
                        <input type="text" onclick="this.select();" name="phone" value="{{ $company->getFirstCompanyMember()->phone }}" class="form-control" placeholder="Телефон владельца" disabled />
                    </div>
                </div>

                <div class="form-group">
                    <label>Дата регистрации</label>
                    <div class="input-group mb-3">
                        <input type="text" onclick="this.select();" name="created_at" value="{{ $company->created_at }}" class="form-control" placeholder="Дата регистрации" disabled />
                    </div>
                </div>

                <div class="form-group">
                    <label>Осталось дней</label>
                    <div class="input-group mb-3">
                        <input type="text" onclick="this.select();" name="payed_days" value="{{ $company->getDays() }}" class="form-control" placeholder="Название компании" />
                    </div>
                </div>

                <div class="form-group">
                    <span style="font-weight: 500;">Статус блокировки</span>
                    <input type="checkbox" class="float-right" style="margin-top: 2px;" name="blocked" placeholder="Название компании" value="1" @if($company->blocked) checked @endif />
                </div>

            </div>

            <div class="modal-footer pl-0 pr-0 pb-0">
                <button type="button" class="button white" onclick="window.{{ $class }}.finitaLaComedia()">Закрыть</button>
                <button type="button" class="button primary float-right" onclick="{{ $class }}.save(this);">Сохранить</button>
            </div>

            <div class="system_message">
            </div>

        </div>
    </form>
</div>
