(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Base~Entrance~EntranceRefund~ProviderOrder"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/Table.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/service/Table.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
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
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['table_data', 'filter_data'],
  name: "Table",
  data: function data() {
    return {
      items: [],
      search: null,
      last_page: null,
      current_page: 1,
      paginate_array: null,
      field: null,
      dir: null,
      selected: [],
      last_selected: null,
      index: 0,
      context_opened: false,
      context_style: {}
    };
  },
  watch: {
    $route: function $route(to, from) {
      this.getItems();
    },
    $attrs: function $attrs() {
      this.search = this.$attrs.search;
      this.getItems();
    },
    filter_data: {
      handler: function handler(newVal, oldVal) {
        this.current_page = 1;
        this.getItems();
      },
      deep: true
    }
  },
  mounted: function mounted() {
    this.getItems();
    document.addEventListener('click', this.closeContext);
  },
  computed: {
    loading: function loading() {
      return this.$parent.loading;
    },
    isAnyChecked: function isAnyChecked() {
      return Boolean(this.selected.length);
    },
    lastButtonDisabled: function lastButtonDisabled() {
      return this.current_page >= this.last_page;
    },
    firstButtonDisabled: function firstButtonDisabled() {
      return this.current_page <= 1;
    },
    nextButtonDisabled: function nextButtonDisabled() {
      return this.current_page === this.last_page;
    },
    prevButtonDisabled: function prevButtonDisabled() {
      return this.current_page === 1;
    }
  },
  methods: {
    dblClick: function dblClick(elem) {
      return this.table_data['dbl_click'] ? this.table_data.dbl_click(elem.id) : void 0;
    },
    unsetSelected: function unsetSelected() {
      this.last_selected = null;
      this.selected = [];
      this.search = null;
    },
    toggleSelectAll: function toggleSelectAll() {
      var _this = this;

      if (this.selected.length) {
        this.selected = [];
      } else {
        this.items.forEach(function (item) {
          _this.selected.push(item.id);
        });
      }
    },
    setRef: function setRef(item, index) {
      item.index = index;
      return 'item_' + index;
    },
    isSortField: function isSortField(item) {
      return this.field === item.table_name;
    },
    isSelected: function isSelected(item) {
      return this.selected.includes(item.id);
    },
    isPageActive: function isPageActive(page) {
      return page === this.current_page ? 'active' : '';
    },
    getPaginator: function getPaginator() {
      var paginate_array = [];
      var prev_array = [];

      for (var i = 1; i < 2; i++) {
        if (i > 0 && i <= this.last_page) {
          prev_array.push(i);
        }
      }

      var pages_array = [];

      for (var _i = this.current_page - 2; _i < this.current_page + 2; _i++) {
        if (_i > 0 && _i <= this.last_page) {
          pages_array.push(_i);
        }
      }

      var last_array = [];

      for (var _i2 = this.last_page - 2; _i2 < this.last_page; _i2++) {
        if (_i2 > 0 && _i2 <= this.last_page) {
          last_array.push(_i2);
        }
      }

      paginate_array = paginate_array.concat(prev_array).unique();
      paginate_array = paginate_array.concat(pages_array).unique();
      paginate_array = paginate_array.concat(last_array).unique();
      this.paginate_array = paginate_array;
    },
    getCategoryId: function getCategoryId() {
      return this.$route.params.category_id === 'all' ? this.$attrs.root_id : this.$route.params.category_id;
    },
    getSearchString: function getSearchString() {
      return this.search === '' ? null : this.$attrs.search;
    },
    getHeaderStyle: function getHeaderStyle(item) {
      var style = {};

      if (item.min_width) {
        style.minWidth = item.min_width + 'px';
      }

      if (item.width) {
        if (item.width === 'auto') {
          style.flex = 1;
        } else {
          style.width = item.width + 'px';
        }
      }

      return style;
    },
    filterMutator: function filterMutator(params) {
      if (this.filter_data) {
        if (this.filter_data.dates && this.filter_data.dates.start && this.filter_data.dates.end) {
          params.dates = [];
          params.dates[0] = Date.parse(this.filter_data.dates.start) / 1000;
          params.dates[1] = Date.parse(this.filter_data.dates.end) / 1000;
        }

        if (this.filter_data.filters) {
          this.filter_data.filters.forEach(function (filter) {
            var collection = [];
            filter.collection.forEach(function (item) {
              if (item.bool) collection.push(item.val);
            });
            params[filter.filed] = collection;
          });
        }
      }

      return params;
    },
    getItems: function getItems() {
      var _this2 = this;

      this.unsetSelected();
      this.items = [];
      this.$parent.table_loading = true;
      var params = {
        category_id: this.getCategoryId(),
        search: this.getSearchString(),
        page: this.current_page,
        field: this.field,
        dir: this.dir
      };
      params = this.filterMutator(params);
      window.axios({
        method: 'get',
        url: this.table_data.url,
        params: params
      }).then(function (resp) {
        _this2.items = resp.data.data;
        _this2.last_page = resp.data.last_page;

        _this2.getPaginator();
      }).then(function () {
        _this2.$parent.table_loading = false;
      });
    },
    setPage: function setPage(num) {
      this.current_page = num;
      this.getItems();
    },
    toggleSort: function toggleSort(item) {
      if (!item.sort) {
        item.sort = 'ASC';
      } else if (item.sort === 'ASC') {
        item.sort = 'DESC';
      } else {
        item.sort = 'ASC';
      }

      this.field = item.table_name;
      this.dir = item.sort;
      this.getItems();
    },
    unselectAll: function unselectAll() {
      this.selected = [];
    },
    unselect: function unselect(id) {
      var _this3 = this;

      this.selected.forEach(function (val, key) {
        if (val === id) {
          _this3.selected.splice(key, 1);
        }
      });
    },
    selectItem: function selectItem(item) {
      var _this4 = this;

      this.closeContext();

      if (!window.ctrl_pressed && !window.shift_pressed) {
        this.unselectAll();
      }

      if (window.ctrl_pressed) {
        if (this.selected.includes(item.id)) {
          this.unselect(item.id);
        } else {
          this.selected.push(item.id);
        }
      } else {
        this.selected.push(item.id);
      }

      if (window.shift_pressed && this.last_selected != null) {
        var indexes = [];
        var max = this.last_selected > item.index ? this.last_selected : item.index;
        var min = this.last_selected < item.index ? this.last_selected : item.index;

        for (var i = min; i <= max; i++) {
          indexes.push(parseInt(i));
        }

        this.selected = [];
        this.items.forEach(function (item) {
          if (indexes.includes(item.index)) {
            _this4.selected.push(item.id);
          }
        });
      } else {
        this.last_selected = item.index;
      }
    },
    openContext: function openContext(event) {
      event.preventDefault();
      this.context_opened = true;
      var ofsetter = this.$refs.ofsetter;

      if (ofsetter) {
        var contextY = event.clientY - ofsetter.getBoundingClientRect().top + window.scrollY;

        if (event.clientY + this.$refs.cont.offsetHeight + 100 >= window.innerHeight) {
          contextY -= this.$refs.cont.offsetHeight;
        }

        this.context_style = {
          top: contextY + 'px',
          left: event.clientX - ofsetter.getBoundingClientRect().left + window.scrollX + 'px'
        };
      }
    },
    closeContext: function closeContext(e) {
      this.context_style = {
        top: '-1200px',
        left: '-1200px'
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/Table.vue?vue&type=template&id=7277e4ce&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/service/Table.vue?vue&type=template&id=7277e4ce& ***!
  \****************************************************************************************************************************************************************************************************************/
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
    { staticClass: "flex-1 h-100", attrs: { id: "table-container" } },
    [
      _c("div", { ref: "ofsetter", staticClass: "h-100" }, [
        _c("div", { staticClass: "bbtable-container" }, [
          _c(
            "div",
            { staticClass: "bbtable-header" },
            [
              _c("div", { staticClass: "header-elem checkbox" }, [
                _c("input", {
                  attrs: { type: "checkbox" },
                  domProps: { checked: _vm.isAnyChecked }
                }),
                _vm._v(" "),
                _c("label", {
                  on: {
                    click: function($event) {
                      return _vm.toggleSelectAll()
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _vm._l(_vm.table_data.header, function(item) {
                return _c(
                  "div",
                  {
                    key: item.name,
                    staticClass: "header-elem",
                    class: { active: _vm.isSortField(item) },
                    staticStyle: { width: "90px", "min-width": "90px" },
                    style: _vm.getHeaderStyle(item),
                    attrs: { "data-field": "id" }
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "title",
                        on: {
                          click: function($event) {
                            return _vm.toggleSort(item)
                          }
                        }
                      },
                      [_vm._v(_vm._s(item.name))]
                    ),
                    _vm._v(" "),
                    !_vm.isSortField(item)
                      ? _c("div", { staticClass: "arrow down" })
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.isSortField(item) && _vm.dir === "DESC"
                      ? _c("div", {
                          staticClass: "arrow down",
                          class: { active: _vm.isSortField(item) }
                        })
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.isSortField(item) && _vm.dir === "ASC"
                      ? _c("div", {
                          staticClass: "arrow up",
                          class: { active: _vm.isSortField(item) }
                        })
                      : _vm._e()
                  ]
                )
              })
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "bbtable-body",
              staticStyle: { height: "calc(100% - 59px)" },
              attrs: { "data-simplebar": "" }
            },
            [
              _c(
                "div",
                [
                  _vm._l(_vm.items, function(elem, index) {
                    return !_vm.loading
                      ? _c(
                          "div",
                          {
                            key: "item_" + index,
                            ref: _vm.setRef(elem, index),
                            refInFor: true,
                            staticClass: "body-elem",
                            class: { selected: _vm.isSelected(elem) },
                            on: {
                              dblclick: function($event) {
                                return _vm.dblClick(elem)
                              },
                              contextmenu: _vm.openContext,
                              click: function($event) {
                                return _vm.selectItem(elem)
                              }
                            }
                          },
                          [
                            _c("div", { staticClass: "cell checkbox" }, [
                              _c("input", {
                                attrs: { type: "checkbox" },
                                domProps: { checked: _vm.isSelected(elem) }
                              }),
                              _vm._v(" "),
                              _c("label")
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.table_data.header, function(item) {
                              return _c(
                                "div",
                                {
                                  key: item.name + elem.id,
                                  staticClass: "cell",
                                  style: _vm.getHeaderStyle(item)
                                },
                                [
                                  _c("div", { staticClass: "title" }, [
                                    _vm._v(_vm._s(elem[item.table_name]))
                                  ])
                                ]
                              )
                            })
                          ],
                          2
                        )
                      : _vm._e()
                  }),
                  _vm._v(" "),
                  _vm.loading
                    ? _c(
                        "div",
                        { staticClass: "list-placeholder" },
                        _vm._l(12, function(elem) {
                          return _c(
                            "div",
                            { key: elem, staticClass: "list-placeholder_item" },
                            [
                              _c("div", {
                                staticClass: "list-placeholder_cell",
                                staticStyle: { width: "30px" }
                              }),
                              _vm._v(" "),
                              _vm._l(_vm.table_data.header, function(item) {
                                return _c("div", {
                                  key: item.name + "placeholder",
                                  staticClass: "list-placeholder_cell",
                                  style: _vm.getHeaderStyle(item)
                                })
                              })
                            ],
                            2
                          )
                        }),
                        0
                      )
                    : _vm._e()
                ],
                2
              )
            ]
          ),
          _vm._v(" "),
          !_vm.loading
            ? _c(
                "div",
                {
                  ref: "cont",
                  staticClass: "context",
                  style: _vm.context_style,
                  attrs: { id: "context" }
                },
                _vm._l(_vm.table_data.context_menu, function(menu) {
                  return _c(
                    "div",
                    {
                      key: menu.name,
                      staticClass: "context_item",
                      on: { click: menu.action }
                    },
                    [
                      _c("div", { staticClass: "title" }, [
                        _vm._v(_vm._s(menu.name))
                      ])
                    ]
                  )
                }),
                0
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "paginator" },
            [
              _c(
                "button",
                {
                  attrs: { disabled: _vm.firstButtonDisabled },
                  on: {
                    click: function($event) {
                      return _vm.setPage(1)
                    }
                  }
                },
                [_vm._v("Первая")]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  attrs: { disabled: _vm.prevButtonDisabled },
                  on: {
                    click: function($event) {
                      return _vm.setPage(_vm.current_page - 1)
                    }
                  }
                },
                [_vm._v("Назад")]
              ),
              _vm._v(" "),
              _vm._l(_vm.paginate_array, function(page) {
                return _c(
                  "button",
                  {
                    class: _vm.isPageActive(page),
                    on: {
                      click: function($event) {
                        return _vm.setPage(page)
                      }
                    }
                  },
                  [_vm._v(_vm._s(page))]
                )
              }),
              _vm._v(" "),
              _c(
                "button",
                {
                  attrs: { disabled: _vm.nextButtonDisabled },
                  on: {
                    click: function($event) {
                      return _vm.setPage(_vm.current_page + 1)
                    }
                  }
                },
                [_vm._v("Вперёд")]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  attrs: { disabled: _vm.lastButtonDisabled },
                  on: {
                    click: function($event) {
                      return _vm.setPage(_vm.last_page)
                    }
                  }
                },
                [_vm._v("Последняя")]
              )
            ],
            2
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/service/Table.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/service/Table.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Table_vue_vue_type_template_id_7277e4ce___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Table.vue?vue&type=template&id=7277e4ce& */ "./resources/js/components/service/Table.vue?vue&type=template&id=7277e4ce&");
/* harmony import */ var _Table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Table.vue?vue&type=script&lang=js& */ "./resources/js/components/service/Table.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Table_vue_vue_type_template_id_7277e4ce___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Table_vue_vue_type_template_id_7277e4ce___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/service/Table.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/service/Table.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/service/Table.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Table.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/Table.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/service/Table.vue?vue&type=template&id=7277e4ce&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/service/Table.vue?vue&type=template&id=7277e4ce& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_template_id_7277e4ce___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Table.vue?vue&type=template&id=7277e4ce& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/Table.vue?vue&type=template&id=7277e4ce&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_template_id_7277e4ce___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_template_id_7277e4ce___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/debounce.js":
/*!**********************************!*\
  !*** ./resources/js/debounce.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var debounce = function debounce(fn, delay) {
  var timeoutID = null;
  return function () {
    ;
    clearTimeout(timeoutID);
    var args = arguments;
    var that = this;
    timeoutID = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  };
};

directive.debounce = debounce;

function directive(el, binding) {
  if (binding.value !== binding.oldValue) {
    // change debounce only if interval has changed
    el.oninput = directive.debounce(function (evt) {
      el.dispatchEvent(new Event('change'));
    }, parseInt(binding.value) || 500);
  }
}

module.exports = directive;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWU/MGU2MyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZT80Mzc5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvVGFibGUudnVlPzdkOTEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2RlYm91bmNlLmpzIl0sIm5hbWVzIjpbImRlYm91bmNlIiwiZm4iLCJkZWxheSIsInRpbWVvdXRJRCIsImNsZWFyVGltZW91dCIsImFyZ3MiLCJhcmd1bWVudHMiLCJ0aGF0Iiwic2V0VGltZW91dCIsImFwcGx5IiwiZGlyZWN0aXZlIiwiZWwiLCJiaW5kaW5nIiwidmFsdWUiLCJvbGRWYWx1ZSIsIm9uaW5wdXQiLCJldnQiLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJwYXJzZUludCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUVBO0FBQ0Esc0NBREE7QUFFQSxlQUZBO0FBR0E7QUFDQTtBQUNBLGVBREE7QUFFQSxrQkFGQTtBQUdBLHFCQUhBO0FBSUEscUJBSkE7QUFLQSwwQkFMQTtBQU1BLGlCQU5BO0FBT0EsZUFQQTtBQVFBLGtCQVJBO0FBU0EseUJBVEE7QUFVQSxjQVZBO0FBV0EsMkJBWEE7QUFZQTtBQVpBO0FBY0EsR0FsQkE7QUFtQkE7QUFDQSxVQURBLGtCQUNBLEVBREEsRUFDQSxJQURBLEVBQ0E7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QUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7QUNBQSxJQUFJQSxRQUFRLEdBQUcsU0FBU0EsUUFBVCxDQUFtQkMsRUFBbkIsRUFBdUJDLEtBQXZCLEVBQThCO0FBQ3pDLE1BQUlDLFNBQVMsR0FBRyxJQUFoQjtBQUNBLFNBQU8sWUFBWTtBQUFDO0FBQ2hCQyxnQkFBWSxDQUFDRCxTQUFELENBQVo7QUFDQSxRQUFJRSxJQUFJLEdBQUdDLFNBQVg7QUFDQSxRQUFJQyxJQUFJLEdBQUcsSUFBWDtBQUNBSixhQUFTLEdBQUdLLFVBQVUsQ0FBQyxZQUFZO0FBQy9CUCxRQUFFLENBQUNRLEtBQUgsQ0FBU0YsSUFBVCxFQUFlRixJQUFmO0FBQ0gsS0FGcUIsRUFFbkJILEtBRm1CLENBQXRCO0FBR0gsR0FQRDtBQVFILENBVkQ7O0FBWUFRLFNBQVMsQ0FBQ1YsUUFBVixHQUFxQkEsUUFBckI7O0FBRUEsU0FBU1UsU0FBVCxDQUFvQkMsRUFBcEIsRUFBd0JDLE9BQXhCLEVBQWlDO0FBQzdCLE1BQUlBLE9BQU8sQ0FBQ0MsS0FBUixLQUFrQkQsT0FBTyxDQUFDRSxRQUE5QixFQUF3QztBQUFFO0FBQ3RDSCxNQUFFLENBQUNJLE9BQUgsR0FBYUwsU0FBUyxDQUFDVixRQUFWLENBQW1CLFVBQVVnQixHQUFWLEVBQWU7QUFDM0NMLFFBQUUsQ0FBQ00sYUFBSCxDQUFpQixJQUFJQyxLQUFKLENBQVUsUUFBVixDQUFqQjtBQUNILEtBRlksRUFFVkMsUUFBUSxDQUFDUCxPQUFPLENBQUNDLEtBQVQsQ0FBUixJQUEyQixHQUZqQixDQUFiO0FBR0g7QUFDSjs7QUFFRE8sTUFBTSxDQUFDQyxPQUFQLEdBQWlCWCxTQUFqQixDIiwiZmlsZSI6IkJhc2V+RW50cmFuY2V+RW50cmFuY2VSZWZ1bmR+UHJvdmlkZXJPcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGlkPVwidGFibGUtY29udGFpbmVyXCIgY2xhc3M9XCJmbGV4LTEgaC0xMDBcIj5cbiAgICAgICAgPGRpdiByZWY9XCJvZnNldHRlclwiIGNsYXNzPVwiaC0xMDBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYnRhYmxlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYnRhYmxlLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWVsZW0gY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2LWJpbmQ6Y2hlY2tlZD1cImlzQW55Q2hlY2tlZFwiIHR5cGU9XCJjaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIHYtb246Y2xpY2s9XCJ0b2dnbGVTZWxlY3RBbGwoKVwiPjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IGlzU29ydEZpZWxkKGl0ZW0pfVwiIHYtZm9yPVwiaXRlbSBpbiB0YWJsZV9kYXRhLmhlYWRlclwiIHYtYmluZDprZXk9XCJpdGVtLm5hbWVcIiB2LWJpbmQ6c3R5bGU9XCJnZXRIZWFkZXJTdHlsZShpdGVtKVwiIGNsYXNzPVwiaGVhZGVyLWVsZW1cIiBkYXRhLWZpZWxkPVwiaWRcIiBzdHlsZT1cIndpZHRoOiA5MHB4OyBtaW4td2lkdGg6IDkwcHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtb246Y2xpY2s9XCJ0b2dnbGVTb3J0KGl0ZW0pXCIgY2xhc3M9XCJ0aXRsZVwiPnt7IGl0ZW0ubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiIWlzU29ydEZpZWxkKGl0ZW0pXCIgY2xhc3M9XCJhcnJvdyBkb3duXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJpc1NvcnRGaWVsZChpdGVtKSAmJiBkaXIgPT09ICdERVNDJ1wiIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IGlzU29ydEZpZWxkKGl0ZW0pfVwiIGNsYXNzPVwiYXJyb3cgZG93blwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiaXNTb3J0RmllbGQoaXRlbSkgJiYgZGlyID09PSAnQVNDJ1wiIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IGlzU29ydEZpZWxkKGl0ZW0pfVwiIGNsYXNzPVwiYXJyb3cgdXBcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJidGFibGUtYm9keVwiIGRhdGEtc2ltcGxlYmFyIHN0eWxlPVwiaGVpZ2h0OiBjYWxjKDEwMCUgLSA1OXB4KTtcIiA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiIWxvYWRpbmdcIiB2LW9uOmRibGNsaWNrPVwiZGJsQ2xpY2soZWxlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW9uOmNvbnRleHRtZW51PVwib3BlbkNvbnRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW9uOmNsaWNrPVwic2VsZWN0SXRlbShlbGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKGVsZW0sIGluZGV4KSBpbiBpdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpyZWY9XCJzZXRSZWYoZWxlbSwgaW5kZXgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmtleT1cIidpdGVtXycgKyBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDpjbGFzcz1cInsgJ3NlbGVjdGVkJyA6IGlzU2VsZWN0ZWQoZWxlbSl9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJib2R5LWVsZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbCBjaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdi1iaW5kOmNoZWNrZWQ9XCJpc1NlbGVjdGVkKGVsZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCJpdGVtIGluIHRhYmxlX2RhdGEuaGVhZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmtleT1cIml0ZW0ubmFtZSArIGVsZW0uaWRcIiBjbGFzcz1cImNlbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6c3R5bGU9XCJnZXRIZWFkZXJTdHlsZShpdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57eyBlbGVtW2l0ZW0udGFibGVfbmFtZV0gfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwibG9hZGluZ1wiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJlbGVtIGluIDEyXCIgdi1iaW5kOmtleT1cImVsZW1cIiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIgc3R5bGU9XCJ3aWR0aDogMzBweFwiID48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cIml0ZW0gaW4gdGFibGVfZGF0YS5oZWFkZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDprZXk9XCJpdGVtLm5hbWUgKyAncGxhY2Vob2xkZXInXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6c3R5bGU9XCJnZXRIZWFkZXJTdHlsZShpdGVtKVwiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cIiFsb2FkaW5nXCIgcmVmPVwiY29udFwiIGNsYXNzPVwiY29udGV4dFwiIGlkPVwiY29udGV4dFwiIHYtYmluZDpzdHlsZT1cImNvbnRleHRfc3R5bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LW9uOmNsaWNrPVwibWVudS5hY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwibWVudSBpbiB0YWJsZV9kYXRhLmNvbnRleHRfbWVudVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmtleT1cIm1lbnUubmFtZVwiIGNsYXNzPVwiY29udGV4dF9pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57eyBtZW51Lm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdG9yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdi1vbjpjbGljaz1cInNldFBhZ2UoMSlcIiB2LWJpbmQ6ZGlzYWJsZWQ9XCJmaXJzdEJ1dHRvbkRpc2FibGVkXCIgPtCf0LXRgNCy0LDRjzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHYtb246Y2xpY2s9XCJzZXRQYWdlKGN1cnJlbnRfcGFnZSAtIDEpXCIgdi1iaW5kOmRpc2FibGVkPVwicHJldkJ1dHRvbkRpc2FibGVkXCI+0J3QsNC30LDQtDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdi1mb3I9XCJwYWdlIGluIHBhZ2luYXRlX2FycmF5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6Y2xhc3M9XCJpc1BhZ2VBY3RpdmUocGFnZSlcIiB2LW9uOmNsaWNrPVwic2V0UGFnZShwYWdlKVwiPnt7IHBhZ2UgfX08L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHYtb246Y2xpY2s9XCJzZXRQYWdlKGN1cnJlbnRfcGFnZSArIDEpXCIgdi1iaW5kOmRpc2FibGVkPVwibmV4dEJ1dHRvbkRpc2FibGVkXCIgPtCS0L/QtdGA0ZHQtDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHYtb246Y2xpY2s9XCJzZXRQYWdlKGxhc3RfcGFnZSlcIiB2LWJpbmQ6ZGlzYWJsZWQ9XCJsYXN0QnV0dG9uRGlzYWJsZWRcIj7Qn9C+0YHQu9C10LTQvdGP0Y88L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBwcm9wczpbJ3RhYmxlX2RhdGEnLCAnZmlsdGVyX2RhdGEnXSxcbiAgICAgICAgbmFtZTogXCJUYWJsZVwiLFxuICAgICAgICBkYXRhOiAoKT0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgICAgIHNlYXJjaDogbnVsbCxcbiAgICAgICAgICAgICAgICBsYXN0X3BhZ2U6IG51bGwsXG4gICAgICAgICAgICAgICAgY3VycmVudF9wYWdlOjEsXG4gICAgICAgICAgICAgICAgcGFnaW5hdGVfYXJyYXk6IG51bGwsXG4gICAgICAgICAgICAgICAgZmllbGQ6IG51bGwsXG4gICAgICAgICAgICAgICAgZGlyOm51bGwsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IFtdLFxuICAgICAgICAgICAgICAgIGxhc3Rfc2VsZWN0ZWQ6bnVsbCxcbiAgICAgICAgICAgICAgICBpbmRleDowLFxuICAgICAgICAgICAgICAgIGNvbnRleHRfb3BlbmVkOmZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRleHRfc3R5bGU6e30sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICAkcm91dGUodG8sIGZyb20pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW1zKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJGF0dHJzOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2ggPSB0aGlzLiRhdHRycy5zZWFyY2g7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtcygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbHRlcl9kYXRhOiB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcihuZXdWYWwsIG9sZFZhbCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudF9wYWdlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtcygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVlcDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCl7XG4gICAgICAgICAgICB0aGlzLmdldEl0ZW1zKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VDb250ZXh0KVxuICAgICAgICB9LFxuICAgICAgICBjb21wdXRlZDp7XG4gICAgICAgICAgICBsb2FkaW5nKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHBhcmVudC5sb2FkaW5nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQW55Q2hlY2tlZCgpe1xuICAgICAgICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLnNlbGVjdGVkLmxlbmd0aCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGFzdEJ1dHRvbkRpc2FibGVkKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudF9wYWdlID49IHRoaXMubGFzdF9wYWdlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpcnN0QnV0dG9uRGlzYWJsZWQoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50X3BhZ2UgPD0gMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0QnV0dG9uRGlzYWJsZWQoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50X3BhZ2UgPT09IHRoaXMubGFzdF9wYWdlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZXZCdXR0b25EaXNhYmxlZCgpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRfcGFnZSA9PT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBkYmxDbGljayhlbGVtKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YWJsZV9kYXRhWydkYmxfY2xpY2snXSA/IHRoaXMudGFibGVfZGF0YS5kYmxfY2xpY2soZWxlbS5pZCkgOiB2b2lkKDApIDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bnNldFNlbGVjdGVkKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0X3NlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2ggPSBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZVNlbGVjdEFsbCgpe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWQubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5wdXNoKGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0UmVmKGl0ZW0sIGluZGV4KXtcbiAgICAgICAgICAgICAgICBpdGVtLmluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpdGVtXycgKyBpbmRleDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1NvcnRGaWVsZChpdGVtKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWVsZCA9PT0gaXRlbS50YWJsZV9uYW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQoaXRlbSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQuaW5jbHVkZXMoaXRlbS5pZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNQYWdlQWN0aXZlKHBhZ2Upe1xuICAgICAgICAgICAgICAgIHJldHVybiAocGFnZSA9PT0gdGhpcy5jdXJyZW50X3BhZ2UpID8gJ2FjdGl2ZScgOiAnJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRQYWdpbmF0b3IoKXtcbiAgICAgICAgICAgICAgICBsZXQgcGFnaW5hdGVfYXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgcHJldl9hcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPiAwICYmIGkgPD0gdGhpcy5sYXN0X3BhZ2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldl9hcnJheS5wdXNoKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBwYWdlc19hcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmN1cnJlbnRfcGFnZSAtIDI7IGkgPCB0aGlzLmN1cnJlbnRfcGFnZSArIDI7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZihpID4gMCAmJiBpIDw9IHRoaXMubGFzdF9wYWdlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VzX2FycmF5LnB1c2goaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxhc3RfYXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5sYXN0X3BhZ2UgLSAyOyBpIDwgdGhpcy5sYXN0X3BhZ2U7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZihpID4gMCAmJiBpIDw9IHRoaXMubGFzdF9wYWdlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfYXJyYXkucHVzaChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYWdpbmF0ZV9hcnJheSA9IHBhZ2luYXRlX2FycmF5LmNvbmNhdChwcmV2X2FycmF5KS51bmlxdWUoKTtcbiAgICAgICAgICAgICAgICBwYWdpbmF0ZV9hcnJheSA9IHBhZ2luYXRlX2FycmF5LmNvbmNhdChwYWdlc19hcnJheSkudW5pcXVlKCk7XG4gICAgICAgICAgICAgICAgcGFnaW5hdGVfYXJyYXkgPSBwYWdpbmF0ZV9hcnJheS5jb25jYXQobGFzdF9hcnJheSkudW5pcXVlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0ZV9hcnJheSA9IHBhZ2luYXRlX2FycmF5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldENhdGVnb3J5SWQoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZCA9PT0gJ2FsbCcpID8gdGhpcy4kYXR0cnMucm9vdF9pZCA6IHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTZWFyY2hTdHJpbmcoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuc2VhcmNoID09PSAnJykgPyBudWxsIDogdGhpcy4kYXR0cnMuc2VhcmNoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEhlYWRlclN0eWxlKGl0ZW0pe1xuICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IHt9O1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0ubWluX3dpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUubWluV2lkdGggPSBpdGVtLm1pbl93aWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGl0ZW0ud2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICBpZihpdGVtLndpZHRoID09PSAnYXV0bycpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuZmxleCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS53aWR0aCA9IGl0ZW0ud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaWx0ZXJNdXRhdG9yKHBhcmFtcyl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5maWx0ZXJfZGF0YSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZmlsdGVyX2RhdGEuZGF0ZXMgJiYgdGhpcy5maWx0ZXJfZGF0YS5kYXRlcy5zdGFydCAmJiB0aGlzLmZpbHRlcl9kYXRhLmRhdGVzLmVuZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMuZGF0ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5kYXRlc1swXSA9IERhdGUucGFyc2UodGhpcy5maWx0ZXJfZGF0YS5kYXRlcy5zdGFydCkgLyAxMDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmRhdGVzWzFdID0gRGF0ZS5wYXJzZSh0aGlzLmZpbHRlcl9kYXRhLmRhdGVzLmVuZCkgLyAxMDAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZmlsdGVyX2RhdGEuZmlsdGVycyl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcl9kYXRhLmZpbHRlcnMuZm9yRWFjaCgoZmlsdGVyKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb2xsZWN0aW9uID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmNvbGxlY3Rpb24uZm9yRWFjaCgoaXRlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5ib29sKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbi5wdXNoKGl0ZW0udmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXNbZmlsdGVyLmZpbGVkXSA9IGNvbGxlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SXRlbXMoKXtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2V0U2VsZWN0ZWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnRhYmxlX2xvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlfaWQ6IHRoaXMuZ2V0Q2F0ZWdvcnlJZCgpLFxuICAgICAgICAgICAgICAgICAgICBzZWFyY2g6IHRoaXMuZ2V0U2VhcmNoU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHRoaXMuY3VycmVudF9wYWdlLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5maWVsZCxcbiAgICAgICAgICAgICAgICAgICAgZGlyOiB0aGlzLmRpcixcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHRoaXMuZmlsdGVyTXV0YXRvcihwYXJhbXMpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy50YWJsZV9kYXRhLnVybCxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gcmVzcC5kYXRhLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdF9wYWdlID0gcmVzcC5kYXRhLmxhc3RfcGFnZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRQYWdpbmF0b3IoKTtcbiAgICAgICAgICAgICAgICB9KS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC50YWJsZV9sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0UGFnZShudW0pe1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudF9wYWdlID0gbnVtO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b2dnbGVTb3J0KGl0ZW0pe1xuICAgICAgICAgICAgICAgIGlmKCFpdGVtLnNvcnQpe1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnNvcnQgPSAnQVNDJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaXRlbS5zb3J0ID09PSAnQVNDJykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnNvcnQgPSAnREVTQydcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnNvcnQgPSAnQVNDJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkID0gaXRlbS50YWJsZV9uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyID0gaXRlbS5zb3J0O1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bnNlbGVjdEFsbCgpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bnNlbGVjdChpZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5mb3JFYWNoKCh2YWwsIGtleSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PT0gaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5zcGxpY2Uoa2V5LCAxKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0SXRlbShpdGVtKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlQ29udGV4dCgpO1xuICAgICAgICAgICAgICAgIGlmKCF3aW5kb3cuY3RybF9wcmVzc2VkICYmICF3aW5kb3cuc2hpZnRfcHJlc3NlZCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zZWxlY3RBbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYod2luZG93LmN0cmxfcHJlc3NlZCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWQuaW5jbHVkZXMoaXRlbS5pZCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNlbGVjdChpdGVtLmlkKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5wdXNoKGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5wdXNoKGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih3aW5kb3cuc2hpZnRfcHJlc3NlZCAmJiB0aGlzLmxhc3Rfc2VsZWN0ZWQgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXggPSAodGhpcy5sYXN0X3NlbGVjdGVkID4gaXRlbS5pbmRleCkgPyB0aGlzLmxhc3Rfc2VsZWN0ZWQgOiBpdGVtLmluZGV4O1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWluID0gKHRoaXMubGFzdF9zZWxlY3RlZCA8IGl0ZW0uaW5kZXgpID8gdGhpcy5sYXN0X3NlbGVjdGVkIDogaXRlbS5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IG1pbjsgaSA8PSBtYXg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhlcy5wdXNoKHBhcnNlSW50KGkpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXhlcy5pbmNsdWRlcyhpdGVtLmluZGV4KSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5wdXNoKGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3Rfc2VsZWN0ZWQgPSBpdGVtLmluZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcGVuQ29udGV4dChldmVudCl7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRfb3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgb2ZzZXR0ZXIgPSB0aGlzLiRyZWZzLm9mc2V0dGVyO1xuICAgICAgICAgICAgICAgIGlmKG9mc2V0dGVyKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRleHRZID0gZXZlbnQuY2xpZW50WSAtIG9mc2V0dGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICAgICAgICAgICAgICBpZihldmVudC5jbGllbnRZICsgdGhpcy4kcmVmcy5jb250Lm9mZnNldEhlaWdodCArIDEwMCA+PSB3aW5kb3cuaW5uZXJIZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dFkgLT0gdGhpcy4kcmVmcy5jb250Lm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRfc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IGNvbnRleHRZICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGV2ZW50LmNsaWVudFggLSBvZnNldHRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgd2luZG93LnNjcm9sbFggKyAncHgnXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZUNvbnRleHQoZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0X3N0eWxlID0ge1xuICAgICAgICAgICAgICAgICAgICB0b3A6ICctMTIwMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJy0xMjAwcHgnLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuPC9zY3JpcHQ+XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJmbGV4LTEgaC0xMDBcIiwgYXR0cnM6IHsgaWQ6IFwidGFibGUtY29udGFpbmVyXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgcmVmOiBcIm9mc2V0dGVyXCIsIHN0YXRpY0NsYXNzOiBcImgtMTAwXCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJidGFibGUtY29udGFpbmVyXCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiYmJ0YWJsZS1oZWFkZXJcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImhlYWRlci1lbGVtIGNoZWNrYm94XCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJjaGVja2JveFwiIH0sXG4gICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyBjaGVja2VkOiBfdm0uaXNBbnlDaGVja2VkIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwibGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0udG9nZ2xlU2VsZWN0QWxsKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfdm0uX2woX3ZtLnRhYmxlX2RhdGEuaGVhZGVyLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBpdGVtLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImhlYWRlci1lbGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLmlzU29ydEZpZWxkKGl0ZW0pIH0sXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjkwcHhcIiwgXCJtaW4td2lkdGhcIjogXCI5MHB4XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IF92bS5nZXRIZWFkZXJTdHlsZShpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJkYXRhLWZpZWxkXCI6IFwiaWRcIiB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRpdGxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS50b2dnbGVTb3J0KGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKGl0ZW0ubmFtZSkpXVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAhX3ZtLmlzU29ydEZpZWxkKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImFycm93IGRvd25cIiB9KVxuICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF92bS5pc1NvcnRGaWVsZChpdGVtKSAmJiBfdm0uZGlyID09PSBcIkRFU0NcIlxuICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJhcnJvdyBkb3duXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLmlzU29ydEZpZWxkKGl0ZW0pIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmlzU29ydEZpZWxkKGl0ZW0pICYmIF92bS5kaXIgPT09IFwiQVNDXCJcbiAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYXJyb3cgdXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBfdm0uaXNTb3J0RmllbGQoaXRlbSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDJcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJiYnRhYmxlLWJvZHlcIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcImNhbGMoMTAwJSAtIDU5cHgpXCIgfSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgXCJkYXRhLXNpbXBsZWJhclwiOiBcIlwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5pdGVtcywgZnVuY3Rpb24oZWxlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFfdm0ubG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiaXRlbV9cIiArIGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogX3ZtLnNldFJlZihlbGVtLCBpbmRleCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmSW5Gb3I6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYm9keS1lbGVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgc2VsZWN0ZWQ6IF92bS5pc1NlbGVjdGVkKGVsZW0pIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRibGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5kYmxDbGljayhlbGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRtZW51OiBfdm0ub3BlbkNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2VsZWN0SXRlbShlbGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2VsbCBjaGVja2JveFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImNoZWNrYm94XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgY2hlY2tlZDogX3ZtLmlzU2VsZWN0ZWQoZWxlbSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJsYWJlbFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS50YWJsZV9kYXRhLmhlYWRlciwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBpdGVtLm5hbWUgKyBlbGVtLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNlbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogX3ZtLmdldEhlYWRlclN0eWxlKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhlbGVtW2l0ZW0udGFibGVfbmFtZV0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX3ZtLmxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKDEyLCBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiBlbGVtLCBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjMwcHhcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLnRhYmxlX2RhdGEuaGVhZGVyLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBpdGVtLm5hbWUgKyBcInBsYWNlaG9sZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IF92bS5nZXRIZWFkZXJTdHlsZShpdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgIV92bS5sb2FkaW5nXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgcmVmOiBcImNvbnRcIixcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvbnRleHRcIixcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiBfdm0uY29udGV4dF9zdHlsZSxcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGlkOiBcImNvbnRleHRcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLnRhYmxlX2RhdGEuY29udGV4dF9tZW51LCBmdW5jdGlvbihtZW51KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBrZXk6IG1lbnUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjb250ZXh0X2l0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICBvbjogeyBjbGljazogbWVudS5hY3Rpb24gfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ0aXRsZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MobWVudS5uYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwYWdpbmF0b3JcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGRpc2FibGVkOiBfdm0uZmlyc3RCdXR0b25EaXNhYmxlZCB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2V0UGFnZSgxKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0J/QtdGA0LLQsNGPXCIpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGRpc2FibGVkOiBfdm0ucHJldkJ1dHRvbkRpc2FibGVkIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZXRQYWdlKF92bS5jdXJyZW50X3BhZ2UgLSAxKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0J3QsNC30LDQtFwiKV1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX3ZtLl9sKF92bS5wYWdpbmF0ZV9hcnJheSwgZnVuY3Rpb24ocGFnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiBfdm0uaXNQYWdlQWN0aXZlKHBhZ2UpLFxuICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2V0UGFnZShwYWdlKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKHBhZ2UpKV1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGRpc2FibGVkOiBfdm0ubmV4dEJ1dHRvbkRpc2FibGVkIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZXRQYWdlKF92bS5jdXJyZW50X3BhZ2UgKyAxKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0JLQv9C10YDRkdC0XCIpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGRpc2FibGVkOiBfdm0ubGFzdEJ1dHRvbkRpc2FibGVkIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZXRQYWdlKF92bS5sYXN0X3BhZ2UpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQn9C+0YHQu9C10LTQvdGP0Y9cIildXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAyXG4gICAgICAgICAgKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBdXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1RhYmxlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03Mjc3ZTRjZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9UYWJsZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1RhYmxlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNzI3N2U0Y2UnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNzI3N2U0Y2UnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNzI3N2U0Y2UnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1RhYmxlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03Mjc3ZTRjZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc3Mjc3ZTRjZScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1RhYmxlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UYWJsZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVGFibGUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTcyNzdlNGNlJlwiIiwibGV0IGRlYm91bmNlID0gZnVuY3Rpb24gZGVib3VuY2UgKGZuLCBkZWxheSkge1xyXG4gICAgbGV0IHRpbWVvdXRJRCA9IG51bGw7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkgeztcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElEKTtcclxuICAgICAgICBsZXQgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdGltZW91dElEID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MpXHJcbiAgICAgICAgfSwgZGVsYXkpXHJcbiAgICB9XHJcbn1cclxuXHJcbmRpcmVjdGl2ZS5kZWJvdW5jZSA9IGRlYm91bmNlO1xyXG5cclxuZnVuY3Rpb24gZGlyZWN0aXZlIChlbCwgYmluZGluZykge1xyXG4gICAgaWYgKGJpbmRpbmcudmFsdWUgIT09IGJpbmRpbmcub2xkVmFsdWUpIHsgLy8gY2hhbmdlIGRlYm91bmNlIG9ubHkgaWYgaW50ZXJ2YWwgaGFzIGNoYW5nZWRcclxuICAgICAgICBlbC5vbmlucHV0ID0gZGlyZWN0aXZlLmRlYm91bmNlKGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKVxyXG4gICAgICAgIH0sIHBhcnNlSW50KGJpbmRpbmcudmFsdWUpIHx8IDUwMClcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkaXJlY3RpdmU7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=