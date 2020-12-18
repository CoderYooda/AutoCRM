let partnerMixin = {
    computed:{
        partner_name(){
            return this.entity.partner.type === 2 ? this.entity.partner.companyName : this.entity.partner.fio;
        }
    },
    methods: {
        setCategory(category){
            this.entity.category.id = category.id;
            this.entity.category.name = category.name;
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
                url: '/categories/' + this.entity.category.id,
            }).then((resp) =>  {
                this.entity.category.id = resp.data.id;
                this.entity.category.name = resp.data.name;
                this.loading = false;
            });
        },
    }
};
export default partnerMixin;
