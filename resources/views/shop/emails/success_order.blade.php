@php($order = \App\Models\Order::first())

    <!doctype html>
<html lang="ru">

<head>

    <title>Успешное оформление заказа</title>

</head>


<body class="body" style="padding: 0;margin: 0 auto;position: relative;width: 600px;">

<div class="header" style="position: relative;height: 112px;line-height: 112px;background: url(/images/mail/header.svg) center no-repeat;">
    <span style="font-weight: bold;font-size: 24px;letter-spacing: 0.06em;margin-left: 52px;color: white;">{{ $order->shop->domain ?? $order->shop->subdomain }}</span>
</div>

<div class="content" style="position: relative;padding: 100px 52px 32px 52px;background: white;">

    <h2 style="font-weight: 800;font-size: 20px;letter-spacing: 0.06em;color: #404040;z-index: 1;">Здравствуйте!</h2>
    <h3 style="font-weight: bold;font-size: 16px;letter-spacing: 0.06em;color: #404040;z-index: 1;">Ваш заказ №{{ $order->id }} оформлен</h3>

    <div class="form-group" style="position: relative;height: 66px;border-bottom: 1px solid #ECECEC;display: flex;flex-direction: column;justify-content: center;">
        <label style="margin-bottom: 6px;font-weight: bold;font-size: 14px;letter-spacing: 0.04em;color: #404040;">ФИО:</label>
        <div class="text" style="font-size: 16px;letter-spacing: 0.04em;color: #404040;">{{ $order->partner->fio }}</div>
    </div>

    <div class="form-group" style="position: relative;height: 66px;border-bottom: 1px solid #ECECEC;display: flex;flex-direction: column;justify-content: center;">
        <label style="margin-bottom: 6px;font-weight: bold;font-size: 14px;letter-spacing: 0.04em;color: #404040;">Телефон:</label>
        <div class="text" style="font-size: 16px;letter-spacing: 0.04em;color: #404040;">{{ display_phone($order->partner->basePhone) }}</div>
    </div>

    <div class="form-group" style="position: relative;height: 66px;border-bottom: 1px solid #ECECEC;display: flex;flex-direction: column;justify-content: center;">
        <label style="margin-bottom: 6px;font-weight: bold;font-size: 14px;letter-spacing: 0.04em;color: #404040;">Email:</label>
        <div class="text" style="font-size: 16px;letter-spacing: 0.04em;color: #404040;">{{ $order->partner->email }}</div>
    </div>

    <div class="form-group" style="position: relative;height: 66px;border-bottom: 1px solid #ECECEC;display: flex;flex-direction: column;justify-content: center;">
        <label style="margin-bottom: 6px;font-weight: bold;font-size: 14px;letter-spacing: 0.04em;color: #404040;">Тип оплаты:</label>
        <div class="text" style="font-size: 16px;letter-spacing: 0.04em;color: #404040;">{{ $order->getPayTypeName() }}</div>
        @if($order->pay_type == 1 && $order->status == \App\Models\Order::WAIT_PAYMENT_STATUS)
            <button class="pay_button" style="right: 0;top: calc(100% / 4);border: 2px solid #1F98E9;border-radius: 4px;padding: 8px 20px;color: #1F98E9;background: white;">Оплатить</button>
        @endif
    </div>

    <a class="watch_button" target="_blank" href="{{ $order->shop->getUrl() . 'orders/' . $order->id }}" style="display: inline-block;background: #1F98E9;border-radius: 4px;font-weight: bold;font-size: 14px;margin-top: 24px;letter-spacing: 0.04em;padding: 11px 24px;color: #FFFFFF;text-decoration: unset;">Список позиций</a>

</div>

<div class="footer" style="height: 72px;background: url(/images/mail/footer.svg) center no-repeat;">
</div>

</body>

</html>
