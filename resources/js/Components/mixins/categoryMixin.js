let categoryMixin = {
    methods: {
        setCategory(category){
            this.entity.category_id = category.id;
            this.entity.category = category.name;
            this.$notify({
                group: 'main',
                type: 'success',
                text: 'Категория выбрана'
            });
        },
        selectCategory(){
            this.$eventBus.$emit('openDialog', {
                tag: 'selectCategory',
                params: {root_category:this.root_category, ref: this}
            });
        },
    }
};
export default categoryMixin;
