

require('./variables');                                             // Стартовая инициализация
require('./bootstrap');                                             // Стартовая инициализация
require('../modules/draggable-dialog/dialog');                      // Диалоговые окна
require('./navigation');                                            // Навигация XHR



window.Tabulator = require('tabulator-tables');
window.Swal = require('sweetalert2');
window.flatpickr = require('flatpickr');
window.chartjs = require('chart.js');
window.simplebar = require('simplebar/dist/simplebar.min');


import tippy from 'tippy.js';



window.debug = false;

import Sortable from 'sortablejs';


import { Russian } from "flatpickr/dist/l10n/ru";
window.flatpickr.localize(Russian);
import Pagination from './Classes/Pagination.js';
import AxForm from './Classes/Form.js';
import Helper from './Classes/Helper.js';
import Socket from './Classes/Socket.js';
import Alerts from './Classes/Alerts.js';
import Supplier from './Classes/Supplier.js';
import Entity from './Classes/Entity.js';
import Scanner from './Classes/Scanner.js';
import Auth from './Classes/Auth.js';





import IMask from 'imask';
window.helper = new Helper();
window.socket = new Socket();
window.alerts = new Alerts();
window.pagination = new Pagination();
window.axform = new AxForm();
//window.product = new Product();
window.supplier = new Supplier();
// window.partner = new Partner();
window.entity = new Entity();
window.scanner = new Scanner();
window.auth = new Auth();

window.tippy = tippy;

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
