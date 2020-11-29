<template>
    <li v-on:click="open = !open" class="top-nav-item dropdown pointer" v-bind:class="{ 'show': open }">
        <a id="bell_badge" class="ico_link bell">
            <span id="stack_bell_count" class="badge-pill"></span>
        </a>
        <div class="dropdown_menu" v-bind:class="{ 'show': open }">
            <div class="arrow"></div>
            <div class="mess_container" data-simplebar style="max-height: 220px; width: 200px">
                <div id="stack_item_container">
                    <span class="sver">Системных сообщений нет</span>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "StackModals",
        data: ()=> {
            return {
                open:false,
            }
        },
        mounted() {
            document.addEventListener('click', this.close);
        },
        methods:{
            close (e) {
                if (!this.$el.contains(e.target)) {
                    this.open = false
                }
            },
        }
    }
</script>

<style scoped>

</style>
