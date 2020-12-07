(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Entrance"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/Entrance.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Store/Entrance.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
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
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Entrance",
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

    this.table_data.url = '/entrance/base/table_data';
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/Entrance.vue?vue&type=template&id=4d4c7f20&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Store/Entrance.vue?vue&type=template&id=4d4c7f20&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
                [_vm._v("Создать поступление")]
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

/***/ "./resources/js/components/views/Store/Entrance.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/views/Store/Entrance.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Entrance_vue_vue_type_template_id_4d4c7f20_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entrance.vue?vue&type=template&id=4d4c7f20&scoped=true& */ "./resources/js/components/views/Store/Entrance.vue?vue&type=template&id=4d4c7f20&scoped=true&");
/* harmony import */ var _Entrance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Entrance.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Store/Entrance.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Entrance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Entrance_vue_vue_type_template_id_4d4c7f20_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Entrance_vue_vue_type_template_id_4d4c7f20_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4d4c7f20",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Store/Entrance.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Store/Entrance.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/views/Store/Entrance.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Entrance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Entrance.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/Entrance.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Entrance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Store/Entrance.vue?vue&type=template&id=4d4c7f20&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/views/Store/Entrance.vue?vue&type=template&id=4d4c7f20&scoped=true& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Entrance_vue_vue_type_template_id_4d4c7f20_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Entrance.vue?vue&type=template&id=4d4c7f20&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/Entrance.vue?vue&type=template&id=4d4c7f20&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Entrance_vue_vue_type_template_id_4d4c7f20_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Entrance_vue_vue_type_template_id_4d4c7f20_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvRW50cmFuY2UudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0VudHJhbmNlLnZ1ZT8xOGZiIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0VudHJhbmNlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9FbnRyYW5jZS52dWU/YmZiNiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9FbnRyYW5jZS52dWU/ZjNjOSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBREE7QUFFQTtBQUNBLGlFQURBO0FBQ0E7QUFEQSxHQUZBO0FBS0E7QUFDQTtBQUNBLG9CQURBO0FBRUEsZ0JBRkE7QUFHQSwwQkFIQTtBQUlBO0FBSkE7QUFNQSxHQVpBO0FBYUE7QUFDQSxXQURBLHFCQUNBO0FBQ0E7QUFDQTtBQUhBLEdBYkE7QUFrQkEsYUFsQkEseUJBa0JBO0FBQ0EsOEJBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBREEsRUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FGQSxFQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUhBLEVBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBSkEsRUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUxBLEVBTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBTkE7QUFRQSxvQ0FDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FEQSxFQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUZBLEVBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBSEE7O0FBT0E7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQURBO0FBRUE7QUFGQTtBQURBO0FBTUEsR0ExQ0E7QUEyQ0E7QUFBQTtBQUFBO0FBM0NBLEc7Ozs7Ozs7Ozs7OztBQzFCQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQ0FBa0M7QUFDdEQsZUFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBLFNBQVMsc0NBQXNDLDhCQUE4QixFQUFFO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsaUJBQWlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFNBQVMsK0JBQStCLEVBQUU7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM5Q0E7QUFBQTtBQUFBO0FBQUE7QUFBbUc7QUFDdkM7QUFDTDs7O0FBR3ZEO0FBQ21HO0FBQ25HLGdCQUFnQiwyR0FBVTtBQUMxQixFQUFFLDhFQUFNO0FBQ1IsRUFBRSwrRkFBTTtBQUNSLEVBQUUsd0dBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFJLEtBQVUsRUFBRSxZQWlCZjtBQUNEO0FBQ2UsZ0Y7Ozs7Ozs7Ozs7OztBQ3RDZjtBQUFBO0FBQUEsd0NBQW9NLENBQWdCLG9QQUFHLEVBQUMsQzs7Ozs7Ozs7Ozs7O0FDQXhOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJFbnRyYW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICAgIDxkaXYgY2xhc3M9XCJib3R0b20tY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJveC1saXN0ZXJcIj5cclxuPCEtLSAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggbWItMTVcIj4tLT5cclxuPCEtLSAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWZpZWxkLWNvbnRhaW5lciB3LTEwMFwiPi0tPlxyXG48IS0tICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbC5sYXp5PVwic2VhcmNoXCIgdi1kZWJvdW5jZT1cIjQ1MFwiIGlkPVwic2VhcmNoXCIgbmFtZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwi0J/QvtC40YHQuiDQv9C+INC/0L7RgdGC0YPQv9C70LXQvdC40Y/QvFwiIGNsYXNzPVwiaW5wdXQgdy0xMDBcIiB2YWx1ZT1cIlwiIHR5cGU9XCJ0ZXh0XCI+LS0+XHJcbjwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XHJcbjwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIj4tLT5cclxuPCEtLSAgICAgICAgICAgICAgICAgICAgLS0+XHJcbjwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XHJcbjwhLS0gICAgICAgICAgICA8L2Rpdj4tLT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleFwiIHN0eWxlPVwiaGVpZ2h0OiBjYWxjKDEwMCUgLSA0NXB4KTtcIj5cclxuICAgICAgICAgICAgICAgIDxUYWJsZSB2LWJpbmQ6dGFibGVfZGF0YT1cInRhYmxlX2RhdGFcIiB2LWJpbmQ6ZmlsdGVyX2RhdGE9XCJmaWx0ZXJfZGF0YVwiIHYtYmluZDpzZWFyY2g9XCJzZWFyY2hcIiAvPlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IG1sLTE1IG1iLTE1IHctMjkwXCIgdi1vbjpjbGljaz1cIm5ld0RpYWxvZygncHJvZHVjdCcpXCI+0KHQvtC30LTQsNGC0Ywg0L/QvtGB0YLRg9C/0LvQtdC90LjQtTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGaWx0ZXJCb3ggdi1iaW5kOmZpbHRlcl9kYXRhPVwiZmlsdGVyX2RhdGFcIi8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgICBpbXBvcnQgVGFibGUgZnJvbSBcIi4uLy4uL3NlcnZpY2UvVGFibGVcIjtcclxuICAgIGltcG9ydCBGaWx0ZXJCb3ggZnJvbSBcIi4uLy4uL3RlbXBsYXRlL0ZpbHRlckJveFwiO1xyXG4gICAgaW1wb3J0IGRlYm91bmNlIGZyb20gJy4vLi4vLi4vLi4vZGVib3VuY2UnO1xyXG4gICAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICAgIG5hbWU6IFwiRW50cmFuY2VcIixcclxuICAgICAgICBjb21wb25lbnRzOntcclxuICAgICAgICAgICAgVGFibGUsIEZpbHRlckJveFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YTogKCk9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0YWJsZV9kYXRhOnt9LFxyXG4gICAgICAgICAgICAgICAgc2VhcmNoOiAnJyxcclxuICAgICAgICAgICAgICAgIHRhYmxlX2xvYWRpbmc6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJfZGF0YTpmYWxzZSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcHV0ZWQ6e1xyXG4gICAgICAgICAgICBsb2FkaW5nKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YWJsZV9sb2FkaW5nO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmVmb3JlTW91bnQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5oZWFkZXIgPSBbXHJcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiA5MCwgd2lkdGg6IDkwLCBuYW1lOiAnSUQnLHRhYmxlX25hbWU6ICdpZCd9LFxyXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogMTUwLCB3aWR0aDogMTUwLCBuYW1lOiAn0JfQsNGP0LLQutCwJywgdGFibGVfbmFtZTogJ29yZGlkJ30sXHJcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxMzAsIHdpZHRoOiAnYXV0bycsIG5hbWU6ICfQn9C+0YHRgtCw0LLRidC40LonLCB0YWJsZV9uYW1lOiAncGFydG5lcid9LFxyXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogMTUwLCB3aWR0aDogJ2F1dG8nLCBuYW1lOiAn0J/RgNC40L3QuNC80LDRjtGJ0LjQuScsIHRhYmxlX25hbWU6ICdtYW5hZ2VyJ30sXHJcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxNTAsIHdpZHRoOiAyMDAsIG5hbWU6ICfQmtC+0LzQvNC10L3RgtCw0YDQuNC5JywgdGFibGVfbmFtZTogJ2NvbW1lbnQnLCB0cmFuc2Zvcm06ICd0cmFuc2Zvcm1fY29tbWVudCd9LFxyXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogMTUwLCB3aWR0aDogMTUwLCBuYW1lOiAn0JTQsNGC0LAnLCB0YWJsZV9uYW1lOiAnY3JlYXRlZF9hdCd9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlX2RhdGEuY29udGV4dF9tZW51ID0gW1xyXG4gICAgICAgICAgICAgICAge25hbWU6J9Cg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMJywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtvcGVuRGlhbG9nKCdlbnRyYW5jZURpYWxvZycsICcmZW50cmFuY2VfaWQ9JyArIGRhdGEuY29udGV4dGVkLmlkKX19LFxyXG4gICAgICAgICAgICAgICAge25hbWU6J9Ce0YLQutGA0YvRgtGMJywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtvcGVuRGlhbG9nKCdlbnRyYW5jZURpYWxvZycsICcmZW50cmFuY2VfaWQ9JyArIGRhdGEuY29udGV4dGVkLmlkKX19LFxyXG4gICAgICAgICAgICAgICAge25hbWU6J9Ce0YLQutGA0YvRgtGMINC30LDRj9Cy0LrRgycsIGFjdGlvbjogZnVuY3Rpb24oZGF0YSl7b3BlbkRpYWxvZygnY2xpZW50b3JkZXJEaWFsb2cnLCAnJmNsaWVudF9vcmRlcl9pZD0nICsgZGF0YS5jb250ZXh0ZWQub3JkaWQpfX0sXHJcbiAgICAgICAgICAgICAgICAvLyB7bmFtZTon0KPQtNCw0LvQuNGC0YwnLCBhY3Rpb246IGZ1bmN0aW9uKGRhdGEpe2RkKGRhdGEpO319LFxyXG4gICAgICAgICAgICAgICAgLy8ge25hbWU6J9Cj0LTQsNC70LjRgtGMINCy0YvQtNC10LvQtdC90L3Ri9C1JywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtkZChkYXRhKTt9LCBvbmx5X2dyb3VwOnRydWV9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlX2RhdGEuZGJsX2NsaWNrID0gZnVuY3Rpb24oaWQpe29wZW5EaWFsb2coJ2VudHJhbmNlRGlhbG9nJywgJyZlbnRyYW5jZV9pZD0nICsgaWQpfTtcclxuICAgICAgICAgICAgdGhpcy50YWJsZV9kYXRhLnVybCA9ICcvZW50cmFuY2UvYmFzZS90YWJsZV9kYXRhJztcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJfZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGRhdGVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpcmVjdGl2ZXM6IHtkZWJvdW5jZX1cclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG5cclxuPC9zdHlsZT5cclxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJvdHRvbS1jb250YWluZXJcIiB9LCBbXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJib3gtbGlzdGVyXCIgfSwgW1xuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZC1mbGV4XCIsIHN0YXRpY1N0eWxlOiB7IGhlaWdodDogXCJjYWxjKDEwMCUgLSA0NXB4KVwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiVGFibGVcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgdGFibGVfZGF0YTogX3ZtLnRhYmxlX2RhdGEsXG4gICAgICAgICAgICAgIGZpbHRlcl9kYXRhOiBfdm0uZmlsdGVyX2RhdGEsXG4gICAgICAgICAgICAgIHNlYXJjaDogX3ZtLnNlYXJjaFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBwcmltYXJ5IG1sLTE1IG1iLTE1IHctMjkwXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5uZXdEaWFsb2coXCJwcm9kdWN0XCIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQodC+0LfQtNCw0YLRjCDQv9C+0YHRgtGD0L/Qu9C10L3QuNC1XCIpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcIkZpbHRlckJveFwiLCB7IGF0dHJzOiB7IGZpbHRlcl9kYXRhOiBfdm0uZmlsdGVyX2RhdGEgfSB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vRW50cmFuY2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRkNGM3ZjIwJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0VudHJhbmNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vRW50cmFuY2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI0ZDRjN2YyMFwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9wZW5TZXJ2ZXJcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzRkNGM3ZjIwJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzRkNGM3ZjIwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzRkNGM3ZjIwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9FbnRyYW5jZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NGQ0YzdmMjAmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNGQ0YzdmMjAnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0VudHJhbmNlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRW50cmFuY2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0VudHJhbmNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9FbnRyYW5jZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NGQ0YzdmMjAmc2NvcGVkPXRydWUmXCIiXSwic291cmNlUm9vdCI6IiJ9