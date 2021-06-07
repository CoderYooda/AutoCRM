<ul class="service-list pr-15">
    <li>Перейти на <a target="_blank" href="{{ $service->url }}">сайт</a> поставщика;</li>
    <li>Необходимо пройти регистрацию у поставщика;</li>
    <li>Дождаться подтверждения регистрации по электронной почте;</li>
    <li>Для получения доступа к сервису вам необходимо перейти в вкладку Еще->Веб сервисы. Далее перейти по ссылке "Инструкция для подключения", далее "Служба технической поддержки". В сообщении указать, что вам необходим веб-сервис, а так же указать ваш ip-адрес</li>
    <li>Ваш ip адресс :<span>{{ request()->server('SERVER_ADDR') }}</span>
        <i onclick="helper.copy('{{ request()->server('SERVER_ADDR') }}');" class="fa fa-clipboard pointer" aria-hidden="true"></i>;
    <li>Для активации сервиса введите логин и пароль, используемые при регистрации на сайте;</li>
</ul>

<div class="ml-15 mr-15" style="color: #404040;">
    <b>Как работает система</b>

    <p>Сервис Партком дает возможность отслеживать цены на автозапчасти в режиме реального времени, наличие на складе поставщика и сроки поставки при заказе товара.</p>
</div>