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
import vehicleDialog from "./Vehicle/VehicleDialog";
import storeImportDialog from "./Store/StoreImportDialog";
import entranceRefundDialog from "./EntranceRefund/EntranceRefundDialog";
import selectEntranceDialog from "./Entrance/SelectEntranceDialog";
import chequeDialog from "./Cheque/ChequeDialog";
import providerCartDialog from "./ProviderCart/ProviderCartDialog";
import documentDialog from "./Document/DocumentDialog";
import selectClientOrderDialog from "./ClientOrder/SelectClientOrderDialog";
import selectWarrantDialog from "./Warrant/SelectWarrantDialog";
import salarySchemaDialog from "./Salary/salarySchemaDialog";
import orderDialog from "./Order/OrderDialog";
import referalPartnerDialog from "./Referal/ReferalDialog";
import priceDialog from './Price/PriceDialog';

import partnerPage from "./Partner/PartnerPage";
import storecatalogsPage from "./Catalogs/StorecatalogsPage";
import storePage from "./Store/StorePage";
import actionsPage from "./Actions/ActionsPage";
import settingsPage from "./Settings/SettingsPage";
import servicesPage from "./Services/ServicesPage";
import reportPage from "./Report/ReportPage";
import employeePage from "./Employee/EmployeePage";
import cashPage from "./Cash/CashPage";
import userPage from "./User/UserPage";
import usereditPage from "./User/UserEditPage";
import userpasswordeditPage from "./User/UserPasswordEdit";
import calendarPage from "./Calendar/CalendarPage";
import schedulePage from "./Schedule/SchedulePage";
import registerPage from "./Auth/RegisterPage";
import loginPage from "./Auth/LoginPage";
import passwordresetPage from "./Auth/ResetPage";
import statisticPage from "./Statistic/StatisticPage";
import statisticshowPage from "./Statistic/StatisticShowPage";
import adminPage from "./Admin/AdminPage";
import companyDialog from "./Admin/Company/CompanyDialog";
import userDialog from "./Admin/User/UserDialog";
import selectCompanyDialog from "./Company/SelectCompanyDialog";
import shopPage from "./Shop/ShopPage";
import providerDialog from "./Providers/providerDialog";

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
    vehicleDialog,
    storeImportDialog,
    entranceRefundDialog,
    selectEntranceDialog,
    chequeDialog,
    providerCartDialog,
    documentDialog,
    selectClientOrderDialog,
    selectWarrantDialog,
    salarySchemaDialog,
    companyDialog,
    userDialog,
    selectCompanyDialog,
    orderDialog,
    referalPartnerDialog,
    priceDialog,
    providerDialog,
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
    usereditPage,
    userpasswordeditPage,
    calendarPage,
    schedulePage,
    actionsPage,
    registerPage,
    loginPage,
    passwordresetPage,
    statisticPage,
    statisticshowPage,
    adminPage,
    shopPage,
    storecatalogsPage,
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

        if(container && !container.classList.contains('.show')){ //!event.target.closest('.dropdown_container')
            block.classList.add('show');
        }
    }

    closeModal(elem, event = null){
        let block = elem;
        let container = block.querySelector('.dropdown_container');
        if(container && !container.classList.contains('.show')){ //!event.target.closest('.dropdown_container')
            block.classList.add('show');
        }
    }

    pluck(objs, name) {
        let sol = [];
        for(var i in objs){
            if(objs[i].hasOwnProperty(name)){
                sol.push(objs[i][name]);
            }
        }
        return sol;
    }

    initDialogMethods(resp = null){

        let dialogs = document.getElementsByClassName('dialog');

        dialogs.forEach(elem => {

            if(window[elem.id] === null || !window[elem.id].hasOwnProperty('root_dialog')) {

                let classname = elem.id.replace(/[^a-zA-Z]/g, '');

                try {
                    window[elem.id] = new classes[classname](elem, resp ? resp.data : resp);
                } catch (err) {
                    window.helper.log(classname + " - Такого конструктора не существует");
                    console.log(err);
                }
            }
        });

        window.applySelects();
    }

    decodeHtml(html) {
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    initPageMethods(infoClass = null, resp = null){

        let classNameStr = window.location.pathname.substring(1);
        classNameStr = classNameStr.split('/');

        let className = '';
        if(Array.isArray(classNameStr)){
            classNameStr.forEach(function(item, i, arr) {
                if(i < 2){
                    className = className + item;
                    console.log(className);
                }
            });
        } else {
            className = classNameStr;
        }
        if(className !== 'undefined') {
            if(!window[className]) {
                //Теперь ошибки будет показывать, проще ориентироваться
                // try {
                    window[className] = new pages[className + 'Page'](resp);
                // } catch (err) {
                //     window.helper.log(className + " - Такого конструктора не существует: " + err.name + "(" + err.message + ")");
                // }
            } else {
                // Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
                try {

                    window[className].linked(resp);
                } catch (err) {
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

    array_count(array) {
        let amount = 0;

        for(let i = 0; i < array.length; i++) {
            amount += array[i];
        }

        return amount;
    }

    removeItemFromArrayByValue(array, value) {
        let index = array.indexOf(value);

        return array.splice(index, 1);
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

    initTabs(id){
        let myTabs = document.getElementById(id);

        let myTabsCollection = myTabs.getElementsByTagName('a');

        let tabs = [];

        for (var i = 0; i < myTabsCollection.length; i++) {

            tabs.push(new bootstrap.Tab(myTabsCollection[i], {}));

            myTabsCollection[i].addEventListener('show.bs.tab', function(event) {

                let element_id = event.target.getAttribute('aria-controls');

                let element = document.getElementById(element_id);

                let input = null;
                if(element){
                    input = element.querySelector('.form-group:not(.d-none) input[type="text"]');
                }
                if(input) input.focus();

            }, false);
        }
        return tabs;
    }

    printCheque(id, data = null) {

        let params = new URLSearchParams({
            id: id,
            data: JSON.stringify(data)
        });

        let url = '/documents/cheque?' + params.toString();

        window.open(url);
    }

    printDocument(doc, id, data = null, landscape = false){
        axios({
            method: 'POST',
            url: '/document',
            data: {
                doc: doc,
                id: id,
                data: data
            }
        }).then(response => {

            let document = response.data.document;

            this.openDocument(document.id);
        });
    }

    openDocument(id) {
        window.open('/documents/' + id, '_blank');
    }

    insertParamUrl(key, value)
    {
        if(value == null){ value = ''}
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

    objectSum(object) {

        let count = 0;

        Object.values(object).forEach(value => {
            count += parseFloat(value);
        });

        return count;
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

    restoreProduct(element, product_id) {

        axios.post('/products/' + product_id + '/restore')
            .then(response => {
                element.remove();
            })
            .catch(response => {
                dd(response);
            });
    }

    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] == value);
    }

    numberFormat (n) {
        return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ");
    };

    notifySound() {
        let audio = new Audio('sounds/system_message.mp3');
        audio.play();
    }
}
export default Helper;
