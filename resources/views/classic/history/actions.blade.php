<div class="streamline p-15 pr-0">
    <div  data-simplebar style="max-height: calc(100vh - 155px);">
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
                    <p>
                        @php
                            $modelName = Str::camel($action->model);
                            $dialogName = $modelName . 'Dialog';
                            $dialogParams = '&' . strtolower($modelName) . '_id=' . $action->model_id
                        @endphp
                        <a onclick="openDialog( '{{ $dialogName }}', '{{ $dialogParams }}' )" class="text-info">{{ $action->message }}</a>, {{ $action->user->roles->first()->name }}: {{ $action->user->partner->outputName() }}
                    </p>
                </div>
            </div>
        @endforeach
    </div>
</div>
