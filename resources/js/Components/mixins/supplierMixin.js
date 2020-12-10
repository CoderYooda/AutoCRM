let supplierMixin = {
    methods: {
        setSupplier(supplier){
            this.entity.supplier.id = supplier.id;
            this.entity.supplier.name = supplier.name;
            this.$notify({
                group: 'main',
                type: 'success',
                text: 'Производитель выбран'
            });
        },
        selectSupplier(){
            this.$eventBus.$emit('openDialog', {
                tag: 'selectSupplier',
                params: {ref: this}
            });
        },
    }
};
export default supplierMixin;
