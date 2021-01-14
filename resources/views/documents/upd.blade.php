<html>

<head>
    <link rel = "stylesheet" type = "text/css" href = "{{ asset('/css/documents/upd.css') }}">
</head>
<body>
    <table style="width:100%; height:0px; " cellspacing="0">
        <colgroup>
            <col width="7">
            <col width="66">
            <col width="18">
            <col width="14">
            <col width="14">
            <col width="116">
            <col width="109">
            <col width="28">
            <col width="133">
            <col width="26">
            <col width="533">
            <col width="7">
            <col>
        </colgroup>
        <tbody>
        <tr class="R0">
            <td><span></span></td>
            <td class="R0C1" colspan="3" rowspan="3">Универсальный передаточный<br>документ</td>
            <td class="R0C4"><span></span></td>
            <td class="R0C5">Счет-фактура №</td>
            <td class="R0C6">{{ $data['id'] }}</td>
            <td class="R0C7">от</td>
            <td class="R0C6">{{ $data['created_at'] }}</td>
            <td class="R0C9"><span style="white-space:nowrap;max-width:0px;">(1)</span></td>
            <td class="R0C10" rowspan="3"><span style="white-space:nowrap;max-width:0px;">Приложение&nbsp;№&nbsp;1&nbsp;к&nbsp;постановлению&nbsp;Правительства&nbsp;Российской&nbsp;Федерации&nbsp;от&nbsp;26&nbsp;декабря&nbsp;2011&nbsp;г.&nbsp;№&nbsp;1137<br>(в&nbsp;редакции&nbsp;постановления&nbsp;Правительства&nbsp;Российской&nbsp;Федерации&nbsp;от&nbsp;19&nbsp;августа&nbsp;2017&nbsp;г.&nbsp;№&nbsp;981)</span>
            </td>
            <td class="R0C11"><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R0">
            <td><span></span></td>
            <td class="R0C4"><span></span></td>
            <td class="R1C5">Исправление №</td>
            <td class="R1C6">--</td>
            <td class="R1C7"><span style="white-space:nowrap;max-width:0px;">от</span></td>
            <td class="R1C8"><span style="white-space:nowrap;max-width:0px;">--</span></td>
            <td class="R0C9"><span style="white-space:nowrap;max-width:0px;">(1а)</span></td>
            <td class="R0C11"><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R2">
            <td>
                <div style="position:relative; height:7px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R2C4">
                <div style="position:relative; height:7px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:7px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:7px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:7px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:7px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:7px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R2C10">
                <div style="position:relative; height:7px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:7px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:7px;overflow:hidden;">&nbsp;</div>
            </td>
        </tr>
        </tbody>
    </table>
    <table style="width:100%; height:0px; " cellspacing="0">
        <colgroup>
            <col width="7">
            <col width="66">
            <col width="18">
            <col width="14">
            <col width="13">
            <col width="210">
            <col width="89">
            <col width="45">
            <col width="22">
            <col width="23">
            <col width="45">
            <col width="22">
            <col width="23">
            <col width="89">
            <col width="357">
            <col width="26">
            <col width="2">
            <col>
        </colgroup>
        <tbody>
        <tr class="R3">
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td class="R3C4"><span></span></td>
            <td class="R3C5"><span style="white-space:nowrap;max-width:0px;">Продавец:</span></td>
            <td class="R3C6" colspan="9">{{ $data['company_name'] }}</td>
            <td class="R3C15"><span style="white-space:nowrap;max-width:0px;">(2)</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R4">
            <td><span></span></td>
            <td class="R4C1"><span style="white-space:nowrap;max-width:0px;">&nbsp;&nbsp;&nbsp;&nbsp;Статус:</span></td>
            <td class="R4C2"><span style="white-space:nowrap;max-width:0px;">1</span></td>
            <td class="R4C3"><span></span></td>
            <td class="R4C4"><span></span></td>
            <td class="R4C5">Адрес:</td>
            <td class="R4C6" colspan="9">{{ $data['legal_address'] }}</td>
            <td class="R4C15"><span style="white-space:nowrap;max-width:0px;">(2а)</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R3">
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td class="R3C4"><span></span></td>
            <td class="R5C5">ИНН/КПП продавца:</td>
            <td class="R5C6" colspan="9">{{ $data['inn'] }}/{{ $data['kpp'] }}</td>
            <td class="R3C15"><span style="white-space:nowrap;max-width:0px;">(2б)</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R4">
            <td><span></span></td>
            <td class="R6C1" colspan="3" rowspan="3">1 – счет-фактура и передаточный документ (акт)<br>2 – передаточный
                документ (акт)
            </td>
            <td class="R4C4"><span></span></td>
            <td class="R6C5">Грузоотправитель и его адрес:</td>
            <td class="R6C6" colspan="9">--</td>
            <td class="R6C15"><span style="white-space:nowrap;max-width:0px;">(3)</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R4">
            <td><span></span></td>
            <td class="R4C4"><span></span></td>
            <td class="R6C5">Грузополучатель и его адрес:</td>
            <td class="R6C6" colspan="9">--</td>
            <td class="R6C15"><span style="white-space:nowrap;max-width:0px;">(4)</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R4">
            <td><span></span></td>
            <td class="R4C4"><span></span></td>
            <td class="R6C5">К платежно-расчетному документу №</td>
            <td class="R6C6" colspan="9"> от</td>
            <td class="R6C15"><span style="white-space:nowrap;max-width:0px;">(5)</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R3">
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td class="R3C4"><span></span></td>
            <td class="R9C5"><span style="white-space:nowrap;max-width:0px;">Покупатель:</span></td>
            <td class="R9C6" colspan="9">{КлиентНаименование}</td>
            <td class="R9C15"><span style="white-space:nowrap;max-width:0px;">(6)</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R3">
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td class="R3C4"><span></span></td>
            <td class="R5C5">Адрес:</td>
            <td class="R10C6" colspan="9">{КлиентАдрес}</td>
            <td class="R9C15"><span style="white-space:nowrap;max-width:0px;">(6а)</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R3">
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td class="R3C4"><span></span></td>
            <td class="R5C5">ИНН/КПП покупателя:</td>
            <td class="R11C6" colspan="9">{КлиентИНН}/{КлиентКПП}</td>
            <td class="R9C15"><span style="white-space:nowrap;max-width:0px;">(6б)</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R12">
            <td>
                <div style="position:relative; height:14px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:14px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:14px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:14px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R12C4">
                <div style="position:relative; height:14px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R12C5">Валюта: наименование, код</td>
            <td class="R12C6" colspan="9">Российский рубль, 643</td>
            <td class="R12C15"><span style="white-space:nowrap;max-width:0px;">(7)</span></td>
            <td>
                <div style="position:relative; height:14px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:14px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:14px;overflow:hidden;"></div>
            </td>
        </tr>
        <tr class="R3">
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td class="R13C3"><span></span></td>
            <td class="R13C4"><span></span></td>
            <td class="R5C5" colspan="7">Идентификатор государственного контракта, договора (соглашения) (при наличии):</td>
            <td class="R13C12" colspan="3"><span></span></td>
            <td class="R13C15" colspan="1"><span style="white-space:nowrap;max-width:0px;">(8)</span></td>
            <td></td>
        </tr>
        </tbody>
    </table>{СписокЗапчастейУПД}
    <table style="width:100%; height:0px; " cellspacing="0">
        <colgroup>
            <col width="7">
            <col width="98">
            <col width="16">
            <col width="189">
            <col width="123">
            <col width="11">
            <col width="161">
            <col width="10">
            <col width="35">
            <col width="130">
            <col width="123">
            <col width="11">
            <col width="153">
            <col width="6">
            <col>
        </colgroup>
        <tbody>
        <tr class="R14">
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R14C3">
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R27C3">
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:5px;overflow:hidden;">&nbsp;</div>
            </td>
        </tr>
        <tr class="R28">
            <td>
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R28C1" rowspan="4">Документ составлен на<br>2 листах</td>
            <td class="R28C2">
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R28C3"><span style="white-space:nowrap;max-width:0px;">Руководитель&nbsp;организации<br>или&nbsp;иное&nbsp;уполномоченное&nbsp;лицо</span>
            </td>
            <td class="R28C4">
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R28C4"><br></td>
            <td>
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R28C8" colspan="2"><span style="white-space:nowrap;max-width:0px;">Главный&nbsp;бухгалтер<br>или&nbsp;иное&nbsp;уполномоченное&nbsp;лицо</span>
            </td>
            <td class="R28C4">
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R28C4"><br></td>
            <td>
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:27px;overflow:hidden;"></div>
            </td>
        </tr>
        <tr class="R29">
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R29C2">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R29C3">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R29C4"><span style="white-space:nowrap;max-width:0px;">(подпись)</span></td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R29C4"><span style="white-space:nowrap;max-width:0px;">(ф.и.о.)</span></td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R29C4"><span style="white-space:nowrap;max-width:0px;">(подпись)</span></td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R29C4"><span style="white-space:nowrap;max-width:0px;">(ф.и.о.)</span></td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:10px;overflow:hidden;"></div>
            </td>
        </tr>
        <tr class="R28">
            <td>
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R28C2">
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R28C3"><span style="white-space:nowrap;max-width:0px;">Индивидуальный&nbsp;предприниматель<br>или&nbsp;иное&nbsp;уполномоченное&nbsp;лицо</span>
            </td>
            <td class="R28C4">
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R28C4">
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R30C9" colspan="4">
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:27px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:27px;overflow:hidden;"></div>
            </td>
        </tr>
        <tr class="R29">
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R31C2">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R31C3">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R31C4"><span style="white-space:nowrap;max-width:0px;">(подпись)</span></td>
            <td class="R31C5">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R31C4"><span style="white-space:nowrap;max-width:0px;">(ф.и.о.)</span></td>
            <td class="R31C5">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R31C5">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R31C4" colspan="4"><span style="white-space:nowrap;max-width:0px;">(реквизиты&nbsp;свидетельства&nbsp;о&nbsp;государственной&nbsp;&nbsp;регистрации&nbsp;индивидуального&nbsp;предпринимателя)</span>
            </td>
            <td class="R31C13">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:10px;overflow:hidden;"></div>
            </td>
        </tr>
        </tbody>
    </table>
    <table style="width:100%; height:0px; " cellspacing="0">
        <colgroup>
            <col width="11">
            <col width="154">
            <col width="11">
            <col width="21">
            <col width="91">
            <col width="56">
            <col width="11">
            <col width="168">
            <col width="25">
            <col width="7">
            <col width="7">
            <col width="154">
            <col width="11">
            <col width="91">
            <col width="56">
            <col width="11">
            <col width="161">
            <col width="25">
            <col width="3">
            <col>
        </colgroup>
        <tbody>
        <tr class="R14">
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R32C5" colspan="12" rowspan="2">Основной договор</td>
            <td class="R32C17" rowspan="3"><span style="white-space:nowrap;max-width:0px;">[8]</span></td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:5px;overflow:hidden;"></div>
            </td>
        </tr>
        <tr class="R33">
            <td><span></span></td>
            <td class="R33C1" colspan="4"><span style="white-space:nowrap;max-width:0px;">Основание&nbsp;передачи&nbsp;(сдачи)&nbsp;/&nbsp;получения&nbsp;(приемки)</span>
            </td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R34">
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5" colspan="12"><span style="white-space:nowrap;max-width:0px;">(договор;&nbsp;доверенность&nbsp;и&nbsp;др.)</span>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:10px;overflow:hidden;"></div>
            </td>
        </tr>
        <tr class="R33">
            <td><span></span></td>
            <td class="R35C1" colspan="3"><span style="white-space:nowrap;max-width:0px;">Данные&nbsp;о&nbsp;транспортировке&nbsp;и&nbsp;грузе</span>
            </td>
            <td class="R35C4" colspan="13"><span></span></td>
            <td class="R35C17" rowspan="2"><span style="white-space:nowrap;max-width:0px;">[9]</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R34">
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5" colspan="13"><span style="white-space:nowrap;max-width:0px;">(транспортная&nbsp;накладная,&nbsp;поручение&nbsp;экспедитору,&nbsp;экспедиторская&nbsp;/&nbsp;складская&nbsp;расписка&nbsp;и&nbsp;др.&nbsp;/&nbsp;масса&nbsp;нетто/&nbsp;брутто&nbsp;груза,&nbsp;если&nbsp;не&nbsp;приведены&nbsp;ссылки&nbsp;на&nbsp;транспортные&nbsp;документы,&nbsp;содержащие&nbsp;эти&nbsp;сведения)</span>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:10px;overflow:hidden;"></div>
            </td>
        </tr>
        <tr class="R14">
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R37C8">
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R27C3">
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R37C8">
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:5px;overflow:hidden;">&nbsp;</div>
            </td>
        </tr>
        <tr class="R33">
            <td><span></span></td>
            <td class="R38C1" colspan="7"><span style="white-space:nowrap;max-width:0px;">Товар&nbsp;(груз)&nbsp;передал&nbsp;/&nbsp;услуги,&nbsp;результаты&nbsp;работ,&nbsp;права&nbsp;сдал</span>
            </td>
            <td class="R38C8"><span></span></td>
            <td><span></span></td>
            <td class="R38C10"><span></span></td>
            <td class="R38C1" colspan="6"><span style="white-space:nowrap;max-width:0px;">Товар&nbsp;(груз)&nbsp;получил&nbsp;/&nbsp;услуги,&nbsp;результаты&nbsp;работ,&nbsp;права&nbsp;принял</span>
            </td>
            <td class="R38C8"><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R33">
            <td><span></span></td>
            <td class="R35C4">Директор</td>
            <td><span></span></td>
            <td class="R35C4" colspan="3"><span></span></td>
            <td><span></span></td>
            <td class="R35C4"><br></td>
            <td class="R39C8" rowspan="2"><span style="white-space:nowrap;max-width:0px;">[10]</span></td>
            <td><span></span></td>
            <td class="R38C10"><span></span></td>
            <td class="R35C4"><span></span></td>
            <td class="R39C12"><span></span></td>
            <td class="R35C4" colspan="2"><span></span></td>
            <td class="R39C12"><span></span></td>
            <td class="R35C4"><span></span></td>
            <td class="R39C8" rowspan="2"><span style="white-space:nowrap;max-width:0px;">[15]</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R34">
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5"><span style="white-space:nowrap;max-width:0px;">(должность)</span></td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5" colspan="3"><span style="white-space:nowrap;max-width:0px;">(подпись)</span></td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5"><span style="white-space:nowrap;max-width:0px;">(ф.и.о.)</span></td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R40C10">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5"><span style="white-space:nowrap;max-width:0px;">(должность)</span></td>
            <td class="R40C12">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5" colspan="2"><span style="white-space:nowrap;max-width:0px;">(подпись)</span></td>
            <td class="R40C12">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5"><span style="white-space:nowrap;max-width:0px;">(ф.и.о.)</span></td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:10px;overflow:hidden;"></div>
            </td>
        </tr>
        <tr class="R33">
            <td><span></span></td>
            <td class="R38C1" colspan="3"><span style="white-space:nowrap;max-width:0px;">Дата&nbsp;отгрузки,&nbsp;передачи&nbsp;(сдачи)</span>
            </td>
            <td class="R41C4" colspan="2"><span style="white-space:nowrap;max-width:0px;">{ТекущаяДата}</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td class="R38C8"><span style="white-space:nowrap;max-width:0px;">[11]</span></td>
            <td><span></span></td>
            <td class="R38C10"><span></span></td>
            <td class="R38C1"><span style="white-space:nowrap;max-width:0px;">Дата&nbsp;получения&nbsp;(приемки)</span></td>
            <td><span></span></td>
            <td class="R41C13" colspan="2"><span style="white-space:nowrap;max-width:0px;">«&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;»&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;года</span>
            </td>
            <td class="R41C15"><span></span></td>
            <td class="R41C15"><span></span></td>
            <td class="R41C17"><span style="white-space:nowrap;max-width:0px;">[16]</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R14">
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R37C8">
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R14C3">
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R37C8">
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:5px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:5px;overflow:hidden;">&nbsp;</div>
            </td>
        </tr>
        <tr class="R33">
            <td><span></span></td>
            <td class="R38C1" colspan="7"><span style="white-space:nowrap;max-width:0px;">Иные&nbsp;сведения&nbsp;об&nbsp;отгрузке,&nbsp;передаче</span>
            </td>
            <td class="R38C8"><span></span></td>
            <td><span></span></td>
            <td class="R38C10"><span></span></td>
            <td class="R38C1" colspan="6"><span style="white-space:nowrap;max-width:0px;">Иные&nbsp;сведения&nbsp;о&nbsp;получении,&nbsp;приемке</span>
            </td>
            <td class="R38C8"><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R33">
            <td><span></span></td>
            <td class="R35C4" colspan="7"><span></span></td>
            <td class="R39C8" rowspan="2"><span style="white-space:nowrap;max-width:0px;">[12]</span></td>
            <td><span></span></td>
            <td class="R38C10"><span></span></td>
            <td class="R35C4" colspan="6"><span></span></td>
            <td class="R39C8" rowspan="2"><span style="white-space:nowrap;max-width:0px;">[17]</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R34">
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5" colspan="7"><span style="white-space:nowrap;max-width:0px;">(ссылки&nbsp;на&nbsp;неотъемлемые&nbsp;приложения,&nbsp;сопутствующие&nbsp;документы,&nbsp;иные&nbsp;документы&nbsp;и&nbsp;т.п.)</span>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R40C10">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5" colspan="6"><span style="white-space:nowrap;max-width:0px;">(информация&nbsp;о&nbsp;наличии/отсутствии&nbsp;претензии;&nbsp;ссылки&nbsp;на&nbsp;неотъемлемые&nbsp;приложения,&nbsp;и&nbsp;другие&nbsp;&nbsp;документы&nbsp;и&nbsp;т.п.)</span>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:10px;overflow:hidden;"></div>
            </td>
        </tr>
        <tr class="R33">
            <td><span></span></td>
            <td class="R38C1" colspan="7"><span style="white-space:nowrap;max-width:0px;">Ответственный&nbsp;за&nbsp;правильность&nbsp;оформления&nbsp;факта&nbsp;хозяйственной&nbsp;жизни</span>
            </td>
            <td class="R38C8"><span></span></td>
            <td><span></span></td>
            <td class="R38C10"><span></span></td>
            <td class="R33C1" colspan="6"><span style="white-space:nowrap;max-width:0px;">Ответственный&nbsp;за&nbsp;правильность&nbsp;оформления&nbsp;факта&nbsp;хозяйственной&nbsp;жизни</span>
            </td>
            <td class="R46C17"><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R33">
            <td><span></span></td>
            <td class="R35C4"><span></span></td>
            <td class="R39C12"><span></span></td>
            <td class="R35C4" colspan="3"><span></span></td>
            <td class="R39C12"><span></span></td>
            <td class="R35C4"><br></td>
            <td class="R39C8" rowspan="2"><span style="white-space:nowrap;max-width:0px;">[13]</span></td>
            <td><span></span></td>
            <td class="R38C10"><span></span></td>
            <td class="R35C4"><span></span></td>
            <td class="R39C12"><span></span></td>
            <td class="R35C4" colspan="2"><span></span></td>
            <td class="R39C12"><span></span></td>
            <td class="R35C4"><span></span></td>
            <td class="R39C8" rowspan="2"><span style="white-space:nowrap;max-width:0px;">[18]</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R34">
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5"><span style="white-space:nowrap;max-width:0px;">(должность)</span></td>
            <td class="R40C12">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5" colspan="3"><span style="white-space:nowrap;max-width:0px;">(подпись)</span></td>
            <td class="R40C12">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5"><span style="white-space:nowrap;max-width:0px;">(ф.и.о.)</span></td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R40C10">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5"><span style="white-space:nowrap;max-width:0px;">(должность)</span></td>
            <td class="R40C12">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5" colspan="2"><span style="white-space:nowrap;max-width:0px;">(подпись)</span></td>
            <td class="R40C12">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5"><span style="white-space:nowrap;max-width:0px;">(ф.и.о.)</span></td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:10px;overflow:hidden;"></div>
            </td>
        </tr>
        <tr class="R33">
            <td><span></span></td>
            <td class="R38C1" colspan="7"><span style="white-space:nowrap;max-width:0px;">Наименование&nbsp;экономического&nbsp;субъекта&nbsp;–&nbsp;составителя&nbsp;документа&nbsp;(в&nbsp;т.ч.&nbsp;комиссионера&nbsp;/&nbsp;агента)</span>
            </td>
            <td class="R38C8"><span></span></td>
            <td><span></span></td>
            <td class="R38C10"><span></span></td>
            <td class="R38C1" colspan="6"><span style="white-space:nowrap;max-width:0px;">Наименование&nbsp;экономического&nbsp;субъекта&nbsp;–&nbsp;составителя&nbsp;документа</span>
            </td>
            <td class="R38C8"><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        <tr class="R33">
            <td><span></span></td>
            <td class="R50C1" colspan="7">{{ $data['company_name'] }}, ИНН/КПП {ОргИНН}/{ОргКПП}</td>
            <td class="R39C8" rowspan="2"><span style="white-space:nowrap;max-width:0px;">[14]</span></td>
            <td><span></span></td>
            <td class="R38C10"><span></span></td>
            <td class="R50C1" colspan="6">{КлиентНаименование}, ИНН/КПП {КлиентИНН}/{КлиентКПП}</td>
            <td class="R39C8" rowspan="2"><span style="white-space:nowrap;max-width:0px;">[19]</span></td>
            <td colspan="2"><span></span></td>
            <td></td>
        </tr>
        <tr class="R34">
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5" colspan="7"><span style="white-space:nowrap;max-width:0px;">(может&nbsp;не&nbsp;заполняться&nbsp;при&nbsp;проставлении&nbsp;печати&nbsp;в&nbsp;М.П.,&nbsp;может&nbsp;быть&nbsp;указан&nbsp;ИНН&nbsp;/&nbsp;КПП)</span>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R40C10">
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td class="R34C5" colspan="6"><span style="white-space:nowrap;max-width:0px;">(может&nbsp;не&nbsp;заполняться&nbsp;при&nbsp;проставлении&nbsp;печати&nbsp;в&nbsp;М.П.,&nbsp;может&nbsp;быть&nbsp;указан&nbsp;ИНН&nbsp;/&nbsp;КПП)</span>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="position:relative; height:10px;width: 100%; overflow:hidden;"><span></span></div>
            </td>
            <td>
                <div style="width:100%;height:10px;overflow:hidden;"></div>
            </td>
        </tr>
        <tr class="R33">
            <td><span></span></td>
            <td class="R52C1"><span style="white-space:nowrap;max-width:0px;">М.П.</span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td class="R38C8"><span></span></td>
            <td><span></span></td>
            <td class="R38C10"><span></span></td>
            <td class="R52C11"><span style="white-space:nowrap;max-width:0px;">М.П.</span></td>
            <td class="R39C12"><span></span></td>
            <td class="R39C12"><span></span></td>
            <td class="R39C12"><span></span></td>
            <td class="R39C12"><span></span></td>
            <td class="R39C12"><span></span></td>
            <td class="R46C17"><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td></td>
        </tr>
        </tbody>
    </table>
</body>

</html>
