<template>
    <div>
        <div class="app-page">
            Интренет магазин
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$eventBus.$emit('set-title', 'Главная страница');
        },
        methods: {
        },
    }
</script>
