<li class="list-group-item action_hover">
    <div class="box-tool action_panel">
        <ul class="nav nav-xs">
            <li class="nav-item dropdown">
                <a class="nav-link js-remove">
                    <i class="fa fa-fw fa-close"></i>
                </a>
            </li>
        </ul>
    </div>
    <div class="_500">Процентное начисление \ отчисление</div>
    <input class="index_need" type="hidden" name="schema[convert][id]" value="{{ $schema->id }}">
    <span class="d-block text-ellipsis text-muted mb-2">Добавляет или отнимает сумму в процентах от результата предыдущих начислений</span>
    <div class="form-group row mb-0 ">
        <label class="col-sm-5 col-form-label" for="formGroupInputSmall">Процент</label>
        <div class="col-sm-7">
            <div class="input-group input-group-sm mb-2">
                <input class="form-control form-control-sm index_need" max="100" type="number" name="schema[convert][value]" id="formGroupInputSmall" placeholder="Процент">
                <span class="input-group-append"><span class="input-group-text">%</span></span>
            </div>
        </div>
    </div>
    <span class="arrow bottom b-success"></span>
</li>
