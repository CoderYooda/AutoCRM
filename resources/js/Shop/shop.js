import AxForm from "./Classes/AxForm";
import Helper from "./Classes/Helper";
import Tippy from 'tippy.js';
import Feedback from "./Classes/Feedback/Feedback";
import Cart from "./Classes/Cart/Cart";
import Favorite from "./Classes/Favorite/Favorite";
import Product from "./Classes/Product/Product";
import Auth from "./Classes/Auth";
import User from "./Classes/User/User";
import Vehicle from "./Classes/Vehicle/Vehicle";

window.$ = window.jQuery = require('jquery');

window.select2 = require('select2');

window.feedback = new Feedback();
window.axform = new AxForm();
window.helper = new Helper();
window.cart = new Cart();
window.favorite = new Favorite();
window.product = new Product();
window.auth = new Auth();
window.user = new User();
window.vehicle = new Vehicle();
window.tippy = Tippy;
window.axios = require('axios');
window.notification = require('notification-js/src/notification.js');
window.simplebar = require('simplebar/dist/simplebar.min');

require('./functions');
require('./bootstrap');
