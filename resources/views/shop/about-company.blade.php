@extends('shop.layout.app')

@section('content')
<div class="body">
    <div class="pagination container bg-white">
        <div class="paginator">
            <span class="item" ><a href="javascript:void(0)">Главная</a></span>
            <span class="item" ><a href="javascript:void(0)">После главной</a></span>
            <span class="item" >Последняя</span>
        </div>
    </div>
    <div class="about container bg-white">
        <div class="title">
            <h2>О компании</h2>
            <div class="d-flex">
                <div class="text">
                    Равным образом рамки и место обучения кадров играет важную роль в формировании новых предложений. Разнообразный и богатый опыт рамки и место обучения кадров позволяет оценить значение направлений прогрессивного развития. Разнообразный и богатый опыт новая модель организационной деятельности позволяет выполнять важные задания по разработке существенных финансовых и административных условий. Равным образом консультация с широким активом влечет за собой процесс внедрения и модернизации форм развития. Повседневная практика показывает, что сложившаяся структура организации требуют от нас анализа существенных финансовых и административных условий.
                    Разнообразный и богатый опыт укрепление и развитие структуры в значительной степени обуславливает создание направлений прогрессивного развития. Повседневная практика показывает, что начало повседневной работы по формированию позиции играет важную роль в формировании существенных финансовых и административных условий. Товарищи! рамки и место обучения кадров влечет за собой процесс внедрения и модернизации существенных финансовых и административных условий.
                </div>
                <div class="main_picture flex-1">
                    <img src="/images/shop/demo_pic.png" alt="">
                </div>
            </div>
        </div>
    </div>
    <div class="photo-gallery container bg-white">
        <h2>Фотогалерея</h2>
        <div class="ov-hidden">
            <div class="photos grid-4">
                <div class="photos-container">
                    @for($i = 0; $i < 5; $i++)
                        <div class="photo">
                            <img class="photo-img" title="сюда имя картинки" src="/images/shop/demo_pic.png" alt="">
                        </div>
                    @endfor
                </div>
                <div class="controls">
                    <div class="control-item left" onclick="window.gallerySlider.prev()"></div>
                    <div class="pins-container"></div>
                    <div class="control-item right" onclick="window.gallerySlider.next()"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
