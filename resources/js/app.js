require('./variables');                                             // Стартовая инициализация
require('./bootstrap');                                             // Стартовая инициализация
require('../modules/draggable-dialog/dialog');                      // Диалоговые окна
require('./navigation');                                            // Навигация XHR


import Pagination from './Classes/Pagination.js';
import AxForm from './Classes/Form.js';
window.pagination = new Pagination();
window.axform = new AxForm();
