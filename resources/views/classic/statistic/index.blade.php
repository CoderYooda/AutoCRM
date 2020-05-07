{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.store.layout.tabs')

@section('title', $page ?? 'Статистика')

@section('content')
    @php $class = 'statistic' @endphp
    <div id="ajax-table-statistic" class="bottom-container">

        <div class="form-group w-128 mr-15">
            <label>Дата начала</label>
            <input type="date" id="begin_date" type="text" name="date_start" class="form-control date_picker_start" placeholder="Выберите дату">
        </div>

        <div class="form-group w-128 mr-15">
            <label>Дата конца</label>
            <input type="date" id="final_date" type="text" name="date_start" class="form-control date_picker_start" placeholder="Выберите дату">
        </div>

        <div class="form-group w-128 mr-15">
            <button onclick="{{ $class }}.openSelectPartnermodal()" type="button" name="partner_id" class="partner_select form-control text-left button_select">
                @if(isset($shipment) && $shipment->partner != NULL && $shipment->partner != null)
                    {{ $shipment->partner->outputName() }}
                @else
                    Не выбрано
                @endif
            </button>
        </div>

        <div class="form-group w-128 mr-15">
            <button class="button primary mt-30" onclick="schedule.resetDate()">Показать</button>
        </div>

    </div>
@endsection