<template>
    <div id="po_list">
        <div class="list-container">
            <div class="title_cont">
                <div class="header_title">Список номенклатур</div>
                <div class="nds_container"><label class="checkbox-title" for="nds">НДС:</label>
                    <div class="checkbox"><input name="nds" id="nds" type="checkbox"><label for="nds"></label></div>
                    <label for="nds_included" class="checkbox-title">включен в стоимость</label>
                    <div class="checkbox"><input name="nds_included" id="nds_included" type="checkbox"><label
                        for="nds_included"></label></div>
                </div>
            </div>
            <div class="list-header">
                <div v-for="item in data.header" class="header-elem" v-bind:style="getHeaderStyle(item)">
                    <span class="head-title">{{ item.name }}</span>
                </div>
            </div>
            <div class="list-body">
                <div class="body-elem" id="products_2" data-id="2">
                    <div class="list-actions">
                        <button class="button list-remove">✖</button>
                    </div>







                    <input type="hidden" value="101" name="products[2][pivot_id]"><input type="hidden" value="16954"
                                                                                         name="products[2][product_id]">
                    <div class="cell" style="flex: 1 1 0%; min-width: 100px;">
                        <div class="list-title title-text">awdawd</div>
                    </div>
                    <div class="cell" style="width: 100px; min-width: 100px;">
                        <div class="list-title title-text">145</div>
                    </div>
                    <div class="cell" style="width: 65px; min-width: 65px;">
                        <div class="list-title title-counter"><input type="number" min="1" name="products[2][count]">
                        </div>
                    </div>
                    <div class="cell" style="width: 80px; min-width: 80px;">
                        <div class="list-title title-price"><input type="number" min="1" step="0.1"
                                                                   name="products[2][price]"></div>
                    </div>
                    <div class="cell" style="width: 70px; min-width: 70px;">
                        <div class="list-title title-passive"><input type="number" disabled=""
                                                                     name="products[2][nds_percent]"></div>
                    </div>
                    <div class="cell" style="width: 70px; min-width: 70px;">
                        <div class="list-title title-passive"><input type="number" disabled="" name="products[2][nds]">
                        </div>
                    </div>
                    <div class="cell" style="width: 100px; min-width: 100px;">
                        <div class="list-title title-passive"><input type="number" disabled=""
                                                                     name="products[2][total]"></div>
                    </div>
                </div>
            </div>
            <div class="list-bottom">
                <button type="button" name="products" class="button list-add-button">Добавить позицию</button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props:['data'],
        name: "List",
        data: ()=> {
            return {
                items: [],
            }
        },
        methods:{
            getHeaderStyle(item){
                let style = {};
                if(item.type === 'hidden')
                    style.display = 'none';

                if(item.width === 'auto'){
                    style.flex = 1;
                } else {
                    style.width = item.width + 'px';
                }
                if(item.min_with)
                    style.minWidth = item.min_with + 'px';

                return style;
            },
        }
    }
</script>

<style scoped>

</style>
