<ul class="service-list pr-15">
    <li>Перейти на <a target="_blank" href="{{ $service->url }}">сайт</a> поставщика;</li>
    <li>Необходимо пройти регистрацию у поставщика;</li>
    <li>
        Вам необходимо связаться с их менеджером и сказать, что Вам требуется доступ к проценке,
        так же укажите, что требуется доступ по этому IP адресу:
        <span>{{ request()->server('SERVER_ADDR') }}</span>
        <i onclick="helper.copy('{{ request()->server('SERVER_ADDR') }}');" class="fa fa-clipboard pointer" aria-hidden="true"></i>
    </li>
    <li>Введите Ваш логин и пароль с сайта поставщика;</li>
</ul>

<div class="ml-15 mr-15" style="color: #404040;">
    <b>Как работает система</b>
    <p>Сервис Мотекс дает возможность отслеживать цены на автозапчасти в режиме реального времени, наличие на складе поставщика и сроки поставки при заказе товара.</p>
</div>