{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.store.layout.tabs')

@section('title', $page ?? 'Документы')

@section('tab')

    <div id="ajax-table-documents" class="bottom-container" style="height: calc(100% - 79px) !important;">

        @include(get_template() . '.store.elements.search')

        <div class="content-rightside">
            @can('Создавать документы')
                <button onclick="openDialog('documentDialog')" class="button primary mb-15 w-100">Новый документ</button>
            @endcan
            <div class="box w-290 p-10 filter-panel">
                <div class="box-title">Фильтр</div>
                <div class="form-group d-flex mb-10">
                    <label class="no-wrap" for="date_filter">Период</label>
                    <input id="date_filter" type="text" name="date_filter" value="{{ request('dates_range') }}" class="form-control date_filter input_as_link" placeholder="за всё время">
                    <button type="button" onclick="window.store.resetDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="form-group d-flex mb-10">
                    <label class="no-wrap" for="entrance_status">Тип документа</label>
                    <div class="dropdown" onclick="window.helper.openModal(this, event)">
                        <input readonly="" id="document_filter" type="text" name="entrance_status" value="" class="form-control entrance_status input_as_link" placeholder="не выбрано">
                        <div class="dropdown_container">
                            <div class="arrow"></div>
                            <span onclick="store.setField('document_filter', null, 'Не выбрано', this)" class="element">Не выбрано</span>
                            @foreach($documentsTypes as $documentType)
                                <span onclick="store.setField('document_filter', {{ $documentType->id }}, '{{ $documentType->name }}', this)" class="element">{{ $documentType->name }}</span>
                            @endforeach
                        </div>
                    </div>
                    <button type="button" onclick="store.setField('document_filter', null, 'не выбрано')" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="filter_field mb-0">
                    <div class="form-group d-flex mb-0">
                        <label class="no-wrap" for="accountable">Менеджер</label>
                        <input readonly onclick="store.openSelectPartnerModal('accountable')" id="accountable" type="text" name="accountable" value="{{ request('pay_status') }}" class="form-control accountable input_as_link" placeholder="выбрать">
                        <button type="button" onclick="store.clearList('accountable', 'accountable_stack')" class="right-remove"><i class="fa fa-remove"></i></button>
                    </div>
                    <div id="accountable_stack"></div>
                </div>
                <div id="adds-card" class="hide">
                    <hr>
                    <div class="box-title">Контактная информация</div>
                    <div id="contact_block"></div>
                </div>
            </div>
        </div>

    </div>

@endsection

