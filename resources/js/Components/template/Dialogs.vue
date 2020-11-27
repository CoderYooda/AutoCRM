<template>
    <div class="dialog_container">

        <div v-if="!dialog.hidden" v-on:mousedown="selectDialog(dialog)" v-for="dialog in dialogs" v-bind:key="dialog.name + dialog.id" class="dialog" v-bind:class="getModalClass(dialog)" v-bind:style="{ left:dialog.left+'px', top:dialog.top+'px', width:dialog.width+'px' }" >
            <div @mousedown="dragMouseDown(dialog)"  class="titlebar">{{ dialog.title }}</div>
            <button @click="hideModal(dialog)" class="btn_minus" >_</button>
            <button @click="closeDialog(dialog)" class="btn_close" >×</button>
            <component v-bind:dialog="dialog" :is="dialog.name" />
        </div>

    </div>
</template>

<script>
    export default {
        name: "Dialogs",
        data: ()=> {
            return {
                moved_dialog: null,
                dialogs:[]
            }
        },
        mounted() {
            this.$eventBus.$on('openDialog', (data)=>{
               this.openDialog(data.tag, data.params);
            });
            this.$eventBus.$on('restoreDialog', (dialog_name)=>{
                this.dialogs.forEach((dialog)=>{
                    if(dialog.name === dialog_name){
                        dialog.hidden = false;
                    }
                });
            });
        },
        components: {
            'productDialog': () => import(/* webpackChunkName: "productDialog" */'./Dialogs/ProductDialog'),
            'categoryDialog': () => import(/* webpackChunkName: "categoryDialog" */'./Dialogs/CategoryDialog'),
        },
        computed:{
        },
        methods:{
            hideModal(dialog){
                dialog.hidden = true;
                this.$eventBus.$emit('hideDialog', dialog);
            },
            getModalClass(dialog){
                if(dialog.active){
                    return 'selected';
                } else {
                    return '';
                }
            },
            openDialog(tag, params = null){
                let id = (params && params.id) ? params.id : 0;

                let isset = false;
                this.dialogs.forEach((elem) => {
                    if(elem.name === tag + 'Dialog' && elem.id === id){
                        this.selectDialog(elem);
                        isset = true;
                    }
                });
                if(!isset){
                    let dialog = {
                        name:tag + 'Dialog',
                        entity:'empty',
                        title:'Без названия',
                        id:id,
                        active: false,
                        hidden: false,
                        width: 500,
                        left:60,
                        top:200,
                        ol:0,
                        ot:0,
                        params:params,
                    };
                    dialog.left = window.innerWidth / 2 - dialog.width / 2;
                    this.dialogs.push(dialog);
                }
            },
            selectDialog(dialog){
                this.dialogs.forEach((d)=>{
                    d.active = false;
                });
                dialog.active = true;
            },
            dragMouseDown: function (dialog) {
                event.preventDefault();
                this.moved_dialog = dialog;
                this.moved_dialog.ol = window.event.clientX - this.moved_dialog.left;
                this.moved_dialog.ot = window.event.clientY - this.moved_dialog.top;
                this.moved_dialog.left = event.clientX - this.moved_dialog.ol;
                this.moved_dialog.top =  event.clientY - this.moved_dialog.ot;
                document.onmousemove = this.elementDrag;
                document.onmouseup = this.closeDragElement;
            },
            elementDrag: function (event) {
                event.preventDefault();

                let ol = event.clientX - this.moved_dialog.ol;
                let ot = event.clientY - this.moved_dialog.ot;

                let top = 0;
                if(ot >= 52 && ot < window.innerHeight - 39) top = event.clientY - this.moved_dialog.ot;
                if(ot <= 52) top = 52;
                if(ot >= window.innerHeight - 39) top = window.innerHeight - 39;

                let left = 0;
                let rd = (event.clientX > window.innerWidth / 2);

                let folderLeft = event.clientX - this.moved_dialog.ol;
                if(!rd){
                    if(folderLeft < 0){left = 0;} else {left = folderLeft}
                }else{
                    if((folderLeft + this.moved_dialog.width) > window.innerWidth){left = (window.innerWidth -  this.moved_dialog.width);} else {left = folderLeft;}
                }
                this.moved_dialog.top = top;
                this.moved_dialog.left = left;

            },
            closeDragElement () {
                document.onmouseup = null;
                document.onmousemove = null;
                this.moved_dialog = null;
            },
            closeDialog(entry){
                this.$eventBus.$emit('closeDialog', entry);
                this.dialogs.forEach((dialog, index) => {
                    if(entry.id === dialog.id && entry.name === dialog.name){
                        this.dialogs.splice(index, 1);
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
