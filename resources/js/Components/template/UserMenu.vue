<template>
    <li class="top-nav-item dropdown pointer" onclick="window.helper.openModal(this, event)">
        <div class="d-flex align-items-center">
            <div class="w-52 p-10">
                <div class="avatar w-32 mr-3">
                    <img class="user_thumb" src="/" alt="...">
                </div>
            </div>
            <div class="pr-10">
                <div style="line-height: 14px;">/</div>
                <div style="font-size: 12px;font-weight: bold;line-height: 14px;">/</div>
            </div>
        </div>

        <div class="dropdown_container">
            <div class="arrow"></div>

            <a class="element ajax-nav" href="/">Личный кабинет</a>
            <a class="element ajax-nav" href="/">Мои услуги</a>

            <a class="element ajax-nav" href="/" onclick="window.helper.closeModal(this, event)">
                Настройки
            </a>
            <a class="element ajax-nav" href="/">Гараж</a>
            <a class="element" href="/">
                Вернуться в адм. панель
            </a>
            <a class="element" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                Выход
            </a>
        </div>
    </li>
</template>

<script>
    export default {
        name: "UserMenu"
    }
</script>

<style scoped>

</style>
