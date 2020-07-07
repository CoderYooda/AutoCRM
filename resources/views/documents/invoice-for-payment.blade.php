<html xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">

<head>
    <meta http-equiv=Content-Type content="text/html; charset=windows-1251">
    <meta name=ProgId content=Excel.Sheet>
    <meta name=Generator content="Microsoft Excel 15">
    <link rel=Stylesheet href="{{ asset('/css/documents/invoice-for-payment.css') }}">
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
    <tr height=17 style='height:12.75pt'>
        <td height=17 width=7 style='height:12.75pt;width:5pt'></td>
        <td colspan=18 rowspan=2 class=xl91 width=370 style='width:280pt'>{{ $shipment->company->bank ?? '' }}</td>
        <td colspan=3 class=xl95 width=63 style='border-left:none;width:48pt'>БИК</td>
        <td colspan=16 class=xl96 width=272 style='border-left:none;width:206pt'>{{ $shipment->company->bik ?? '' }}</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 style='height:11.25pt'></td>
        <td colspan=3 rowspan=2 class=xl89>Сч. №</td>
        <td colspan=16 rowspan=2 class=xl97>{{ $shipment->company->cs ?? '' }}</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 style='height:11.25pt'></td>
        <td colspan=18 class=xl92>Банк получателя</td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=2 class=xl93>ИНН</td>
        <td colspan=7 class=xl94>{{ $shipment->company->inn ?? '' }}</td>
        <td colspan=2 class=xl93 style='border-left:none'>КПП</td>
        <td colspan=7 class=xl94>{{ $shipment->company->kpp ?? '' }}</td>
        <td colspan=3 rowspan=4 class=xl89>Сч. №</td>
        <td colspan=16 rowspan=4 class=xl90>{{ $shipment->company->rs ?? '' }}</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 style='height:11.25pt'></td>
        <td colspan=18 rowspan=2 class=xl91 width=370 style='width:280pt'>{{ $shipment->company->official_name ?? '' }}</td>
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
        <td colspan=37 class=xl88>Счет на оплату №{{ $shipment->id ?? '' }} от {{ isset($shipment->created_at) ? $shipment->created_at->formatLocalized('%d %B %Y') : '________' }} г.</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 colspan=38 style='height:11.25pt;mso-ignore:colspan'></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=6 class=xl60>Поставщик:</td>
        <td colspan=31 class=xl61 width=587 style='width:446pt'>{{ $shipment->company->official_name ?? '' }}</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 colspan=38 style='height:11.25pt;mso-ignore:colspan'></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=6 class=xl60>Покупатель:</td>
        <td colspan=31 class=xl61 width=587 style='width:446pt'>{{ $shipment->partner->official_name ?? '' }}</td>
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
    @foreach($products as $product)
        <tr height=15 style='height:11.25pt'>
            <td height=15 style='height:11.25pt'></td>
            <td colspan=2 class=xl81>{{ ($loop->index + 1) }}</td>
            <td colspan=4 class=xl82 style='border-left:none'>{{ $product->article }}</td>
            <td colspan=17 class=xl83 width=333 style='border-left:none;width:254pt'>{{ $product->name }}</td>
            <td colspan=3 class=xl84 style='border-left:none'>{{ $sorted_products[$product->id]['count'] }}</td>
            <td colspan=2 class=xl82 style='border-left:none'>шт</td>
            <td colspan=4 class=xl84 style='border-left:none'>{{ number_format($sorted_products[$product->id]['price_with_nds'], 2, '.', ' ') }}</td>
            <td colspan=5 class=xl80 style='border-left:none'>{{ number_format($sorted_products[$product->id]['price_with_nds'] * $sorted_products[$product->id]['count'], 2, '.', ' ') }}</td>
        </tr>
    @endforeach
    <tr height=9 style='mso-height-source:userset;height:6.95pt'>
        <td height=9 style='height:6.95pt'></td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl62>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl63>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td class=xl65></td>
        <td colspan=4 class=xl66>Итого:</td>
        <td colspan=5 class=xl77>{{ number_format($sorted_products['price_with_nds'], 2, '.', ' ') }}</td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td colspan=5 class=xl66>В том числе НДС:</td>
        <td colspan=5 class=xl77>{{ number_format($sorted_products['nds'], 2, '.', ' ') }}</td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td class=xl67></td>
        <td colspan=5 class=xl66>Всего к оплате:</td>
        <td colspan=5 class=xl77>{{ number_format($sorted_products['price_with_nds'], 2, '.', ' ') }}</td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=37 class=xl79>Всего наименований {{ count($products) }}, на сумму {{ number_format($sorted_products['price_with_nds'], 2, '.', ' ') }} руб.</td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=37 class=xl67></td>
    </tr>
    <tr height=9 style='mso-height-source:userset;height:6.95pt'>
        <td height=9 colspan=38 style='height:6.95pt;mso-ignore:colspan'></td>
    </tr>
    <tr height=9 style='mso-height-source:userset;height:6.95pt'>
        <td height=9 style='height:6.95pt'></td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
        <td class=xl64>&nbsp;</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 colspan=38 style='height:11.25pt;mso-ignore:colspan'></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=5 class=xl68>Руководитель</td>
        <td colspan=2 style='mso-ignore:colspan'></td>
        <td class=xl98></td>
        <td class=xl98></td>
        <td class=xl98></td>
        <td class=xl98></td>
        <td class=xl98></td>
        <td class=xl98></td>
        <td class=xl98></td>
        <td class=xl98></td>
        <td class=xl98></td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td></td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 colspan=7 style='height:11.25pt;mso-ignore:colspan'></td>
        <td colspan=9 class=xl98></td>
        <td></td>
        <td colspan=10 class=xl72>подпись</td>
        <td class=xl72></td>
        <td colspan=10 class=xl72>расшифровка подписи</td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td class=xl68></td>
        <td colspan=2 style='mso-ignore:colspan'></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td></td>
        <td></td>
        <td class=xl71></td>
        <td class=xl73></td>
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
        <td class=xl68 colspan=10 style='mso-ignore:colspan'>Главный (старший)
            бухгалтер</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl71></td>
        <td colspan=10 class=xl76>&nbsp;</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 colspan=17 style='height:11.25pt;mso-ignore:colspan'></td>
        <td colspan=10 class=xl72>подпись</td>
        <td class=xl72></td>
        <td colspan=10 class=xl72>расшифровка подписи</td>
    </tr>
    <tr height=16 style='height:12.0pt'>
        <td height=16 style='height:12.0pt'></td>
        <td colspan=5></td>
        <td class=xl74></td>
        <td class=xl74></td>
        <td class=xl74></td>
        <td class=xl74></td>
        <td class=xl75></td>
        <td class=xl75></td>
        <td class=xl75></td>
        <td class=xl75></td>
        <td class=xl75></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
        <td class=xl71></td>
    </tr>
    <tr height=17 style='height:12.75pt'>
        <td height=17 style='height:12.75pt'></td>
        <td colspan=5 class=xl68>Ответственный</td>
        <td></td>
        <td colspan=9 class=xl98></td>
        <td></td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl69>&nbsp;</td>
        <td class=xl70>&nbsp;</td>
        <td class=xl71></td>
        <td colspan=10 class=xl76>&nbsp;</td>
    </tr>
    <tr height=15 style='height:11.25pt'>
        <td height=15 colspan=7 style='height:11.25pt;mso-ignore:colspan'></td>
        <td colspan=9 class=xl98></td>
        <td></td>
        <td colspan=10 class=xl72>подпись</td>
        <td class=xl72></td>
        <td colspan=10 class=xl72>расшифровка подписи</td>
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
