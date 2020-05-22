<h2 class="mt-0 stat_header p-15">Описание</h2>
<div class="p-15 pt-0">
    <div class="mb-10">
        <b>Фильтр:</b>

            @if(count(request('entity')) == count($sort_name))
                Все разделы
            @else

                @foreach(request()->entity as $entity_id)
                    {{ $sort_name[$entity_id] . (!$loop->last ? ',' : '') }}
                @endforeach

            @endif
    </div>
    <div class="mb-10"><b>Менеджер:</b> {{ $manager != null ? $manager->fio : 'Не выбрано' }}</div>
    <div class="mb-10"><b>Контрагент:</b> {{ $partner != null ? $partner->fio : 'Не выбрано' }}</div>
    <div class="mb-10"><b>Дата начала:</b> {{ request()->begin_date }}</div>
    <div class="mb-10"><b>Дата конца:</b> {{ request()->final_date }}</div>
</div>
