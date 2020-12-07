<template>
    <div  class="errors">
        <div v-for="message in messages" class="error">{{ message[0] }}</div>
    </div>
</template>

<script>
    export default {
        props: ['messages'],
        name: "ValidateErrors"
    }
</script>

<style scoped>

</style>
