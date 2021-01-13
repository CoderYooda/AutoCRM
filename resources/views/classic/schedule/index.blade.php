@extends($request['view_as'] == 'json' ? get_template() . '.layouts.XHR' : 'classic.layouts.main')

@section('title', $page ?? 'Планировщик')

@section('content')
    <div id="schedule_index_page" class="w-100 box m-15 p-15">
        {{--<h2 class="mt-0 mb-0 style_header">Расписание сотрудников</h2>--}}
        <div class="d-flex">
            <div class="form-group w-128 mr-15">
                <label>Дата начала</label>
                <input onclick="this.select();" id="start_date" type="text" name="date_start" class="form-control date_picker_start" placeholder="Выберите дату">
            </div>
            <div class="form-group w-128 mr-15">
                <label>Дата окончания</label>
                <input onclick="this.select();" id="end_date" type="text" name="date_end" class="form-control date_picker_end" placeholder="Выберите дату">
            </div>
            <div class="form-group w-128 mr-15">
                <button class="button primary mt-30" onclick="schedule.resetDate()">Показать</button>
            </div>
            <div class="form-group mr-15">
                <label>Режим</label>
                <div class="btn-group">
                    <button id="action_template" type="button" onclick="window.schedule.setAction('template')" class="button primary d-block-f-left brr-0 br-trans action_button">Установить по шаблону</button>
                    <button id="action_undo" type="button" onclick="window.schedule.setAction('undo')" class="button primary d-block-f-left brl-0 brr-0 br-trans action_button">Вернуть</button>
                    <button id="action_clear" type="button" onclick="window.schedule.setAction('clear')" class="button primary d-block-f-left brl-0 br-trans action_button">Очистить</button>
                    {{--<button id="action_template" type="button" onclick="window.schedule.setAction('template')" class="button primary brl-0 action_button">Установить по шаблону</button>--}}
                </div>
            </div>
            <div id="template_container" class="form-group mr-15">
                <label>Шаблон <a style="font-weight: 300;" onclick="openDialog('scheduletemplateDialog')"> изменить</a></label>
                <div>
                    <a id="template_text" onclick="openDialog('scheduletemplateDialog')" class="pointer h-30-text">Шаблон</a>
                </div>
            </div>
            <div id="save_butt" class="form-group" style="margin-left: auto;">
                <label></label>
                <div>
                    <button class="button success" onclick="window.schedule.storeSchedules()">Сохранить</button>
                </div>
            </div>
        </div>
            <div class="sc" style="height: calc(100vh - 190px);">
                <table class="b-1 schedules_selector">
                    <thead>
                        <tr>
                            <td class="res_header bb-0">
                                <div class="resource_header header_item">Сотрудники</div>
                            </td>
                            <td class="resize bb-0"></td>
                            <td id="entry_dates" class="dates b-none">
                                <div class="scroller-clip">
                                    <div id="dates_list_scroller" class="scroller">
                                        <table id="dates_list">
                                            <tbody>
                                            <th></th>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="res_list b-none">
                                <div class="scroller-clip ">
                                    <div id="resources_list" class="scroller">
                                        <table id="resources_grid">
                                        </table>
                                    </div>
                                </div>
                            </td>
                            <td id="entry_resize" class="resize bt-0"></td>
                            <td id="entry_cells" class="dates b-none">
                                <div id="scroll_cell_grid" class="scroller-clip">
                                    <div id="cell_grid" class="ow-auto">
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        {{--<div style="height: calc(100vh - 392px);">--}}

            {{--<div id="dates"></div>--}}
        {{--</div>--}}


    </div>
@endsection

