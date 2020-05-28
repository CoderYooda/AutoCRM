<style>
    table{
        table-layout: fixed;
        padding: 0px;
        padding-left: 2px;
        vertical-align: bottom;
        border-collapse: collapse;
        font-family: Arial;
        font-size: 8pt;
        font-style: normal;
        width: 100%;
        border: 1px solid #000;
    }
    tr,td{
        font-family: Arial;
        font-size: 10pt;
        font-style: normal;
        font-weight: bold;
        vertical-align: medium;
        border-left: #000000 1px solid;
        border-top: #000000 1px solid;
        border-bottom: #000000 1px solid;
        border-right: #000000 1px solid;
    }
    h2{
        font-weight: bold;
        font-size: 18px;
    }
    .padding{
        width: 200px;
    }
</style>

<div style="text-align: center">
    <img src="{{ json_decode($request->data)->image }}" alt="">
</div>

@foreach(json_decode($request->data) as $entity => $dates)

    @continue($entity == 'image')

    <h2>{{ $entity }}</h2>
    <table>
        <tbody>
        <thead>
            <tr>
                <td width="100px">Дата</td>
                <td>ID</td>
                <td>Менджер</td>
                <td>Сумма</td>
            </tr>
        </thead>
        @foreach($dates as $date => $entities)
            @foreach($entities as $entity_id => $attributes)
                <tr>
                    <td width="200px" >{{ $date }}</td>
                    <td>{{ $entity_id }}</td>
                    <td>{{ $attributes->manager }}</td>
                    <td>{{ number_format($attributes->amount, 2, ',', ' ')  }}</td>
                </tr>
            @endforeach

        @endforeach
        </tbody>
    </table>
@endforeach

