require('./variables');                                             // Стартовая инициализация
require('./bootstrap');                                             // Стартовая инициализация
require('../modules/draggable-dialog/dialog');                      // Диалоговые окна
require('./navigation');                                            // Навигация XHR

window.Swal = require('sweetalert2');
window.flatpickr = require('flatpickr');
window.chartjs = require('chart.js');

import { Russian } from "flatpickr/dist/l10n/ru";
window.flatpickr.localize(Russian);

import Pagination from './Classes/Pagination.js';
import AxForm from './Classes/Form.js';
import Helper from './Classes/Helper.js';
import Category from './Classes/Category.js';
import Product from './Classes/Product.js';
import Supplier from './Classes/Supplier.js';
import Partner from './Classes/Partner.js';
import Entity from './Classes/Entity.js';
import Scanner from './Classes/Scanner.js';





import IMask from 'imask';

window.helper = new Helper();
window.pagination = new Pagination();
window.axform = new AxForm();
window.category = new Category();
//window.product = new Product();
window.supplier = new Supplier();
// window.partner = new Partner();
window.entity = new Entity();
window.scanner = new Scanner();

// document.addEventListener('DOMContentLoaded', function()
// {
//
// });
