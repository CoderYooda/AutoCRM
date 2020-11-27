<template>
    <li @keydown.esc="open = !open" v-on:click="open = !open" class="top-nav-item dropdown pointer" v-bind:class="{ 'show': open }">
        <a id="stack_badge" v-bind:class="icoActive" class="ico_link stack">
            <span id="stack_badge_count" class="badge-pill">{{ dialogsCount }}</span>
        </a>
        <div class="dropdown_menu" v-bind:class="{ 'show': open }">
            <div class="arrow"></div>
            <div class="mess_container" data-simplebar style="max-height: 220px; width: 200px">
                <div id="stack_item_container">
                    <span v-if="!dialogs.length" class="sver">Свернутых окон нет</span>
                    <a v-on:click="restoreDialog(dialog.name)" v-for="dialog in dialogs" class="stack_item">{{ dialog.title }}</a>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "DialogsStack",
        data: ()=> {
            return {
                dialogs:[],
                open:false,
            }
        },
        computed:{
            icoActive(){
                return this.dialogs.length ? 'active' : '';
            },
            dialogsCount(){
                return this.dialogs.length;
            }
        },
        mounted() {
            document.addEventListener('click', this.close);
            this.$eventBus.$on('hideDialog', (dialog)=>{
                let isset = false;
                this.dialogs.forEach((elem)=>{
                    if(elem.name === dialog.name){
                        isset = true;
                    }
                });
                if(!isset)
                    this.dialogs.push({name:dialog.name, title:dialog.title});
                console.log(dialog);
            });
            this.$eventBus.$on('closeDialog', (dialog)=>{
                this.dialogs.forEach((elem, index)=>{
                    if(elem.name === dialog.name){
                        this.dialogs.splice(index, 1);
                    }
                });
            });
            this.$eventBus.$on('openDialog', (data)=>{
                let id = (data.params && data.params.id) ? data.params.id : '';
                this.dialogs.forEach((elem) => {

                    console.log(data.tag + 'Dialog' + id);

                    if(elem.name === data.tag + 'Dialog' + id){
                        this.restoreDialog(elem.name)
                    }
                });
            });
        },
        methods:{
            close (e) {
                if (!this.$el.contains(e.target)) {
                    this.open = false
                }
            },
            restoreDialog(dialog_name){
                this.dialogs.forEach((elem, index)=>{
                    if(elem.name === dialog_name){
                        this.dialogs.splice(index, 1);
                    }
                });
                this.$eventBus.$emit('restoreDialog', dialog_name);
            }
        }
    }
</script>

<style scoped>

</style>
