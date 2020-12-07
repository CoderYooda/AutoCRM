(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["EntranceRefund"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/EntranceRefund.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Store/EntranceRefund.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _service_Table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../service/Table */ "./resources/js/components/service/Table.vue");
/* harmony import */ var _template_FilterBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../template/FilterBox */ "./resources/js/components/template/FilterBox.vue");
/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../debounce */ "./resources/js/debounce.js");
/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_debounce__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "EntranceRefund",
  components: {
    Table: _service_Table__WEBPACK_IMPORTED_MODULE_0__["default"],
    FilterBox: _template_FilterBox__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      table_data: {},
      search: '',
      table_loading: false,
      filter_data: false
    };
  },
  computed: {
    loading: function loading() {
      return this.table_loading;
    }
  },
  beforeMount: function beforeMount() {
    this.table_data.header = [{
      min_width: 90,
      width: 90,
      name: 'ID',
      table_name: 'id'
    }, {
      min_width: 150,
      width: 150,
      name: 'Заявка',
      table_name: 'ordid'
    }, {
      min_width: 130,
      width: 'auto',
      name: 'Поставщик',
      table_name: 'partner'
    }, {
      min_width: 150,
      width: 'auto',
      name: 'Принимающий',
      table_name: 'manager'
    }, {
      min_width: 150,
      width: 200,
      name: 'Комментарий',
      table_name: 'comment',
      transform: 'transform_comment'
    }, {
      min_width: 150,
      width: 150,
      name: 'Дата',
      table_name: 'created_at'
    }];
    this.table_data.context_menu = [{
      name: 'Редактировать',
      action: function action(data) {
        openDialog('entranceDialog', '&entrance_id=' + data.contexted.id);
      }
    }, {
      name: 'Открыть',
      action: function action(data) {
        openDialog('entranceDialog', '&entrance_id=' + data.contexted.id);
      }
    }, {
      name: 'Открыть заявку',
      action: function action(data) {
        openDialog('clientorderDialog', '&client_order_id=' + data.contexted.ordid);
      }
    }];

    this.table_data.dbl_click = function (id) {
      openDialog('entranceDialog', '&entrance_id=' + id);
    };

    this.table_data.url = '/entrance_refund/base/table_data';
    this.filter_data = {
      dates: {
        start: null,
        end: null
      }
    };
  },
  directives: {
    debounce: _debounce__WEBPACK_IMPORTED_MODULE_2___default.a
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/EntranceRefund.vue?vue&type=template&id=01e983f0&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Store/EntranceRefund.vue?vue&type=template&id=01e983f0&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "bottom-container" }, [
    _c("div", { staticClass: "box-lister" }, [
      _c(
        "div",
        { staticClass: "d-flex" },
        [
          _c("Table", {
            attrs: {
              table_data: _vm.table_data,
              filter_data: _vm.filter_data,
              search: _vm.search
            }
          }),
          _vm._v(" "),
          _c(
            "div",
            [
              _c(
                "button",
                {
                  staticClass: "button primary ml-15 mb-15 w-290",
                  attrs: { type: "button" },
                  on: {
                    click: function($event) {
                      return _vm.newDialog("product")
                    }
                  }
                },
                [_vm._v("Создать возврат поступления")]
              ),
              _vm._v(" "),
              _c("FilterBox", { attrs: { filter_data: _vm.filter_data } })
            ],
            1
          )
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/views/Store/EntranceRefund.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/views/Store/EntranceRefund.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EntranceRefund_vue_vue_type_template_id_01e983f0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntranceRefund.vue?vue&type=template&id=01e983f0&scoped=true& */ "./resources/js/components/views/Store/EntranceRefund.vue?vue&type=template&id=01e983f0&scoped=true&");
/* harmony import */ var _EntranceRefund_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EntranceRefund.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Store/EntranceRefund.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EntranceRefund_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EntranceRefund_vue_vue_type_template_id_01e983f0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EntranceRefund_vue_vue_type_template_id_01e983f0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "01e983f0",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Store/EntranceRefund.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Store/EntranceRefund.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/views/Store/EntranceRefund.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EntranceRefund_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EntranceRefund.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/EntranceRefund.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EntranceRefund_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Store/EntranceRefund.vue?vue&type=template&id=01e983f0&scoped=true&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/views/Store/EntranceRefund.vue?vue&type=template&id=01e983f0&scoped=true& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EntranceRefund_vue_vue_type_template_id_01e983f0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EntranceRefund.vue?vue&type=template&id=01e983f0&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/EntranceRefund.vue?vue&type=template&id=01e983f0&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EntranceRefund_vue_vue_type_template_id_01e983f0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EntranceRefund_vue_vue_type_template_id_01e983f0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvRW50cmFuY2VSZWZ1bmQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0VudHJhbmNlUmVmdW5kLnZ1ZT82MmVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0VudHJhbmNlUmVmdW5kLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9FbnRyYW5jZVJlZnVuZC52dWU/NDAyMyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9FbnRyYW5jZVJlZnVuZC52dWU/ZjZhMiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBREE7QUFFQTtBQUNBLGlFQURBO0FBQ0E7QUFEQSxHQUZBO0FBS0E7QUFDQTtBQUNBLG9CQURBO0FBRUEsZ0JBRkE7QUFHQSwwQkFIQTtBQUlBO0FBSkE7QUFNQSxHQVpBO0FBYUE7QUFDQSxXQURBLHFCQUNBO0FBQ0E7QUFDQTtBQUhBLEdBYkE7QUFrQkEsYUFsQkEseUJBa0JBO0FBQ0EsOEJBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBREEsRUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FGQSxFQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUhBLEVBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBSkEsRUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUxBLEVBTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBTkE7QUFRQSxvQ0FDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FEQSxFQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUZBLEVBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBSEE7O0FBT0E7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQURBO0FBRUE7QUFGQTtBQURBO0FBTUEsR0ExQ0E7QUEyQ0E7QUFBQTtBQUFBO0FBM0NBLEc7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQ0FBa0M7QUFDdEQsZUFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBLFNBQVMsd0JBQXdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsaUJBQWlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFNBQVMsK0JBQStCLEVBQUU7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM5Q0E7QUFBQTtBQUFBO0FBQUE7QUFBeUc7QUFDdkM7QUFDTDs7O0FBRzdEO0FBQ21HO0FBQ25HLGdCQUFnQiwyR0FBVTtBQUMxQixFQUFFLG9GQUFNO0FBQ1IsRUFBRSxxR0FBTTtBQUNSLEVBQUUsOEdBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFJLEtBQVUsRUFBRSxZQWlCZjtBQUNEO0FBQ2UsZ0Y7Ozs7Ozs7Ozs7OztBQ3RDZjtBQUFBO0FBQUEsd0NBQTBNLENBQWdCLDBQQUFHLEVBQUMsQzs7Ozs7Ozs7Ozs7O0FDQTlOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJFbnRyYW5jZVJlZnVuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICAgIDxkaXYgY2xhc3M9XCJib3R0b20tY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJveC1saXN0ZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleFwiPlxyXG4gICAgICAgICAgICAgICAgPFRhYmxlIHYtYmluZDp0YWJsZV9kYXRhPVwidGFibGVfZGF0YVwiIHYtYmluZDpmaWx0ZXJfZGF0YT1cImZpbHRlcl9kYXRhXCIgdi1iaW5kOnNlYXJjaD1cInNlYXJjaFwiIC8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHByaW1hcnkgbWwtMTUgbWItMTUgdy0yOTBcIiB2LW9uOmNsaWNrPVwibmV3RGlhbG9nKCdwcm9kdWN0JylcIj7QodC+0LfQtNCw0YLRjCDQstC+0LfQstGA0LDRgiDQv9C+0YHRgtGD0L/Qu9C10L3QuNGPPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZpbHRlckJveCB2LWJpbmQ6ZmlsdGVyX2RhdGE9XCJmaWx0ZXJfZGF0YVwiLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICAgIGltcG9ydCBUYWJsZSBmcm9tIFwiLi4vLi4vc2VydmljZS9UYWJsZVwiO1xyXG4gICAgaW1wb3J0IEZpbHRlckJveCBmcm9tIFwiLi4vLi4vdGVtcGxhdGUvRmlsdGVyQm94XCI7XHJcbiAgICBpbXBvcnQgZGVib3VuY2UgZnJvbSAnLi8uLi8uLi8uLi9kZWJvdW5jZSc7XHJcbiAgICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAgICAgbmFtZTogXCJFbnRyYW5jZVJlZnVuZFwiLFxyXG4gICAgICAgIGNvbXBvbmVudHM6e1xyXG4gICAgICAgICAgICBUYWJsZSwgRmlsdGVyQm94XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRhOiAoKT0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRhYmxlX2RhdGE6e30sXHJcbiAgICAgICAgICAgICAgICBzZWFyY2g6ICcnLFxyXG4gICAgICAgICAgICAgICAgdGFibGVfbG9hZGluZzpmYWxzZSxcclxuICAgICAgICAgICAgICAgIGZpbHRlcl9kYXRhOmZhbHNlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wdXRlZDp7XHJcbiAgICAgICAgICAgIGxvYWRpbmcoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYmxlX2xvYWRpbmc7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiZWZvcmVNb3VudCgpIHtcclxuICAgICAgICAgICAgdGhpcy50YWJsZV9kYXRhLmhlYWRlciA9IFtcclxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDkwLCB3aWR0aDogOTAsIG5hbWU6ICdJRCcsdGFibGVfbmFtZTogJ2lkJ30sXHJcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxNTAsIHdpZHRoOiAxNTAsIG5hbWU6ICfQl9Cw0Y/QstC60LAnLCB0YWJsZV9uYW1lOiAnb3JkaWQnfSxcclxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDEzMCwgd2lkdGg6ICdhdXRvJywgbmFtZTogJ9Cf0L7RgdGC0LDQstGJ0LjQuicsIHRhYmxlX25hbWU6ICdwYXJ0bmVyJ30sXHJcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxNTAsIHdpZHRoOiAnYXV0bycsIG5hbWU6ICfQn9GA0LjQvdC40LzQsNGO0YnQuNC5JywgdGFibGVfbmFtZTogJ21hbmFnZXInfSxcclxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDE1MCwgd2lkdGg6IDIwMCwgbmFtZTogJ9Ca0L7QvNC80LXQvdGC0LDRgNC40LknLCB0YWJsZV9uYW1lOiAnY29tbWVudCcsIHRyYW5zZm9ybTogJ3RyYW5zZm9ybV9jb21tZW50J30sXHJcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxNTAsIHdpZHRoOiAxNTAsIG5hbWU6ICfQlNCw0YLQsCcsIHRhYmxlX25hbWU6ICdjcmVhdGVkX2F0J30sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5jb250ZXh0X21lbnUgPSBbXHJcbiAgICAgICAgICAgICAgICB7bmFtZTon0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YwnLCBhY3Rpb246IGZ1bmN0aW9uKGRhdGEpe29wZW5EaWFsb2coJ2VudHJhbmNlRGlhbG9nJywgJyZlbnRyYW5jZV9pZD0nICsgZGF0YS5jb250ZXh0ZWQuaWQpfX0sXHJcbiAgICAgICAgICAgICAgICB7bmFtZTon0J7RgtC60YDRi9GC0YwnLCBhY3Rpb246IGZ1bmN0aW9uKGRhdGEpe29wZW5EaWFsb2coJ2VudHJhbmNlRGlhbG9nJywgJyZlbnRyYW5jZV9pZD0nICsgZGF0YS5jb250ZXh0ZWQuaWQpfX0sXHJcbiAgICAgICAgICAgICAgICB7bmFtZTon0J7RgtC60YDRi9GC0Ywg0LfQsNGP0LLQutGDJywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtvcGVuRGlhbG9nKCdjbGllbnRvcmRlckRpYWxvZycsICcmY2xpZW50X29yZGVyX2lkPScgKyBkYXRhLmNvbnRleHRlZC5vcmRpZCl9fSxcclxuICAgICAgICAgICAgICAgIC8vIHtuYW1lOifQo9C00LDQu9C40YLRjCcsIGFjdGlvbjogZnVuY3Rpb24oZGF0YSl7ZGQoZGF0YSk7fX0sXHJcbiAgICAgICAgICAgICAgICAvLyB7bmFtZTon0KPQtNCw0LvQuNGC0Ywg0LLRi9C00LXQu9C10L3QvdGL0LUnLCBhY3Rpb246IGZ1bmN0aW9uKGRhdGEpe2RkKGRhdGEpO30sIG9ubHlfZ3JvdXA6dHJ1ZX0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5kYmxfY2xpY2sgPSBmdW5jdGlvbihpZCl7b3BlbkRpYWxvZygnZW50cmFuY2VEaWFsb2cnLCAnJmVudHJhbmNlX2lkPScgKyBpZCl9O1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlX2RhdGEudXJsID0gJy9lbnRyYW5jZV9yZWZ1bmQvYmFzZS90YWJsZV9kYXRhJztcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJfZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGRhdGVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpcmVjdGl2ZXM6IHtkZWJvdW5jZX1cclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG5cclxuPC9zdHlsZT5cclxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJvdHRvbS1jb250YWluZXJcIiB9LCBbXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJib3gtbGlzdGVyXCIgfSwgW1xuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZC1mbGV4XCIgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiVGFibGVcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgdGFibGVfZGF0YTogX3ZtLnRhYmxlX2RhdGEsXG4gICAgICAgICAgICAgIGZpbHRlcl9kYXRhOiBfdm0uZmlsdGVyX2RhdGEsXG4gICAgICAgICAgICAgIHNlYXJjaDogX3ZtLnNlYXJjaFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBwcmltYXJ5IG1sLTE1IG1iLTE1IHctMjkwXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5uZXdEaWFsb2coXCJwcm9kdWN0XCIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQodC+0LfQtNCw0YLRjCDQstC+0LfQstGA0LDRgiDQv9C+0YHRgtGD0L/Qu9C10L3QuNGPXCIpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcIkZpbHRlckJveFwiLCB7IGF0dHJzOiB7IGZpbHRlcl9kYXRhOiBfdm0uZmlsdGVyX2RhdGEgfSB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vRW50cmFuY2VSZWZ1bmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTAxZTk4M2YwJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0VudHJhbmNlUmVmdW5kLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vRW50cmFuY2VSZWZ1bmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIwMWU5ODNmMFwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9wZW5TZXJ2ZXJcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzAxZTk4M2YwJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzAxZTk4M2YwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzAxZTk4M2YwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9FbnRyYW5jZVJlZnVuZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MDFlOTgzZjAmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMDFlOTgzZjAnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0VudHJhbmNlUmVmdW5kLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRW50cmFuY2VSZWZ1bmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0VudHJhbmNlUmVmdW5kLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9FbnRyYW5jZVJlZnVuZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MDFlOTgzZjAmc2NvcGVkPXRydWUmXCIiXSwic291cmNlUm9vdCI6IiJ9