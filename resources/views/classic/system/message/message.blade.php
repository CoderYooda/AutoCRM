<div class="box-color {{ $message->type }} aside_message w-350 mb-10 p-10">
    <button class="btn_close" onclick="window.systemMessages.readMessage({{ $message->id }})">×</button>
    <div class="box-header">
        {{--<h3 class="mt-0">Box Header</h3>--}}
        <small>{{ $message->link }}</small>
    </div>
    <div class="box-body">
        <div class="sl-date text-muted">{{$message->created_at->diffForHumans()}}</div>
        @if( $message->kind && $message->kind_id)
            @php
                $modelName = mb_strtolower($message->kind);
                $dialogName = $modelName . 'Dialog';
                $dialogParams = '&' . $modelName . '_id=' . $message->kind_id
            @endphp
            <p onclick="systemMessages.modal.hide();openDialog( '{{ $dialogName }}', '{{ $dialogParams }}' )" class="m-0 text-muted linkable">{{ $message->message }}</p>
        @else
            <p class="m-0 text-muted">{{ $message->message }}</p>
        @endif
    </div>
</div>
