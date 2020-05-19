<div id="desc" class="flex-1">

    Статистика по {{ $sort_name[request()->entity] }}

    <br/>{{ $desc }}

    <br/>Дата начала: {{ request()->begin_date }}
    <br/>Дата конца: {{ request()->final_date }}

</div>