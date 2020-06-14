<div class="list-group no-radius no-borders">
    @forelse($messages as $message)
        @include(env('DEFAULT_THEME', 'classic') . '.system.message.message')
    @empty
        <div class="w-100 p-10" style="margin-top: calc(50vh - 43%);">
            <div class="mess-flat"></div>
            <span class="undermess_text">Системных сообщений нет</span>
        </div>
    @endforelse
</div>
