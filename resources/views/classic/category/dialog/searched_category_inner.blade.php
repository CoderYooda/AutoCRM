
<div>
    <div class="nlborder list-group box mb-0">
    @foreach($category->childs as $child)
        <span class="d-flex">
            <a class="folder-link list-group-item w-100" onclick="{{ $class }}.select({{ $child->id }})"><i class="fa fa-folder"></i> {{ $child->name }}</a>

            @if($request['refer'] != null && strpos($request['refer'], 'partner') !== false)
                <div class="sp-p">
                    <button onclick="try{window.{{$request['refer']}}.selectCategory({{ $child->id }})}catch (e) {}" class="btn btn-sm success"><i class="fa fa-check"></i></button>
                </div>
            @else
                <div class="sp-p">
                <button onclick="try{window.{{$request['refer']}}.selectCategory({{ $child->id }})}catch (e) {}" class="btn btn-sm success"><i class="fa fa-check"></i></button>
                </div>
            @endif
        </span>
    @endforeach
    </div>
</div>
