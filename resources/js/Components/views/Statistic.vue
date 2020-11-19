<template>
    <div class="app-page">
        Статитстика
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$eventBus.$emit('set-title', 'Главная страница');
        },
        methods: {
        }
    }
</script>
