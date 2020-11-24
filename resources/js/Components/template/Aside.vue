<template>
    <div class="aside">
        <ul class="nav">
            <!--<li><span class="admin_letter">А</span></li>-->
            <!--<li><span class="admin_letter">Д</span></li>-->
            <!--<li><span class="admin_letter">М</span></li>-->
            <!--<li><span class="admin_letter">И</span></li>-->
            <!--<li><span class="admin_letter">Н</span></li>-->
            <!--<li><span class="admin_letter">И</span></li>-->
            <!--<li><span class="admin_letter">С</span></li>-->
            <!--<li><span class="admin_letter">Т</span></li>-->
            <!--<li><span class="admin_letter">Р</span></li>-->
            <!--<li><span class="admin_letter">А</span></li>-->
            <!--<li><span class="admin_letter">Т</span></li>-->
            <!--<li><span class="admin_letter">О</span></li>-->
            <!--<li><span class="admin_letter">Р</span></li>-->
            <li>
                <a href="/" class="ajax-nav update_url">
                                        <span class="nav-icon">
                                            <i class="fa fa-calendar"></i>
                                        </span>
                    <span class="nav-text">Календарь</span>
                </a>
            </li>
            <!--@endcan-->
            <!--@can('Создавать денежные операции')-->
            <li>
                <a onclick="openDialog('warrantDialog', '&isIncoming=1')" class="ajax-nav update_url">
                                        <span class="nav-icon">
                                            <i class="fa fa-sign-in"></i>
                                        </span>
                    <span class="nav-text">Приход</span>
                </a>
            </li>
            <li>
                <a onclick="openDialog('warrantDialog', '&isIncoming=0')" class="ajax-nav update_url">
                                        <span class="nav-icon">
                                            <i class="fa fa-sign-out"></i>
                                        </span>
                    <span class="nav-text">Расход</span>
                </a>
            </li>
            <!--@endcan-->
            <!--@can('Создавать продажи')-->
            <li>
                <a onclick="openDialog('shipmentDialog')" class="ajax-nav update_url">
                                        <span class="nav-icon">
                                            <i class="fa fa-money"></i>
                                        </span>
                    <span class="nav-text">Продажа</span>
                </a>
            </li>
            <!--@endcan-->
            <!--@can('Создавать заказ клиента')-->
            <li>
                <a onclick="openDialog('clientorderDialog')" class="ajax-nav update_url">
                                        <span class="nav-icon">
                                            <i class="fa fa-clipboard"></i>
                                        </span>
                    <span class="nav-text">Заказ</span>
                </a>
            </li>
            <!--@endcan-->
            <!--@endcan-->
        </ul>
        <div class="mt-auto">
            <ul class="nav">
                <li>
                    <a onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                                <span class="nav-icon">
                                    <i class="fa fa-power-off"></i>
                                </span>
                        <span class="nav-text">Выход</span>
                    </a>
                </li>
            </ul>
            <Debug/>
            <div class="version">version <br>23</div>
        </div>
    </div>
</template>

<script>
    import Debug from './Debug';
    export default {
        name: "Aside",
        components:{
            Debug
        }
    }
</script>

<style scoped>

</style>
