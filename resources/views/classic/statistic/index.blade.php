{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.store.layout.tabs')

@section('title', $page ?? 'Статистика')

@section('content')
    @php $class = 'statistic' @endphp

    <div id="ajax-table-statistic" class="bottom-container">

        <div class="form-group w-128 mr-15">
            <label>Дата начала</label>
            <input type="date" type="text" name="begin_date" class="form-control date_picker_start" placeholder="Выберите дату">
        </div>

        <div class="form-group w-128 mr-15">
            <label>Дата конца</label>
            <input type="date" type="text" name="final_date" class="form-control date_picker_end" placeholder="Выберите дату">
        </div>

        <div class="form-group w-128 mr-15">
            <label>Сущность</label>
            <select id="entity" class="form-control">
                <option value="0">Заявки поставщикам</option>
                <option value="1">Поступления</option>
                <option value="2">Продажи</option>
            </select>
        </div>

        <div class="form-group w-128 mr-15">
            <br/>
            <button onclick="{{ $class }}.openSelectPartnermodal()" type="button" name="partner_id" class="partner_select form-control text-left button_select">
                @if(isset($shipment) && $shipment->partner != NULL && $shipment->partner != null)
                    {{ $shipment->partner->outputName() }}
                @else
                    Не выбрано
                @endif
            </button>
        </div>

        <input type="hidden" name="manager_id" value="-1" />

        <div class="form-group w-128 mr-15">
            <button class="button primary mt-30" onclick="{{ $class }}.showResults()">Показать</button>
        </div>

    </div>
@endsection