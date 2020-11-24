<template>
    <div>
        <div v-if="debug" style="color: #fff;font-size: 10px; text-align: center">{{ memory }}</div>
    </div>
</template>

<script>
    export default {
        name: "Clock",
        data: ()=> {
            return {
                memory: '',
                debug:false
            }
        },
        mounted() {
            this.debug = window.debug;
            setInterval(() => {
                let _lsTotal = 0,
                    _xLen, _x;
                for (_x in localStorage) {
                    if (!localStorage.hasOwnProperty(_x)) {
                        continue;
                    }
                    _xLen = ((localStorage[_x].length + _x.length) * 2);
                    _lsTotal += _xLen;
                };
                this.memory = "LS:" + (_lsTotal / 1024).toFixed(2) + " KB";
            }, 1000);
        }
    }
</script>

<style scoped>

</style>
