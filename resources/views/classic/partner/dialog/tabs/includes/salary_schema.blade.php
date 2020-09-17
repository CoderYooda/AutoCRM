<div class="elem">
    <div class="handle"></div>
    <div class="p-10" style="padding-left: 30px;">
        <input type="hidden" name="salary[{{ $index }}][salary_schema_id]" value="{{ isset($schema) ? $schema->id : 0  }}">
        <div class="title">
            {{ $schema->name }} @if($schema->isInPercent) в процентах @else в рублях @endif <a title="удалить" href="#" onclick="this.offsetParent.remove()" class="float-right close">×</a>
        </div>
        <div class="body">
            <div class="input_gr_sm">
                <label class="text-muted mb-5" for="">Значение</label>
                <input class="sm w-75" name="salary[{{ $index }}][value]" type="text" value="{{ isset($schema->pivot) ? $schema->pivot->value : 0  }}">
                @if(!$schema->isInPercent)<span class="nominal">руб.</span> @else <span class="nominal">%</span>@endif
            </div>
            @if($schema->ishm)
                <div class="input_gr_sm">
                    <label class="text-muted mb-5" for="">Часов в месяц</label>
                    <input class="sm" name="salary[{{ $index }}][h_m_value]" type="text" value="{{ isset($schema->pivot) ? $schema->pivot->h_m_value : 0  }}">
                </div>
            @endif
            <div class="input_gr_sm">
                <textarea class="w-100 comment" placeholder="Коментарий" name="salary[{{ $index }}][comment]" id="" cols="30" rows="10">{{ isset($schema->pivot) ? $schema->pivot->comment : ''  }}</textarea>
            </div>
        </div>
    </div>
</div>
