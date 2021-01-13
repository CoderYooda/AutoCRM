<div class="entrances d-none">

    <div class="children_header d-flex">
        <div class="pl-10" style="width: 15%">Дата</div>
        <div style="width: 23%">Цена</div>
        <div style="width: 50%">Количество</div>
        <div></div>
    </div>

    <div class="children_body">

        @foreach($articleAttributes['entrances'] as $id => $entrance)

            <div class="children_element d-flex">
                <div class="pl-10" style="width: 15%">{{ $entrance['created_at'] }}</div>
                <div style="width: 23%"><input type="text" onclick="this.select();" name="products[{{ $entrance['id'] }}][{{ $article_id }}][price]" value="{{ $entrance['price'] }}" @isset($adjustment) disabled @endisset></div>
                <div style="width: 57%"><input type="text" onclick="this.select();" name="products[{{ $entrance['id'] }}][{{ $article_id }}][count]" value="{{ isset($adjustment) ? $entrance['count'] : ($entrance['count'] - $entrance['released_count']) }}" @isset($adjustment) disabled @endisset></div>
                <div></div>
            </div>

        @endforeach

        @if(!isset($adjustment))

            <div id="new_correct_{{ $article_id }}" class="children_element d-flex @if(count($articleAttributes['entrances'])) d-none @endif">
                <div class="pl-10" style="width: 15%">{{ \Carbon\Carbon::now()->format('d.m.Y') }}</div>
                <div style="width: 23%"><input type="text" onclick="this.select();" name="products[new][{{ $article_id }}][price]" value="0" @if(count($articleAttributes['entrances'])) disabled @endif></div>
                <div style="width: 57%"><input type="text" onclick="this.select();" name="products[new][{{ $article_id }}][count]" value="0" @if(count($articleAttributes['entrances'])) disabled @endif></div>
                <div>
                    <img src="{{ asset('/images/dialog/remove-element.svg') }}" onclick="{{ $class }}.removeField(this)" />
                </div>
            </div>

            <div class="children_button pointer @if(count($articleAttributes['entrances']) == 0) d-none @endif" onclick="{{ $class }}.addField(this, {{ $article_id }})">Добавить корректирующую позицию</div>

        @endif

    </div>
</div>
