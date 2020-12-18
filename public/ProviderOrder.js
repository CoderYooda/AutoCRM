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
    var _this = this;

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
      action: function action(elem) {
        _this.newDialog('providerOrder', {
          id: elem.id
        });
      }
    }, {
      name: 'Открыть',
      action: function action(elem) {
        _this.newDialog('providerOrder', {
          id: elem.id
        });
      }
    }];

    this.table_data.dbl_click = function (id) {
      return _this.newDialog('providerOrder', {
        id: id
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvUHJvdmlkZXJPcmRlci52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvUHJvdmlkZXJPcmRlci52dWU/N2RmYSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9Qcm92aWRlck9yZGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9Qcm92aWRlck9yZGVyLnZ1ZT8zMDU5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL1Byb3ZpZGVyT3JkZXIudnVlP2U5YTQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQURBO0FBRUE7QUFDQSxpRUFEQTtBQUNBO0FBREEsR0FGQTtBQUtBO0FBQ0E7QUFDQSxvQkFEQTtBQUVBLGdCQUZBO0FBR0EsMEJBSEE7QUFJQTtBQUpBO0FBTUEsR0FaQTtBQWFBO0FBQ0EsV0FEQSxxQkFDQTtBQUNBO0FBQ0E7QUFIQSxHQWJBO0FBa0JBLGFBbEJBLHlCQWtCQTtBQUFBOztBQUNBLDhCQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQURBLEVBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FGQSxFQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBSEEsRUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FKQSxFQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUxBLEVBTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FOQSxFQU9BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQVBBO0FBU0Esb0NBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQURBLEVBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUZBOztBQU1BO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBREE7QUFFQTtBQUZBLE9BREE7QUFLQSxnQkFDQTtBQUNBLDhCQURBO0FBRUEsd0JBRkE7QUFHQSxxQkFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBREEsRUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBRkEsRUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSEEsRUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSkE7QUFIQSxPQURBLEVBV0E7QUFDQSxtQ0FEQTtBQUVBLHlCQUZBO0FBR0EscUJBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURBLEVBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUZBLEVBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUhBO0FBSEEsT0FYQTtBQUxBO0FBMkJBLEdBL0RBO0FBZ0VBO0FBQ0EsYUFEQSxxQkFDQSxHQURBLEVBQ0E7QUFBQTtBQUNBO0FBQ0EsZ0JBREE7QUFFQTtBQUZBO0FBSUE7QUFOQSxHQWhFQTtBQXdFQTtBQUFBO0FBQUE7QUF4RUEsRzs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtDQUFrQztBQUN0RCxlQUFlLDRCQUE0QjtBQUMzQyxpQkFBaUIsOEJBQThCO0FBQy9DLG1CQUFtQiw4Q0FBOEM7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxtQkFBbUIseUJBQXlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxzQ0FBc0MsOEJBQThCLEVBQUU7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSwyQkFBMkIsU0FBUywrQkFBK0IsRUFBRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzlFQTtBQUFBO0FBQUE7QUFBQTtBQUF3RztBQUN2QztBQUNMOzs7QUFHNUQ7QUFDbUc7QUFDbkcsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUsbUZBQU07QUFDUixFQUFFLG9HQUFNO0FBQ1IsRUFBRSw2R0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBeU0sQ0FBZ0IseVBBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBN047QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6IlByb3ZpZGVyT3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImJvdHRvbS1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJveC1saXN0ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggbWItMTVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWZpZWxkLWNvbnRhaW5lciB3LTEwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbC5sYXp5PVwic2VhcmNoXCIgdi1kZWJvdW5jZT1cIjQ1MFwiIGlkPVwic2VhcmNoXCIgbmFtZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwi0J/QvtC40YHQuiDQv9C+INC30LDRj9Cy0LrQsNC8INC/0L7RgdGC0LDQstGJ0LjQutGDXCIgY2xhc3M9XCJpbnB1dCB3LTEwMFwiIHZhbHVlPVwiXCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IG1sLTE1IHctMjkwXCIgQGNsaWNrPVwibmV3RGlhbG9nKCdwcm92aWRlck9yZGVyJylcIj7QodC+0LfQtNCw0YLRjCDQt9Cw0Y/QstC60YM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleFwiIHN0eWxlPVwiaGVpZ2h0OiBjYWxjKDEwMCUgLSA0NXB4KTtcIj5cbiAgICAgICAgICAgICAgICA8VGFibGUgdi1iaW5kOnRhYmxlX2RhdGE9XCJ0YWJsZV9kYXRhXCIgdi1iaW5kOmZpbHRlcl9kYXRhPVwiZmlsdGVyX2RhdGFcIiB2LWJpbmQ6c2VhcmNoPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgICA8RmlsdGVyQm94IHYtYmluZDpmaWx0ZXJfZGF0YT1cImZpbHRlcl9kYXRhXCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgVGFibGUgZnJvbSBcIi4uLy4uL3NlcnZpY2UvVGFibGVcIjtcbiAgICBpbXBvcnQgRmlsdGVyQm94IGZyb20gXCIuLi8uLi90ZW1wbGF0ZS9GaWx0ZXJCb3hcIjtcbiAgICBpbXBvcnQgZGVib3VuY2UgZnJvbSAnLi8uLi8uLi8uLi9kZWJvdW5jZSc7XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBuYW1lOiBcIlByb3ZpZGVyT3JkZXJcIixcbiAgICAgICAgY29tcG9uZW50czp7XG4gICAgICAgICAgICBUYWJsZSwgRmlsdGVyQm94XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6ICgpPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0YWJsZV9kYXRhOnt9LFxuICAgICAgICAgICAgICAgIHNlYXJjaDogJycsXG4gICAgICAgICAgICAgICAgdGFibGVfbG9hZGluZzpmYWxzZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJfZGF0YTpmYWxzZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6e1xuICAgICAgICAgICAgbG9hZGluZygpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYmxlX2xvYWRpbmc7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBiZWZvcmVNb3VudCgpIHtcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5oZWFkZXIgPSBbXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogOTAsIHdpZHRoOiA5MCwgbmFtZTogJ0lEJyx0YWJsZV9uYW1lOiAnaWQnfSxcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiA2MCwgd2lkdGg6IDE1MCwgbmFtZTogJ9Ce0L/Qu9Cw0YLQsCcsIHRhYmxlX25hbWU6ICdwYXlzJywgdHJhbnNmb3JtOiAndHJhbnNmb3JtX2ljbyd9LFxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDYwLCB3aWR0aDogMTUwLCBuYW1lOiAn0J/QvtGB0YLRg9C/0LvQtdC90LjQtScsIHRhYmxlX25hbWU6ICdpbmNvbWVzJywgdHJhbnNmb3JtOiAndHJhbnNmb3JtX2ljbyd9LFxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDEyMCwgd2lkdGg6IDIwMCwgbmFtZTogJ9Cf0L7RgdGC0LDQstGJ0LjQuicsIHRhYmxlX25hbWU6ICdwYXJ0bmVyX25hbWUnfSxcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxMjAsIHdpZHRoOiAnYXV0bycsIG5hbWU6ICfQntGC0LLQtdGC0YHRgtCy0LXQvdC90YvQuScsIHRhYmxlX25hbWU6ICdtYW5hZ2VyX25hbWUnfSxcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiA5MCwgd2lkdGg6IDIwMCwgbmFtZTogJ9Ch0YPQvNC80LAnLCB0YWJsZV9uYW1lOiAnc3VtbScsIHRyYW5zZm9ybTogJ3RyYW5zZm9ybV9wcmljZSd9LFxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDkwLCB3aWR0aDogMTUwLCBuYW1lOiAn0JTQsNGC0LAnLCB0YWJsZV9uYW1lOiAnY3JlYXRlZF9hdCd9LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5jb250ZXh0X21lbnUgPSBbXG4gICAgICAgICAgICAgICAge25hbWU6J9Cg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMJywgYWN0aW9uOiAoZWxlbSk9Pnt0aGlzLm5ld0RpYWxvZygncHJvdmlkZXJPcmRlcicsIHtpZDplbGVtLmlkfSl9fSxcbiAgICAgICAgICAgICAgICB7bmFtZTon0J7RgtC60YDRi9GC0YwnLCBhY3Rpb246IChlbGVtKT0+e3RoaXMubmV3RGlhbG9nKCdwcm92aWRlck9yZGVyJywge2lkOmVsZW0uaWR9KX19LFxuICAgICAgICAgICAgICAgIC8vIHtuYW1lOifQo9C00LDQu9C40YLRjCcsIGFjdGlvbjogZnVuY3Rpb24oZGF0YSl7ZGQoZGF0YSk7fX0sXG4gICAgICAgICAgICAgICAgLy8ge25hbWU6J9Cj0LTQsNC70LjRgtGMINCy0YvQtNC10LvQtdC90L3Ri9C1JywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtkZChkYXRhKTt9LCBvbmx5X2dyb3VwOnRydWV9LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5kYmxfY2xpY2sgPSBpZCA9PiB0aGlzLm5ld0RpYWxvZygncHJvdmlkZXJPcmRlcicsIHtpZDppZH0pO1xuICAgICAgICAgICAgdGhpcy50YWJsZV9kYXRhLnVybCA9ICcvcHJvdmlkZXJfb3JkZXIvYmFzZS90YWJsZV9kYXRhJztcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyX2RhdGEgPSB7XG4gICAgICAgICAgICAgICAgZGF0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGVuZDogbnVsbCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZpbHRlcnM6W1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTon0KHRgtCw0YLRg9GBINC+0L/Qu9Cw0YLRiycsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlZDoncGF5bWVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uOltcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Ym9vbDpmYWxzZSwgdmFsOjAsIHRpdGxlOifQntC/0LvQsNGH0LXQvSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtib29sOmZhbHNlLCB2YWw6MSwgdGl0bGU6J9Cd0LUg0L7Qv9C70LDRh9C10L0nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Ym9vbDpmYWxzZSwgdmFsOjIsIHRpdGxlOifQntC/0LvQsNGH0LXQvSDRh9Cw0YHRgtC40YfQvdC+J30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jvb2w6ZmFsc2UsIHZhbDozLCB0aXRsZTon0J/QtdGA0LXQv9C70LDRh9C10L0nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6J9Ch0YLQsNGC0YPRgSDQv9C+0YHRgtGD0L/Qu9C10L3QuNGPJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVkOidlbnRyYW5jZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uOltcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Ym9vbDpmYWxzZSwgdmFsOjAsIHRpdGxlOifQp9Cw0YHRgtC40YfQvdC+J30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jvb2w6ZmFsc2UsIHZhbDoxLCB0aXRsZTon0J/QvtC70L3QvtGB0YLRjNGOJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jvb2w6ZmFsc2UsIHZhbDoyLCB0aXRsZTon0JHQtdC3INC/0L7RgdGC0YPQv9C70LXQvdC40LknfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOntcbiAgICAgICAgICAgIG5ld0RpYWxvZyh0YWcsIHBhcmFtcyA9IG51bGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRlbWl0KCdvcGVuRGlhbG9nJywge1xuICAgICAgICAgICAgICAgICAgICB0YWc6IHRhZyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGlyZWN0aXZlczoge2RlYm91bmNlfVxuICAgIH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJvdHRvbS1jb250YWluZXJcIiB9LCBbXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJib3gtbGlzdGVyXCIgfSwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJkLWZsZXggbWItMTVcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic2VhcmNoLWZpZWxkLWNvbnRhaW5lciB3LTEwMFwiIH0sIFtcbiAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWwubGF6eVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2VhcmNoLFxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzOiB7IGxhenk6IHRydWUgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJkZWJvdW5jZVwiLFxuICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1kZWJvdW5jZVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiA0NTAsXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCI0NTBcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaW5wdXQgdy0xMDBcIixcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIGlkOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICBuYW1lOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLQn9C+0LjRgdC6INC/0L4g0LfQsNGP0LLQutCw0Lwg0L/QvtGB0YLQsNCy0YnQuNC60YNcIixcbiAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5zZWFyY2ggfSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3ZtLnNlYXJjaCA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIF0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImFjdGlvbnNcIiB9LCBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gcHJpbWFyeSBtbC0xNSB3LTI5MFwiLFxuICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5uZXdEaWFsb2coXCJwcm92aWRlck9yZGVyXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdihcItCh0L7Qt9C00LDRgtGMINC30LDRj9Cy0LrRg1wiKV1cbiAgICAgICAgICApXG4gICAgICAgIF0pXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJkLWZsZXhcIiwgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcImNhbGMoMTAwJSAtIDQ1cHgpXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJUYWJsZVwiLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICB0YWJsZV9kYXRhOiBfdm0udGFibGVfZGF0YSxcbiAgICAgICAgICAgICAgZmlsdGVyX2RhdGE6IF92bS5maWx0ZXJfZGF0YSxcbiAgICAgICAgICAgICAgc2VhcmNoOiBfdm0uc2VhcmNoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcIkZpbHRlckJveFwiLCB7IGF0dHJzOiB7IGZpbHRlcl9kYXRhOiBfdm0uZmlsdGVyX2RhdGEgfSB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1Byb3ZpZGVyT3JkZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE2YTg1OWRhJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Byb3ZpZGVyT3JkZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Qcm92aWRlck9yZGVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiMTZhODU5ZGFcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcxNmE4NTlkYScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcxNmE4NTlkYScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcxNmE4NTlkYScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vUHJvdmlkZXJPcmRlci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTZhODU5ZGEmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMTZhODU5ZGEnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL1Byb3ZpZGVyT3JkZXIudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm92aWRlck9yZGVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm92aWRlck9yZGVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm92aWRlck9yZGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xNmE4NTlkYSZzY29wZWQ9dHJ1ZSZcIiJdLCJzb3VyY2VSb290IjoiIn0=