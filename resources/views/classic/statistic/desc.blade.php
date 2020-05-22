<h2 class="mt-0 stat_header p-15">Описание</h2>
<div class="p-15 pt-0">
    <div class="mb-10">
        <b>
            Фильтр:

            @if(count(request('entity')) == count($sort_name))
                Все разделы
            @else

                @foreach(request()->entity as $entity_id)
                    {{ $sort_name[$entity_id] }}@if(!$loop->last), @endif
                @endforeach

            @endif
        </b>
    </div>
    <div class="mb-10"><b>Менеджер: {{ $manager != null ? $manager->fio : 'Не выбрано' }}</b></div>
    <div class="mb-10"><b>Контрагент: {{ $partner != null ? $partner->fio : 'Не выбрано' }}</b></div>
    <div class="mb-10">Дата начала: {{ request()->begin_date }}</div>
    <div class="mb-10">Дата конца: {{ request()->final_date }}</div>
</div>
