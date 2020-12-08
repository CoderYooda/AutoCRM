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
        getParentCategory(){
            this.loading = true;
            window.axios({
                method: 'get',
                url: '/categories/' + this.entity.category_id,
            }).then((resp) =>  {
                this.entity.category_id = resp.data.id;
                this.entity.category = resp.data.name;
                this.loading = false;
            });
        },
    }
};
export default categoryMixin;
