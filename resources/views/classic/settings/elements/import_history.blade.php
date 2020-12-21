@if(count($last_imports))
    <div class="box p-15">
        <h2 class="style_header">Последние импорты</h2>
        <h3 class="style_subheader">Импорты хранятся в течении 2 недель</h3>

        <div class="mt-15 import-titles d-flex" style="font-weight: bold;">
            <div style="width: 15px;">ID</div>
            <div class="pl-15 w-290">Инициатор</div>
            <div class="pl-15 w-128">Магазин</div>
            <div class="pl-15 w-128">Дата</div>
            <div class="pl-15 w-260">Действия</div>
        </div>

        <div class="import-list pb-15 mt-15">
            @foreach($last_imports as $import)
                <div id="import-{{ $import->id }}" class="import-item d-flex mb-10">
                    <div style="width: 15px;">{{ $import->id }}</div>
                    <div class="pl-15 w-290">{{ $import->partner->fio }}</div>
                    <div class="pl-15 w-128">{{ $import->store->name }}</div>
                    <div class="pl-15 w-128">{{ $import->created_at->format('d.m.Y') }}</div>
                    <div class="pl-15 w-260">
                        <button class="btn-icon p-0" style="background: none; border: 0; color: #1F98E9;" onclick="settings.backImportChanges({{ $import->id }})">
                            <i class="fa fa-undo pointer"></i>
                            Отменить изменения
                        </button>
                    </div>
                </div>
            @endforeach
        </div>

    </div>
@endif
