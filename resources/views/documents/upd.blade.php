<html xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">

<head>
    <meta http-equiv=Content-Type content="text/html; charset=windows-1251">
    <meta name=ProgId content=Excel.Sheet>
    <meta name=Generator content="Microsoft Excel 15">
    <link rel=Stylesheet href="{{ asset('/css/documents/upd.css') }}">
    <style>
        <!--table
        {mso-displayed-decimal-separator:"\,";
            mso-displayed-thousand-separator:" ";}
        @page
        {margin:.2in .2in .2in .2in;
            mso-header-margin:0in;
            mso-footer-margin:0in;
            mso-page-orientation:landscape;
            mso-horizontal-page-align:center;}
        -->
    </style>
    <![if !supportTabStrip]><script language="JavaScript">
        <!--
        function fnUpdateTabs()
        {
            if (parent.window.g_iIEVer>=4) {
                if (parent.document.readyState=="complete"
                    && parent.frames['frTabs'].document.readyState=="complete")
                    parent.fnSetActiveSheet(0);
                else
                    window.setTimeout("fnUpdateTabs();",150);
            }
        }

        fnUpdateTabs();
        //-->
    </script>
    <![endif]>
</head>

<body link=blue vlink=purple class=xl68>

<table border=0 cellpadding=0 cellspacing=0 width=1047 style='border-collapse:
 collapse;table-layout:fixed;width:785pt'>
    <col class=xl68 width=12 span=6 style='width:9pt'>
    <col class=xl68 width=7 style='mso-width-source:userset;mso-width-alt:256;
 width:5pt'>
    <col class=xl68 width=8 style='mso-width-source:userset;mso-width-alt:292;
 width:6pt'>
    <col class=xl68 width=12 span=80 style='width:9pt'>
    <tr height=15 style='height:11.25pt'>
        <td colspan=88 height=15 class=xl93 width=1047 style='height:11.25pt;
  width:785pt'><a name="Print_Area">Приложение N 1 к письму ФНС России от
                21.10.2013 N ММВ-20-3/96@</a></td>
    </tr>
    <tr height=16 style='height:12.0pt'>
        <td colspan=8 rowspan=4 height=54 class=xl98 width=87 style='height:40.5pt;
  width:65pt'><a href="https://tamali.net/forms/buchgalteriya/UPD/"
                 target="_parent"><span style='color:windowtext;font-size:8.0pt;text-decoration:
  none'>Универсальный передаточный документ</span></a></td>
        <td colspan=9 class=xl94>Счет-фактура N<span
                style='mso-spacerun:yes'> </span></td>
        <td colspan=10 class=xl96>{{ $data['id'] ?? 'Не указан' }}</td>
        <td colspan=2 class=xl91>от</td>
        <td colspan=10 class=xl96>{{ $data['created_at'] ?? 'Не указан' }}</td>
        <td colspan=4 class=xl68>(1)</td>
        <td colspan=45 rowspan=3 class=xl92 width=540 style='width:405pt'>Приложение
            N 1 к постановлению Правительства Российской Федерации от 26 декабря 2011
            года № 1137<br>
            <span style='mso-spacerun:yes'> </span>(в редакции пост. Правительства РФ
            от 19.08.2017 № 981) (с учетом Письма ФНС России от 17.06.2021 N ЗГ-3-3/4368)</td>
    </tr>
    <tr height=16 style='height:12.0pt'>
        <td colspan=9 height=16 class=xl94 style='height:12.0pt'>Исправление N</td>
        <td colspan=10 class=xl97>---</td>
        <td colspan=2 class=xl91>от</td>
        <td colspan=10 class=xl97>---</td>
        <td colspan=4 class=xl68>(1а)</td>
    </tr>
    <tr height=7 style='mso-height-source:userset;height:5.25pt'>
        <td colspan=35 height=7 class=xl69 style='height:5.25pt'>&nbsp;</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=19 height=15 class=xl100 style='height:11.25pt'>Продавец</td>
        <td colspan=58 class=xl76>{{ $data['company_name'] ?? '---' }}</td>
        <td colspan=3 class=xl70>(2)</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=4 height=15 class=xl68 style='height:11.25pt'>Статус:<span
                style='mso-spacerun:yes'> </span></td>
        <td colspan=2 class=xl103 style='border-right:1.0pt solid black'>1</td>
        <td colspan=2 class=xl69 style='border-right:1.0pt solid black;border-left:
  none'>&nbsp;</td>
        <td colspan=19 class=xl77 style='border-left:none'>Адрес</td>
        <td colspan=58 class=xl90>{{ $data['legal_address'] !== "" ? $data['legal_address'] : ($data['actual_address'] ?? 'Не указано')  }}</td>
        <td colspan=3 class=xl70>(2а)</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=8 rowspan=10 height=150 class=xl131 width=87 style='border-right:
  1.0pt solid black;height:112.5pt;width:65pt'><br>
            1 - счет-фактура и передаточный документ (акт) <br>
            2 - передаточный документ (акт)</td>
        <td colspan=19 class=xl77 style='border-left:none'>ИНН/КПП продавца</td>
        <td colspan=58 class=xl90>{{ $data['inn'] ?? '________' }} / {{ $data['kpp'] ?? '________' }}</td>
        <td colspan=3 class=xl70>(2б)</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=19 height=15 class=xl77 style='height:11.25pt;border-left:none'>Грузоотправитель
            и его адрес</td>
        <td colspan=58 class=xl90>{{ $data['legal_address'] !== "" ? $data['legal_address'] : ($data['actual_address'] ?? 'Не указано')  }}</td>
        <td colspan=3 class=xl70>(3)</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=19 height=15 class=xl77 style='height:11.25pt;border-left:none'>Грузополучатель
            и его адрес</td>
        <td colspan=58 class=xl90>---</td>
        <td colspan=3 class=xl70>(4)</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=19 height=15 class=xl77 style='height:11.25pt;border-left:none'>К
            платежно-расчетному документу</td>
        <td colspan=2 class=xl130>N<span style='mso-spacerun:yes'> </span></td>
        <td colspan=8 class=xl89>___</td>
        <td colspan=2 class=xl70>от</td>
        <td colspan=46 class=xl90>___</td>
        <td colspan=3 class=xl70>(5)</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td height=15 class=xl77 style='height:11.25pt;border-left:none'>&nbsp;</td>
        <td colspan=18 class=xl133>Документ об отгрузке № п/п</td>
        <td colspan=16 class=xl134>___</td>
        <td colspan=3 class=xl135>№</td>
        <td colspan=15 class=xl136>___</td>
        <td colspan=2 class=xl70>от</td>
        <td class=xl76 colspan=2 style='mso-ignore:colspan'>___</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td class=xl76>&nbsp;</td>
        <td colspan=3 class=xl70>(5а)</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=19 height=15 class=xl100 style='height:11.25pt;border-left:none'>Покупатель</td>
        <td colspan=58 class=xl76>{{ $data['partner_name'] }}</td>
        <td colspan=3 class=xl70>(6)</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=19 height=15 class=xl77 style='height:11.25pt;border-left:none'>Адрес</td>
        <td colspan=58 class=xl90>{{ $data['partner_address'] ?? '' }}</td>
        <td colspan=3 class=xl70>(6а)</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=19 height=15 class=xl77 style='height:11.25pt;border-left:none'>ИНН/КПП
            покупателя</td>
        <td colspan=58 class=xl90>{{ $data['partner_inn'] ?? '________' }} / {{ $data['partner_kpp'] ?? '________' }}</td>
        <td colspan=3 class=xl70>(6б)</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=19 height=15 class=xl77 style='height:11.25pt;border-left:none'>Валюта:
            наименование, код</td>
        <td colspan=58 class=xl82>Российский рубль, 643</td>
        <td colspan=3 class=xl70>(7)</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td height=15 class=xl75 width=12 style='height:11.25pt;border-left:none;
  width:9pt'>&nbsp;</td>
        <td colspan=31 class=xl88 width=372 style='width:279pt'>Идентификатор
            государственного контракта, договора (соглашения)</td>
        <td colspan=45 class=xl80 width=540 style='width:405pt'>___</td>
        <td colspan=3 class=xl70>(8)</td>
    </tr>
    <tr height=6 style='mso-height-source:userset;height:4.5pt'>
        <td colspan=8 height=6 class=xl68 style='border-right:1.0pt solid black;
  height:4.5pt'></td>
        <td colspan=80 class=xl69 style='border-left:none'>&nbsp;</td>
    </tr>
    <tr height=29 style='mso-height-source:userset;height:21.75pt'>
        <td colspan=2 rowspan=2 height=91 class=xl105 width=24 style='border-right:
  .5pt solid black;border-bottom:.5pt solid black;height:68.25pt;width:18pt'>N
            п/п</td>
        <td colspan=6 rowspan=2 class=xl105 width=63 style='border-bottom:.5pt solid black;
  width:47pt'>Код товара/ работ, услуг</td>
        <td colspan=14 rowspan=2 class=xl86 width=168 style='width:126pt'>Наименование
            товара (описание выполненных работ, оказанных услуг), имущественного права</td>
        <td colspan=3 rowspan=2 class=xl105 width=36 style='border-right:.5pt solid black;
  border-bottom:.5pt solid black;width:27pt'>Код вида товара</td>
        <td colspan=9 class=xl81 width=108 style='border-left:none;width:81pt'>Единица
            измерения</td>
        <td colspan=4 rowspan=2 class=xl105 width=48 style='border-right:.5pt solid black;
  border-bottom:.5pt solid black;width:36pt'>Коли-<br>
            чество (объем)</td>
        <td colspan=5 rowspan=2 class=xl105 width=60 style='border-right:.5pt solid black;
  border-bottom:.5pt solid black;width:45pt'>Цена (тариф) за единицу измерения</td>
        <td colspan=7 rowspan=2 class=xl105 width=84 style='border-right:.5pt solid black;
  border-bottom:.5pt solid black;width:63pt'>Стоимость товаров <br>
            (работ, услуг), имущественных прав без налога - всего</td>
        <td colspan=4 rowspan=2 class=xl105 width=48 style='border-right:.5pt solid black;
  border-bottom:.5pt solid black;width:36pt'>В том числе сумма акциза</td>
        <td colspan=4 rowspan=2 class=xl105 width=48 style='border-right:.5pt solid black;
  border-bottom:.5pt solid black;width:36pt'>Нало-<br>
            говая ставка</td>
        <td colspan=6 rowspan=2 class=xl105 width=72 style='border-right:.5pt solid black;
  border-bottom:.5pt solid black;width:54pt'>Сумма налога, предъявляемая
            покупателю</td>
        <td colspan=7 rowspan=2 class=xl105 width=84 style='border-right:.5pt solid black;
  border-bottom:.5pt solid black;width:63pt'>Стоимость товаров <br>
            (работ, услуг), имущественных прав с налогом - всего</td>
        <td colspan=11 class=xl83 width=132 style='border-right:.5pt solid black;
  border-left:none;width:99pt'>Страна происхождения товара</td>
        <td colspan=6 rowspan=2 class=xl105 width=72 style='border-right:.5pt solid black;
  border-bottom:.5pt solid black;width:54pt'>Регистра-ционный номер таможенной
            декларации</td>
    </tr>
    <tr height=62 style='mso-height-source:userset;height:46.5pt'>
        <td colspan=2 height=62 class=xl81 width=24 style='height:46.5pt;border-left:
  none;width:18pt'>код</td>
        <td colspan=7 class=xl81 width=84 style='border-left:none;width:63pt'>условное
            обозначение (национальное)</td>
        <td colspan=4 class=xl81 width=48 style='border-left:none;width:36pt'>Цифро-<br>
            вой код</td>
        <td colspan=7 class=xl81 width=84 style='border-left:none;width:63pt'>Краткое
            наименование</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=2 height=15 class=xl83 width=24 style='border-right:.5pt solid black;
  height:11.25pt;width:18pt'>А</td>
        <td colspan=6 class=xl83 width=63 style='border-left:none;width:47pt'>Б</td>
        <td colspan=14 class=xl86 width=168 style='width:126pt'>1</td>
        <td colspan=3 class=xl83 width=36 style='border-right:.5pt solid black;
  border-left:none;width:27pt'>1а</td>
        <td colspan=2 class=xl81 width=24 style='border-left:none;width:18pt'>2</td>
        <td colspan=7 class=xl81 width=84 style='border-left:none;width:63pt'>2а</td>
        <td colspan=4 class=xl81 width=48 style='border-left:none;width:36pt'>3</td>
        <td colspan=5 class=xl81 width=60 style='border-left:none;width:45pt'>4</td>
        <td colspan=7 class=xl81 width=84 style='border-left:none;width:63pt'>5</td>
        <td colspan=4 class=xl81 width=48 style='border-left:none;width:36pt'>6</td>
        <td colspan=4 class=xl81 width=48 style='border-left:none;width:36pt'>7</td>
        <td colspan=6 class=xl81 width=72 style='border-left:none;width:54pt'>8</td>
        <td colspan=7 class=xl81 width=84 style='border-left:none;width:63pt'>9</td>
        <td colspan=4 class=xl81 width=48 style='border-left:none;width:36pt'>10</td>
        <td colspan=7 class=xl81 width=84 style='border-left:none;width:63pt'>10а</td>
        <td colspan=6 class=xl81 width=72 style='border-left:none;width:54pt'>11</td>
    </tr>
    @php($counter = 0)
    @foreach($data['products'] as $index => $product)
        @continue(!isset($product['article']))
        @php($counter++)
    <tr height=16 style='mso-height-source:userset;height:12.0pt'>
        <td colspan=2 height=16 class=xl83 width=24 style='border-right:.5pt solid black;
  height:12.0pt;width:18pt'>{{ $counter }}</td>
        <td colspan=6 class=xl83 width=63 style='border-left:none;width:47pt'>{{ $product['article'] }}</td>
        <td colspan=14 class=xl86 width=168 style='width:126pt'>{{ $product['name'] }}</td>
        <td colspan=3 class=xl83 width=36 style='border-right:.5pt solid black;
  border-left:none;width:27pt'>-</td>
        <td colspan=2 class=xl79 style='border-left:none'>796</td>
        <td colspan=7 class=xl79 style='border-left:none'>шт.</td>
        <td colspan=4 class=xl87 style='border-left:none'>{{ $product['count'] }}</td>
        <td colspan=5 class=xl78 style='border-left:none'>{{ correct_price($product['price_without_nds']) }}</td>
        <td colspan=7 class=xl78 style='border-left:none'>{{ correct_price($product['price_without_nds'] * $product['count']) }}</td>
        <td colspan=4 class=xl78 style='border-left:none; font-size: 10px;'>Без акциза</td>
        <td colspan=4 class=xl78 style='border-left:none'>@if($product['nds'] * $product['count']) $product['nds'] * $product['count'] @else Без НДС @endif</td>
        <td colspan=6 class=xl78 style='border-left:none'>{{ correct_price($product['nds'] * $product['count']) }}</td>
        <td colspan=7 class=xl78 style='border-left:none'>{{ correct_price($product['price_with_nds'] * $product['count']) }}</td>
        <td colspan=4 class=xl79 style='border-left:none'>-</td>
        <td colspan=7 class=xl79 style='border-left:none'>-</td>
        <td colspan=6 class=xl79 style='border-left:none'>-</td>
    </tr>
    @endforeach
    <tr height=16 style='mso-height-source:userset;height:12.0pt'>
        <td colspan=2 height=16 class=xl83 width=24 style='border-right:.5pt solid black;
  height:12.0pt;width:18pt'>&nbsp;</td>
        <td colspan=6 class=xl83 width=63 style='border-left:none;width:47pt'>&nbsp;</td>
        <td colspan=14 class=xl86 width=168 style='width:126pt'>&nbsp;</td>
        <td colspan=3 class=xl83 width=36 style='border-right:.5pt solid black;
  border-left:none;width:27pt'>&nbsp;</td>
        <td colspan=2 class=xl79 style='border-left:none'>&nbsp;</td>
        <td colspan=7 class=xl79 style='border-left:none'>&nbsp;</td>
        <td colspan=4 class=xl87 style='border-left:none'>&nbsp;</td>
        <td colspan=5 class=xl78 style='border-left:none'>&nbsp;</td>
        <td colspan=7 class=xl78 style='border-left:none'>0,00</td>
        <td colspan=4 class=xl78 style='border-left:none'>&nbsp;</td>
        <td colspan=4 class=xl78 style='border-left:none'>&nbsp;</td>
        <td colspan=6 class=xl78 style='border-left:none'>0,00</td>
        <td colspan=7 class=xl78 style='border-left:none'>0,00</td>
        <td colspan=4 class=xl79 style='border-left:none'>&nbsp;</td>
        <td colspan=7 class=xl79 style='border-left:none'>&nbsp;</td>
        <td colspan=6 class=xl79 style='border-left:none'>&nbsp;</td>
    </tr>
    <tr height=16 style='mso-height-source:userset;height:12.0pt'>
        <td colspan=2 height=16 class=xl83 width=24 style='border-right:.5pt solid black;
  height:12.0pt;width:18pt'>&nbsp;</td>
        <td colspan=6 class=xl83 width=63 style='border-left:none;width:47pt'>&nbsp;</td>
        <td colspan=14 class=xl86 width=168 style='width:126pt'>&nbsp;</td>
        <td colspan=3 class=xl83 width=36 style='border-right:.5pt solid black;
  border-left:none;width:27pt'>&nbsp;</td>
        <td colspan=2 class=xl79 style='border-left:none'>&nbsp;</td>
        <td colspan=7 class=xl79 style='border-left:none'>&nbsp;</td>
        <td colspan=4 class=xl87 style='border-left:none'>&nbsp;</td>
        <td colspan=5 class=xl78 style='border-left:none'>&nbsp;</td>
        <td colspan=7 class=xl78 style='border-left:none'>0,00</td>
        <td colspan=4 class=xl78 style='border-left:none'>&nbsp;</td>
        <td colspan=4 class=xl78 style='border-left:none'>&nbsp;</td>
        <td colspan=6 class=xl78 style='border-left:none'>0,00</td>
        <td colspan=7 class=xl78 style='border-left:none'>0,00</td>
        <td colspan=4 class=xl79 style='border-left:none'>&nbsp;</td>
        <td colspan=7 class=xl79 style='border-left:none'>&nbsp;</td>
        <td colspan=6 class=xl79 style='border-left:none'>&nbsp;</td>
    </tr>
    <tr height=16 style='mso-height-source:userset;height:12.0pt'>
        <td colspan=2 height=16 class=xl83 width=24 style='border-right:.5pt solid black;
  height:12.0pt;width:18pt'>&nbsp;</td>
        <td colspan=6 class=xl83 width=63 style='border-left:none;width:47pt'>&nbsp;</td>
        <td colspan=14 class=xl86 width=168 style='width:126pt'>&nbsp;</td>
        <td colspan=3 class=xl83 width=36 style='border-right:.5pt solid black;
  border-left:none;width:27pt'>&nbsp;</td>
        <td colspan=2 class=xl79 style='border-left:none'>&nbsp;</td>
        <td colspan=7 class=xl79 style='border-left:none'>&nbsp;</td>
        <td colspan=4 class=xl87 style='border-left:none'>&nbsp;</td>
        <td colspan=5 class=xl78 style='border-left:none'>&nbsp;</td>
        <td colspan=7 class=xl78 style='border-left:none'>0,00</td>
        <td colspan=4 class=xl78 style='border-left:none'>&nbsp;</td>
        <td colspan=4 class=xl78 style='border-left:none'>&nbsp;</td>
        <td colspan=6 class=xl78 style='border-left:none'>0,00</td>
        <td colspan=7 class=xl78 style='border-left:none'>0,00</td>
        <td colspan=4 class=xl79 style='border-left:none'>&nbsp;</td>
        <td colspan=7 class=xl79 style='border-left:none'>&nbsp;</td>
        <td colspan=6 class=xl79 style='border-left:none'>&nbsp;</td>
    </tr>
    <tr height=16 style='mso-height-source:userset;height:12.0pt'>
        <td colspan=2 height=16 class=xl83 width=24 style='border-right:.5pt solid black;
  height:12.0pt;width:18pt'>&nbsp;</td>
        <td colspan=6 class=xl83 width=63 style='border-left:none;width:47pt'>&nbsp;</td>
        <td colspan=35 class=xl115 width=420 style='border-right:.5pt solid black;
  width:315pt'>Всего к оплате</td>
        <td colspan=7 class=xl78 style='border-left:none'>{{ correct_price($data['products']['price_without_nds']) }}</td>
        <td colspan=8 class=xl118 style='border-right:.5pt solid black;border-left:
  none'>Х</td>
        <td colspan=6 class=xl78 style='border-left:none'>{{ correct_price($data['products']['nds']) }}</td>
        <td colspan=7 class=xl78 style='border-left:none'>{{ correct_price($data['products']['price_with_nds']) }}</td>
        <td colspan=17 class=xl121></td>
    </tr>
    <tr height=6 style='mso-height-source:userset;height:4.5pt'>
        <td colspan=8 height=6 class=xl113 style='height:4.5pt'>&nbsp;</td>
        <td colspan=80 class=xl114>&nbsp;</td>
    </tr>
    <tr height=30 style='mso-height-source:userset;height:22.5pt'>
        <td colspan=8 height=30 class=xl88 width=87 style='height:22.5pt;width:65pt'>Документ
            составлен на<span style='mso-spacerun:yes'> </span></td>
        <td class=xl69>&nbsp;</td>
        <td colspan=19 class=xl88 width=228 style='width:171pt'>Руководитель
            организации <br>
            или иное уполномоченное лицо</td>
        <td colspan=6 class=xl112 width=72 style='width:54pt'>&nbsp;</td>
        <td class=xl71 width=12 style='width:9pt'></td>
        <td colspan=15 class=xl112 width=180 style='width:135pt'>{{ $data['is_company'] ? $data['company_name'] : '' }}</td>
        <td colspan=16 class=xl88 width=192 style='width:144pt'>Главный бухгалтер
            <br>
            или иное уполномоченное лицо</td>
        <td colspan=6 class=xl112 width=72 style='width:54pt'>&nbsp;</td>
        <td class=xl71 width=12 style='width:9pt'></td>
        <td colspan=15 class=xl112 width=180 style='width:135pt'>{{ $data['is_company'] ? $data['auditor'] : '' }}</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=3 height=15 class=xl89 style='height:11.25pt'>&nbsp;</td>
        <td colspan=5 class=xl68><span style='mso-spacerun:yes'> </span>листах</td>
        <td class=xl69>&nbsp;</td>
        <td colspan=19 class=xl88 width=228 style='width:171pt'></td>
        <td colspan=6 class=xl65 width=72 style='width:54pt'>(подпись)</td>
        <td class=xl65 width=12 style='width:9pt'></td>
        <td colspan=15 class=xl65 width=180 style='width:135pt'>(ф.и.о.)</td>
        <td colspan=16 class=xl109 width=192 style='width:144pt'></td>
        <td colspan=6 class=xl65 width=72 style='width:54pt'>(подпись)</td>
        <td class=xl65 width=12 style='width:9pt'></td>
        <td colspan=15 class=xl65 width=180 style='width:135pt'>(ф.и.о.)</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=8 height=15 class=xl68 style='border-right:1.0pt solid black;
  height:11.25pt'></td>
        <td class=xl69 style='border-left:none'>&nbsp;</td>
        <td colspan=19 class=xl88 width=228 style='width:171pt'>Индивидуальный
            предприниматель</td>
        <td colspan=6 class=xl112 width=72 style='width:54pt'>&nbsp;</td>
        <td class=xl71 width=12 style='width:9pt'></td>
        <td colspan=15 class=xl112 width=180 style='width:135pt'>___</td>
        <td colspan=3 class=xl88 width=36 style='width:27pt'></td>
        <td colspan=35 class=xl112 width=420 style='width:315pt'>&nbsp;</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=8 height=15 class=xl68 style='border-right:1.0pt solid black;
  height:11.25pt'></td>
        <td class=xl72 style='border-left:none'>&nbsp;</td>
        <td colspan=19 class=xl124 width=228 style='width:171pt'>или иное
            уполномоченное лицо</td>
        <td colspan=6 class=xl66 width=72 style='width:54pt'>(подпись)</td>
        <td class=xl66 width=12 style='width:9pt'>&nbsp;</td>
        <td colspan=15 class=xl66 width=180 style='width:135pt'>(ф.и.о.)</td>
        <td colspan=3 class=xl122 width=36 style='width:27pt'>&nbsp;</td>
        <td colspan=35 class=xl123 width=420 style='width:315pt'>(реквизиты
            свидетельства о государственной регистрации индивидуального предпринимателя)</td>
    </tr>
    <tr height=6 style='mso-height-source:userset;height:4.5pt'>
        <td colspan=88 height=6 class=xl68 style='height:4.5pt'></td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=22 height=15 class=xl68 style='height:11.25pt'>Основание передачи
            (сдачи) / получения (приемки)</td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td colspan=60 class=xl112 width=720 style='width:540pt'>&nbsp;</td>
        <td colspan=3 class=xl71 width=36 style='width:27pt'>[9]</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=22 height=15 class=xl68 style='height:11.25pt'></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td colspan=60 class=xl125 width=720 style='width:540pt'>(договор;
            доверенность и др.)</td>
        <td colspan=3 class=xl71 width=36 style='width:27pt'></td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=16 height=15 class=xl68 style='height:11.25pt'>Данные о
            транспортировке и грузе</td>
        <td colspan=69 class=xl112 width=828 style='width:621pt'>&nbsp;</td>
        <td colspan=3 class=xl71 width=36 style='width:27pt'>[10]</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=16 height=15 class=xl68 style='height:11.25pt'></td>
        <td colspan=69 class=xl125 width=828 style='width:621pt'>(транспортная
            накладная, поручение экспедитору, экспедиторская / складская расписка и др. /
            масса нетто/ брутто груза, если не приведены ссылки на транспортные
            документы, содержащие эти сведения)</td>
        <td colspan=3 class=xl71 width=36 style='width:27pt'></td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=45 height=15 class=xl68 style='border-right:1.0pt solid black;
  height:11.25pt'>Товар (груз) передал / услуги, результаты работ, права сдал</td>
        <td class=xl69 style='border-left:none'>&nbsp;</td>
        <td colspan=42 class=xl88 width=504 style='width:378pt'>Товар (груз) получил
            / услуги, результаты работ, права принял<span
                style='mso-spacerun:yes'> </span></td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=13 height=15 class=xl89 style='height:11.25pt'>&nbsp;</td>
        <td class=xl70></td>
        <td colspan=13 class=xl89>&nbsp;</td>
        <td class=xl70></td>
        <td colspan=14 class=xl89>&nbsp;</td>
        <td colspan=3 class=xl70 style='border-right:1.0pt solid black'>[11]</td>
        <td class=xl69 style='border-left:none'>&nbsp;</td>
        <td colspan=13 class=xl89>&nbsp;</td>
        <td class=xl70></td>
        <td colspan=10 class=xl89>&nbsp;</td>
        <td class=xl70></td>
        <td colspan=14 class=xl89>&nbsp;</td>
        <td colspan=3 class=xl71 width=36 style='width:27pt'>[16]</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=13 height=15 class=xl67 style='height:11.25pt'>(должность)</td>
        <td class=xl67></td>
        <td colspan=13 class=xl67>(подпись)</td>
        <td class=xl67></td>
        <td colspan=14 class=xl67>(ф.и.о.)</td>
        <td colspan=3 class=xl127 style='border-right:1.0pt solid black'></td>
        <td class=xl74 style='border-left:none'>&nbsp;</td>
        <td colspan=13 class=xl67>(должность)</td>
        <td class=xl67></td>
        <td colspan=10 class=xl67>(подпись)</td>
        <td class=xl67></td>
        <td colspan=14 class=xl67>(ф.и.о.)</td>
        <td colspan=3 class=xl71 width=36 style='width:27pt'></td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=15 height=15 class=xl68 style='height:11.25pt'>Дата отгрузки,
            передачи (сдачи)</td>
        <td class=xl73>&quot;</td>
        <td colspan=2 class=xl89>&nbsp;</td>
        <td class=xl68>&quot;</td>
        <td colspan=9 class=xl89>&nbsp;</td>
        <td colspan=2 class=xl73>20</td>
        <td colspan=2 class=xl76>&nbsp;</td>
        <td colspan=10 class=xl68>г.</td>
        <td colspan=3 class=xl70 style='border-right:1.0pt solid black'>[12]</td>
        <td class=xl69 style='border-left:none'>&nbsp;</td>
        <td colspan=13 class=xl68>Дата получения (приемки)</td>
        <td class=xl73>&quot;</td>
        <td colspan=2 class=xl89>&nbsp;</td>
        <td class=xl68>&quot;</td>
        <td colspan=6 class=xl89>&nbsp;</td>
        <td colspan=2 class=xl73>20</td>
        <td colspan=2 class=xl76>&nbsp;</td>
        <td colspan=12 class=xl68>г.</td>
        <td colspan=3 class=xl71 width=36 style='width:27pt'>[17]</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=42 height=15 class=xl68 style='height:11.25pt'>Иные сведения об
            отгрузке, передаче</td>
        <td colspan=3 class=xl70 style='border-right:1.0pt solid black'></td>
        <td class=xl69 style='border-left:none'>&nbsp;</td>
        <td colspan=39 class=xl68>Иные сведения о получении, приемке</td>
        <td colspan=3 class=xl71 width=36 style='width:27pt'></td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=42 height=15 class=xl89 style='height:11.25pt'>&nbsp;</td>
        <td colspan=3 class=xl70 style='border-right:1.0pt solid black'>[13]</td>
        <td class=xl69 style='border-left:none'>&nbsp;</td>
        <td colspan=39 class=xl89>&nbsp;</td>
        <td colspan=3 class=xl71 width=36 style='width:27pt'>[18]</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=42 height=15 class=xl129 style='height:11.25pt'>(ссылки на
            неотъемлемые приложения, сопутствующие документы, иные документы и т.п.)</td>
        <td colspan=3 class=xl127 style='border-right:1.0pt solid black'></td>
        <td class=xl74 style='border-left:none'>&nbsp;</td>
        <td colspan=39 class=xl129>(информация о наличии/отсутствии претензии; ссылки
            на неотъемлемые приложения, и другие<span style='mso-spacerun:yes'> 
  </span>документы и т.п.)</td>
        <td colspan=3 class=xl71 width=36 style='width:27pt'></td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=42 height=15 class=xl68 style='height:11.25pt'>Ответственный за
            правильность оформления факта хозяйственной жизни</td>
        <td colspan=3 class=xl70 style='border-right:1.0pt solid black'></td>
        <td class=xl69 style='border-left:none'>&nbsp;</td>
        <td colspan=39 class=xl68>Ответственный за правильность оформления факта
            хозяйственной жизни</td>
        <td colspan=3 class=xl71 width=36 style='width:27pt'></td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=13 height=15 class=xl89 style='height:11.25pt'>&nbsp;</td>
        <td class=xl70></td>
        <td colspan=13 class=xl89>&nbsp;</td>
        <td class=xl70></td>
        <td colspan=14 class=xl89>&nbsp;</td>
        <td colspan=3 class=xl70 style='border-right:1.0pt solid black'>[14]</td>
        <td class=xl69 style='border-left:none'>&nbsp;</td>
        <td colspan=13 class=xl89>&nbsp;</td>
        <td class=xl70></td>
        <td colspan=10 class=xl89>&nbsp;</td>
        <td class=xl70></td>
        <td colspan=14 class=xl89>&nbsp;</td>
        <td colspan=3 class=xl71 width=36 style='width:27pt'>[19]</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=13 height=15 class=xl67 style='height:11.25pt'>(должность)</td>
        <td class=xl67></td>
        <td colspan=13 class=xl67>(подпись)</td>
        <td class=xl67></td>
        <td colspan=14 class=xl67>(ф.и.о.)</td>
        <td colspan=3 class=xl127 style='border-right:1.0pt solid black'></td>
        <td class=xl74 style='border-left:none'>&nbsp;</td>
        <td colspan=13 class=xl67>(должность)</td>
        <td class=xl67></td>
        <td colspan=10 class=xl67>(подпись)</td>
        <td class=xl67></td>
        <td colspan=14 class=xl67>(ф.и.о.)</td>
        <td colspan=3 class=xl70></td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=42 height=15 class=xl68 style='height:11.25pt'>Наименование
            экономического субъекта – составителя документа (в т.ч. комиссионера /
            агента)</td>
        <td colspan=3 class=xl70 style='border-right:1.0pt solid black'></td>
        <td class=xl69 style='border-left:none'>&nbsp;</td>
        <td colspan=39 class=xl68>Наименование экономического субъекта - составителя
            документа</td>
        <td colspan=3 class=xl70></td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=42 height=15 class=xl76 style='height:11.25pt'>&nbsp;</td>
        <td colspan=3 class=xl70 style='border-right:1.0pt solid black'>[15]</td>
        <td class=xl69 style='border-left:none'>&nbsp;</td>
        <td colspan=39 class=xl76>&nbsp;</td>
        <td colspan=3 class=xl70>[20]</td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=42 height=15 class=xl129 style='height:11.25pt'>(может не
            заполняться при проставлении печати в М.П., может быть указан ИНН / КПП)</td>
        <td colspan=3 class=xl127 style='border-right:1.0pt solid black'></td>
        <td class=xl74 style='border-left:none'>&nbsp;</td>
        <td colspan=39 class=xl129>(может не заполняться при проставлении печати в
            М.П., может быть указан ИНН / КПП)</td>
        <td colspan=3 class=xl70></td>
    </tr>
    <tr height=15 style='mso-height-source:userset;height:11.25pt'>
        <td colspan=13 height=15 class=xl70 style='height:11.25pt'>М.П.</td>
        <td colspan=29 class=xl68></td>
        <td colspan=3 class=xl70 style='border-right:1.0pt solid black'></td>
        <td class=xl69 style='border-left:none'>&nbsp;</td>
        <td colspan=13 class=xl70>М.П.</td>
        <td colspan=26 class=xl68></td>
        <td colspan=3 class=xl70></td>
    </tr>
    <![if supportMisalignedColumns]>
    <tr height=0 style='display:none'>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=7 style='width:5pt'></td>
        <td width=8 style='width:6pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
        <td width=12 style='width:9pt'></td>
    </tr>
    <![endif]>
</table>

</body>

</html>
