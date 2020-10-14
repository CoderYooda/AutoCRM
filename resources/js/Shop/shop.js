import AxForm from "./Classes/AxForm";
import Helper from "./Classes/Helper";
import Tippy from 'tippy.js';
import Feedback from "./Classes/Feedback/Feedback";
import Cart from "./Classes/Cart/Cart";
import Favorite from "./Classes/Favorite/Favorite";
import Product from "./Classes/Product/Product";

window.feedback = new Feedback();
window.axform = new AxForm();
window.helper = new Helper();
window.cart = new Cart();
window.favorite = new Favorite();
window.product = new Product();
window.tippy = Tippy;
window.axios = require('axios');
window.notification = require('notification-js/src/notification.js');

require('./bootstrap');
require('./functions')
