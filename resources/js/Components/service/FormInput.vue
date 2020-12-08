<template>
    <div class="form-group">
        <label>{{ inputData.label }}</label>
        <div v-if="$parent.loading" class="list-placeholder" style="height: 30px;">
            <div class="list-placeholder_item" style="height: 30px;">
                <div class="list-placeholder_cell w-100" style="width: 100%" ></div>
            </div>
        </div>
        <input  @keypress.enter="$parent.save()"
                v-bind:class="{'is-invalid':errorMsg}"
                v-if="!$parent.loading && isInput"
                v-tooltip="{
                    content: errorMsg,
                    placement: 'left',
                    classes: ['error'],
                }"
                v-model="parentModel"
                v-bind:placeholder="inputData.placeholder"
                type="text" class="form-control">
        <div v-if="!$parent.loading && isSelector" class="input-group">
            <button
                v-bind:class="{'is-invalid':errorMsg}"
                v-tooltip="{
                    content: errorMsg,
                    placement: 'left',
                    classes: ['error'],
                }"
                v-on:click="$parent[inputData.onClick]()"
                type="button"
                class="category_select form-control text-left button_select">{{ parentModel }}</button>
        </div>
    </div>
</template>

<script>
    export default {
        props:['inputData'],
        name: "FormInput",
        data: ()=> {
            return {
                error:null,
            }
        },
        computed:{
            parentModel:{
                get: function () {
                    if(this.$parent.entity){
                        return this.$parent.entity[this.inputData.name]
                    } else {
                        return this.$parent[this.inputData.name]
                    }
                },
                set: function (newValue) {
                    if(this.$parent.entity){
                        this.$parent.entity[this.inputData.name] = newValue;
                    } else {
                        this.$parent[this.inputData.name] = newValue;
                    }
                }
            },
            errorMsg(){
                return this.error ? this.error : false;
            },
            isInput(){
                return this.inputData.type === 'input';
            },
            isSelector(){
                return this.inputData.type === 'selector';
            }
        },
        mounted(){
            this.$watch('$parent.entity.' + this.inputData.name, (val) => {
                this.error = null;
            }, {
                deep: true
            })
        },
        watch: {
            // '$parent.entity':{
            //     handler(entity){
            //         this.error = null;
            //     },
            //     deep: true
            // },
            '$parent.messages':function (messages){
                if(messages[this.inputData.name] || messages[this.inputData.name + '_id']) {
                    let message = messages[this.inputData.name] || messages[this.inputData.name + '_id'];
                    this.setError(message);
                }
            },
        },
        methods:{
            setError(error){
                this.error = error;
            }
        },
    }
</script>

<style scoped>

</style>
<!--v-validate="{name:'name'}" v-bind:class="{'is-invalid' : hasError('name')}"-->
