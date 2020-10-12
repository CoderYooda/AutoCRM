import AxForm from "./Classes/AxForm";
import Helper from "./Classes/Helper";
import Tippy from 'tippy.js';
import Feedback from "./Classes/Feedback/Feedback";

window.feedback = new Feedback();
window.axform = new AxForm();
window.helper = new Helper();
window.tippy = Tippy;
window.axios = require('axios');
window.notification = require('notification-js/src/notification.js');

require('./bootstrap');
