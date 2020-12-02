(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ProviderOrder"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/ProviderOrder.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Store/ProviderOrder.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
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
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "ProviderOrder",
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
      min_width: 60,
      width: 150,
      name: 'Оплата',
      table_name: 'pays',
      transform: 'transform_ico'
    }, {
      min_width: 60,
      width: 150,
      name: 'Поступление',
      table_name: 'incomes',
      transform: 'transform_ico'
    }, {
      min_width: 120,
      width: 200,
      name: 'Поставщик',
      table_name: 'partner_name'
    }, {
      min_width: 120,
      width: 'auto',
      name: 'Ответственный',
      table_name: 'manager_name'
    }, {
      min_width: 90,
      width: 200,
      name: 'Сумма',
      table_name: 'summ',
      transform: 'transform_price'
    }, {
      min_width: 90,
      width: 150,
      name: 'Дата',
      table_name: 'created_at'
    }];
    this.table_data.context_menu = [{
      name: 'Редактировать',
      action: function action(data) {
        openDialog('providerOrderDialog', '&provider_order_id=' + data.contexted.id);
      }
    }, {
      name: 'Открыть',
      action: function action(data) {
        openDialog('providerOrderDialog', '&provider_order_id=' + data.contexted.id);
      }
    }];

    this.table_data.dbl_click = function (id) {
      return openDialog('providerOrderDialog', '&provider_order_id=' + id);
    };

    this.table_data.url = '/provider_order/base/table_data';
    this.filter_data = {
      dates: {
        start: null,
        end: null
      },
      filters: [{
        title: 'Статус оплаты',
        filed: 'payment',
        collection: [{
          bool: false,
          val: 0,
          title: 'Оплачен'
        }, {
          bool: false,
          val: 1,
          title: 'Не оплачен'
        }, {
          bool: false,
          val: 2,
          title: 'Оплачен частично'
        }, {
          bool: false,
          val: 3,
          title: 'Переплачен'
        }]
      }, {
        title: 'Статус поступления',
        filed: 'entrance',
        collection: [{
          bool: false,
          val: 0,
          title: 'Частично'
        }, {
          bool: false,
          val: 1,
          title: 'Полностью'
        }, {
          bool: false,
          val: 2,
          title: 'Без поступлений'
        }]
      }]
    };
  },
  directives: {
    debounce: _debounce__WEBPACK_IMPORTED_MODULE_2___default.a
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/ProviderOrder.vue?vue&type=template&id=16a859da&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Store/ProviderOrder.vue?vue&type=template&id=16a859da&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
      _c("div", { staticClass: "d-flex mb-15" }, [
        _c("div", { staticClass: "search-field-container w-100" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model.lazy",
                value: _vm.search,
                expression: "search",
                modifiers: { lazy: true }
              },
              {
                name: "debounce",
                rawName: "v-debounce",
                value: 450,
                expression: "450"
              }
            ],
            staticClass: "input w-100",
            attrs: {
              id: "search",
              name: "search",
              placeholder: "Поиск по заявкам поставщику",
              value: "",
              type: "text"
            },
            domProps: { value: _vm.search },
            on: {
              change: function($event) {
                _vm.search = $event.target.value
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "actions" }, [
          _c(
            "button",
            {
              staticClass: "button primary ml-15 w-290",
              attrs: { type: "button" },
              on: {
                click: function($event) {
                  return _vm.newDialog("product")
                }
              }
            },
            [_vm._v("Создать заявку")]
          )
        ])
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "d-flex", staticStyle: { height: "calc(100% - 45px)" } },
        [
          _c("Table", {
            attrs: {
              table_data: _vm.table_data,
              filter_data: _vm.filter_data,
              search: _vm.search
            }
          }),
          _vm._v(" "),
          _c("FilterBox", { attrs: { filter_data: _vm.filter_data } })
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/views/Store/ProviderOrder.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/views/Store/ProviderOrder.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProviderOrder_vue_vue_type_template_id_16a859da_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProviderOrder.vue?vue&type=template&id=16a859da&scoped=true& */ "./resources/js/components/views/Store/ProviderOrder.vue?vue&type=template&id=16a859da&scoped=true&");
/* harmony import */ var _ProviderOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProviderOrder.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Store/ProviderOrder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ProviderOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProviderOrder_vue_vue_type_template_id_16a859da_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ProviderOrder_vue_vue_type_template_id_16a859da_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "16a859da",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Store/ProviderOrder.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Store/ProviderOrder.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/views/Store/ProviderOrder.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProviderOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ProviderOrder.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/ProviderOrder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProviderOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Store/ProviderOrder.vue?vue&type=template&id=16a859da&scoped=true&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/views/Store/ProviderOrder.vue?vue&type=template&id=16a859da&scoped=true& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProviderOrder_vue_vue_type_template_id_16a859da_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ProviderOrder.vue?vue&type=template&id=16a859da&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/ProviderOrder.vue?vue&type=template&id=16a859da&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProviderOrder_vue_vue_type_template_id_16a859da_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProviderOrder_vue_vue_type_template_id_16a859da_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvUHJvdmlkZXJPcmRlci52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvUHJvdmlkZXJPcmRlci52dWU/N2RmYSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9Qcm92aWRlck9yZGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9Qcm92aWRlck9yZGVyLnZ1ZT8zMDU5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL1Byb3ZpZGVyT3JkZXIudnVlP2U5YTQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQURBO0FBRUE7QUFDQSxpRUFEQTtBQUNBO0FBREEsR0FGQTtBQUtBO0FBQ0E7QUFDQSxvQkFEQTtBQUVBLGdCQUZBO0FBR0EsMEJBSEE7QUFJQTtBQUpBO0FBTUEsR0FaQTtBQWFBO0FBQ0EsV0FEQSxxQkFDQTtBQUNBO0FBQ0E7QUFIQSxHQWJBO0FBa0JBLGFBbEJBLHlCQWtCQTtBQUNBLDhCQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQURBLEVBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FGQSxFQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBSEEsRUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FKQSxFQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUxBLEVBTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FOQSxFQU9BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQVBBO0FBU0Esb0NBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBREEsRUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FGQTs7QUFNQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBREE7QUFFQTtBQUZBLE9BREE7QUFLQSxnQkFDQTtBQUNBLDhCQURBO0FBRUEsd0JBRkE7QUFHQSxxQkFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBREEsRUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBRkEsRUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSEEsRUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSkE7QUFIQSxPQURBLEVBV0E7QUFDQSxtQ0FEQTtBQUVBLHlCQUZBO0FBR0EscUJBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURBLEVBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUZBLEVBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUhBO0FBSEEsT0FYQTtBQUxBO0FBMkJBLEdBL0RBO0FBZ0VBO0FBQUE7QUFBQTtBQWhFQSxHOzs7Ozs7Ozs7Ozs7QUN2QkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0NBQWtDO0FBQ3RELGVBQWUsNEJBQTRCO0FBQzNDLGlCQUFpQiw4QkFBOEI7QUFDL0MsbUJBQW1CLDhDQUE4QztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYix1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLG1CQUFtQix5QkFBeUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLHNDQUFzQyw4QkFBOEIsRUFBRTtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLDJCQUEyQixTQUFTLCtCQUErQixFQUFFO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDOUVBO0FBQUE7QUFBQTtBQUFBO0FBQXdHO0FBQ3ZDO0FBQ0w7OztBQUc1RDtBQUNtRztBQUNuRyxnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSxtRkFBTTtBQUNSLEVBQUUsb0dBQU07QUFDUixFQUFFLDZHQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxLQUFVLEVBQUUsWUFpQmY7QUFDRDtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN0Q2Y7QUFBQTtBQUFBLHdDQUF5TSxDQUFnQix5UEFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0E3TjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiUHJvdmlkZXJPcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiYm90dG9tLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94LWxpc3RlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBtYi0xNVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtZmllbGQtY29udGFpbmVyIHctMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2LW1vZGVsLmxhenk9XCJzZWFyY2hcIiB2LWRlYm91bmNlPVwiNDUwXCIgaWQ9XCJzZWFyY2hcIiBuYW1lPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCLQn9C+0LjRgdC6INC/0L4g0LfQsNGP0LLQutCw0Lwg0L/QvtGB0YLQsNCy0YnQuNC60YNcIiBjbGFzcz1cImlucHV0IHctMTAwXCIgdmFsdWU9XCJcIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHByaW1hcnkgbWwtMTUgdy0yOTBcIiB2LW9uOmNsaWNrPVwibmV3RGlhbG9nKCdwcm9kdWN0JylcIj7QodC+0LfQtNCw0YLRjCDQt9Cw0Y/QstC60YM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleFwiIHN0eWxlPVwiaGVpZ2h0OiBjYWxjKDEwMCUgLSA0NXB4KTtcIj5cbiAgICAgICAgICAgICAgICA8VGFibGUgdi1iaW5kOnRhYmxlX2RhdGE9XCJ0YWJsZV9kYXRhXCIgdi1iaW5kOmZpbHRlcl9kYXRhPVwiZmlsdGVyX2RhdGFcIiB2LWJpbmQ6c2VhcmNoPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgICA8RmlsdGVyQm94IHYtYmluZDpmaWx0ZXJfZGF0YT1cImZpbHRlcl9kYXRhXCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgVGFibGUgZnJvbSBcIi4uLy4uL3NlcnZpY2UvVGFibGVcIjtcbiAgICBpbXBvcnQgRmlsdGVyQm94IGZyb20gXCIuLi8uLi90ZW1wbGF0ZS9GaWx0ZXJCb3hcIjtcbiAgICBpbXBvcnQgZGVib3VuY2UgZnJvbSAnLi8uLi8uLi8uLi9kZWJvdW5jZSc7XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBuYW1lOiBcIlByb3ZpZGVyT3JkZXJcIixcbiAgICAgICAgY29tcG9uZW50czp7XG4gICAgICAgICAgICBUYWJsZSwgRmlsdGVyQm94XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6ICgpPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0YWJsZV9kYXRhOnt9LFxuICAgICAgICAgICAgICAgIHNlYXJjaDogJycsXG4gICAgICAgICAgICAgICAgdGFibGVfbG9hZGluZzpmYWxzZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJfZGF0YTpmYWxzZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6e1xuICAgICAgICAgICAgbG9hZGluZygpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYmxlX2xvYWRpbmc7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBiZWZvcmVNb3VudCgpIHtcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5oZWFkZXIgPSBbXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogOTAsIHdpZHRoOiA5MCwgbmFtZTogJ0lEJyx0YWJsZV9uYW1lOiAnaWQnfSxcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiA2MCwgd2lkdGg6IDE1MCwgbmFtZTogJ9Ce0L/Qu9Cw0YLQsCcsIHRhYmxlX25hbWU6ICdwYXlzJywgdHJhbnNmb3JtOiAndHJhbnNmb3JtX2ljbyd9LFxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDYwLCB3aWR0aDogMTUwLCBuYW1lOiAn0J/QvtGB0YLRg9C/0LvQtdC90LjQtScsIHRhYmxlX25hbWU6ICdpbmNvbWVzJywgdHJhbnNmb3JtOiAndHJhbnNmb3JtX2ljbyd9LFxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDEyMCwgd2lkdGg6IDIwMCwgbmFtZTogJ9Cf0L7RgdGC0LDQstGJ0LjQuicsIHRhYmxlX25hbWU6ICdwYXJ0bmVyX25hbWUnfSxcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxMjAsIHdpZHRoOiAnYXV0bycsIG5hbWU6ICfQntGC0LLQtdGC0YHRgtCy0LXQvdC90YvQuScsIHRhYmxlX25hbWU6ICdtYW5hZ2VyX25hbWUnfSxcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiA5MCwgd2lkdGg6IDIwMCwgbmFtZTogJ9Ch0YPQvNC80LAnLCB0YWJsZV9uYW1lOiAnc3VtbScsIHRyYW5zZm9ybTogJ3RyYW5zZm9ybV9wcmljZSd9LFxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDkwLCB3aWR0aDogMTUwLCBuYW1lOiAn0JTQsNGC0LAnLCB0YWJsZV9uYW1lOiAnY3JlYXRlZF9hdCd9LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5jb250ZXh0X21lbnUgPSBbXG4gICAgICAgICAgICAgICAge25hbWU6J9Cg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMJywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtvcGVuRGlhbG9nKCdwcm92aWRlck9yZGVyRGlhbG9nJywgJyZwcm92aWRlcl9vcmRlcl9pZD0nICsgZGF0YS5jb250ZXh0ZWQuaWQpfX0sXG4gICAgICAgICAgICAgICAge25hbWU6J9Ce0YLQutGA0YvRgtGMJywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtvcGVuRGlhbG9nKCdwcm92aWRlck9yZGVyRGlhbG9nJywgJyZwcm92aWRlcl9vcmRlcl9pZD0nICsgZGF0YS5jb250ZXh0ZWQuaWQpfX0sXG4gICAgICAgICAgICAgICAgLy8ge25hbWU6J9Cj0LTQsNC70LjRgtGMJywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtkZChkYXRhKTt9fSxcbiAgICAgICAgICAgICAgICAvLyB7bmFtZTon0KPQtNCw0LvQuNGC0Ywg0LLRi9C00LXQu9C10L3QvdGL0LUnLCBhY3Rpb246IGZ1bmN0aW9uKGRhdGEpe2RkKGRhdGEpO30sIG9ubHlfZ3JvdXA6dHJ1ZX0sXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdGhpcy50YWJsZV9kYXRhLmRibF9jbGljayA9IGlkID0+IG9wZW5EaWFsb2coJ3Byb3ZpZGVyT3JkZXJEaWFsb2cnLCAnJnByb3ZpZGVyX29yZGVyX2lkPScgKyBpZCk7XG4gICAgICAgICAgICB0aGlzLnRhYmxlX2RhdGEudXJsID0gJy9wcm92aWRlcl9vcmRlci9iYXNlL3RhYmxlX2RhdGEnO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJfZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBkYXRlczoge1xuICAgICAgICAgICAgICAgICAgICBzdGFydDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBudWxsLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmlsdGVyczpbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOifQodGC0LDRgtGD0YEg0L7Qv9C70LDRgtGLJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVkOidwYXltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb246W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtib29sOmZhbHNlLCB2YWw6MCwgdGl0bGU6J9Ce0L/Qu9Cw0YfQtdC9J30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jvb2w6ZmFsc2UsIHZhbDoxLCB0aXRsZTon0J3QtSDQvtC/0LvQsNGH0LXQvSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtib29sOmZhbHNlLCB2YWw6MiwgdGl0bGU6J9Ce0L/Qu9Cw0YfQtdC9INGH0LDRgdGC0LjRh9C90L4nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Ym9vbDpmYWxzZSwgdmFsOjMsIHRpdGxlOifQn9C10YDQtdC/0LvQsNGH0LXQvSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTon0KHRgtCw0YLRg9GBINC/0L7RgdGC0YPQv9C70LXQvdC40Y8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZWQ6J2VudHJhbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb246W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtib29sOmZhbHNlLCB2YWw6MCwgdGl0bGU6J9Cn0LDRgdGC0LjRh9C90L4nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Ym9vbDpmYWxzZSwgdmFsOjEsIHRpdGxlOifQn9C+0LvQvdC+0YHRgtGM0Y4nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Ym9vbDpmYWxzZSwgdmFsOjIsIHRpdGxlOifQkdC10Lcg0L/QvtGB0YLRg9C/0LvQtdC90LjQuSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGRpcmVjdGl2ZXM6IHtkZWJvdW5jZX1cbiAgICB9XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJib3R0b20tY29udGFpbmVyXCIgfSwgW1xuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYm94LWxpc3RlclwiIH0sIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZC1mbGV4IG1iLTE1XCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInNlYXJjaC1maWVsZC1jb250YWluZXIgdy0xMDBcIiB9LCBbXG4gICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsLmxhenlcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNlYXJjaCxcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgIG1vZGlmaWVyczogeyBsYXp5OiB0cnVlIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVib3VuY2VcIixcbiAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtZGVib3VuY2VcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogNDUwLFxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiNDUwXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImlucHV0IHctMTAwXCIsXG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICBpZDogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgbmFtZTogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi0J/QvtC40YHQuiDQv9C+INC30LDRj9Cy0LrQsNC8INC/0L7RgdGC0LDQstGJ0LjQutGDXCIsXG4gICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0uc2VhcmNoIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIF92bS5zZWFyY2ggPSAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJhY3Rpb25zXCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHByaW1hcnkgbWwtMTUgdy0yOTBcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ubmV3RGlhbG9nKFwicHJvZHVjdFwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCLQodC+0LfQtNCw0YLRjCDQt9Cw0Y/QstC60YNcIildXG4gICAgICAgICAgKVxuICAgICAgICBdKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZC1mbGV4XCIsIHN0YXRpY1N0eWxlOiB7IGhlaWdodDogXCJjYWxjKDEwMCUgLSA0NXB4KVwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiVGFibGVcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgdGFibGVfZGF0YTogX3ZtLnRhYmxlX2RhdGEsXG4gICAgICAgICAgICAgIGZpbHRlcl9kYXRhOiBfdm0uZmlsdGVyX2RhdGEsXG4gICAgICAgICAgICAgIHNlYXJjaDogX3ZtLnNlYXJjaFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJGaWx0ZXJCb3hcIiwgeyBhdHRyczogeyBmaWx0ZXJfZGF0YTogX3ZtLmZpbHRlcl9kYXRhIH0gfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9Qcm92aWRlck9yZGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xNmE4NTlkYSZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Qcm92aWRlck9yZGVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUHJvdmlkZXJPcmRlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjE2YTg1OWRhXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMTZhODU5ZGEnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMTZhODU5ZGEnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMTZhODU5ZGEnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1Byb3ZpZGVyT3JkZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE2YTg1OWRhJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzE2YTg1OWRhJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9Qcm92aWRlck9yZGVyLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUHJvdmlkZXJPcmRlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUHJvdmlkZXJPcmRlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUHJvdmlkZXJPcmRlci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTZhODU5ZGEmc2NvcGVkPXRydWUmXCIiXSwic291cmNlUm9vdCI6IiJ9