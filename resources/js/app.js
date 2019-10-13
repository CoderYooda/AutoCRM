require('./variables');                                             // Стартовая инициализация
require('./bootstrap');                                             // Стартовая инициализация
require('../modules/draggable-dialog/dialog');                      // Диалоговые окна
require('./navigation');                                            // Навигация XHR




window.Swal = require('sweetalert2');
window.flatpickr = require('flatpickr');
window.chartjs = require('chart.js');
window.simplebar = require('simplebar/dist/simplebar.min');

window.debug = true;

import Sortable from 'sortablejs';


import { Russian } from "flatpickr/dist/l10n/ru";
window.flatpickr.localize(Russian);

import Pagination from './Classes/Pagination.js';
import AxForm from './Classes/Form.js';
import Helper from './Classes/Helper.js';
import Category from './Classes/Category.js';
import Socket from './Classes/Socket.js';
import Supplier from './Classes/Supplier.js';
import Entity from './Classes/Entity.js';
import Scanner from './Classes/Scanner.js';
import Auth from './Classes/Auth.js';






import IMask from 'imask';

window.helper = new Helper();
window.socket = new Socket();
window.pagination = new Pagination();
window.axform = new AxForm();
window.category = new Category();
//window.product = new Product();
window.supplier = new Supplier();
// window.partner = new Partner();
window.entity = new Entity();
window.scanner = new Scanner();
window.auth = new Auth();
