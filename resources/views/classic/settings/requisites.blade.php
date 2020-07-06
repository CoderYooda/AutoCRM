{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.settings.layout.tabs')

@section('tab')

    <div id="ajax-table-requisites" class="box d-flex p-15 m-15">

        <form style="width: 700px;" action="{{ route('SaveCompanySettings') }}" method="POST" onsubmit="settings.saveRequisites(this)">

            @csrf
            <input type="hidden" name="company_id" value="{{ auth()->user()->company->id }}">
            <input type="hidden" name="is_company" value="{{ $company->is_company }}">

            <div class="d-flex">
                <button type="button" onclick="settings.activeTab(this, 'fl')" class="button flex-1 primary @if(!$company->is_company) active @endif">Индивидуальный предприниматель</button>
                <button type="button" onclick="settings.activeTab(this, 'ul')" class="ml-15 flex-1 button primary @if($company->is_company) active @endif">Юридическое лицо</button>
            </div>

            <div class="tab fl @if(!$company->is_company) active @endif">

                <div class="form-group mt-15">
                    <label>Наименование организации</label>
                    <input name="name" type="text" class="form-control" placeholder="ФИО" value="{{ !$company->is_company ? $company->name : '' }}">
                </div>

                <div class="form-group mt-15">
                    <label>ИНН</label>
                    <input name="inn" type="text" onchange="settings.writingInn(this)" class="form-control" placeholder="Ваш ИНН" value="{{ !$company->is_company ? $company->inn : '' }}">
                </div>

                <div class="form-group mt-15">
                    <label>ОГРНИП</label>
                    <input name="ogrn" type="text" class="form-control" placeholder="Ваш ОГРНИП" value="{{ !$company->is_company ? $company->ogrn : '' }}">
                </div>

                <div class="form-group mt-15">
                    <label>БИК</label>
                    <input name="bik" type="text" onchange="settings.writingBik(this)" class="form-control" placeholder="Ваш БИК" value="{{ !$company->is_company ? $company->bik : '' }}">
                </div>

                <div class="form-group mt-15">
                    <label>Банк</label>
                    <input name="bank" type="text" class="form-control" placeholder="Ваш банк" value="{{ !$company->is_company ? $company->bank : '' }}">
                </div>

                <div class="form-group mt-15">
                    <label>Корреспондентский счет</label>
                    <input name="cs" type="text" class="form-control" placeholder="Ваш корреспондентский счет" value="{{ !$company->is_company ? $company->cs : '' }}">
                </div>

                <div class="form-group mt-15">
                    <label>Расчетный счет</label>
                    <input name="rs" type="text" class="form-control" placeholder="Ваш расчетный счет" value="{{ !$company->is_company ? $company->rs: '' }}">
                </div>

                <div class="form-group mt-15">
                    <label>Фактический адрес</label>
                    <input name="actual_address" type="text" class="form-control" placeholder="Ваш фактический адрес" value="{{ !$company->is_company ? $company->actual_address : '' }}">
                </div>

                <div class="form-group mt-15">
                    <label>Руководитель организации</label>
                    <input name="owner" type="text" class="form-control" placeholder="ФИО руководителя организации" value="{{ !$company->is_company ? $company->owner : '' }}">
                </div>

            </div>

            <div class="tab ul @if($company->is_company) active @endif">

                <div class="form-group mt-15">
                    <label>Наименование организации</label>
                    <div class="d-flex">
                        <input name="opf" type="text" maxlength="3" class="form-control mr-5" style="flex: 0 0 7%; max-width: 7%;" placeholder="ЗАО" value="{{ $company->is_company ? $company->opf : '' }}">
                        <input name="name" type="text" class="form-control" style="flex: 0 0 93%; max-width: 93%;"  placeholder="Общество с ограниченной ответственностью «ББ-СРМ»" value="{{ $company->is_company ? $company->name : '' }}">
                    </div>
                </div>

                <div class="form-group ">
                    <label>ИНН</label>
                    <input name="inn" type="text" onchange="settings.writingInn(this)" class="form-control" placeholder="Ваш ИНН" value="{{ $company->is_company ? $company->inn : '' }}">
                </div>

                <div class="form-group">
                    <label>ОГРН</label>
                    <input name="ogrn" type="text" class="form-control" placeholder="Ваш ОГРН" value="{{ $company->is_company ? $company->ogrn : '' }}">
                </div>

                <div class="form-group">
                    <label>КПП</label>
                    <input name="kpp" type="text" class="form-control" placeholder="Ваш КПП" value="{{ $company->is_company ? $company->kpp : '' }}">
                </div>

                <div class="d-flex">

                    <div class="form-group w-350">
                        <label>Юридический адрес</label>
                        <input name="legal_address" type="text" class="form-control" placeholder="Ваш юридический адрес" value="{{ $company->is_company ? $company->legal_address : '' }}">
                    </div>

                    <div class="form-group ml-15 w-350 p_rel">
                        <label>Фактический адрес</label>
                        <input name="actual_address" type="text" class="form-control" placeholder="Ваш фактический адрес" value="{{ $company->is_company ? (!$company->similar_address ? $company->actual_address : '') : ('') }}" @if($company->similar_address) disabled @endif>

                        <div class="form_checkbox">
                            <input name="similar_address" type="checkbox" onchange="settings.similarCompanyAddress(this)" @if($company->similar_address) checked @endif>
                            <label>Совпадает с юридическим</label>
                        </div>

                    </div>

                </div>

                <div class="form-group">
                    <label>БИК</label>
                    <input name="bik" type="text" onchange="settings.writingBik(this)" class="form-control" placeholder="Ваш БИК" value="{{ $company->is_company ? $company->bik : '' }}">
                </div>

                <div class="form-group ">
                    <label>Банк</label>
                    <input name="bank" type="text" class="form-control" placeholder="Наименование банка" value="{{ $company->is_company ? $company->bank : '' }}">
                </div>

                <div class="d-flex">

                    <div class="form-group w-350 ">
                        <label>Корреспондентский счет</label>
                        <input name="cs" type="text" class="form-control" placeholder="Ваш корреспондентский счет" value="{{$company->is_company ? $company->cs : '' }}">
                    </div>

                    <div class="ml-15 form-group w-350 ">
                        <label>Расчетный счет</label>
                        <input name="rs" type="text" class="form-control" placeholder="Ваш расчетный счет" value="{{ $company->is_company ? $company->rs : '' }}">
                    </div>

                </div>

                <div class="d-flex">

                    <div class="form-group w-350">
                        <label>Руководитель организации</label>
                        <input name="owner" type="text" class="form-control" placeholder="ФИО руководителя организации" value="{{ $company->owner }}">
                    </div>

                    <div class="form-group ml-15 w-350 p_rel">
                        <label>Главный бухгалтер</label>
                        <input name="auditor" type="text" class="form-control" placeholder="ФИО главного бухгалтера" value="{{ $company->is_company ? $company->auditor : ''  }}">
                    </div>

                </div>

            </div>

            <button class="button primary">Сохранить</button>

        </form>

    </div>
@endsection
