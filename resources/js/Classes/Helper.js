import entranceDialog from "./Entrance/EntranceDialog";
import selectProductDialog from "./Product/SelectProductDialog";
import productDialog from "./Product/ProductDialog";
import selectPartnerDialog from "./Partner/SelectPartnerDialog";
import selectCashboxDialog from "./Cashbox/SelectCashboxDialog";
import selectDdsarticleDialog from "./Ddsarticle/SelectDdsarticleDialog";
import selectCategoryDialog from "./Category/SelectCategoryDialog";
import partnerDialog from "./Partner/PartnerDialog";
import cashboxDialog from "./Cashbox/CashboxDialog";
import ddsarticleDialog from "./Ddsarticle/DdsarticleDialog";
import warrantDialog from "./Warrant/WarrantDialog";
import moneymoveDialog from "./MoneyMove/MoneymoveDialog";
import barcodeDialog from "./Barcode/BarcodeDialog";
import shipmentDialog from "./Shipment/ShipmentDialog";
import categoryDialog from "./Category/CategoryDialog";
import clientorderDialog from "./ClientOrder/ClientOrderDialog";
import refundDialog from "./Refund/RefundDialog";
import storeDialog from "./Store/StoreDialog";
import adjustmentDialog from "./Adjustment/AdjustmentDialog";
import providerorderDialog from "./ProviderOrder/ProviderOrderDialog";
import selectProviderOrderDialog from "./ProviderOrder/SelectProviderOrderDialog";
import selectShipmentDialog from "./Shipment/SelectShipmentDialog";
import selectTransactionDialog from "./Transaction/SelectTransactionDialog";
import scheduleTemplateDialog from "./Schedule/ScheduleTemplateDialog";
import selectSupplierDialog from "./Supplier/SelectSupplierDialog";
import supplierDialog from "./Supplier/SupplierDialog";
import roleDialog from "./Role/RoleDialog";

import partnerPage from "./Partner/PartnerPage";
import storePage from "./Store/StorePage";
import actionsPage from "./Actions/ActionsPage";
import settingsPage from "./Settings/SettingsPage";
import servicesPage from "./Services/ServicesPage";
import reportPage from "./Report/ReportPage";
import employeePage from "./Employee/EmployeePage";
import cashPage from "./Cash/CashPage";
import userPage from "./User/UserPage";
import calendarPage from "./Calendar/CalendarPage";
import schedulePage from "./Schedule/SchedulePage";
import registerPage from "./Auth/RegisterPage";
import loginPage from "./Auth/LoginPage";


const classes = {
    entranceDialog,
    selectProductDialog,
    productDialog,
    selectPartnerDialog,
    selectCashboxDialog,
    selectDdsarticleDialog,
    selectCategoryDialog,
    partnerDialog,
    cashboxDialog,
    ddsarticleDialog,
    warrantDialog,
    storeDialog,
    moneymoveDialog,
    shipmentDialog,
    clientorderDialog,
    refundDialog,
    adjustmentDialog,
    providerorderDialog,
    selectProviderOrderDialog,
    selectShipmentDialog,
    selectTransactionDialog,
    scheduleTemplateDialog,
    roleDialog,
    barcodeDialog,
    categoryDialog,
    selectSupplierDialog,
    supplierDialog,
};

const pages = {
    cashPage,
    partnerPage,
    storePage,
    settingsPage,
    servicesPage,
    reportPage,
    employeePage,
    userPage,
    calendarPage,
    schedulePage,
    actionsPage,
    registerPage,
    loginPage,
};

class Helper{

    openModal(elem, event){
        let block = elem;
        //console.log(block.querySelector('.dropdown_container'));
        let container = block.querySelector('.dropdown_container');
        // var className = " " + selector + " ";
        // if ( (" " + container.className + " ").replace(/[\n\t]/g, " ").indexOf(" show ") > -1 ){
        //
        // }

        if(container
            // && div !== (e.target)
            // && !div.contains(e.target)
             && !event.target.closest('.dropdown_container')
        ){
            block.classList.toggle('show');
        }
    }

    pluck(objs, name) {
        var sol = [];
        for(var i in objs){
            if(objs[i].hasOwnProperty(name)){
                sol.push(objs[i][name]);
            }
        }
        return sol;
    }

    initDialogMethods(){
        let dialogs = document.getElementsByClassName('dialog');
        if(dialogs){
            [].forEach.call(dialogs, function(elem){
                if(window[elem.id] === null || !window[elem.id].hasOwnProperty('root_dialog')){

                    var classname = elem.id.replace(/[^a-zA-Z]/g, '');
                    try {
                        window[elem.id] = new classes[classname](elem);
                    } catch (err) {
                        window.helper.log(classname + " - Такого конструктора не существует");
                    }
                    //window[elem.id] = new DynamicClass( classname + 'Dialog', elem );
                }
            });
        }
    }

    initPageMethods(){
        let className = window.location.pathname.substring(1);
        //console.log(window[className]);
        if(className !== 'undefined') {
            if(!window[className]) {
                try {
                    window[className] = new pages[className + 'Page']();
                } catch (err) {
                    window.helper.log(className + " - Такого конструктора не существует");
                }
            } else {
                // console.log('Класс ' + className + ' Linked()')
                // Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
                try {window[className].linked();} catch (err) {
                    console.warn(err);
                }
            }
        } else {
            window.helper.log('Ошибка в ' + className);
        }
    }

    log(mess){
        console.log(mess);
        setTimeout(function(){
            //console.clear();
        }, 4000);
    }

    debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    ucFirst(string){
        return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
    }

    findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }


    createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }

    insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    removeElementsByClass(className){
        var elements = document.getElementsByClassName(className);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    removeClassesByClass(className){
        var elements = document.getElementsByClassName(className);
        while(elements.length > 0){
            elements[0].classList.remove(className);
        }
    }

    printDocument(doc, id){

        //let form =
        //console.log(data);
        axios({
            method: 'GET',
            url: '/document?doc=' + doc + '&id=' + id,
        }).then(function (response) {
            var printContents = response.data;

            let unprinted = document.getElementById('unprinted');
            let printed = document.getElementById('printed');
            //unprinted.classList.add('hide');

            printed.innerHTML = printContents;
            window.print();

            unprinted.classList.remove('hide');
            printed.innerHTML = '';
        }).then(function (error) {

        });


    }

    insertParam(elem, key, value)
    {
        key = encodeURI(key); value = encodeURI(value);

        var kvp = elem.getAttribute("href").split('&');

        var i=kvp.length; var x; while(i--)
        {
            x = kvp[i].split('=');
            if (x[0]==key)
            {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }
        if(i<0) {kvp[kvp.length] = [key,value].join('=');}
        elem.setAttribute("href", kvp.join('&'));
    }
    insertParamUrl(key, value)
    {
        key = encodeURI(key); value = encodeURI(value);

        var kvp = document.location.search.substr(1).split('&');

        var i=kvp.length; var x; while(i--)
        {
            x = kvp[i].split('=');

            if (x[0]==key)
            {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }
        if(i<0) {kvp[kvp.length] = [key,value].join('=');}

        oPageInfo.title = 'search';
        oPageInfo.url = this.getBaseUrl() + '?' + kvp.join('&');
        history.replaceState(oPageInfo, oPageInfo.title, oPageInfo.url);
        history.pushState(oPageInfo, oPageInfo.title, oPageInfo.url);
    }

    getBaseUrl(){
        return location.protocol + '//' + location.host + location.pathname
    }

    debugBar(object){
        let prev = document.getElementById('debug_bar');
        if(prev){prev.remove();}
        var elem = document.createElement('div');
        elem.id = 'debug_bar';
        elem.style.cssText = 'position: absolute;white-space:nowrap;width: min-content;height: min-content;opacity: 0.7;font-size: 10px;padding: 10px;z-index: 100000;bottom: 0;right: 0;background: rgb(0, 0, 0);';
        elem.innerHTML = ''+
            '<div>ID - ' + object.root_id + '</div>'+
            '<div>Активно? - ' + object.active + '</div>'+
            '<div>Табуляция - ' + object.active_tab + '</div>';
        //document.body.appendChild(elem);
    }

    copy(str){
        let tmp   = document.createElement('INPUT'), // Создаём новый текстовой input
            focus = document.activeElement; // Получаем ссылку на элемент в фокусе (чтобы не терять фокус)

        tmp.value = str; // Временному input вставляем текст для копирования

        document.body.appendChild(tmp); // Вставляем input в DOM
        tmp.select(); // Выделяем весь текст в input
        document.execCommand('copy'); // Магия! Копирует в буфер выделенный текст (см. команду выше)
        document.body.removeChild(tmp); // Удаляем временный input
        focus.focus(); // Возвращаем фокус туда, где был
        window.notification.notify( 'success', 'Скопировано в буфер');
    }

    objectifyForm(formArray) {
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }

    serialize(form) {
        var serialized = [];
        for (var i = 0; i < form.elements.length; i++) {
            var field = form.elements[i];
            if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
            if (field.type === 'select-multiple') {
                for (var n = 0; n < field.options.length; n++) {
                    if (!field.options[n].selected) continue;
                    serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
                }
            }
            else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
                serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
            }
        }
        return serialized.join('&');
    };

    // checkAuth(){
    //     axios({
    //         method: 'GET',
    //         url: 'check-auth'
    //     }).then(function (resp) {
    //
    //         console.log(resp);
    //         if(resp.data.auth == 'false'){
    //             window.isLogged = false;
    //             return false;
    //         } else {
    //             window.isLogged = true;
    //             return true;
    //         }
    //     });
    //
    // }

}
export default Helper;
