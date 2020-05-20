<h2 class="mt-0 stat_header p-15">Описание</h2>
<div class="p-15 pt-0">
    <div class="mb-10"><b>Фильтр: {{ (request()->entity == -1 ? ('Все разделы') : $sort_name[request()->entity]) }}</b></div>
    <div class="mb-10"><b>Менеджер: {{ $manager ?: 'Не выбрано' }}</b></div>
    <div class="mb-10"><b>Контрагент: {{ $partner ?: 'Не выбрано' }}</b></div>
    <div class="mb-10">Дата начала: {{ request()->begin_date }}</div>
    <div class="mb-10">Дата конца: {{ request()->final_date }}</div>
</div>
