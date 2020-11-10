<div class="callback">
    <div class="container">
        <div class="info callback-elem">
            <div class="fast-mail"></div>
            <div class="description">
                <span class="fat">ЗАКАЗАТЬ ОБРАТНЫЙ ЗВОНОК</span>
                <span class="">Остались вопросы? Свяжитесь с нами!</span>
            </div>
        </div>
        <form action="{{ route('feedback.store') }}" method="POST" class="feedaback">
            <div class="name-container">
                <input name="name" placeholder="Имя" class="name" type="text">
                <div class="error" data-error="name"></div>
            </div>
            <div class="phone-container">
                <input name="phone" placeholder="Телефон" class="phone" type="text">
                <div class="error" data-error="phone"></div>
            </div>
            <button type="button" onclick="feedback.save(this);">Заказать звонок</button>
        </form>
    </div>

</div>
<div class="botton-info">
    <div class="container">
        <div class="contacts">
            <div class="mini-card pin pl-30">
                <a href="{{ route('pages.about') }}" title="{{ $shop->address_name }}">{{ $shop->address_name }}</a>
            </div>
            @isset($shop->phone->number )
                <div class="mini-card phone pl-30">
                    <a href="tel: +{{ $shop->phone->number }}" title="{{ $shop->phone->number  }}">{{ display_phone($shop->phone->number) }}</a>
                </div>
            @endisset
            @isset($shop->contactEmail)
                <div class="mini-card mail pl-30">
                    <a href="mailto:{{ $shop->contactEmail->first()->email }}" title="{{ $shop->contactEmail->first()->email }}">{{ $shop->contactEmail->first()->email }}</a>
                </div>
            @endisset
        </div>
        <div class="menu">
            <a title="О компании" href="{{ route('pages.about') }}">О компании</a>
            <a title="Оплата и доставка" href="{{ route('pages.delivery') }}">Оплата и доставка</a>
            <a title="Гарантия и возврат" href="{{ route('pages.warranty') }}">Гарантия и возврат</a>
            <a title="Контакты" href="{{ route('pages.contacts') }}">Контакты</a>
        </div>
    </div>
</div>
<div class="footer">
    <div class="container">
        <div class="logo-container footer-elem d-flex" style="align-items: center;">
            <div>
                <a href="{{ route('pages.index') }}">
                    <div class="logo">
                        @isset($shop->logotypeImage)
                            <img class="w-100 h-100" src="{{ $shop->logotypeImage->path() }}" title="{{ $shop->name }}"  alt="{{ $shop->name }}"/>
                        @endisset
                    </div>
                </a>
            </div>
            <div class="ml-15">
                <h1 class="company-name">
                    <a href="{{ route('pages.index') }}">{{ $shop->name }}</a>
                </h1>
            </div>
        </div>
        <div class="footer-elem"></div>
        <div class="copyright-data footer-elem">
            <span>
                © «{{ $shop->name }}» 2020, работает на <a title="Лучшая программа для автозапчастей" href="https://bbcrm.ru/">#bbcrm</a>
            </span>
        </div>
        <div class="personal-data footer-elem">
            <a title="Обработка персональных данных" href="javascript:void(0)">Обработка персональных данных</a>
        </div>
    </div>
</div>
