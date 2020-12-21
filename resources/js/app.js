window.bootstrap = require("bootstrap.native");                     // Обращение к методам Bootstrap без jQuery
require('./variables');                                             // Стартовая инициализация
require('./bootstrap');                                             // Стартовая инициализация
require('../modules/draggable-dialog/dialog');                      // Диалоговые окна
require('./navigation');                                            // Навигация XHR
require('./select');                                            // Селекты
require('./vue');

import "sceditor/src/sceditor";

window.Tabulator = require('tabulator-tables');
window.Swal = require('sweetalert2');
window.flatpickr = require('flatpickr');

window.choices = require('choices.js');
window.chartjs = require('chart.js');

window.simplebar = require('simplebar/dist/simplebar.min');
//window.selection = require('@simonwep/selection-js');
import tippy from 'tippy.js';

window.debug = false;

import Sortable from 'sortablejs';
import IMask from 'imask';

import { Russian } from "flatpickr/dist/l10n/ru";
window.flatpickr.localize(Russian);
import Pagination from './Classes/Pagination.js';
import AxForm from './Classes/Form.js';
import Helper from './Classes/Helper.js';
import Socket from './Classes/Socket.js';
import System from './Classes/System.js';
import Alerts from './Classes/Alerts.js';
import SystemMessages from './Classes/SystemMessages.js';
import Supplier from './Classes/Supplier.js';
import Entity from './Classes/Entity.js';
import Scanner from './Classes/Scanner.js';
import Auth from './Classes/Auth.js';
import SettingMaster from './Classes/SettingMaster.js';

window.clipboardJS = require('clipboard');
window.helper = new Helper();
window.socket = new Socket();
window.system = new System();
window.alerts = new Alerts();
window.systemMessages = new SystemMessages();
window.pagination = new Pagination();
window.axform = new AxForm();
window.supplier = new Supplier();
window.entity = new Entity();
window.scanner = new Scanner();
window.auth = new Auth();
window.tippy = tippy;
window.setting_master = new SettingMaster();

//window.modal = new Modal();

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


window.dd = console.log.bind(document);
window.applySelects();
