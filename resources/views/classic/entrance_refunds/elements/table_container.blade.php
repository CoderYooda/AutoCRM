@if(isset($entrance_refunds))
    <table class="table table-bordered table-hover table-sm mb-3" style="white-space: nowrap;">
        <thead>
        <tr>
            <th style="width: 80px">№</th>
            <th class="w-sm">Дата</th>
            <th class="w-sm">Ответственный</th>
            <th class="w-sm">Поставщик</th>
            <th class="w-sm">Сумма</th>
            <th style="width: 20px;text-align: center;"><i class="fa fa-lock"></i></th>
            <th style="width: 20px"></th>
        </tr>
        </thead>
        <tbody>
            @foreach($entrance_refunds as $entrance_refund)
                @include('entrance_refunds.elements.table_element')
            @endforeach
        </tbody>
    </table>
@else
    <h5 class="my-4 text-muted">ytne</h5>
@endif
