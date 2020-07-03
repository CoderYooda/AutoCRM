<html xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">

<head>
    <meta http-equiv=Content-Type content="text/html; charset=windows-1251">
    <meta name=ProgId content=Excel.Sheet>
    <meta name=Generator content="Microsoft Excel 15">

    <link rel=Stylesheet href="{{ asset('/public/css/documents/invoice-for-payment.css') }}">
    <style>
        <!--table
        {mso-displayed-decimal-separator:"\,";
            mso-displayed-thousand-separator:" ";}
        @page
        {margin:.98in .75in .98in .75in;
            mso-header-margin:.51in;
            mso-footer-margin:.51in;}
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

<body link=blue vlink=purple>

<table border=0 cellpadding=0 cellspacing=0 width=712 style='border-collapse:
 collapse;table-layout:fixed;width:539pt'>
    <col width=7 style='mso-width-source:userset;mso-width-alt:298;width:5pt'>
    <col width=21 span=2 style='mso-width-source:userset;mso-width-alt:896;
 width:16pt'>
    <col width=19 span=4 style='mso-width-source:userset;mso-width-alt:810;
 width:14pt'>
    <col width=21 span=15 style='mso-width-source:userset;mso-width-alt:896;
 width:16pt'>
    <col width=9 span=2 style='mso-width-source:userset;mso-width-alt:384;
 width:7pt'>
    <col width=21 span=5 style='mso-width-source:userset;mso-width-alt:896;
 width:16pt'>
    <col width=16 span=4 style='mso-width-source:userset;mso-width-alt:682;
 width:12pt'>
    <col width=21 style='mso-width-source:userset;mso-width-alt:896;width:16pt'>
    <col width=16 span=4 style='mso-width-source:userset;mso-width-alt:682;
 width:12pt'>
    <col width=7 style='mso-width-source:userset;mso-width-alt:298;width:5pt'>
    <tr height=46 style='mso-height-source:userset;height:34.5pt'>
        <td height=46 width=7 style='height:34.5pt;width:5pt'></td>
        <td colspan=37 class=xl95 width=705 style='width:534pt'>Внимание! Оплата
            данного счета означает согласие с условиями поставки товара. Уведомление об
            оплате <br>
            <span style='mso-spacerun:yes'> </span>обязательно, в противном случае не
            гарантируется наличие товара на складе. Товар отпускается по факту<br>
            <span style='mso-spacerun:yes'> </span>прихода денег на р/с Поставщика,
            самовывозом, при<span style='mso-spacerun:yes'> </span></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td class=xl60></td>
        <td colspan=17 style='mso-ignore:colspan'></td>
        <td class=xl60></td>
        <td colspan=2 style='mso-ignore:colspan'></td>
        <td class=xl60></td>
        <td colspan=15 style='mso-ignore:colspan'></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'>{{ $shipment->partner->bank ?? '---' }}</td>
        <td colspan=18 rowspan=2 class=xl91 width=370 style='width:280pt'>&nbsp;</td>
        <td colspan=3 class=xl96 style='border-left:none'>БИК</td>
        <td colspan=16 class=xl97 style='border-left:none'>{{ $partner->bik ?? '---' }}</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 style='height:11.25pt'></td>
        <td colspan=3 rowspan=2 class=xl89>Сч. №</td>
        <td colspan=16 rowspan=2 class=xl98>счет 1</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 style='height:11.25pt'></td>
        <td colspan=18 class=xl92>Банк получателя</td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=2 class=xl93>ИНН</td>
        <td colspan=7 class=xl94>{{ $partner->inn ?? '---' }}</td>
        <td colspan=2 class=xl93 style='border-left:none'>КПП</td>
        <td colspan=7 class=xl94>{{ $partner->kpp ?? '---' }}</td>
        <td colspan=3 rowspan=4 class=xl89>Сч. №</td>
        <td colspan=16 rowspan=4 class=xl90>счет 2</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 style='height:11.25pt'></td>
        <td colspan=18 rowspan=2 class=xl91 width=370 style='width:280pt'>{{ $partner->official_name ?? '---' }}</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 style='height:11.25pt'></td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 style='height:11.25pt'></td>
        <td colspan=18 class=xl92>Получатель</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 colspan=38 style='height:11.25pt;mso-ignore:colspan'></td>
    </tr>
    <tr height=46 style='mso-height-source:userset;height:34.5pt'>
        <td height=46 style='height:34.5pt'></td>
        <td colspan=37 class=xl88>Счет на оплату № 4 от 17 апреля 2007 г.</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 colspan=38 style='height:11.25pt;mso-ignore:colspan'></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=6 class=xl61>Поставщик:</td>
        <td colspan=31 class=xl62 width=587 style='width:446pt'>{{ auth()->user()->partner->official_name }}</td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td class=xl61></td>
        <td colspan=3 style='mso-ignore:colspan'></td>
        <td class=xl62 width=19 style='width:14pt'></td>
        <td></td>
        <td class=xl62 width=21 style='width:16pt'></td>
        <td colspan=30 style='mso-ignore:colspan'></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=6 class=xl61>Грузоотправитель:</td>
        <td colspan=31 class=xl62 width=587 style='width:446pt'>---</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 colspan=38 style='height:11.25pt;mso-ignore:colspan'></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=6 class=xl61>Покупатель:</td>
        <td colspan=31 class=xl62 width=587 style='width:446pt'>{{ $partner->official_name ?? '---' }}</td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td class=xl61></td>
        <td colspan=3 style='mso-ignore:colspan'></td>
        <td class=xl62 width=19 style='width:14pt'></td>
        <td colspan=32 style='mso-ignore:colspan'></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=6 class=xl61>Грузополучатель:</td>
        <td colspan=31 class=xl62 width=587 style='width:446pt'>---</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 colspan=38 style='height:11.25pt;mso-ignore:colspan'></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=2 class=xl85>№</td>
        <td colspan=4 class=xl86 style='border-left:none'>Артикул</td>
        <td colspan=17 class=xl86 style='border-left:none'>Товары (работы, услуги)</td>
        <td colspan=3 class=xl86 style='border-left:none'>Кол-во</td>
        <td colspan=2 class=xl86 style='border-left:none'>Ед.</td>
        <td colspan=4 class=xl86 style='border-left:none'>Цена</td>
        <td colspan=5 class=xl87 style='border-left:none'>Сумма</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 style='height:11.25pt'></td>
        <td colspan=2 class=xl81>1</td>
        <td colspan=4 class=xl82 style='border-left:none'>&nbsp;</td>
        <td colspan=17 class=xl83 width=333 style='border-left:none;width:254pt'>&nbsp;</td>
        <td colspan=3 class=xl84 style='border-left:none'>&nbsp;</td>
        <td colspan=2 class=xl82 style='border-left:none'>&nbsp;</td>
        <td colspan=4 class=xl84 style='border-left:none'>&nbsp;</td>
        <td colspan=5 class=xl80 style='border-left:none'>&nbsp;</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 style='height:11.25pt'></td>
        <td colspan=2 class=xl81>2</td>
        <td colspan=4 class=xl82 style='border-left:none'>&nbsp;</td>
        <td colspan=17 class=xl83 width=333 style='border-left:none;width:254pt'>&nbsp;</td>
        <td colspan=3 class=xl84 style='border-left:none'>&nbsp;</td>
        <td colspan=2 class=xl82 style='border-left:none'>&nbsp;</td>
        <td colspan=4 class=xl84 style='border-left:none'>&nbsp;</td>
        <td colspan=5 class=xl80 style='border-left:none'>&nbsp;</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 style='height:11.25pt'></td>
        <td colspan=2 class=xl81>3</td>
        <td colspan=4 class=xl82 style='border-left:none'>&nbsp;</td>
        <td colspan=17 class=xl83 width=333 style='border-left:none;width:254pt'>&nbsp;</td>
        <td colspan=3 class=xl84 style='border-left:none'>&nbsp;</td>
        <td colspan=2 class=xl82 style='border-left:none'>&nbsp;</td>
        <td colspan=4 class=xl84 style='border-left:none'>&nbsp;</td>
        <td colspan=5 class=xl80 style='border-left:none'>&nbsp;</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 style='height:11.25pt'></td>
        <td colspan=2 class=xl81>4</td>
        <td colspan=4 class=xl82 style='border-left:none'>&nbsp;</td>
        <td colspan=17 class=xl83 width=333 style='border-left:none;width:254pt'>&nbsp;</td>
        <td colspan=3 class=xl84 style='border-left:none'>&nbsp;</td>
        <td colspan=2 class=xl82 style='border-left:none'>&nbsp;</td>
        <td colspan=4 class=xl84 style='border-left:none'>&nbsp;</td>
        <td colspan=5 class=xl80 style='border-left:none'>&nbsp;</td>
    </tr>
    <tr height=9 style='mso-height-source:userset;height:6.95pt'>
        <td height=9 style='height:6.95pt'></td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td class=xl66></td>
        <td colspan=4 class=xl67>Итого:</td>
        <td colspan=5 class=xl78></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67>В том числе НДС:</td>
        <td colspan=5 class=xl79></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td colspan=5 class=xl67>Всего к оплате:</td>
        <td colspan=5 class=xl78></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=37 class=xl60>Всего наименований xx, на сумму xxxxxxxxxx руб.</td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=37 class=xl68></td>
    </tr>
    <tr height=9 style='mso-height-source:userset;height:6.95pt'>
        <td height=9 colspan=38 style='height:6.95pt;mso-ignore:colspan'></td>
    </tr>
    <tr height=9 style='mso-height-source:userset;height:6.95pt'>
        <td height=9 style='height:6.95pt'></td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
        <td class=xl65>&nbsp;</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 colspan=38 style='height:11.25pt;mso-ignore:colspan'></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=5 class=xl69>Руководитель</td>
        <td></td>
        <td colspan=9 class=xl77>&nbsp;</td>
        <td></td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl71>&nbsp;</td>
        <td class=xl72></td>
        <td colspan=10 class=xl77>&nbsp;</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 colspan=7 style='height:11.25pt;mso-ignore:colspan'></td>
        <td colspan=9 class=xl73>должность</td>
        <td></td>
        <td colspan=10 class=xl73>подпись</td>
        <td class=xl73></td>
        <td colspan=10 class=xl73>расшифровка подписи</td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td class=xl69></td>
        <td class=xl69></td>
        <td class=xl69></td>
        <td class=xl69></td>
        <td class=xl69></td>
        <td colspan=2 style='mso-ignore:colspan'></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td></td>
        <td></td>
        <td class=xl72></td>
        <td class=xl74></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td class=xl69 colspan=10 style='mso-ignore:colspan'>Главный (старший)
            бухгалтер</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl71>&nbsp;</td>
        <td class=xl72></td>
        <td colspan=10 class=xl77>&nbsp;</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 colspan=17 style='height:11.25pt;mso-ignore:colspan'></td>
        <td colspan=10 class=xl73>подпись</td>
        <td class=xl73></td>
        <td colspan=10 class=xl73>расшифровка подписи</td>
    </tr>
    <tr height=16 style='height:12.0pt'>
        <td height=16 style='height:12.0pt'></td>
        <td colspan=5></td>
        <td class=xl75></td>
        <td class=xl75></td>
        <td class=xl75></td>
        <td class=xl75></td>
        <td class=xl76></td>
        <td class=xl76></td>
        <td class=xl76></td>
        <td class=xl76></td>
        <td class=xl76></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
        <td class=xl72></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=5 class=xl69>Ответственный</td>
        <td></td>
        <td colspan=9 class=xl77>&nbsp;</td>
        <td></td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl71>&nbsp;</td>
        <td class=xl72></td>
        <td colspan=10 class=xl77>&nbsp;</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 colspan=7 style='height:11.25pt;mso-ignore:colspan'></td>
        <td colspan=9 class=xl73>должность</td>
        <td></td>
        <td colspan=10 class=xl73>подпись</td>
        <td class=xl73></td>
        <td colspan=10 class=xl73>расшифровка подписи</td>
    </tr>
    <![if supportMisalignedColumns]>
    <tr height=0 style='display:none'>
        <td width=7 style='width:5pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=19 style='width:14pt'></td>
        <td width=19 style='width:14pt'></td>
        <td width=19 style='width:14pt'></td>
        <td width=19 style='width:14pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=9 style='width:7pt'></td>
        <td width=9 style='width:7pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=16 style='width:12pt'></td>
        <td width=16 style='width:12pt'></td>
        <td width=16 style='width:12pt'></td>
        <td width=16 style='width:12pt'></td>
        <td width=21 style='width:16pt'></td>
        <td width=16 style='width:12pt'></td>
        <td width=16 style='width:12pt'></td>
        <td width=16 style='width:12pt'></td>
        <td width=16 style='width:12pt'></td>
    </tr>
    <![endif]>
</table>

</body>

</html>
