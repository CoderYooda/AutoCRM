<template>
    <div class="ml-5 flex-1" style="position: relative;">
        <div v-on:click="open = !open" class="select-selected">{{ selected }}</div>
        <div class="select-items" v-bind:class="{ 'select-hide' : !open }">
            <div @click="select(elem.value)" v-for="elem in data.elements">{{ elem.name }}</div>
            <!--same-as-selected-->
        </div>
    </div>
</template>

<script>
    export default {
        props:['data'],
        name: "Select",
        data: () => {
            return{
                open:false,
                selected: null,
            }
        },
        computed: {
            model: {
                get: function () {
                    let name_arr = this.data.model.split('.');
                    let target = this.$parent;
                    name_arr.forEach((item, index) => {
                        if (!target[item] && name_arr[index + 1]) {
                            target[item] = {};
                        }
                        target = target[item];
                    });
                    return target;
                },
                set: function (val) {
                    let name_arr = this.data.model.split('.');
                    let target = this.$parent;
                    name_arr.forEach((item, index) => {
                        if (name_arr[index + 1]) {
                            target = target[item]
                        } else {
                            target[item] = val;
                        }
                    });
                }
            },
        },
        mounted() {
            this.select_val();
            document.addEventListener('click', this.close)
        },
        methods:{
            select_val(){
                let selected = this.model != null ? this.model : this.default_value;
                this.data.elements.forEach((elem) => {
                    if(elem.value == selected){
                        this.selected = elem.name;
                    }
                });

            },
            close (e) {
                if (!this.$el.contains(e.target)) {
                    this.open = false
                }
            },
            select(value){
                this.model = value;
                this.open = false;
                this.select_val();
            }
        }
    }
</script>

<style scoped>

</style>
