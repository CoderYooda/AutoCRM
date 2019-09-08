class Partner{
    init() {
    };

    initDialog(){
        flatpickr(".date_picker", {
            dateFormat: "Y-m-d",
        });
        this.addPhoneMask();
        this.addPassportMask();
        //this.searchInit();
    }

    activateTab(tag){
        var container = document.getElementById('act_form_partner');
        var container_on;

        var links = container.getElementsByClassName('nav-link');

        [].forEach.call(links, function(elem){
            if(elem.classList.contains('main_tab')){
                elem.classList.remove('active');
                elem.classList.add('active');
            } else {
                elem.classList.remove('active');
            }
        });
        var tabs = container.getElementsByClassName('tab-pane');

        [].forEach.call(tabs, function(elem){
            if(elem.classList.contains('main_tab')){
                elem.classList.remove('active');
                elem.classList.add('active');
            } else {
                elem.classList.remove('active');
            }
        });

        var activate;
        var deactivate;



        if(tag === 'fl'){
            document.getElementById('isfl').click();
            activate = document.getElementsByClassName('fl_only');
            deactivate = document.getElementsByClassName('ul_only');
        }else if(tag === 'ul'){
            document.getElementById('isul').click();
            deactivate = document.getElementsByClassName('fl_only');
            activate = document.getElementsByClassName('ul_only');
        }
        [].forEach.call(activate, function(elem){
            elem.classList.remove('d-none-f');
            [].forEach.call(elem.getElementsByClassName('entrance'), function(elem){
                elem.disabled = false;
            });
        });
        [].forEach.call(deactivate, function(elem){
            elem.classList.add('d-none-f');
            [].forEach.call(elem.getElementsByClassName('entrance'), function(elem){
                elem.disabled = true;
            });
        });



        // var inputs = container.getElementsByTagName('input');
        // var textareas = container.getElementsByTagName('textarea');
        //
        // var inputs_on = container_on.getElementsByTagName('input');
        // var textareas_on = container_on.getElementsByTagName('textarea');
        //
        // [].forEach.call(inputs, function(elem){elem.disabled = true;});
        // [].forEach.call(textareas, function(elem){elem.disabled = true;});
        //
        // [].forEach.call(inputs_on, function(elem){elem.disabled = false;});
        // [].forEach.call(textareas_on, function(elem){elem.disabled = false;});
    }


}
export default Partner;
