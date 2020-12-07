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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvUHJvdmlkZXJPcmRlci52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvUHJvdmlkZXJPcmRlci52dWU/N2RmYSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9Qcm92aWRlck9yZGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9Qcm92aWRlck9yZGVyLnZ1ZT8zMDU5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL1Byb3ZpZGVyT3JkZXIudnVlP2U5YTQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQURBO0FBRUE7QUFDQSxpRUFEQTtBQUNBO0FBREEsR0FGQTtBQUtBO0FBQ0E7QUFDQSxvQkFEQTtBQUVBLGdCQUZBO0FBR0EsMEJBSEE7QUFJQTtBQUpBO0FBTUEsR0FaQTtBQWFBO0FBQ0EsV0FEQSxxQkFDQTtBQUNBO0FBQ0E7QUFIQSxHQWJBO0FBa0JBLGFBbEJBLHlCQWtCQTtBQUNBLDhCQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQURBLEVBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FGQSxFQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBSEEsRUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FKQSxFQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUxBLEVBTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FOQSxFQU9BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQVBBO0FBU0Esb0NBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBREEsRUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FGQTs7QUFNQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBREE7QUFFQTtBQUZBLE9BREE7QUFLQSxnQkFDQTtBQUNBLDhCQURBO0FBRUEsd0JBRkE7QUFHQSxxQkFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBREEsRUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBRkEsRUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSEEsRUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSkE7QUFIQSxPQURBLEVBV0E7QUFDQSxtQ0FEQTtBQUVBLHlCQUZBO0FBR0EscUJBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURBLEVBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUZBLEVBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUhBO0FBSEEsT0FYQTtBQUxBO0FBMkJBLEdBL0RBO0FBZ0VBO0FBQUE7QUFBQTtBQWhFQSxHOzs7Ozs7Ozs7Ozs7QUN2QkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0NBQWtDO0FBQ3RELGVBQWUsNEJBQTRCO0FBQzNDLGlCQUFpQiw4QkFBOEI7QUFDL0MsbUJBQW1CLDhDQUE4QztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYix1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLG1CQUFtQix5QkFBeUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLHNDQUFzQyw4QkFBOEIsRUFBRTtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLDJCQUEyQixTQUFTLCtCQUErQixFQUFFO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDOUVBO0FBQUE7QUFBQTtBQUFBO0FBQXdHO0FBQ3ZDO0FBQ0w7OztBQUc1RDtBQUNtRztBQUNuRyxnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSxtRkFBTTtBQUNSLEVBQUUsb0dBQU07QUFDUixFQUFFLDZHQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxLQUFVLEVBQUUsWUFpQmY7QUFDRDtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN0Q2Y7QUFBQTtBQUFBLHdDQUF5TSxDQUFnQix5UEFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0E3TjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiUHJvdmlkZXJPcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICAgIDxkaXYgY2xhc3M9XCJib3R0b20tY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJveC1saXN0ZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBtYi0xNVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1maWVsZC1jb250YWluZXIgdy0xMDBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbC5sYXp5PVwic2VhcmNoXCIgdi1kZWJvdW5jZT1cIjQ1MFwiIGlkPVwic2VhcmNoXCIgbmFtZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwi0J/QvtC40YHQuiDQv9C+INC30LDRj9Cy0LrQsNC8INC/0L7RgdGC0LDQstGJ0LjQutGDXCIgY2xhc3M9XCJpbnB1dCB3LTEwMFwiIHZhbHVlPVwiXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IG1sLTE1IHctMjkwXCIgdi1vbjpjbGljaz1cIm5ld0RpYWxvZygncHJvZHVjdCcpXCI+0KHQvtC30LTQsNGC0Ywg0LfQsNGP0LLQutGDPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXhcIiBzdHlsZT1cImhlaWdodDogY2FsYygxMDAlIC0gNDVweCk7XCI+XHJcbiAgICAgICAgICAgICAgICA8VGFibGUgdi1iaW5kOnRhYmxlX2RhdGE9XCJ0YWJsZV9kYXRhXCIgdi1iaW5kOmZpbHRlcl9kYXRhPVwiZmlsdGVyX2RhdGFcIiB2LWJpbmQ6c2VhcmNoPVwic2VhcmNoXCIgLz5cclxuICAgICAgICAgICAgICAgIDxGaWx0ZXJCb3ggdi1iaW5kOmZpbHRlcl9kYXRhPVwiZmlsdGVyX2RhdGFcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gICAgaW1wb3J0IFRhYmxlIGZyb20gXCIuLi8uLi9zZXJ2aWNlL1RhYmxlXCI7XHJcbiAgICBpbXBvcnQgRmlsdGVyQm94IGZyb20gXCIuLi8uLi90ZW1wbGF0ZS9GaWx0ZXJCb3hcIjtcclxuICAgIGltcG9ydCBkZWJvdW5jZSBmcm9tICcuLy4uLy4uLy4uL2RlYm91bmNlJztcclxuICAgIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgICAgICBuYW1lOiBcIlByb3ZpZGVyT3JkZXJcIixcclxuICAgICAgICBjb21wb25lbnRzOntcclxuICAgICAgICAgICAgVGFibGUsIEZpbHRlckJveFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YTogKCk9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0YWJsZV9kYXRhOnt9LFxyXG4gICAgICAgICAgICAgICAgc2VhcmNoOiAnJyxcclxuICAgICAgICAgICAgICAgIHRhYmxlX2xvYWRpbmc6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJfZGF0YTpmYWxzZSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcHV0ZWQ6e1xyXG4gICAgICAgICAgICBsb2FkaW5nKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YWJsZV9sb2FkaW5nO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmVmb3JlTW91bnQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5oZWFkZXIgPSBbXHJcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiA5MCwgd2lkdGg6IDkwLCBuYW1lOiAnSUQnLHRhYmxlX25hbWU6ICdpZCd9LFxyXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogNjAsIHdpZHRoOiAxNTAsIG5hbWU6ICfQntC/0LvQsNGC0LAnLCB0YWJsZV9uYW1lOiAncGF5cycsIHRyYW5zZm9ybTogJ3RyYW5zZm9ybV9pY28nfSxcclxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDYwLCB3aWR0aDogMTUwLCBuYW1lOiAn0J/QvtGB0YLRg9C/0LvQtdC90LjQtScsIHRhYmxlX25hbWU6ICdpbmNvbWVzJywgdHJhbnNmb3JtOiAndHJhbnNmb3JtX2ljbyd9LFxyXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogMTIwLCB3aWR0aDogMjAwLCBuYW1lOiAn0J/QvtGB0YLQsNCy0YnQuNC6JywgdGFibGVfbmFtZTogJ3BhcnRuZXJfbmFtZSd9LFxyXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogMTIwLCB3aWR0aDogJ2F1dG8nLCBuYW1lOiAn0J7RgtCy0LXRgtGB0YLQstC10L3QvdGL0LknLCB0YWJsZV9uYW1lOiAnbWFuYWdlcl9uYW1lJ30sXHJcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiA5MCwgd2lkdGg6IDIwMCwgbmFtZTogJ9Ch0YPQvNC80LAnLCB0YWJsZV9uYW1lOiAnc3VtbScsIHRyYW5zZm9ybTogJ3RyYW5zZm9ybV9wcmljZSd9LFxyXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogOTAsIHdpZHRoOiAxNTAsIG5hbWU6ICfQlNCw0YLQsCcsIHRhYmxlX25hbWU6ICdjcmVhdGVkX2F0J30sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5jb250ZXh0X21lbnUgPSBbXHJcbiAgICAgICAgICAgICAgICB7bmFtZTon0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YwnLCBhY3Rpb246IGZ1bmN0aW9uKGRhdGEpe29wZW5EaWFsb2coJ3Byb3ZpZGVyT3JkZXJEaWFsb2cnLCAnJnByb3ZpZGVyX29yZGVyX2lkPScgKyBkYXRhLmNvbnRleHRlZC5pZCl9fSxcclxuICAgICAgICAgICAgICAgIHtuYW1lOifQntGC0LrRgNGL0YLRjCcsIGFjdGlvbjogZnVuY3Rpb24oZGF0YSl7b3BlbkRpYWxvZygncHJvdmlkZXJPcmRlckRpYWxvZycsICcmcHJvdmlkZXJfb3JkZXJfaWQ9JyArIGRhdGEuY29udGV4dGVkLmlkKX19LFxyXG4gICAgICAgICAgICAgICAgLy8ge25hbWU6J9Cj0LTQsNC70LjRgtGMJywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtkZChkYXRhKTt9fSxcclxuICAgICAgICAgICAgICAgIC8vIHtuYW1lOifQo9C00LDQu9C40YLRjCDQstGL0LTQtdC70LXQvdC90YvQtScsIGFjdGlvbjogZnVuY3Rpb24oZGF0YSl7ZGQoZGF0YSk7fSwgb25seV9ncm91cDp0cnVlfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy50YWJsZV9kYXRhLmRibF9jbGljayA9IGlkID0+IG9wZW5EaWFsb2coJ3Byb3ZpZGVyT3JkZXJEaWFsb2cnLCAnJnByb3ZpZGVyX29yZGVyX2lkPScgKyBpZCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS51cmwgPSAnL3Byb3ZpZGVyX29yZGVyL2Jhc2UvdGFibGVfZGF0YSc7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyX2RhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDogbnVsbCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJzOltcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOifQodGC0LDRgtGD0YEg0L7Qv9C70LDRgtGLJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZWQ6J3BheW1lbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uOltcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtib29sOmZhbHNlLCB2YWw6MCwgdGl0bGU6J9Ce0L/Qu9Cw0YfQtdC9J30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Ym9vbDpmYWxzZSwgdmFsOjEsIHRpdGxlOifQndC1INC+0L/Qu9Cw0YfQtdC9J30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Ym9vbDpmYWxzZSwgdmFsOjIsIHRpdGxlOifQntC/0LvQsNGH0LXQvSDRh9Cw0YHRgtC40YfQvdC+J30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Ym9vbDpmYWxzZSwgdmFsOjMsIHRpdGxlOifQn9C10YDQtdC/0LvQsNGH0LXQvSd9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOifQodGC0LDRgtGD0YEg0L/QvtGB0YLRg9C/0LvQtdC90LjRjycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVkOidlbnRyYW5jZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb246W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jvb2w6ZmFsc2UsIHZhbDowLCB0aXRsZTon0KfQsNGB0YLQuNGH0L3Qvid9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jvb2w6ZmFsc2UsIHZhbDoxLCB0aXRsZTon0J/QvtC70L3QvtGB0YLRjNGOJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Ym9vbDpmYWxzZSwgdmFsOjIsIHRpdGxlOifQkdC10Lcg0L/QvtGB0YLRg9C/0LvQtdC90LjQuSd9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpcmVjdGl2ZXM6IHtkZWJvdW5jZX1cclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG5cclxuPC9zdHlsZT5cclxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJvdHRvbS1jb250YWluZXJcIiB9LCBbXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJib3gtbGlzdGVyXCIgfSwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJkLWZsZXggbWItMTVcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic2VhcmNoLWZpZWxkLWNvbnRhaW5lciB3LTEwMFwiIH0sIFtcbiAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWwubGF6eVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2VhcmNoLFxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzOiB7IGxhenk6IHRydWUgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJkZWJvdW5jZVwiLFxuICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1kZWJvdW5jZVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiA0NTAsXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCI0NTBcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaW5wdXQgdy0xMDBcIixcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIGlkOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICBuYW1lOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLQn9C+0LjRgdC6INC/0L4g0LfQsNGP0LLQutCw0Lwg0L/QvtGB0YLQsNCy0YnQuNC60YNcIixcbiAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5zZWFyY2ggfSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3ZtLnNlYXJjaCA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIF0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImFjdGlvbnNcIiB9LCBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gcHJpbWFyeSBtbC0xNSB3LTI5MFwiLFxuICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5uZXdEaWFsb2coXCJwcm9kdWN0XCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdihcItCh0L7Qt9C00LDRgtGMINC30LDRj9Cy0LrRg1wiKV1cbiAgICAgICAgICApXG4gICAgICAgIF0pXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJkLWZsZXhcIiwgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcImNhbGMoMTAwJSAtIDQ1cHgpXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJUYWJsZVwiLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICB0YWJsZV9kYXRhOiBfdm0udGFibGVfZGF0YSxcbiAgICAgICAgICAgICAgZmlsdGVyX2RhdGE6IF92bS5maWx0ZXJfZGF0YSxcbiAgICAgICAgICAgICAgc2VhcmNoOiBfdm0uc2VhcmNoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcIkZpbHRlckJveFwiLCB7IGF0dHJzOiB7IGZpbHRlcl9kYXRhOiBfdm0uZmlsdGVyX2RhdGEgfSB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1Byb3ZpZGVyT3JkZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE2YTg1OWRhJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Byb3ZpZGVyT3JkZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Qcm92aWRlck9yZGVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiMTZhODU5ZGFcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcxNmE4NTlkYScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcxNmE4NTlkYScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcxNmE4NTlkYScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vUHJvdmlkZXJPcmRlci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTZhODU5ZGEmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMTZhODU5ZGEnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL1Byb3ZpZGVyT3JkZXIudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm92aWRlck9yZGVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm92aWRlck9yZGVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm92aWRlck9yZGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xNmE4NTlkYSZzY29wZWQ9dHJ1ZSZcIiJdLCJzb3VyY2VSb290IjoiIn0=