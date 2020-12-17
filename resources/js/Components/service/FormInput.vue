<template>
    <div class="form-group">
        <div v-if="isInput">
            <label>{{ inputData.label }}</label>
            <div v-if="$parent.loading" class="list-placeholder" style="height: 30px;">
                <div class="list-placeholder_item" style="height: 30px;">
                    <div class="list-placeholder_cell w-100" style="width: 100%" ></div>
                </div>
            </div>
            <input v-if="!$parent.loading" @keypress.enter="$parent.save()"
                    v-bind:class="{'is-invalid':errorMsg}"
                    v-tooltip="{
                        content: errorMsg,
                        placement: 'left',
                        classes: ['error'],
                    }"
                    v-model="parentModel"
                    v-bind:placeholder="inputData.placeholder"
                    type="text" class="form-control">
        </div>


        <div v-if="!$parent.loading && isSelector" >
            <label>{{ inputData.label }}</label>
            <div class="input-group">
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
        <div v-if="isCheckbox" class="relative">
            <label v-bind:for="inputData.name" class="w-100" v-bind:class="{'mb-0' : !inputData.mb}">{{ inputData.label }}</label>
            <label class="absolute custom_checkbox" style="right: 0; top: 3px;">
                <input v-bind:id="inputData.name" v-model="parentModel" v-bind:name="inputData.name" type="checkbox" class="not_default"/>
                <span></span>
            </label>
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
                    let name_arr = this.inputData.name.split('.');
                    let target = this.$parent;
                    name_arr.forEach((item, index)=>{
                        if(!target[item] && name_arr[index + 1]){
                            target[item] = {};
                        }
                        target = target[item];
                    });
                    return target;
                },
                set: function (val) {
                    let name_arr = this.inputData.name.split('.');
                    let target = this.$parent;
                    name_arr.forEach((item, index)=>{
                        if(name_arr[index + 1]){
                            target = target[item]
                        } else {
                            target[item] = val;
                        }
                    });
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
            },
            isCheckbox(){
                return this.inputData.type === 'checkbox';
            }
        },
        mounted(){
            this.$watch('$parent.' + this.inputData.name, (val) => {
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
                let name = this.getTargetName();
                if(messages[name] || messages[name + '_id']) {
                    let message = messages[name] || messages[name + '_id'];
                    this.setError(message);
                }
            },
        },
        methods:{
            getTargetName(){
                let name_arr = this.inputData.name.split('.');
                return name_arr.slice(-1);
            },
            setError(error){
                this.error = error;
            }
        },
    }
</script>

<style scoped>

</style>
<!--v-validate="{name:'name'}" v-bind:class="{'is-invalid' : hasError('name')}"-->
