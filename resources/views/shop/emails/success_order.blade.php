<!doctype html>
<html lang="ru">

    <head>

        <title>Успешное оформление заказа</title>

        <style>

            .body {
                padding: 0;
                margin: 0 auto;
                position: relative;
                width: 600px;
            }

            .header {
                position: relative;
                height: 112px;
                line-height: 112px;
            }

            .header span {
                position: relative;
                top: -300px;
                font-weight: bold;
                font-size: 24px;
                letter-spacing: 0.06em;
                margin-left: 52px;
                color: white;
            }

            .header .parts {
                width: 398px;
                height: 202px;
                top: -153px;
                position: relative;
                right: -104px;
                z-index: 1;
            }

            .content {
                position: relative;
                padding: 100px 52px 32px 52px;
                background: white;
            }


            .watch_button {
                display: inline-block;
                background: #1F98E9;
                border-radius: 4px;
                font-weight: bold;
                font-size: 14px;
                margin-top: 24px;
                letter-spacing: 0.04em;
                padding: 11px 24px;
                color: #FFFFFF;
                text-decoration: unset;
            }

            h2 {
                font-weight: 800;
                font-size: 20px;
                letter-spacing: 0.06em;
                color: #404040;
                z-index: 1;
            }

            h3 {
                font-weight: bold;
                font-size: 16px;
                letter-spacing: 0.06em;
                color: #404040;
                z-index: 1;
            }

            .form-group {
                position: relative;
                height: 66px;
                border-bottom: 1px solid #ECECEC;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .form-group:last-child {
                border-bottom: unset;
            }

            .form-group label {
                margin-bottom: 6px;
                font-weight: bold;
                font-size: 14px;
                letter-spacing: 0.04em;
                color: #404040;
            }

            .form-group .text {
                font-size: 16px;
                letter-spacing: 0.04em;
                color: #404040;
            }

            .form-group .pay_button {
                position: absolute;
                right: 0;
                top: calc(100% / 4);
                border: 2px solid #1F98E9;
                border-radius: 4px;
                padding: 8px 20px;
                color: #1F98E9;
                background: white;
            }

            .footer {
                height: 72px;
            }

        </style>

    </head>


    <body class="body">

        <div class="header">
            <img src="{{ asset('/images/mail/header.svg') }}" />
            <span>{{ $order->shop->domain ?? $order->shop->subdomain }}</span>
            <img class="parts" src="{{ asset('/images/mail/parts.svg') }}" />
        </div>

        <div class="content">

            <h2>Здравствуйте!</h2>
            <h3>Ваш заказ №{{ $order->id }} оформлен</h3>

            <div class="form-group">
                <label>ФИО:</label>
                <div class="text">{{ $order->partner->fio }}</div>
            </div>

            <div class="form-group">
                <label>Телефон:</label>
                <div class="text">{{ display_phone($order->partner->firstActivePhoneNumber()) }}</div>
            </div>

            <div class="form-group">
                <label>Email:</label>
                <div class="text">{{ $order->partner->email }}</div>
            </div>

            <div class="form-group">
                <label>Тип оплаты:</label>
                <div class="text">{{ $order->getPayTypeName() }}</div>
                @if($order->pay_type == 1 && $order->status == \App\Models\Order::WAIT_PAYMENT_STATUS)
                    <button class="pay_button">Оплатить</button>
                @endif
            </div>

            <a class="watch_button" target="_blank" href="{{ $order->path() }}">Список позиций</a>

        </div>

        <div class="footer">
            <img src="{{ asset('/images/mail/footer.svg') }}" />
        </div>

    </body>

</html>
