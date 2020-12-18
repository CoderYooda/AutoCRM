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
                <div class="header-elem" style="flex: 1 1 0%; min-width: 100px;"><span
                    class="head-title">Наименование</span></div>
                <div class="header-elem" style="width: 100px; min-width: 100px;"><span class="head-title">Артикул</span>
                </div>
                <div class="header-elem" style="width: 65px; min-width: 65px;"><span class="head-title">Кол-во</span>
                </div>
                <div class="header-elem" style="width: 80px; min-width: 80px;"><span class="head-title">Цена</span>
                </div>
                <div class="header-elem" style="width: 70px; min-width: 70px;"><span class="head-title">НДС, %</span>
                </div>
                <div class="header-elem" style="width: 70px; min-width: 70px;"><span class="head-title">НДС</span></div>
                <div class="header-elem" style="width: 100px; min-width: 100px;"><span class="head-title">Итого</span>
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
        props:['list_data'],
        name: "List",
        data: ()=> {
            return {
                items: [],
            }
        },
    }
</script>

<style scoped>

</style>
