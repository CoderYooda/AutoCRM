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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvRW50cmFuY2UudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0VudHJhbmNlLnZ1ZT8xOGZiIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0VudHJhbmNlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9FbnRyYW5jZS52dWU/YmZiNiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9FbnRyYW5jZS52dWU/ZjNjOSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBREE7QUFFQTtBQUNBLGlFQURBO0FBQ0E7QUFEQSxHQUZBO0FBS0E7QUFDQTtBQUNBLG9CQURBO0FBRUEsZ0JBRkE7QUFHQSwwQkFIQTtBQUlBO0FBSkE7QUFNQSxHQVpBO0FBYUE7QUFDQSxXQURBLHFCQUNBO0FBQ0E7QUFDQTtBQUhBLEdBYkE7QUFrQkEsYUFsQkEseUJBa0JBO0FBQ0EsOEJBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBREEsRUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FGQSxFQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUhBLEVBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBSkEsRUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUxBLEVBTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBTkE7QUFRQSxvQ0FDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FEQSxFQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUZBLEVBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBSEE7O0FBT0E7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQURBO0FBRUE7QUFGQTtBQURBO0FBTUEsR0ExQ0E7QUEyQ0E7QUFBQTtBQUFBO0FBM0NBLEc7Ozs7Ozs7Ozs7OztBQzFCQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQ0FBa0M7QUFDdEQsZUFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBLFNBQVMsc0NBQXNDLDhCQUE4QixFQUFFO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsaUJBQWlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFNBQVMsK0JBQStCLEVBQUU7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM5Q0E7QUFBQTtBQUFBO0FBQUE7QUFBbUc7QUFDdkM7QUFDTDs7O0FBR3ZEO0FBQ21HO0FBQ25HLGdCQUFnQiwyR0FBVTtBQUMxQixFQUFFLDhFQUFNO0FBQ1IsRUFBRSwrRkFBTTtBQUNSLEVBQUUsd0dBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFJLEtBQVUsRUFBRSxZQWlCZjtBQUNEO0FBQ2UsZ0Y7Ozs7Ozs7Ozs7OztBQ3RDZjtBQUFBO0FBQUEsd0NBQW9NLENBQWdCLG9QQUFHLEVBQUMsQzs7Ozs7Ozs7Ozs7O0FDQXhOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJFbnRyYW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiYm90dG9tLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94LWxpc3RlclwiPlxuPCEtLSAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggbWItMTVcIj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1maWVsZC1jb250YWluZXIgdy0xMDBcIj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2LW1vZGVsLmxhenk9XCJzZWFyY2hcIiB2LWRlYm91bmNlPVwiNDUwXCIgaWQ9XCJzZWFyY2hcIiBuYW1lPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCLQn9C+0LjRgdC6INC/0L4g0L/QvtGB0YLRg9C/0LvQtdC90LjRj9C8XCIgY2xhc3M9XCJpbnB1dCB3LTEwMFwiIHZhbHVlPVwiXCIgdHlwZT1cInRleHRcIj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG48IS0tICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zXCI+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAtLT5cbjwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG48IS0tICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4XCIgc3R5bGU9XCJoZWlnaHQ6IGNhbGMoMTAwJSAtIDQ1cHgpO1wiPlxuICAgICAgICAgICAgICAgIDxUYWJsZSB2LWJpbmQ6dGFibGVfZGF0YT1cInRhYmxlX2RhdGFcIiB2LWJpbmQ6ZmlsdGVyX2RhdGE9XCJmaWx0ZXJfZGF0YVwiIHYtYmluZDpzZWFyY2g9XCJzZWFyY2hcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHByaW1hcnkgbWwtMTUgbWItMTUgdy0yOTBcIiB2LW9uOmNsaWNrPVwibmV3RGlhbG9nKCdwcm9kdWN0JylcIj7QodC+0LfQtNCw0YLRjCDQv9C+0YHRgtGD0L/Qu9C10L3QuNC1PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxGaWx0ZXJCb3ggdi1iaW5kOmZpbHRlcl9kYXRhPVwiZmlsdGVyX2RhdGFcIi8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBUYWJsZSBmcm9tIFwiLi4vLi4vc2VydmljZS9UYWJsZVwiO1xuICAgIGltcG9ydCBGaWx0ZXJCb3ggZnJvbSBcIi4uLy4uL3RlbXBsYXRlL0ZpbHRlckJveFwiO1xuICAgIGltcG9ydCBkZWJvdW5jZSBmcm9tICcuLy4uLy4uLy4uL2RlYm91bmNlJztcbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIG5hbWU6IFwiRW50cmFuY2VcIixcbiAgICAgICAgY29tcG9uZW50czp7XG4gICAgICAgICAgICBUYWJsZSwgRmlsdGVyQm94XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6ICgpPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0YWJsZV9kYXRhOnt9LFxuICAgICAgICAgICAgICAgIHNlYXJjaDogJycsXG4gICAgICAgICAgICAgICAgdGFibGVfbG9hZGluZzpmYWxzZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJfZGF0YTpmYWxzZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6e1xuICAgICAgICAgICAgbG9hZGluZygpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYmxlX2xvYWRpbmc7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBiZWZvcmVNb3VudCgpIHtcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5oZWFkZXIgPSBbXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogOTAsIHdpZHRoOiA5MCwgbmFtZTogJ0lEJyx0YWJsZV9uYW1lOiAnaWQnfSxcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxNTAsIHdpZHRoOiAxNTAsIG5hbWU6ICfQl9Cw0Y/QstC60LAnLCB0YWJsZV9uYW1lOiAnb3JkaWQnfSxcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxMzAsIHdpZHRoOiAnYXV0bycsIG5hbWU6ICfQn9C+0YHRgtCw0LLRidC40LonLCB0YWJsZV9uYW1lOiAncGFydG5lcid9LFxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDE1MCwgd2lkdGg6ICdhdXRvJywgbmFtZTogJ9Cf0YDQuNC90LjQvNCw0Y7RidC40LknLCB0YWJsZV9uYW1lOiAnbWFuYWdlcid9LFxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDE1MCwgd2lkdGg6IDIwMCwgbmFtZTogJ9Ca0L7QvNC80LXQvdGC0LDRgNC40LknLCB0YWJsZV9uYW1lOiAnY29tbWVudCcsIHRyYW5zZm9ybTogJ3RyYW5zZm9ybV9jb21tZW50J30sXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogMTUwLCB3aWR0aDogMTUwLCBuYW1lOiAn0JTQsNGC0LAnLCB0YWJsZV9uYW1lOiAnY3JlYXRlZF9hdCd9LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5jb250ZXh0X21lbnUgPSBbXG4gICAgICAgICAgICAgICAge25hbWU6J9Cg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMJywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtvcGVuRGlhbG9nKCdlbnRyYW5jZURpYWxvZycsICcmZW50cmFuY2VfaWQ9JyArIGRhdGEuY29udGV4dGVkLmlkKX19LFxuICAgICAgICAgICAgICAgIHtuYW1lOifQntGC0LrRgNGL0YLRjCcsIGFjdGlvbjogZnVuY3Rpb24oZGF0YSl7b3BlbkRpYWxvZygnZW50cmFuY2VEaWFsb2cnLCAnJmVudHJhbmNlX2lkPScgKyBkYXRhLmNvbnRleHRlZC5pZCl9fSxcbiAgICAgICAgICAgICAgICB7bmFtZTon0J7RgtC60YDRi9GC0Ywg0LfQsNGP0LLQutGDJywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtvcGVuRGlhbG9nKCdjbGllbnRvcmRlckRpYWxvZycsICcmY2xpZW50X29yZGVyX2lkPScgKyBkYXRhLmNvbnRleHRlZC5vcmRpZCl9fSxcbiAgICAgICAgICAgICAgICAvLyB7bmFtZTon0KPQtNCw0LvQuNGC0YwnLCBhY3Rpb246IGZ1bmN0aW9uKGRhdGEpe2RkKGRhdGEpO319LFxuICAgICAgICAgICAgICAgIC8vIHtuYW1lOifQo9C00LDQu9C40YLRjCDQstGL0LTQtdC70LXQvdC90YvQtScsIGFjdGlvbjogZnVuY3Rpb24oZGF0YSl7ZGQoZGF0YSk7fSwgb25seV9ncm91cDp0cnVlfSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICB0aGlzLnRhYmxlX2RhdGEuZGJsX2NsaWNrID0gZnVuY3Rpb24oaWQpe29wZW5EaWFsb2coJ2VudHJhbmNlRGlhbG9nJywgJyZlbnRyYW5jZV9pZD0nICsgaWQpfTtcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS51cmwgPSAnL2VudHJhbmNlL2Jhc2UvdGFibGVfZGF0YSc7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcl9kYXRhID0ge1xuICAgICAgICAgICAgICAgIGRhdGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBlbmQ6IG51bGwsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGRpcmVjdGl2ZXM6IHtkZWJvdW5jZX1cbiAgICB9XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJib3R0b20tY29udGFpbmVyXCIgfSwgW1xuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYm94LWxpc3RlclwiIH0sIFtcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImQtZmxleFwiLCBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiY2FsYygxMDAlIC0gNDVweClcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcIlRhYmxlXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHRhYmxlX2RhdGE6IF92bS50YWJsZV9kYXRhLFxuICAgICAgICAgICAgICBmaWx0ZXJfZGF0YTogX3ZtLmZpbHRlcl9kYXRhLFxuICAgICAgICAgICAgICBzZWFyY2g6IF92bS5zZWFyY2hcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gcHJpbWFyeSBtbC0xNSBtYi0xNSB3LTI5MFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ubmV3RGlhbG9nKFwicHJvZHVjdFwiKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0KHQvtC30LTQsNGC0Ywg0L/QvtGB0YLRg9C/0LvQtdC90LjQtVwiKV1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJGaWx0ZXJCb3hcIiwgeyBhdHRyczogeyBmaWx0ZXJfZGF0YTogX3ZtLmZpbHRlcl9kYXRhIH0gfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0VudHJhbmNlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00ZDRjN2YyMCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9FbnRyYW5jZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0VudHJhbmNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiNGQ0YzdmMjBcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc0ZDRjN2YyMCcpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc0ZDRjN2YyMCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc0ZDRjN2YyMCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vRW50cmFuY2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRkNGM3ZjIwJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzRkNGM3ZjIwJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9FbnRyYW5jZS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0VudHJhbmNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9FbnRyYW5jZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRW50cmFuY2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRkNGM3ZjIwJnNjb3BlZD10cnVlJlwiIl0sInNvdXJjZVJvb3QiOiIifQ==