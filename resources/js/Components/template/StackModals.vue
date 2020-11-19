<template>
    <li class="top-nav-item dropdown pointer" onclick="window.helper.openModal(this, event)">
        <a id="stack_badge" class="ico_link stack">
            <span id="stack_badge_count" class="badge-pill"></span>
        </a>
        <div id="stack_dropdown" class="dropdown_container">
            <div class="arrow"></div>
            <div class="mess_container" data-simplebar style="max-height: 220px; width: 200px">
                <div id="stack_item_container">
                    <a class="stack_item">Ytn</a>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "StackModals"
    }
</script>

<style scoped>

</style>
