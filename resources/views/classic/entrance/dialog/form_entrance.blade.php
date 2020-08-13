<div id="entranceDialog{{ $entrance->id ?? '' }}" @if($entrance) data-id="{{ $entrance->id }}" @endif class="dialog entrance_dialog" style="width:800px;">

    @include(get_template() . '.entrance.includes.inner_entrance_dialog')

</div>
