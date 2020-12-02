(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Entrance~EntranceRefund~ProviderOrder"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/FilterBox.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/FilterBox.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  name: "FilterBox",
  props: ['filter_data'],
  data: function data() {
    return {};
  },
  // watch: {
  //     $route(to, from) {
  //         this.setRootCategory();
  //         this.getCategories();
  //     }
  // },
  mounted: function mounted() {},
  computed: {
    start: function start() {
      var date = new Date(this.filter_data.dates.start);
      return this.filter_data.dates.start ? date.ddmmyyy() : 'от';
    },
    end: function end() {
      var date = new Date(this.filter_data.dates.end);
      return this.filter_data.dates.end ? date.ddmmyyy() : 'до';
    },
    dates_applied: function dates_applied() {
      return Boolean(this.filter_data.dates);
    },
    isAllPeriod: function isAllPeriod() {
      return !Boolean(this.filter_data.dates.start && this.filter_data.dates.end);
    }
  },
  methods: {
    unsetDate: function unsetDate() {
      this.filter_data.dates = {
        start: null,
        end: null
      };
      this.$notify({
        group: 'main',
        title: 'Фильтр',
        text: 'Дата очищена'
      });
    },
    unset: function unset(filter) {
      filter.collection.forEach(function (item) {
        item.bool = false;
      });
      this.$notify({
        group: 'main',
        title: 'Фильтр',
        text: 'Статус оплаты очищен'
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/FilterBox.vue?vue&type=template&id=de7a136e&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/FilterBox.vue?vue&type=template&id=de7a136e&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { staticClass: "ml-15" },
    [
      _vm.dates_applied
        ? _c("v-date-picker", {
            staticClass: "mb-15",
            attrs: { value: "range", color: "blue", "is-range": "" },
            model: {
              value: _vm.filter_data.dates,
              callback: function($$v) {
                _vm.$set(_vm.filter_data, "dates", $$v)
              },
              expression: "filter_data.dates"
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "box w-290 p-15 filter-panel" },
        [
          _c("div", { staticClass: "box-title" }, [_vm._v("Фильтр")]),
          _vm._v(" "),
          _vm.dates_applied
            ? _c("div", { staticClass: "filter_pos mb-10" }, [
                _c("div", { staticClass: "form-group mb-0 d-flex" }, [
                  _c("label", { staticClass: "no-wrap" }, [
                    _vm._v("Период "),
                    _vm.isAllPeriod
                      ? _c("span", { staticClass: "text-muted" }, [
                          _vm._v("( за всё время )")
                        ])
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "clear_filter",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return _vm.unsetDate()
                        }
                      }
                    },
                    [_vm._v("очистить")]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-group d-flex mb-10" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.start,
                        expression: "start"
                      }
                    ],
                    staticStyle: { width: "90px", flex: "1" },
                    attrs: { type: "text", disabled: "" },
                    domProps: { value: _vm.start },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.start = $event.target.value
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("span", { staticClass: "defis" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.end,
                        expression: "end"
                      }
                    ],
                    staticStyle: { width: "90px", flex: "1" },
                    attrs: { type: "text", disabled: "" },
                    domProps: { value: _vm.end },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.end = $event.target.value
                      }
                    }
                  })
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.filter_data.filters, function(filter) {
            return _c(
              "div",
              { key: filter.filed, staticClass: "filter_pos mb-10" },
              [
                _c("div", { staticClass: "form-group d-flex mb-0" }, [
                  _c("label", { staticClass: "no-wrap" }, [
                    _vm._v(_vm._s(filter.title))
                  ]),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "clear_filter",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return _vm.unset(filter)
                        }
                      }
                    },
                    [_vm._v("очистить")]
                  )
                ]),
                _vm._v(" "),
                _vm._l(filter.collection, function(item) {
                  return _c("div", { staticClass: "form-group d-flex mb-0" }, [
                    _c("div", { staticClass: "header-elem checkbox" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: item.bool,
                            expression: "item.bool"
                          }
                        ],
                        attrs: {
                          id: filter.filed + item.title,
                          type: "checkbox"
                        },
                        domProps: {
                          checked: Array.isArray(item.bool)
                            ? _vm._i(item.bool, null) > -1
                            : item.bool
                        },
                        on: {
                          change: function($event) {
                            var $$a = item.bool,
                              $$el = $event.target,
                              $$c = $$el.checked ? true : false
                            if (Array.isArray($$a)) {
                              var $$v = null,
                                $$i = _vm._i($$a, $$v)
                              if ($$el.checked) {
                                $$i < 0 &&
                                  _vm.$set(item, "bool", $$a.concat([$$v]))
                              } else {
                                $$i > -1 &&
                                  _vm.$set(
                                    item,
                                    "bool",
                                    $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                                  )
                              }
                            } else {
                              _vm.$set(item, "bool", $$c)
                            }
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c("label", { attrs: { for: filter.filed + item.title } })
                    ]),
                    _vm._v(" "),
                    _c(
                      "label",
                      {
                        staticClass: "checkbox_label flex-1",
                        attrs: { for: filter.filed + item.title }
                      },
                      [_vm._v(_vm._s(item.title))]
                    )
                  ])
                })
              ],
              2
            )
          })
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/template/FilterBox.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/template/FilterBox.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FilterBox_vue_vue_type_template_id_de7a136e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FilterBox.vue?vue&type=template&id=de7a136e&scoped=true& */ "./resources/js/components/template/FilterBox.vue?vue&type=template&id=de7a136e&scoped=true&");
/* harmony import */ var _FilterBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FilterBox.vue?vue&type=script&lang=js& */ "./resources/js/components/template/FilterBox.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FilterBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FilterBox_vue_vue_type_template_id_de7a136e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FilterBox_vue_vue_type_template_id_de7a136e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "de7a136e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/template/FilterBox.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/template/FilterBox.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/template/FilterBox.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FilterBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./FilterBox.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/FilterBox.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FilterBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/template/FilterBox.vue?vue&type=template&id=de7a136e&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/template/FilterBox.vue?vue&type=template&id=de7a136e&scoped=true& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FilterBox_vue_vue_type_template_id_de7a136e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./FilterBox.vue?vue&type=template&id=de7a136e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/FilterBox.vue?vue&type=template&id=de7a136e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FilterBox_vue_vue_type_template_id_de7a136e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FilterBox_vue_vue_type_template_id_de7a136e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRmlsdGVyQm94LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9GaWx0ZXJCb3gudnVlPzFkMjgiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRmlsdGVyQm94LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9GaWx0ZXJCb3gudnVlP2RhMTgiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRmlsdGVyQm94LnZ1ZT9jMTZmIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1DQTtBQUNBLG1CQURBO0FBRUEsd0JBRkE7QUFHQTtBQUNBO0FBR0EsR0FQQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBZEEscUJBY0EsQ0FFQSxDQWhCQTtBQWlCQTtBQUNBLFNBREEsbUJBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FKQTtBQUtBLE9BTEEsaUJBS0E7QUFDQTtBQUNBO0FBQ0EsS0FSQTtBQVNBLGlCQVRBLDJCQVNBO0FBQ0E7QUFDQSxLQVhBO0FBWUEsZUFaQSx5QkFZQTtBQUNBO0FBQ0E7QUFkQSxHQWpCQTtBQWlDQTtBQUNBLGFBREEsdUJBQ0E7QUFDQTtBQUNBLG1CQURBO0FBRUE7QUFGQTtBQUlBO0FBQ0EscUJBREE7QUFFQSx1QkFGQTtBQUdBO0FBSEE7QUFLQSxLQVhBO0FBWUEsU0FaQSxpQkFZQSxNQVpBLEVBWUE7QUFDQTtBQUNBO0FBQ0EsT0FGQTtBQUdBO0FBQ0EscUJBREE7QUFFQSx1QkFGQTtBQUdBO0FBSEE7QUFLQTtBQXJCQTtBQWpDQSxHOzs7Ozs7Ozs7Ozs7QUNuQ0E7QUFBQTtBQUFBO0FBQUE7QUFD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RW50cmFuY2VSZWZ1bmR+UHJvdmlkZXJPcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwibWwtMTVcIj5cbiAgICAgICAgPHYtZGF0ZS1waWNrZXIgdi1pZj1cImRhdGVzX2FwcGxpZWRcIiB2LW1vZGVsPVwiZmlsdGVyX2RhdGEuZGF0ZXNcIiB2YWx1ZT1cInJhbmdlXCIgY29sb3I9XCJibHVlXCIgaXMtcmFuZ2UgY2xhc3M9XCJtYi0xNVwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3ggdy0yOTAgcC0xNSBmaWx0ZXItcGFuZWxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3gtdGl0bGVcIj7QpNC40LvRjNGC0YA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgdi1pZj1cImRhdGVzX2FwcGxpZWRcIiBjbGFzcz1cImZpbHRlcl9wb3MgbWItMTBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0wIGQtZmxleFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJuby13cmFwXCIgPtCf0LXRgNC40L7QtCA8c3BhbiBjbGFzcz1cInRleHQtbXV0ZWRcIiB2LWlmPVwiaXNBbGxQZXJpb2RcIj4oINC30LAg0LLRgdGRINCy0YDQtdC80Y8gKTwvc3Bhbj48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsZWFyX2ZpbHRlclwiIHYtb246Y2xpY2s9XCJ1bnNldERhdGUoKVwiID7QvtGH0LjRgdGC0LjRgtGMPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZC1mbGV4IG1iLTEwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT1cIndpZHRoOiA5MHB4OyBmbGV4OiAxO1wiIHYtbW9kZWw9XCJzdGFydFwiIHR5cGU9XCJ0ZXh0XCIgZGlzYWJsZWQ+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVmaXNcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT1cIndpZHRoOiA5MHB4OyBmbGV4OiAxO1wiIHYtbW9kZWw9XCJlbmRcIiB0eXBlPVwidGV4dFwiIGRpc2FibGVkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJmaWx0ZXIgaW4gZmlsdGVyX2RhdGEuZmlsdGVyc1wiIHYtYmluZDprZXk9XCJmaWx0ZXIuZmlsZWRcIiBjbGFzcz1cImZpbHRlcl9wb3MgbWItMTBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBkLWZsZXggbWItMFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJuby13cmFwXCIgPnt7IGZpbHRlci50aXRsZSB9fTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xlYXJfZmlsdGVyXCIgdi1vbjpjbGljaz1cInVuc2V0KGZpbHRlcilcIiA+0L7Rh9C40YHRgtC40YLRjDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJpdGVtIGluIGZpbHRlci5jb2xsZWN0aW9uXCIgY2xhc3M9XCJmb3JtLWdyb3VwIGQtZmxleCBtYi0wXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItZWxlbSBjaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHYtbW9kZWw9XCJpdGVtLmJvb2xcIiB2LWJpbmQ6aWQ9XCJmaWx0ZXIuZmlsZWQgKyBpdGVtLnRpdGxlXCIgdHlwZT1cImNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgdi1iaW5kOmZvcj1cImZpbHRlci5maWxlZCArIGl0ZW0udGl0bGVcIj48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIHYtYmluZDpmb3I9XCJmaWx0ZXIuZmlsZWQgKyBpdGVtLnRpdGxlXCIgY2xhc3M9XCJjaGVja2JveF9sYWJlbCBmbGV4LTFcIiA+e3sgaXRlbS50aXRsZSB9fTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgbmFtZTogXCJGaWx0ZXJCb3hcIixcbiAgICAgICAgcHJvcHM6IFsnZmlsdGVyX2RhdGEnXSxcbiAgICAgICAgZGF0YTogKCk9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vIHdhdGNoOiB7XG4gICAgICAgIC8vICAgICAkcm91dGUodG8sIGZyb20pIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNldFJvb3RDYXRlZ29yeSgpO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuZ2V0Q2F0ZWdvcmllcygpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBtb3VudGVkKCl7XG5cbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIHN0YXJ0KCl7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh0aGlzLmZpbHRlcl9kYXRhLmRhdGVzLnN0YXJ0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJfZGF0YS5kYXRlcy5zdGFydCA/IGRhdGUuZGRtbXl5eSgpIDogJ9C+0YInO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZCgpe1xuICAgICAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUodGhpcy5maWx0ZXJfZGF0YS5kYXRlcy5lbmQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlcl9kYXRhLmRhdGVzLmVuZCA/IGRhdGUuZGRtbXl5eSgpIDogJ9C00L4nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGVzX2FwcGxpZWQoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmZpbHRlcl9kYXRhLmRhdGVzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0FsbFBlcmlvZCgpe1xuICAgICAgICAgICAgICAgIHJldHVybiAhQm9vbGVhbih0aGlzLmZpbHRlcl9kYXRhLmRhdGVzLnN0YXJ0ICYmIHRoaXMuZmlsdGVyX2RhdGEuZGF0ZXMuZW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICB1bnNldERhdGUoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcl9kYXRhLmRhdGVzID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGFydDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBudWxsLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy4kbm90aWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6ICdtYWluJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfQpNC40LvRjNGC0YAnLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn0JTQsNGC0LAg0L7Rh9C40YnQtdC90LAnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5zZXQoZmlsdGVyKXtcbiAgICAgICAgICAgICAgICBmaWx0ZXIuY29sbGVjdGlvbi5mb3JFYWNoKChpdGVtKT0+e1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmJvb2wgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLiRub3RpZnkoe1xuICAgICAgICAgICAgICAgICAgICBncm91cDogJ21haW4nLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ9Ck0LjQu9GM0YLRgCcsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfQodGC0LDRgtGD0YEg0L7Qv9C70LDRgtGLINC+0YfQuNGJ0LXQvSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwibWwtMTVcIiB9LFxuICAgIFtcbiAgICAgIF92bS5kYXRlc19hcHBsaWVkXG4gICAgICAgID8gX2MoXCJ2LWRhdGUtcGlja2VyXCIsIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1iLTE1XCIsXG4gICAgICAgICAgICBhdHRyczogeyB2YWx1ZTogXCJyYW5nZVwiLCBjb2xvcjogXCJibHVlXCIsIFwiaXMtcmFuZ2VcIjogXCJcIiB9LFxuICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IF92bS5maWx0ZXJfZGF0YS5kYXRlcyxcbiAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5maWx0ZXJfZGF0YSwgXCJkYXRlc1wiLCAkJHYpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZmlsdGVyX2RhdGEuZGF0ZXNcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiYm94IHctMjkwIHAtMTUgZmlsdGVyLXBhbmVsXCIgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYm94LXRpdGxlXCIgfSwgW192bS5fdihcItCk0LjQu9GM0YLRgFwiKV0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX3ZtLmRhdGVzX2FwcGxpZWRcbiAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmaWx0ZXJfcG9zIG1iLTEwXCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCBtYi0wIGQtZmxleFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgeyBzdGF0aWNDbGFzczogXCJuby13cmFwXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCLQn9C10YDQuNC+0LQgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfdm0uaXNBbGxQZXJpb2RcbiAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQtbXV0ZWRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIigg0LfQsCDQstGB0ZEg0LLRgNC10LzRjyApXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xlYXJfZmlsdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0udW5zZXREYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQvtGH0LjRgdGC0LjRgtGMXCIpXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwIGQtZmxleCBtYi0xMFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCI5MHB4XCIsIGZsZXg6IFwiMVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGV4dFwiLCBkaXNhYmxlZDogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLnN0YXJ0IH0sXG4gICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnN0YXJ0ID0gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiZGVmaXNcIiB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5lbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImVuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCI5MHB4XCIsIGZsZXg6IFwiMVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGV4dFwiLCBkaXNhYmxlZDogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLmVuZCB9LFxuICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5lbmQgPSAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX3ZtLl9sKF92bS5maWx0ZXJfZGF0YS5maWx0ZXJzLCBmdW5jdGlvbihmaWx0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgeyBrZXk6IGZpbHRlci5maWxlZCwgc3RhdGljQ2xhc3M6IFwiZmlsdGVyX3BvcyBtYi0xMFwiIH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXAgZC1mbGV4IG1iLTBcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfYyhcImxhYmVsXCIsIHsgc3RhdGljQ2xhc3M6IFwibm8td3JhcFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhmaWx0ZXIudGl0bGUpKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbGVhcl9maWx0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS51bnNldChmaWx0ZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0L7Rh9C40YHRgtC40YLRjFwiKV1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF92bS5fbChmaWx0ZXIuY29sbGVjdGlvbiwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCBkLWZsZXggbWItMFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJoZWFkZXItZWxlbSBjaGVja2JveFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbS5ib29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiaXRlbS5ib29sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBmaWx0ZXIuZmlsZWQgKyBpdGVtLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBBcnJheS5pc0FycmF5KGl0ZW0uYm9vbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF92bS5faShpdGVtLmJvb2wsIG51bGwpID4gLTFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGl0ZW0uYm9vbFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICQkYSA9IGl0ZW0uYm9vbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQkZWwgPSAkZXZlbnQudGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCRjID0gJCRlbC5jaGVja2VkID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoJCRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICQkdiA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQkaSA9IF92bS5faSgkJGEsICQkdilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkJGVsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCRpIDwgMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KGl0ZW0sIFwiYm9vbFwiLCAkJGEuY29uY2F0KFskJHZdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQkaSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJib29sXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkJGEuc2xpY2UoMCwgJCRpKS5jb25jYXQoJCRhLnNsaWNlKCQkaSArIDEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoaXRlbSwgXCJib29sXCIsICQkYylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgeyBhdHRyczogeyBmb3I6IGZpbHRlci5maWxlZCArIGl0ZW0udGl0bGUgfSB9KVxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNoZWNrYm94X2xhYmVsIGZsZXgtMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZm9yOiBmaWx0ZXIuZmlsZWQgKyBpdGVtLnRpdGxlIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKGl0ZW0udGl0bGUpKV1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAyXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMlxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9GaWx0ZXJCb3gudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWRlN2ExMzZlJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0ZpbHRlckJveC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0ZpbHRlckJveC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcImRlN2ExMzZlXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnZGU3YTEzNmUnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnZGU3YTEzNmUnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnZGU3YTEzNmUnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0ZpbHRlckJveC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZGU3YTEzNmUmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignZGU3YTEzNmUnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0ZpbHRlckJveC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZpbHRlckJveC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmlsdGVyQm94LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GaWx0ZXJCb3gudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWRlN2ExMzZlJnNjb3BlZD10cnVlJlwiIl0sInNvdXJjZVJvb3QiOiIifQ==