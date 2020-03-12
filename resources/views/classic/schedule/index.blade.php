@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') . '.layouts.XHR' : 'classic.layouts.main')

@section('title', $page ?? 'Планировщик')

@section('content')
    <div id="schedule_index_page" class="w-100 box m-15 p-15">

        {{--<h2 class="mt-0 mb-0 style_header">Расписание сотрудников</h2>--}}
        <div class="d-flex">
            <div class="form-group w-128 mr-15">
                <label>Дата начала</label>
                <input type="text" name="date_start" class="form-control date_picker_start" placeholder="Выберите дату">
            </div>
            <div class="form-group w-128 mr-15">
                <label>Дата окончания</label>
                <input type="text" name="date_end" class="form-control date_picker_end" placeholder="Выберите дату">
            </div>
            <div class="form-group w-128 mr-15">
                <button class="button primary mt-30">Показать</button>
            </div>
            <div class="form-group mr-15">
                <label>Режим</label>
                <div class="btn-group">
                    <button id="action_edit" type="button" onclick="window.schedule.setAction('edit')" class="button primary d-block-f-left brr-0 br-trans action_button">Изменить день</button>
                    <button id="action_template" type="button" onclick="window.schedule.setAction('template')" class="button primary brl-0 action_button">Установить по шаблону</button>
                </div>
            </div>
            <div class="form-group mr-15">
                <label>Шаблон</label>
                <div>
                    <a id="template_text" onclick="openDialog('scheduletemplateDialog')" class="pointer h-32-text">Шаблон</a>
                </div>
            </div>
        </div>
            <div class="sc" style="height: calc(100vh - 592px);">
                <table>
                    <thead>
                        <tr>
                            <td class="res_header">Сотрудники</td>
                            <td class="resize"></td>
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
                            <td class="res_list">
                                <div class="scroller-clip">
                                    <div id="resources_list" class="scroller">
                                        <table id="resources_grid">
                                            <tbody>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                                <tr><td><div class="cell-height">Сенаторов</div></td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </td>
                            <td class="resize"></td>
                            <td id="entry_cells" class="dates b-none">
                                <div class="scroller-clip">
                                    <div id="cell_grid" class="ow-auto">
                                        <table>
                                            <tbody>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                                <tr data-resource-id="1">
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                    <td class="cell-width"><div class="cell-height">1</div></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        <div style="height: calc(100vh - 392px);">

            <div id="dates"></div>
        </div>


    </div>
@endsection

