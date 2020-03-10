@php $class = 'scheduleTemplateDialog' @endphp
<div id="scheduleTemplateDialog" class="dialog schedule_template_dialog" style="width:600px;">
    <div class="titlebar">Изменить шаблон</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.scheduleTemplateDialog.finitaLaComedia()">×</button>
    <div class="box-body">
        <ul class="nav nav-tabs mb-15">
            <li>
                <a type="button" class="button primary d-block-f-left brr-0 nav-link active" data-toggle="tab" href="#work" onclick="window.scheduleTemplateDialog.setDaytype(true)">Рабочий день</a>
            </li>
            <li>
                <a type="button" class="button primary brl-0 nav-link" data-toggle="tab" href="#day_off" onclick="window.scheduleTemplateDialog.setDaytype(false)">Нерабочий день</a>
            </li>
        </ul>
        <div class="tab-content p-0">
            <div class="tab-pane active" id="work">
                <div class="row row-sm">


                    <div class="col-sm-3">
                        <label class="label-sm">График</label>
                    </div>
                    <div class="col-sm-9" id="periods">
                        <div class="row row-sm period">
                            <div class="col-sm-5">
                                <input type="text" class="form-control" value="8:00" name="period[0]['start']" id="period_0_start">
                            </div>
                            <div class="col-sm-5">
                                <input type="text" class="form-control" value="17:00" name="period[0]['end']" id="period_0_end">
                            </div>
                            <div class="col-sm-2">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3"></div>
                    <div class="col-sm-9 mt-15">
                        <div class="row row-sm">
                            <div class="col-sm-10">
                                <button onclick="window.scheduleTemplateDialog.addPeriod()" class="button w-100">Добавить интервал</button>
                            </div>
                            <div class="col-sm-2"></div>
                        </div>
                    </div>

                    {{--<div class="col-sm-6">--}}
                        {{--<div class="form-group row row-sm">--}}
                            {{--<label class="col-sm-3 label-sm">от</label>--}}
                            {{--<div class="input-group col-sm-9">--}}
                                {{--<input type="text" class="form-control" name="period[0]['start']" id="period_0_start">--}}
                            {{--</div>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                    {{--<div class="col-sm-6">--}}
                        {{--<div class="form-group row row-sm">--}}
                            {{--<label class="col-sm-3 label-sm">до</label>--}}
                            {{--<div class="input-group col-sm-9">--}}
                                {{--<input type="text" class="form-control" name="period[0]['end']" id="period_0_end">--}}
                            {{--</div>--}}
                        {{--</div>--}}
                    {{--</div>--}}

                </div>
            </div>
            <div class="tab-pane" id="day_off">
                <div class="form-group mr-15">
                    <select name="day_off_type" id="" class="form-control input-c">
                        <option value="0">Не выбран</option>
                        @foreach($day_off_types as $day_off_type)
                            <option value="{{ $day_off_type->id }}">{{ $day_off_type->type }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
        </div>

    </div>
    <div class="modal-footer">
        <button type="button" class="button primary pull-right uppercase-btn" onclick="window.scheduleTemplateDialog.applyTemplate(this)">Сохранить шаблон</button>
        <button class="button white mr-15 uppercase-btn" onclick="window.scheduleTemplateDialog .finitaLaComedia(this)">Закрыть</button>
    </div>
    <div class="system_message">

    </div>
</div>

