<template>
    <div>
        <div class="modal-header dark" style="justify-content: normal;">
            <div class="modal-alt-header">
                <span class="item-title _500">Розничная цена</span>
                <div class="item-except font-weight-bolder h-1x">
                    <span id="awd">
                       23
                    </span>
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
            <div class="modal-alt-header">
                <span class="item-title _500">На своем складе / на других</span>
                <div class="item-except font-weight-bolder h-1x">
                    <span id="gsaegsegse">
                      1 1
                    </span>
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
            <div class="modal-alt-header">
                <span class="item-title _500">Хранение</span>
                <div class="item-except font-weight-bolder h-1x">
                    <span id="gaw">
                       23
                    </span>
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProductDialog",
        data: ()=> {
            return {
                props: ['dialog'],
            }
        },
        computed: {
            left(){
                return this.$attrs.dialog.left;
            },
            top(){
                return this.$attrs.dialog.top;
            },
            width(){
                return this.$attrs.dialog.width;
            }
        },
        methods:{
        }
    }
</script>
