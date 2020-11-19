<template>
    <div class="text-center p-5 w-100">
        <h1 class="display-5 my-5">Похоже, такой страницы не существует</h1>
        <p>Вернитерь на
            <router-link tag="a" active-class="active" to="/" exact>
                главную страницу
            </router-link>
            , и сообщите нам о проблеме.
        <p class="my-5 text-muted h4">
            -- 404 --
        </p>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                companies: []
            }
        },
        mounted() {
            // var app = this;
        },
        methods: {
        }
    }
</script>
