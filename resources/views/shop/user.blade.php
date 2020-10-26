@extends('shop.layout.app')

@section('content')
    <div class="body">

        <div class="personal-cabinet">
            <div class="personal-cabinet__body">
                <div class="breadcrumbs ">
                    <a href = '#' class="breadcrumbs__span">Главная /</a>
                    <a href = '#' class="breadcrumbs__span breadcrumbs__span_active"> Каталог продукции </a>
                </div>
                <div class="personal-cabinet__title bold-title">Личный кабинет</div>
                <div class="personal-cabinet__content">
                    <div class="personal-card personal-cabinet__item">
                        <div class="personal-card__head">
                            <div class="personal-card__title">Василий Пупкин</div>
                            <div class="personal-card__contact">+7 (999) 999-66-66</div>
                            <div class="personal-card__contact">user_12345678@gmail.com</div>

                        </div>
                        <div class="personal-card__body">
                            <div class="personal-card__part part">
                                <span class="part__title">Сумма по заказам:</span><br>
                                <span class="part__number">21 025 478 ₽</span>
                            </div>
                            <div class="personal-card__part part">
                                <span class="part__title">Заказов в ожидании:</span><br>
                                <span class="part__number">140</span>
                            </div>
                            <div class="personal-card__part part">
                                <span class="part__title">К доплате по заказам:</span><br>
                                <span class="part__number">524 256 ₽</span>
                            </div>
                        </div>
                    </div>

                    <div class="personal-cabinet__viewer viewer">
                        <div class="viewer__menu menu">
                            <div class="menu__punkt menu__punkt_active">Гараж</div>
                            <div class="menu__punkt">Мои заказы</div>
                            <div class="menu__punkt">Личные данные</div>
                        </div>
                        <div class="viewer__cont">



                            <!-- -----GARAJ____PUNCT----- -->


                            <div class="transport-group group">
                                <div class="transport-group__head">
                                    <div class="transport-group__title title">Мой транспорт</div>

                                    <div class="transport-group__btnBlock">
                                        <div class="transport-group__counter"><span  class ='transport-group__counter_active'>2</span>/3</div>
                                        <div class="transport-group__slideBtns slideBtns">
                                            <img src="../images/rightBtn.svg" alt="">
                                            <div class="slideBtns__line"></div>
                                            <img src="../images/leftBtn.svg" alt="">

                                        </div>
                                    </div>
                                </div>
                                <div class="transport-group__body">
                                    <div class="transport-group__area transport-group__area_active area">
                                        <div class="area__punkt ">
                                            <div class="area__title">Марка</div>
                                            <div class="area__text">Dongfeng Xiaokang</div>
                                        </div>
                                        <div class="area__punkt">
                                            <div class="area__title">Модель</div>
                                            <div class="area__text">CORSA A Наклонная задняя часть (93_, 94_, 98_, 99_)</div>
                                        </div>
                                        <div class="area__punkt">
                                            <div class="area__title">Модификация</div>
                                            <div class="area__text">2.0 (116.55F, 116.56F, 116.55N, 116.56N)</div>
                                        </div>
                                    </div>
                                    <div class="transport-group__area area">
                                        <div class="area__punkt area__punkt_active">
                                            <div class="area__title">Марка</div>
                                            <div class="area__text">Dongfeng Xiaokang</div>
                                        </div>
                                        <div class="area__punkt">
                                            <div class="area__title">Модель</div>
                                            <div class="area__text">CORSA A Наклонная задняя часть (93_, 94_, 98_, 99_)</div>
                                        </div>
                                        <div class="area__punkt">
                                            <div class="area__title">Модификация</div>
                                            <div class="area__text">2.0 (116.55F, 116.56F, 116.55N, 116.56N)</div>
                                        </div>
                                    </div>
                                    <div class="transport-group__area area">
                                        <div class="area__punkt area__punkt_active">
                                            <div class="area__title">Марка</div>
                                            <div class="area__text">Dongfeng Xiaokang</div>
                                        </div>
                                        <div class="area__punkt">
                                            <div class="area__title">Модель</div>
                                            <div class="area__text">CORSA A Наклонная задняя часть (93_, 94_, 98_, 99_)</div>
                                        </div>
                                        <div class="area__punkt">
                                            <div class="area__title">Модификация</div>
                                            <div class="area__text">2.0 (116.55F, 116.56F, 116.55N, 116.56N)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="transport-info">
                                <div class="title transport-info__title">Добавить транспорт</div>
                                <form action="" class="transport-info__form transport-form">
                                    <div class="transport-form__row">
                                        <div class="transport-form__label">VIN вашего автомобиля*</div>
                                        <input class="transport-form__input"><img id = "alert-identificator" src="../images/exclamation-mark 1.svg" alt="" class="transport-form__icon"></input>
                                    </div>
                                    <div class="transport-form__row">

                                        <div class="transport-form__label">Марка вашего автомобиля</div>
                                        <div class="selct-bgc">
                                            <select class="transport-form__input">
                                                <option value="">Alfa Romeo</option>
                                                <option value="">Alfa </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="transport-form__row">
                                        <div class="transport-form__label">Модель вашего автомобиля</div>
                                        <div class="selct-bgc"><select class="transport-form__input"></select></div>
                                    </div>
                                    <div class="transport-form__row">
                                        <div class="transport-form__label">Модификация вашего автомобиля</div>
                                        <div class="selct-bgc"><select class="transport-form__input"></select></div>
                                    </div>
                                    <div class="transport-form__row">
                                        <div class="transport-form__label">Год автомобиля</div>
                                        <img id = "alert-identificator" src="../images/checked1.svg" alt="">
                                        <input class="transport-form__input"></input>
                                    </div>
                                    <div class="transport-form__row">
                                        <div class="transport-form__label">Комментарий</div>
                                        <textarea class="transport-form__input"></textarea>
                                    </div>
                                    <div class="transport-form__row">
                                        <div class="transport-form__label"></div>
                                        <input type = 'button' value = 'Сохранить' class="transport-form__button"></input>
                                    </div>




                                </form>

                            </div>




                        </div>




                        <!-- -----PERCONAL___DATA----- -->
                        <div class="personal-group group">
                            <div class="title personal-group__title">Личные данные</div>
                            <div class="personal-card">
                                <table class="personal-card__table">
                                    <tr>
                                        <td class="personal-card__key">Телефон</td>
                                        <td class="personal-card__value">+7 (987) 654-32-10</td>
                                    </tr>
                                    <tr>
                                        <td class="personal-card__key">Фамилия</td>
                                        <td class="personal-card__value">Пупкин <img class = "personal-card__redact-btn" src="../images/Group 522.svg" alt=""></td>
                                    </tr>
                                    <tr>
                                        <td class="personal-card__key">Имя</td>
                                        <td class="personal-card__value">Василий<img class = "personal-card__redact-btn" src="../images/Group 522.svg" alt=""></td>
                                    </tr>
                                    <tr>
                                        <td class="personal-card__key">Отчество</td>
                                        <td class="personal-card__value">Геннадьевич<img class = "personal-card__redact-btn" src="../images/Group 522.svg" alt=""></td>
                                    </tr>
                                    <tr>
                                        <td class="personal-card__key">Дата рождения</td>
                                        <td class="personal-card__value">01.01.1990<img class = "personal-card__redact-btn" src="../images/Group 522.svg" alt=""></td>
                                    </tr>
                                    <tr>
                                        <td class="personal-card__key">Электронная почта</td>
                                        <td class="personal-card__value">pupkin_vasiliy121212@mail.ru<img class = "personal-card__redact-btn" src="../images/Group 522.svg" alt=""></td>
                                    </tr>
                                    <tr>
                                        <td class="personal-card__key">Текущий пароль</td>
                                        <td class="personal-card__value">******<img class = "personal-card__redact-btn" src="../images/Group 522.svg" alt=""></td>
                                    </tr>
                                    <tr>
                                        <td class="personal-card__key">Способ доставки</td>
                                        <td class="personal-card__value">Самовывоз<img class = "personal-card__redact-btn" src="../images/Group 522.svg" alt=""></td>
                                    </tr>
                                </table>
                                <div class="personal-card__hr"></div>
                                <div class="title">Адреса доставки</div>

                                <div class="personal-card__adress-row">г. Белгород, ул. проспект Славы, 150А, д. 54, стр. 5, под. 4, кв. 8<img class = "personal-card__redact-btn" src="../images/Group 522.svg" alt=""></div>
                                <div class="personal-card__adress-cont">
                                    <div class="personal-card__adress-add"><img src="../images/plusUnactive.svg" alt="">Добавить адрес доставки</div><div class="personal-card__adress-add_active personal-card__adress-add"><img src="../images/plusActive.svg" alt="">Добавить адрес доставки</div>
                                </div>
                            </div>





                        </div>
                        <!-- -----MY___ORDERS____PUNCT----- -->


                        <div class="order-group group">
                            <div class="title order-group__title">Мои заказы</div>
                            <table class = 'order-table'>
                                <div class = 'order-table__border-block'>
                                    <tr class = 'order-table__row order-table__head'>

                                        <td>№</td>
                                        <td>Статус</td>
                                        <td>Дата</td>
                                        <td>Сумма</td>
                                        <td>Скидка</td>
                                        <td>Итого</td>

                                    </tr>
                                </div>
                                <div  class = 'order-table__border-block'>
                                    <tr class = 'order-table__row'>
                                        <td>12524555</td>
                                        <td>Укомплектован</td>
                                        <td>16.09.2020 16:35</td>
                                        <td>6 000.00 ₽</td>
                                        <td>50%</td>
                                        <td>3 000.00 ₽</td>
                                        <td><img src="../images/next2.svg" alt=""></td>
                                        <table class= 'opened-table'>
                                            <tr class="opened-table__head">
                                                <td>№</td>
                                                <td>Наименование</td>
                                                <td>Артикул</td>
                                                <td>Бренд</td>
                                                <td>Магазин</td>
                                                <td>Кол-во</td>
                                                <td>Цена</td>
                                                <td>Всего</td>

                                            </tr>
                                            <tr class="opened-table__row">
                                                <td>1</td>
                                                <td>Автохимия и автокосметика</td>
                                                <td>67477646000</td>
                                                <td>Toshiba</td>
                                                <td>Археерейская</td>
                                                <td>10</td>
                                                <td>600.00 ₽</td>
                                                <td>600 000.00 ₽</td>
                                            </tr>
                                            <tr class="opened-table__row">
                                                <td>2</td>
                                                <td>Тормозные колодки передние</td>
                                                <td>67477646000</td>
                                                <td>Toshiba</td>
                                                <td>Археерейская</td>
                                                <td>10</td>
                                                <td>600.00 ₽</td>
                                                <td>600 000.00 ₽</td>
                                            </tr>
                                            <tr class="opened-table__row">
                                                <td>3</td>
                                                <td>Шаровая опора</td>
                                                <td>67477646000</td>
                                                <td>Toshiba</td>
                                                <td>Археерейская</td>
                                                <td>10</td>
                                                <td>600.00 ₽</td>
                                                <td>600 000.00 ₽</td>
                                            </tr>
                                            <tr class="opened-table__row">
                                                <td>4</td>
                                                <td>Шаровая опора</td>
                                                <td>67477646000</td>
                                                <td>Toshiba</td>
                                                <td>Археерейская</td>
                                                <td>10</td>
                                                <td>600.00 ₽</td>
                                                <td>600 000.00 ₽</td>
                                            </tr>
                                            <tr class="opened-table__row">
                                                <td>5</td>
                                                <td>Шаровая опора</td>
                                                <td>67477646000</td>
                                                <td>Toshiba</td>
                                                <td>Археерейская</td>
                                                <td>10</td>
                                                <td>600.00 ₽</td>
                                                <td>600 000.00 ₽</td>
                                            </tr>
                                            <tr class="opened-table__row">
                                                <td>6</td>
                                                <td>Шаровая опора</td>
                                                <td>67477646000</td>
                                                <td>Toshiba</td>
                                                <td>Археерейская</td>
                                                <td>10</td>
                                                <td>600.00 ₽</td>
                                                <td>600 000.00 ₽</td>
                                            </tr>
                                            <tr class="opened-table__row">
                                                <td>7</td>
                                                <td>Шаровая опора</td>
                                                <td>67477646000</td>
                                                <td>Toshiba</td>
                                                <td>Археерейская</td>
                                                <td>10</td>
                                                <td>600.00 ₽</td>
                                                <td>600 000.00 ₽</td>
                                            </tr>

                                        </table>
                                        <div class="order-table__btns">
                                            <input type ='button' value  = "Оплатить" class = "order-table__btn">
                                            <input type ='button' value  = "Распечатать" class = "order-table__btn">
                                        </div>
                                    </tr>
                                </div>

                            </table>
                        </div>



                    </div>

                </div>


            </div>
        </div>
        <script>
            document.querySelectorAll('.personal-card__redact-btn').forEach(element =>  {
                element.addEventListener('mouseover',()=>{element.setAttribute('src', '../images/Group 522active.svg')})
                element.addEventListener('mouseout',()=>{element.setAttribute('src', '../images/Group 522.svg')})
            })
            // let hoverBtns = document.querySelectorAll('.personal-card__redact-btn');
            // hoverBtns.forEach(element => {
            //     console.log(element)
            // }})
        </script>
    </div>
@endsection
