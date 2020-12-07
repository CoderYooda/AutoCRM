let validateMixin = {
    methods: {
        getValidateMessage(type){
            return this.messages[type] ? this.messages[type][0] : null;
        },
        hasError(type){
            return this.messages[type] ? this.messages[type][0] : null;
        },
    }
};
export default validateMixin;
