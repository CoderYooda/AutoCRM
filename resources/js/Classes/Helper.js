import entranceDialog from "./Entrance/EntranceDialog";
import selectProductDialog from "./Product/SelectProductDialog";
import productDialog from "./Product/ProductDialog";
import selectPartnerDialog from "./Partner/SelectPartnerDialog";
import selectCashboxDialog from "./Cashbox/SelectCashboxDialog";
import selectDdsarticleDialog from "./Ddsarticle/SelectDdsarticleDialog";
import partnerDialog from "./Partner/PartnerDialog";
import cashboxDialog from "./Cashbox/CashboxDialog";
import ddsarticleDialog from "./Ddsarticle/DdsarticleDialog";
import warrantDialog from "./Warrant/WarrantDialog";
import moneymoveDialog from "./MoneyMove/MoneymoveDialog";
import barcodeDialog from "./Barcode/BarcodeDialog";
import shipmentDialog from "./Shipment/ShipmentDialog";
import partnerPage from "./Partner/PartnerPage";
import storePage from "./Store/StorePage";
import settingsPage from "./Settings/SettingsPage";
import servicesPage from "./Services/ServicesPage";
import reportPage from "./Report/ReportPage";
import employeePage from "./Employee/EmployeePage";
import cashPage from "./Cash/CashPage";


const classes = {
    entranceDialog,
    selectProductDialog,
    productDialog,
    selectPartnerDialog,
    selectCashboxDialog,
    selectDdsarticleDialog,
    partnerDialog,
    cashboxDialog,
    ddsarticleDialog,
    warrantDialog,
    moneymoveDialog,
    shipmentDialog,
    barcodeDialog
};

const pages = {
    cashPage,
    partnerPage,
    storePage,
    settingsPage,
    servicesPage,
    reportPage,
    employeePage
};

class Helper{

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
        if(className !== 'undefined') {
            if(!window[className]) {
                try {
                    window[className] = new pages[className + 'Page']();
                } catch (err) {
                    window.helper.log(className + " - Такого конструктора не существует");
                }
            } else {
                console.log('Класс ' + className + ' Linked()')
                // Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
                try {window[className].linked();} catch (err) {}
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
            '<div>Табуляция - ' + object.active_tab + '</div>'+
        document.body.appendChild(elem);
    }
}
export default Helper;
