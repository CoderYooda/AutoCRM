<template>
    <div id="current_time">
        <div class="h">{{ h }}</div>
        <div class="m">{{ m }}</div>
        <div class="s">{{ s }}</div>
    </div>
</template>

<script>
    export default {
        name: "Clock",
        data: ()=> {
            return {
                h: '00',
                m: '00',
                s: '00',
            }
        },
        mounted() {
            setInterval(() => {
                let date = new Date();
                let hours = null;
                let minutes = null;
                let seconds = null;
                if(date.getHours().toString().length < 2){hours = '0' + date.getHours();} else {hours = date.getHours();}
                if(date.getMinutes().toString().length < 2){minutes = '0' + date.getMinutes();} else {minutes = date.getMinutes();}
                if(date.getSeconds().toString().length < 2){seconds = '0' + date.getSeconds();} else {seconds = date.getSeconds();}
                this.h = hours;
                this.m = minutes;
                this.s = seconds;
            }, 1000);
        }
    }
</script>

<style scoped>

</style>
