<template>
    <div class="dialog_container">

        <div :ref="dialog.name + dialog.id" v-for="dialog in dialogs" v-bind:key="dialog.name + dialog.id" class="dialog" v-bind:style="{ left:dialog.left+'px', top:dialog.top+'px', width:dialog.width+'px' }" >
            <div @mousedown="dragMouseDown(dialog)"  class="titlebar">Добавление продукта</div>
            <button class="btn_minus" >_</button>
            <button class="btn_close" >×</button>
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
                dialogs:[
                    {
                        name:'productDialog',
                        entity:'empty',
                        id:1,
                        state: 'none',
                        width: 500,
                        left:0,
                        top:0,
                    }
                ]
            }
        },
        mounted() {
            this.$eventBus.$on('openDialog', (data)=>{
               this.openDialog(data.tag, data.params);
            });
        },
        components: {
            'productDialog': () => import('./Dialogs/ProductDialog'),
            'categoryDialog': () => import('./Dialogs/CategoryDialog')
        },
        methods:{
            openDialog(tag, params = null){
                if(params && params.id){

                }
                let dialog = {
                    name:'productDialog',
                    entity:tag,
                    id:2,
                    state: 'none',
                    left:0,
                    top:0,
                };
                this.dialogs.push(dialog);
            },
            dragDialog(dialog){
                console.log(window.event, dialog);
                //this.$parent.dragMouseDown(event, this.$attrs.dialog);
            },
            dragMouseDown: function (dialog) {
                event.preventDefault();
                this.moved_dialog = dialog;
                this.moved_dialog.left = window.event.clientX - window.event.offsetX;
                this.moved_dialog.top = window.event.clientY - window.event.offsetY;
                document.onmousemove = this.elementDrag;
                document.onmouseup = this.closeDragElement;
            },
            elementDrag: function (event) {
                event.preventDefault();
                let ref = this.$refs[this.moved_dialog.name + this.moved_dialog.id];

                let movX = this.moved_dialog.left - event.clientX;
                let movY = this.moved_dialog.top - event.clientY;

                this.moved_dialog.left = this.moved_dialog.left - movX;
                this.moved_dialog.top = this.moved_dialog.top - movY;

                // this.moved_dialog.left = event.clientX + event.offsetX;
                // this.moved_dialog.top = event.clientY + event.offsetY;
                // this.moved_dialog.left = event.clientX - event.offsetX;
                // this.moved_dialog.top = event.clientY - event.offsetY;
                //this.moved_dialog.top = ref[0].offsetTop - (event.clientY - event.offsetY);


                //
                //
                // this.positions.movementX = this.positions.clientX - event.clientX;
                // this.positions.movementY = this.positions.clientY - event.clientY;
                // this.positions.clientX = event.clientX;
                // this.positions.clientY = event.clientY;
                // // set the element's new position:;
                // this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px';
                // this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px';



            },
            closeDragElement () {
                document.onmouseup = null;
                document.onmousemove = null;
                this.moved_dialog = null;
            }
        }
    }
</script>

<style scoped>

</style>
