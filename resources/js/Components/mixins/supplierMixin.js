let supplierMixin = {
    methods: {
        setSupplier(supplier){
            this.entity.supplier_id = supplier.id;
            this.entity.supplier = supplier.name;
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
