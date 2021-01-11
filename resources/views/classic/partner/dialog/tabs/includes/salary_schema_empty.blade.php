<div class="elem">
    <div class="handle"></div>
    <div class="p-10" style="padding-left: 30px;">
        <input type="hidden" name="salary[{{ $schema->index }}][salary_schema_id]" value="{{ $schema->id }}">
        <div class="title">
            {{ $schema->name }} @if($schema->isInPercents) в процентах @else в рублях @endif
        </div>
        <div class="body">
            <input class="sm" name="salary[{{ $schema->index }}][value]" type="text" value="0">
            <input class="sm" name="salary[{{ $schema->index }}][h_m_value]" type="text" value="0">
        </div>
    </div>
</div>
