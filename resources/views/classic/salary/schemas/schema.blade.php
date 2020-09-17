<div class="salary_item">
    <div class="_500">{{ $schema->name }} @if($schema->isInPercent) в процентах @else в рублях @endif</div>
    <input class="index_need" type="hidden" value="{{ $schema->id }}">
    <span class="d-block text-ellipsis text-muted mb-2">{{ $schema->comment  }}</span>

    {{--<div class="form-group row mb-0 ">--}}
        {{--<label class="col-sm-5 col-form-label" for="formGroupInputSmall">Процент</label>--}}
        {{--<div class="col-sm-7">--}}
            {{--<div class="input-group input-group-sm mb-2">--}}
                {{--<input class="form-control form-control-sm index_need" max="100" type="number" name="schema[convert][value]" placeholder="Процент">--}}
                {{--<span class="input-group-append"><span class="input-group-text">%</span></span>--}}
                {{----}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</div>--}}
    {{--<span class="arrow bottom b-success"></span>--}}
    <button class="button select" type="button" onclick="window.{{ $refer }}.addSalarySchema({{ $schema->id }}, parseInt(this.parentElement.getElementsByTagName('input')[0].value));  window.salarySchemaDialog.finitaLaComedia()">Добавить</button>
</div>
