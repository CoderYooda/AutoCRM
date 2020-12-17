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
  methods: {
    newDialog: function newDialog(tag) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.$eventBus.$emit('openDialog', {
        tag: tag,
        params: params
      });
    }
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
                  return _vm.newDialog("providerOrder")
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvUHJvdmlkZXJPcmRlci52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvUHJvdmlkZXJPcmRlci52dWU/N2RmYSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9Qcm92aWRlck9yZGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9Qcm92aWRlck9yZGVyLnZ1ZT8zMDU5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL1Byb3ZpZGVyT3JkZXIudnVlP2U5YTQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQURBO0FBRUE7QUFDQSxpRUFEQTtBQUNBO0FBREEsR0FGQTtBQUtBO0FBQ0E7QUFDQSxvQkFEQTtBQUVBLGdCQUZBO0FBR0EsMEJBSEE7QUFJQTtBQUpBO0FBTUEsR0FaQTtBQWFBO0FBQ0EsV0FEQSxxQkFDQTtBQUNBO0FBQ0E7QUFIQSxHQWJBO0FBa0JBLGFBbEJBLHlCQWtCQTtBQUNBLDhCQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQURBLEVBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FGQSxFQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBSEEsRUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FKQSxFQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUxBLEVBTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FOQSxFQU9BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQVBBO0FBU0Esb0NBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBREEsRUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FGQTs7QUFNQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBREE7QUFFQTtBQUZBLE9BREE7QUFLQSxnQkFDQTtBQUNBLDhCQURBO0FBRUEsd0JBRkE7QUFHQSxxQkFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBREEsRUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBRkEsRUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSEEsRUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSkE7QUFIQSxPQURBLEVBV0E7QUFDQSxtQ0FEQTtBQUVBLHlCQUZBO0FBR0EscUJBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURBLEVBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUZBLEVBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUhBO0FBSEEsT0FYQTtBQUxBO0FBMkJBLEdBL0RBO0FBZ0VBO0FBQ0EsYUFEQSxxQkFDQSxHQURBLEVBQ0E7QUFBQTtBQUNBO0FBQ0EsZ0JBREE7QUFFQTtBQUZBO0FBSUE7QUFOQSxHQWhFQTtBQXdFQTtBQUFBO0FBQUE7QUF4RUEsRzs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtDQUFrQztBQUN0RCxlQUFlLDRCQUE0QjtBQUMzQyxpQkFBaUIsOEJBQThCO0FBQy9DLG1CQUFtQiw4Q0FBOEM7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxtQkFBbUIseUJBQXlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxzQ0FBc0MsOEJBQThCLEVBQUU7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSwyQkFBMkIsU0FBUywrQkFBK0IsRUFBRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzlFQTtBQUFBO0FBQUE7QUFBQTtBQUF3RztBQUN2QztBQUNMOzs7QUFHNUQ7QUFDbUc7QUFDbkcsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUsbUZBQU07QUFDUixFQUFFLG9HQUFNO0FBQ1IsRUFBRSw2R0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBeU0sQ0FBZ0IseVBBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBN047QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6IlByb3ZpZGVyT3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImJvdHRvbS1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJveC1saXN0ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggbWItMTVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWZpZWxkLWNvbnRhaW5lciB3LTEwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbC5sYXp5PVwic2VhcmNoXCIgdi1kZWJvdW5jZT1cIjQ1MFwiIGlkPVwic2VhcmNoXCIgbmFtZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwi0J/QvtC40YHQuiDQv9C+INC30LDRj9Cy0LrQsNC8INC/0L7RgdGC0LDQstGJ0LjQutGDXCIgY2xhc3M9XCJpbnB1dCB3LTEwMFwiIHZhbHVlPVwiXCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IG1sLTE1IHctMjkwXCIgQGNsaWNrPVwibmV3RGlhbG9nKCdwcm92aWRlck9yZGVyJylcIj7QodC+0LfQtNCw0YLRjCDQt9Cw0Y/QstC60YM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleFwiIHN0eWxlPVwiaGVpZ2h0OiBjYWxjKDEwMCUgLSA0NXB4KTtcIj5cbiAgICAgICAgICAgICAgICA8VGFibGUgdi1iaW5kOnRhYmxlX2RhdGE9XCJ0YWJsZV9kYXRhXCIgdi1iaW5kOmZpbHRlcl9kYXRhPVwiZmlsdGVyX2RhdGFcIiB2LWJpbmQ6c2VhcmNoPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgICA8RmlsdGVyQm94IHYtYmluZDpmaWx0ZXJfZGF0YT1cImZpbHRlcl9kYXRhXCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgVGFibGUgZnJvbSBcIi4uLy4uL3NlcnZpY2UvVGFibGVcIjtcbiAgICBpbXBvcnQgRmlsdGVyQm94IGZyb20gXCIuLi8uLi90ZW1wbGF0ZS9GaWx0ZXJCb3hcIjtcbiAgICBpbXBvcnQgZGVib3VuY2UgZnJvbSAnLi8uLi8uLi8uLi9kZWJvdW5jZSc7XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBuYW1lOiBcIlByb3ZpZGVyT3JkZXJcIixcbiAgICAgICAgY29tcG9uZW50czp7XG4gICAgICAgICAgICBUYWJsZSwgRmlsdGVyQm94XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6ICgpPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0YWJsZV9kYXRhOnt9LFxuICAgICAgICAgICAgICAgIHNlYXJjaDogJycsXG4gICAgICAgICAgICAgICAgdGFibGVfbG9hZGluZzpmYWxzZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJfZGF0YTpmYWxzZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6e1xuICAgICAgICAgICAgbG9hZGluZygpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYmxlX2xvYWRpbmc7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBiZWZvcmVNb3VudCgpIHtcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5oZWFkZXIgPSBbXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogOTAsIHdpZHRoOiA5MCwgbmFtZTogJ0lEJyx0YWJsZV9uYW1lOiAnaWQnfSxcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiA2MCwgd2lkdGg6IDE1MCwgbmFtZTogJ9Ce0L/Qu9Cw0YLQsCcsIHRhYmxlX25hbWU6ICdwYXlzJywgdHJhbnNmb3JtOiAndHJhbnNmb3JtX2ljbyd9LFxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDYwLCB3aWR0aDogMTUwLCBuYW1lOiAn0J/QvtGB0YLRg9C/0LvQtdC90LjQtScsIHRhYmxlX25hbWU6ICdpbmNvbWVzJywgdHJhbnNmb3JtOiAndHJhbnNmb3JtX2ljbyd9LFxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDEyMCwgd2lkdGg6IDIwMCwgbmFtZTogJ9Cf0L7RgdGC0LDQstGJ0LjQuicsIHRhYmxlX25hbWU6ICdwYXJ0bmVyX25hbWUnfSxcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxMjAsIHdpZHRoOiAnYXV0bycsIG5hbWU6ICfQntGC0LLQtdGC0YHRgtCy0LXQvdC90YvQuScsIHRhYmxlX25hbWU6ICdtYW5hZ2VyX25hbWUnfSxcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiA5MCwgd2lkdGg6IDIwMCwgbmFtZTogJ9Ch0YPQvNC80LAnLCB0YWJsZV9uYW1lOiAnc3VtbScsIHRyYW5zZm9ybTogJ3RyYW5zZm9ybV9wcmljZSd9LFxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDkwLCB3aWR0aDogMTUwLCBuYW1lOiAn0JTQsNGC0LAnLCB0YWJsZV9uYW1lOiAnY3JlYXRlZF9hdCd9LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5jb250ZXh0X21lbnUgPSBbXG4gICAgICAgICAgICAgICAge25hbWU6J9Cg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMJywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtvcGVuRGlhbG9nKCdwcm92aWRlck9yZGVyRGlhbG9nJywgJyZwcm92aWRlcl9vcmRlcl9pZD0nICsgZGF0YS5jb250ZXh0ZWQuaWQpfX0sXG4gICAgICAgICAgICAgICAge25hbWU6J9Ce0YLQutGA0YvRgtGMJywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtvcGVuRGlhbG9nKCdwcm92aWRlck9yZGVyRGlhbG9nJywgJyZwcm92aWRlcl9vcmRlcl9pZD0nICsgZGF0YS5jb250ZXh0ZWQuaWQpfX0sXG4gICAgICAgICAgICAgICAgLy8ge25hbWU6J9Cj0LTQsNC70LjRgtGMJywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtkZChkYXRhKTt9fSxcbiAgICAgICAgICAgICAgICAvLyB7bmFtZTon0KPQtNCw0LvQuNGC0Ywg0LLRi9C00LXQu9C10L3QvdGL0LUnLCBhY3Rpb246IGZ1bmN0aW9uKGRhdGEpe2RkKGRhdGEpO30sIG9ubHlfZ3JvdXA6dHJ1ZX0sXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdGhpcy50YWJsZV9kYXRhLmRibF9jbGljayA9IGlkID0+IG9wZW5EaWFsb2coJ3Byb3ZpZGVyT3JkZXJEaWFsb2cnLCAnJnByb3ZpZGVyX29yZGVyX2lkPScgKyBpZCk7XG4gICAgICAgICAgICB0aGlzLnRhYmxlX2RhdGEudXJsID0gJy9wcm92aWRlcl9vcmRlci9iYXNlL3RhYmxlX2RhdGEnO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJfZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBkYXRlczoge1xuICAgICAgICAgICAgICAgICAgICBzdGFydDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBudWxsLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmlsdGVyczpbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOifQodGC0LDRgtGD0YEg0L7Qv9C70LDRgtGLJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVkOidwYXltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb246W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtib29sOmZhbHNlLCB2YWw6MCwgdGl0bGU6J9Ce0L/Qu9Cw0YfQtdC9J30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jvb2w6ZmFsc2UsIHZhbDoxLCB0aXRsZTon0J3QtSDQvtC/0LvQsNGH0LXQvSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtib29sOmZhbHNlLCB2YWw6MiwgdGl0bGU6J9Ce0L/Qu9Cw0YfQtdC9INGH0LDRgdGC0LjRh9C90L4nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Ym9vbDpmYWxzZSwgdmFsOjMsIHRpdGxlOifQn9C10YDQtdC/0LvQsNGH0LXQvSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTon0KHRgtCw0YLRg9GBINC/0L7RgdGC0YPQv9C70LXQvdC40Y8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZWQ6J2VudHJhbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb246W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtib29sOmZhbHNlLCB2YWw6MCwgdGl0bGU6J9Cn0LDRgdGC0LjRh9C90L4nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Ym9vbDpmYWxzZSwgdmFsOjEsIHRpdGxlOifQn9C+0LvQvdC+0YHRgtGM0Y4nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Ym9vbDpmYWxzZSwgdmFsOjIsIHRpdGxlOifQkdC10Lcg0L/QvtGB0YLRg9C/0LvQtdC90LjQuSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6e1xuICAgICAgICAgICAgbmV3RGlhbG9nKHRhZywgcGFyYW1zID0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ29wZW5EaWFsb2cnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRhZzogdGFnLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHBhcmFtc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkaXJlY3RpdmVzOiB7ZGVib3VuY2V9XG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYm90dG9tLWNvbnRhaW5lclwiIH0sIFtcbiAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJveC1saXN0ZXJcIiB9LCBbXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImQtZmxleCBtYi0xNVwiIH0sIFtcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzZWFyY2gtZmllbGQtY29udGFpbmVyIHctMTAwXCIgfSwgW1xuICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbC5sYXp5XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zZWFyY2gsXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICBtb2RpZmllcnM6IHsgbGF6eTogdHJ1ZSB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRlYm91bmNlXCIsXG4gICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LWRlYm91bmNlXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IDQ1MCxcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIjQ1MFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJpbnB1dCB3LTEwMFwiLFxuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgaWQ6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgIG5hbWU6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcItCf0L7QuNGB0Log0L/QviDQt9Cw0Y/QstC60LDQvCDQv9C+0YHRgtCw0LLRidC40LrRg1wiLFxuICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLnNlYXJjaCB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdm0uc2VhcmNoID0gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYWN0aW9uc1wiIH0sIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBwcmltYXJ5IG1sLTE1IHctMjkwXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLm5ld0RpYWxvZyhcInByb3ZpZGVyT3JkZXJcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX3ZtLl92KFwi0KHQvtC30LTQsNGC0Ywg0LfQsNGP0LLQutGDXCIpXVxuICAgICAgICAgIClcbiAgICAgICAgXSlcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImQtZmxleFwiLCBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiY2FsYygxMDAlIC0gNDVweClcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcIlRhYmxlXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHRhYmxlX2RhdGE6IF92bS50YWJsZV9kYXRhLFxuICAgICAgICAgICAgICBmaWx0ZXJfZGF0YTogX3ZtLmZpbHRlcl9kYXRhLFxuICAgICAgICAgICAgICBzZWFyY2g6IF92bS5zZWFyY2hcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiRmlsdGVyQm94XCIsIHsgYXR0cnM6IHsgZmlsdGVyX2RhdGE6IF92bS5maWx0ZXJfZGF0YSB9IH0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUHJvdmlkZXJPcmRlci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTZhODU5ZGEmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUHJvdmlkZXJPcmRlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1Byb3ZpZGVyT3JkZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIxNmE4NTlkYVwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9wZW5TZXJ2ZXJcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzE2YTg1OWRhJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzE2YTg1OWRhJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzE2YTg1OWRhJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Qcm92aWRlck9yZGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xNmE4NTlkYSZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcxNmE4NTlkYScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvUHJvdmlkZXJPcmRlci52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Byb3ZpZGVyT3JkZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Byb3ZpZGVyT3JkZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Byb3ZpZGVyT3JkZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE2YTg1OWRhJnNjb3BlZD10cnVlJlwiIl0sInNvdXJjZVJvb3QiOiIifQ==