<ul class="service-list pr-15">
    <li>Перейдите на <a target="_blank" href="{{ $service->url }}">сайт</a> поставщика и заполните заявку.</li>
    <li>Пройдите регистрацию и войдите в личный кабинет.</li>
    <li>
        Перейдите на <a href="https://mikado-parts.ru/office/ws_panel.asp">эту</a> страницу, отметьте галочки возле пунктов "Доступ к функциям поиска" и "Доступ к работе с корзиной заказа", после добавьте в список IP адресов следующий адрес:
        <span>{{ request()->server('SERVER_ADDR') }}</span>
        <i onclick="helper.copy('{{ request()->server('SERVER_ADDR') }}');" class="fa fa-clipboard pointer" aria-hidden="true"></i>
    </li>
    <li>Введите логин и пароль с сайта поставщика.</li>
</ul>

<div class="ml-15 mr-15" style="color: #404040;">
    <b>Как работает система</b>

    <p>Сервис Mikado-Parts дает возможность отслеживать цены на автозапчасти в режиме реального времени, наличие на складе поставщика и сроки поставки при заказе товара.</p>
</div>
