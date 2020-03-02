<div class="streamline p-15 pr-0">
    <div  data-simplebar style="max-height: calc(100vh - 112px);" >
        <div class="mr-15">
            @foreach($system_messages as $system_message)
                <div class="box-color {{ $system_message->type }} aside_message w-100 mb-10 p-10 br-3">
                    <div class="sl-date text-muted">{{$system_message->created_at->diffForHumans()}}</div>
                    <div class="box-body">
                        <p class="m-0 text-muted">{{ $system_message->message }}</p>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</div>
