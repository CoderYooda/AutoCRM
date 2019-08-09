require('./variables');                                             // Стартовая инициализация
require('./bootstrap');                                             // Стартовая инициализация
require('../modules/draggable-dialog/dialog');                      // Диалоговые окна
require('./navigation');                                            // Навигация XHR


import Pagination from './Classes/Pagination.js';
import AxForm from './Classes/Form.js';
import Helper from './Classes/Helper.js';
import Category from './Classes/Category.js';

window.helper = new Helper();
window.pagination = new Pagination();
window.axform = new AxForm();
window.category = new Category();

var myEfficientFn = helper.debounce(function() {
    console.log(1);
}, 250);
window.addEventListener('resize', myEfficientFn);
