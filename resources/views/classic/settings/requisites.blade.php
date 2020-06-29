{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.settings.layout.tabs')

@section('tab')
    <div id="ajax-table-role" class="box d-flex p-15 m-15">

        <form style="max-width: 700px;">
            <div class="d-flex">
                <button style="width: 50%;" class="button primary">Индивидуальный предприниматель</button>
                <button style="width: 50%;" class="ml-15 button primary active">Юридическое лицо</button>
            </div>
            <div class="form-group mt-15">
                <label>БИК</label>
                <input name="bik" type="text" class="form-control" placeholder="Ваш банк">
            </div>

            <div class="d-flex">

                <div class="form-group w-350 ">
                    <label>ИНН</label>
                    <input name="inn" type="text" class="form-control" placeholder="Ваш ИНН">
                </div>

                <div class="ml-15 form-group w-350 ">
                    <label>КПП</label>
                    <input name="kpp" type="text" class="form-control" placeholder="Ваш КПП">
                </div>

            </div>

            <div class="form-group ">
                <label>ОГРН</label>
                <input name="name" type="text" class="form-control" placeholder="Общество с ограниченной ответственностью «ББ-СРМ»">
            </div>

            <div class="d-flex">

                <div class="form-group w-350 ">
                    <label>Юридический адрес</label>
                    <input name="legal_address" type="text" class="form-control" placeholder="Ваш юридический адрес">
                </div>

                <div class="ml-15 form-group w-350 p_rel">
                    <label>Фактический адрес</label>
                    <input name="actual_address" type="text" class="form-control" placeholder="Ваш фактический адрес">

                    <div class="form_checkbox">
                        <input name="similar_address" type="checkbox">
                        <label>Совпадает с юридическим</label>
                    </div>
                </div>

            </div>

            <div class="form-group ">
                <label>Банк</label>
                <input name="bank" type="text" class="form-control" placeholder="Наименование банка">
            </div>

            <div class="d-flex">

                <div class="form-group w-350 ">
                    <label>Корреспондентский счет</label>
                    <input name="cs" type="text" class="form-control" placeholder="Ваш корреспондентский счет">
                </div>

                <div class="ml-15 form-group w-350 ">
                    <label>Расчетный счет</label>
                    <input name="rs" type="text" class="form-control" placeholder="Ваш расчетный счет">
                </div>

            </div>

            <div class="form-group ">
                <label>Наименование</label>
                <input name="name" type="text" class="form-control" placeholder="Общество с ограниченной ответственностью «ББ-СРМ»">
            </div>

        </form>

    </div>
@endsection
