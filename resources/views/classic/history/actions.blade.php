<div class="streamline p-15 pr-0">
    <div  data-simplebar style="max-height: calc(100vh - 112px);">
        @foreach($actions as $action)
            <div class="sl-item mr-15
                            @switch($action->type)
            @case('fresh') b-info @break
            @case('delete') b-danger @break
            @case('create') b-success @break
            @case('restore') b-primary @break
            @endswitch
                ">
                <div class="sl-content">
                    <div class="sl-date text-muted">{{$action->created_at->diffForHumans()}}</div>
                    <p>{{ $action->user()->first()->partner()->first()->outputName() }}
                        <a href="#" class="text-info">{{ $action->message }}</a>.</p>
                </div>
            </div>
        @endforeach
    </div>
</div>