import EntranceDialog from "./Entrance/EntranceDialog";
import selectProductDialog from "./Product/SelectProductDialog";
import selectPartnerDialog from "./Partner/SelectPartnerDialog";

import cashPage from "./Cash/Cash";

const classes = {
    EntranceDialog,
    selectProductDialog,
    selectPartnerDialog,

    cashPage,
};

class Helper{

    initDialogMethods(){
        window.partner.initDialog();
        window.product.initDialog();
        let dialogs = document.getElementsByClassName('dialog');
        if(dialogs){
            [].forEach.call(dialogs, function(elem){
                if(window[elem.id] === null || !window[elem.id].hasOwnProperty('root_dialog')){
                    var classname = elem.id.replace(/[^a-zA-Z]/g, '');

                    try {
                        window[elem.id] = new classes[classname + 'Dialog'](elem);
                    } catch (err) {
                        console.log(classname + " - Такого конструктора не существует");
                    }

                    //window[elem.id] = new DynamicClass( classname + 'Dialog', elem );
                }
            });
        }
    }

    initPageMethods(className){
        if(className !== 'undefined') {
            console.log('Поиск класса');

            // try {
            //     window[className] = new classes[className + 'Page']();
            // } catch (err) {
            //     console.log(className + " - Такого конструктора не существует");
            // }

            if (window[className] === null || !window[className].hasOwnProperty('root_dialog')) {
                try {
                    window[className] = new classes[className + 'Page']();
                } catch (err) {
                    console.log(className + " - Такого конструктора не существует");
                }
            }
        }
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
}
export default Helper;
