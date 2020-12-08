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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['table_data', 'filter_data', 'event_data'],
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
    var _this = this;

    this.getItems();
    document.addEventListener('click', this.closeContext);
    this.$eventBus.$on('TooManyAttempts', function () {
      _this.$notify({
        group: 'main',
        title: 'Ошибка сервера!',
        text: 'Слишком много запросов, повторите попытку позже.'
      });
    }); // ProductUpdated
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
      var _this2 = this;

      if (this.selected.length) {
        this.selected = [];
      } else {
        this.items.forEach(function (item) {
          _this2.selected.push(item.id);
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
      var _this3 = this;

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
        _this3.items = resp.data.data;
        _this3.last_page = resp.data.last_page;

        _this3.getPaginator();
      }).then(function () {
        _this3.$parent.table_loading = false;
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
      var _this4 = this;

      this.selected.forEach(function (val, key) {
        if (val === id) {
          _this4.selected.splice(key, 1);
        }
      });
    },
    selectItem: function selectItem(item) {
      var _this5 = this;

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
            _this5.selected.push(item.id);
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
                      on: {
                        click: function($event) {
                          return menu.action(_vm.elem.id)
                        }
                      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWU/MGU2MyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZT80Mzc5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvVGFibGUudnVlPzdkOTEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2RlYm91bmNlLmpzIl0sIm5hbWVzIjpbImRlYm91bmNlIiwiZm4iLCJkZWxheSIsInRpbWVvdXRJRCIsImNsZWFyVGltZW91dCIsImFyZ3MiLCJhcmd1bWVudHMiLCJ0aGF0Iiwic2V0VGltZW91dCIsImFwcGx5IiwiZGlyZWN0aXZlIiwiZWwiLCJiaW5kaW5nIiwidmFsdWUiLCJvbGRWYWx1ZSIsIm9uaW5wdXQiLCJldnQiLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJwYXJzZUludCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3RUE7QUFDQSxvREFEQTtBQUVBLGVBRkE7QUFHQTtBQUNBO0FBQ0EsZUFEQTtBQUVBLGtCQUZBO0FBR0EscUJBSEE7QUFJQSxxQkFKQTtBQUtBLDBCQUxBO0FBTUEsaUJBTkE7QUFPQSxlQVBBO0FBUUEsa0JBUkE7QUFTQSx5QkFUQTtBQVVBLGNBVkE7QUFXQSwyQkFYQTtBQVlBO0FBWkE7QUFjQSxHQWxCQTtBQW1CQTtBQUNBLFVBREEsa0JBQ0EsRUFEQSxFQUNBLElBREEsRUFDQTtB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Ozs7Ozs7OztBQ3RDZjtBQUFBO0FBQUEsd0NBQTJMLENBQWdCLGlQQUFHLEVBQUMsQzs7Ozs7Ozs7Ozs7O0FDQS9NO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7O0FDQUEsSUFBSUEsUUFBUSxHQUFHLFNBQVNBLFFBQVQsQ0FBbUJDLEVBQW5CLEVBQXVCQyxLQUF2QixFQUE4QjtBQUN6QyxNQUFJQyxTQUFTLEdBQUcsSUFBaEI7QUFDQSxTQUFPLFlBQVk7QUFBQztBQUNoQkMsZ0JBQVksQ0FBQ0QsU0FBRCxDQUFaO0FBQ0EsUUFBSUUsSUFBSSxHQUFHQyxTQUFYO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLElBQVg7QUFDQUosYUFBUyxHQUFHSyxVQUFVLENBQUMsWUFBWTtBQUMvQlAsUUFBRSxDQUFDUSxLQUFILENBQVNGLElBQVQsRUFBZUYsSUFBZjtBQUNILEtBRnFCLEVBRW5CSCxLQUZtQixDQUF0QjtBQUdILEdBUEQ7QUFRSCxDQVZEOztBQVlBUSxTQUFTLENBQUNWLFFBQVYsR0FBcUJBLFFBQXJCOztBQUVBLFNBQVNVLFNBQVQsQ0FBb0JDLEVBQXBCLEVBQXdCQyxPQUF4QixFQUFpQztBQUM3QixNQUFJQSxPQUFPLENBQUNDLEtBQVIsS0FBa0JELE9BQU8sQ0FBQ0UsUUFBOUIsRUFBd0M7QUFBRTtBQUN0Q0gsTUFBRSxDQUFDSSxPQUFILEdBQWFMLFNBQVMsQ0FBQ1YsUUFBVixDQUFtQixVQUFVZ0IsR0FBVixFQUFlO0FBQzNDTCxRQUFFLENBQUNNLGFBQUgsQ0FBaUIsSUFBSUMsS0FBSixDQUFVLFFBQVYsQ0FBakI7QUFDSCxLQUZZLEVBRVZDLFFBQVEsQ0FBQ1AsT0FBTyxDQUFDQyxLQUFULENBQVIsSUFBMkIsR0FGakIsQ0FBYjtBQUdIO0FBQ0o7O0FBRURPLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlgsU0FBakIsQyIsImZpbGUiOiJCYXNlfkVudHJhbmNlfkVudHJhbmNlUmVmdW5kflByb3ZpZGVyT3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdiBpZD1cInRhYmxlLWNvbnRhaW5lclwiIGNsYXNzPVwiZmxleC0xIGgtMTAwXCI+XG4gICAgICAgIDxkaXYgcmVmPVwib2ZzZXR0ZXJcIiBjbGFzcz1cImgtMTAwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmJ0YWJsZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmJ0YWJsZS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1lbGVtIGNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1iaW5kOmNoZWNrZWQ9XCJpc0FueUNoZWNrZWRcIiB0eXBlPVwiY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCB2LW9uOmNsaWNrPVwidG9nZ2xlU2VsZWN0QWxsKClcIj48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiBpc1NvcnRGaWVsZChpdGVtKX1cIiB2LWZvcj1cIml0ZW0gaW4gdGFibGVfZGF0YS5oZWFkZXJcIiB2LWJpbmQ6a2V5PVwiaXRlbS5uYW1lXCIgdi1iaW5kOnN0eWxlPVwiZ2V0SGVhZGVyU3R5bGUoaXRlbSlcIiBjbGFzcz1cImhlYWRlci1lbGVtXCIgZGF0YS1maWVsZD1cImlkXCIgc3R5bGU9XCJ3aWR0aDogOTBweDsgbWluLXdpZHRoOiA5MHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LW9uOmNsaWNrPVwidG9nZ2xlU29ydChpdGVtKVwiIGNsYXNzPVwidGl0bGVcIj57eyBpdGVtLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cIiFpc1NvcnRGaWVsZChpdGVtKVwiIGNsYXNzPVwiYXJyb3cgZG93blwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiaXNTb3J0RmllbGQoaXRlbSkgJiYgZGlyID09PSAnREVTQydcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiBpc1NvcnRGaWVsZChpdGVtKX1cIiBjbGFzcz1cImFycm93IGRvd25cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cImlzU29ydEZpZWxkKGl0ZW0pICYmIGRpciA9PT0gJ0FTQydcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiBpc1NvcnRGaWVsZChpdGVtKX1cIiBjbGFzcz1cImFycm93IHVwXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYnRhYmxlLWJvZHlcIiBkYXRhLXNpbXBsZWJhciBzdHlsZT1cImhlaWdodDogY2FsYygxMDAlIC0gNTlweCk7XCIgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cIiFsb2FkaW5nXCIgdi1vbjpkYmxjbGljaz1cImRibENsaWNrKGVsZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1vbjpjb250ZXh0bWVudT1cIm9wZW5Db250ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1vbjpjbGljaz1cInNlbGVjdEl0ZW0oZWxlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cIihlbGVtLCBpbmRleCkgaW4gaXRlbXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cmVmPVwic2V0UmVmKGVsZW0sIGluZGV4KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDprZXk9XCInaXRlbV8nICsgaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6Y2xhc3M9XCJ7ICdzZWxlY3RlZCcgOiBpc1NlbGVjdGVkKGVsZW0pfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYm9keS1lbGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNlbGwgY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHYtYmluZDpjaGVja2VkPVwiaXNTZWxlY3RlZChlbGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiaXRlbSBpbiB0YWJsZV9kYXRhLmhlYWRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDprZXk9XCJpdGVtLm5hbWUgKyBlbGVtLmlkXCIgY2xhc3M9XCJjZWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnN0eWxlPVwiZ2V0SGVhZGVyU3R5bGUoaXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+e3sgZWxlbVtpdGVtLnRhYmxlX25hbWVdIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cImxvYWRpbmdcIiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwiZWxlbSBpbiAxMlwiIHYtYmluZDprZXk9XCJlbGVtXCIgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfY2VsbFwiIHN0eWxlPVwid2lkdGg6IDMwcHhcIiA+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJpdGVtIGluIHRhYmxlX2RhdGEuaGVhZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6a2V5PVwiaXRlbS5uYW1lICsgJ3BsYWNlaG9sZGVyJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnN0eWxlPVwiZ2V0SGVhZGVyU3R5bGUoaXRlbSlcIiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfY2VsbFwiID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiIWxvYWRpbmdcIiByZWY9XCJjb250XCIgY2xhc3M9XCJjb250ZXh0XCIgaWQ9XCJjb250ZXh0XCIgdi1iaW5kOnN0eWxlPVwiY29udGV4dF9zdHlsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtb246Y2xpY2s9XCJtZW51LmFjdGlvbihlbGVtLmlkKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCJtZW51IGluIHRhYmxlX2RhdGEuY29udGV4dF9tZW51XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6a2V5PVwibWVudS5uYW1lXCIgY2xhc3M9XCJjb250ZXh0X2l0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPnt7IG1lbnUubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0b3JcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB2LW9uOmNsaWNrPVwic2V0UGFnZSgxKVwiIHYtYmluZDpkaXNhYmxlZD1cImZpcnN0QnV0dG9uRGlzYWJsZWRcIiA+0J/QtdGA0LLQsNGPPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdi1vbjpjbGljaz1cInNldFBhZ2UoY3VycmVudF9wYWdlIC0gMSlcIiB2LWJpbmQ6ZGlzYWJsZWQ9XCJwcmV2QnV0dG9uRGlzYWJsZWRcIj7QndCw0LfQsNC0PC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB2LWZvcj1cInBhZ2UgaW4gcGFnaW5hdGVfYXJyYXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDpjbGFzcz1cImlzUGFnZUFjdGl2ZShwYWdlKVwiIHYtb246Y2xpY2s9XCJzZXRQYWdlKHBhZ2UpXCI+e3sgcGFnZSB9fTwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdi1vbjpjbGljaz1cInNldFBhZ2UoY3VycmVudF9wYWdlICsgMSlcIiB2LWJpbmQ6ZGlzYWJsZWQ9XCJuZXh0QnV0dG9uRGlzYWJsZWRcIiA+0JLQv9C10YDRkdC0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdi1vbjpjbGljaz1cInNldFBhZ2UobGFzdF9wYWdlKVwiIHYtYmluZDpkaXNhYmxlZD1cImxhc3RCdXR0b25EaXNhYmxlZFwiPtCf0L7RgdC70LXQtNC90Y/RjzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHByb3BzOlsndGFibGVfZGF0YScsICdmaWx0ZXJfZGF0YScsICdldmVudF9kYXRhJ10sXG4gICAgICAgIG5hbWU6IFwiVGFibGVcIixcbiAgICAgICAgZGF0YTogKCk9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICAgICAgICBzZWFyY2g6IG51bGwsXG4gICAgICAgICAgICAgICAgbGFzdF9wYWdlOiBudWxsLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRfcGFnZToxLFxuICAgICAgICAgICAgICAgIHBhZ2luYXRlX2FycmF5OiBudWxsLFxuICAgICAgICAgICAgICAgIGZpZWxkOiBudWxsLFxuICAgICAgICAgICAgICAgIGRpcjpudWxsLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBbXSxcbiAgICAgICAgICAgICAgICBsYXN0X3NlbGVjdGVkOm51bGwsXG4gICAgICAgICAgICAgICAgaW5kZXg6MCxcbiAgICAgICAgICAgICAgICBjb250ZXh0X29wZW5lZDpmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZXh0X3N0eWxlOnt9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgJHJvdXRlKHRvLCBmcm9tKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtcygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICRhdHRyczpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoID0gdGhpcy4kYXR0cnMuc2VhcmNoO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaWx0ZXJfZGF0YToge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIobmV3VmFsLCBvbGRWYWwpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRfcGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXMoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZXA6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpe1xuICAgICAgICAgICAgdGhpcy5nZXRJdGVtcygpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlQ29udGV4dClcbiAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRvbignVG9vTWFueUF0dGVtcHRzJywgKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLiRub3RpZnkoe1xuICAgICAgICAgICAgICAgICAgICBncm91cDogJ21haW4nLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ9Ce0YjQuNCx0LrQsCDRgdC10YDQstC10YDQsCEnLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn0KHQu9C40YjQutC+0Lwg0LzQvdC+0LPQviDQt9Cw0L/RgNC+0YHQvtCyLCDQv9C+0LLRgtC+0YDQuNGC0LUg0L/QvtC/0YvRgtC60YMg0L/QvtC30LbQtS4nXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIFByb2R1Y3RVcGRhdGVkXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXB1dGVkOntcbiAgICAgICAgICAgIGxvYWRpbmcoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kcGFyZW50LmxvYWRpbmc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNBbnlDaGVja2VkKCl7XG4gICAgICAgICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuc2VsZWN0ZWQubGVuZ3RoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsYXN0QnV0dG9uRGlzYWJsZWQoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50X3BhZ2UgPj0gdGhpcy5sYXN0X3BhZ2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlyc3RCdXR0b25EaXNhYmxlZCgpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRfcGFnZSA8PSAxO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHRCdXR0b25EaXNhYmxlZCgpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRfcGFnZSA9PT0gdGhpcy5sYXN0X3BhZ2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJldkJ1dHRvbkRpc2FibGVkKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudF9wYWdlID09PSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOntcbiAgICAgICAgICAgIGRibENsaWNrKGVsZW0pe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYmxlX2RhdGFbJ2RibF9jbGljayddID8gdGhpcy50YWJsZV9kYXRhLmRibF9jbGljayhlbGVtLmlkKSA6IHZvaWQoMCkgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuc2V0U2VsZWN0ZWQoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3Rfc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaCA9IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9nZ2xlU2VsZWN0QWxsKCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpdGVtKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRSZWYoaXRlbSwgaW5kZXgpe1xuICAgICAgICAgICAgICAgIGl0ZW0uaW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2l0ZW1fJyArIGluZGV4O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzU29ydEZpZWxkKGl0ZW0pe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZWxkID09PSBpdGVtLnRhYmxlX25hbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTZWxlY3RlZChpdGVtKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZC5pbmNsdWRlcyhpdGVtLmlkKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1BhZ2VBY3RpdmUocGFnZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChwYWdlID09PSB0aGlzLmN1cnJlbnRfcGFnZSkgPyAnYWN0aXZlJyA6ICcnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFBhZ2luYXRvcigpe1xuICAgICAgICAgICAgICAgIGxldCBwYWdpbmF0ZV9hcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIGxldCBwcmV2X2FycmF5ID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAyOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA+IDAgJiYgaSA8PSB0aGlzLmxhc3RfcGFnZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2X2FycmF5LnB1c2goaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHBhZ2VzX2FycmF5ID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuY3VycmVudF9wYWdlIC0gMjsgaSA8IHRoaXMuY3VycmVudF9wYWdlICsgMjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPiAwICYmIGkgPD0gdGhpcy5sYXN0X3BhZ2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZXNfYXJyYXkucHVzaChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbGFzdF9hcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmxhc3RfcGFnZSAtIDI7IGkgPCB0aGlzLmxhc3RfcGFnZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPiAwICYmIGkgPD0gdGhpcy5sYXN0X3BhZ2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF9hcnJheS5wdXNoKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhZ2luYXRlX2FycmF5ID0gcGFnaW5hdGVfYXJyYXkuY29uY2F0KHByZXZfYXJyYXkpLnVuaXF1ZSgpO1xuICAgICAgICAgICAgICAgIHBhZ2luYXRlX2FycmF5ID0gcGFnaW5hdGVfYXJyYXkuY29uY2F0KHBhZ2VzX2FycmF5KS51bmlxdWUoKTtcbiAgICAgICAgICAgICAgICBwYWdpbmF0ZV9hcnJheSA9IHBhZ2luYXRlX2FycmF5LmNvbmNhdChsYXN0X2FycmF5KS51bmlxdWUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRlX2FycmF5ID0gcGFnaW5hdGVfYXJyYXk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q2F0ZWdvcnlJZCgpe1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy4kcm91dGUucGFyYW1zLmNhdGVnb3J5X2lkID09PSAnYWxsJykgPyB0aGlzLiRhdHRycy5yb290X2lkIDogdGhpcy4kcm91dGUucGFyYW1zLmNhdGVnb3J5X2lkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFNlYXJjaFN0cmluZygpe1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5zZWFyY2ggPT09ICcnKSA/IG51bGwgOiB0aGlzLiRhdHRycy5zZWFyY2g7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SGVhZGVyU3R5bGUoaXRlbSl7XG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlID0ge307XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5taW5fd2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICBzdHlsZS5taW5XaWR0aCA9IGl0ZW0ubWluX3dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoaXRlbS53aWR0aCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0ud2lkdGggPT09ICdhdXRvJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5mbGV4ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLndpZHRoID0gaXRlbS53aWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbHRlck11dGF0b3IocGFyYW1zKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmZpbHRlcl9kYXRhKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5maWx0ZXJfZGF0YS5kYXRlcyAmJiB0aGlzLmZpbHRlcl9kYXRhLmRhdGVzLnN0YXJ0ICYmIHRoaXMuZmlsdGVyX2RhdGEuZGF0ZXMuZW5kKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5kYXRlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmRhdGVzWzBdID0gRGF0ZS5wYXJzZSh0aGlzLmZpbHRlcl9kYXRhLmRhdGVzLnN0YXJ0KSAvIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMuZGF0ZXNbMV0gPSBEYXRlLnBhcnNlKHRoaXMuZmlsdGVyX2RhdGEuZGF0ZXMuZW5kKSAvIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5maWx0ZXJfZGF0YS5maWx0ZXJzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyX2RhdGEuZmlsdGVycy5mb3JFYWNoKChmaWx0ZXIpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbGxlY3Rpb24gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuY29sbGVjdGlvbi5mb3JFYWNoKChpdGVtKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLmJvb2wpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uLnB1c2goaXRlbS52YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtc1tmaWx0ZXIuZmlsZWRdID0gY29sbGVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRJdGVtcygpe1xuICAgICAgICAgICAgICAgIHRoaXMudW5zZXRTZWxlY3RlZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQudGFibGVfbG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeV9pZDogdGhpcy5nZXRDYXRlZ29yeUlkKCksXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaDogdGhpcy5nZXRTZWFyY2hTdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogdGhpcy5jdXJyZW50X3BhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiB0aGlzLmZpZWxkLFxuICAgICAgICAgICAgICAgICAgICBkaXI6IHRoaXMuZGlyLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcGFyYW1zID0gdGhpcy5maWx0ZXJNdXRhdG9yKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLnRhYmxlX2RhdGEudXJsLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHBhcmFtc1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSByZXNwLmRhdGEuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0X3BhZ2UgPSByZXNwLmRhdGEubGFzdF9wYWdlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFBhZ2luYXRvcigpO1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnRhYmxlX2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRQYWdlKG51bSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50X3BhZ2UgPSBudW07XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtcygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZVNvcnQoaXRlbSl7XG4gICAgICAgICAgICAgICAgaWYoIWl0ZW0uc29ydCl7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc29ydCA9ICdBU0MnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihpdGVtLnNvcnQgPT09ICdBU0MnKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc29ydCA9ICdERVNDJ1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc29ydCA9ICdBU0MnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGQgPSBpdGVtLnRhYmxlX25hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXIgPSBpdGVtLnNvcnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtcygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuc2VsZWN0QWxsKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuc2VsZWN0KGlkKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLmZvckVhY2goKHZhbCwga2V5KT0+e1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09PSBpZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnNwbGljZShrZXksIDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3RJdGVtKGl0ZW0pe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VDb250ZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYoIXdpbmRvdy5jdHJsX3ByZXNzZWQgJiYgIXdpbmRvdy5zaGlmdF9wcmVzc2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih3aW5kb3cuY3RybF9wcmVzc2VkKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZC5pbmNsdWRlcyhpdGVtLmlkKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2VsZWN0KGl0ZW0uaWQpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHdpbmRvdy5zaGlmdF9wcmVzc2VkICYmIHRoaXMubGFzdF9zZWxlY3RlZCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1heCA9ICh0aGlzLmxhc3Rfc2VsZWN0ZWQgPiBpdGVtLmluZGV4KSA/IHRoaXMubGFzdF9zZWxlY3RlZCA6IGl0ZW0uaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtaW4gPSAodGhpcy5sYXN0X3NlbGVjdGVkIDwgaXRlbS5pbmRleCkgPyB0aGlzLmxhc3Rfc2VsZWN0ZWQgOiBpdGVtLmluZGV4O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gbWluOyBpIDw9IG1heDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleGVzLnB1c2gocGFyc2VJbnQoaSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpbmRleGVzLmluY2x1ZGVzKGl0ZW0uaW5kZXgpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdF9zZWxlY3RlZCA9IGl0ZW0uaW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wZW5Db250ZXh0KGV2ZW50KXtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dF9vcGVuZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBvZnNldHRlciA9IHRoaXMuJHJlZnMub2ZzZXR0ZXI7XG4gICAgICAgICAgICAgICAgaWYob2ZzZXR0ZXIpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29udGV4dFkgPSBldmVudC5jbGllbnRZIC0gb2ZzZXR0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnNjcm9sbFk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50LmNsaWVudFkgKyB0aGlzLiRyZWZzLmNvbnQub2Zmc2V0SGVpZ2h0ICsgMTAwID49IHdpbmRvdy5pbm5lckhlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0WSAtPSB0aGlzLiRyZWZzLmNvbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dF9zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogY29udGV4dFkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZXZlbnQuY2xpZW50WCAtIG9mc2V0dGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyB3aW5kb3cuc2Nyb2xsWCArICdweCdcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlQ29udGV4dChlKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRfc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogJy0xMjAwcHgnLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnLTEyMDBweCcsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG48L3NjcmlwdD5cbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImZsZXgtMSBoLTEwMFwiLCBhdHRyczogeyBpZDogXCJ0YWJsZS1jb250YWluZXJcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXCJkaXZcIiwgeyByZWY6IFwib2ZzZXR0ZXJcIiwgc3RhdGljQ2xhc3M6IFwiaC0xMDBcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYmJ0YWJsZS1jb250YWluZXJcIiB9LCBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJiYnRhYmxlLWhlYWRlclwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaGVhZGVyLWVsZW0gY2hlY2tib3hcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImNoZWNrYm94XCIgfSxcbiAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IGNoZWNrZWQ6IF92bS5pc0FueUNoZWNrZWQgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS50b2dnbGVTZWxlY3RBbGwoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF92bS5fbChfdm0udGFibGVfZGF0YS5oZWFkZXIsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBrZXk6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaGVhZGVyLWVsZW1cIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBfdm0uaXNTb3J0RmllbGQoaXRlbSkgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiOTBweFwiLCBcIm1pbi13aWR0aFwiOiBcIjkwcHhcIiB9LFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogX3ZtLmdldEhlYWRlclN0eWxlKGl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBcImRhdGEtZmllbGRcIjogXCJpZFwiIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGl0bGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnRvZ2dsZVNvcnQoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoaXRlbS5uYW1lKSldXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICFfdm0uaXNTb3J0RmllbGQoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYXJyb3cgZG93blwiIH0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmlzU29ydEZpZWxkKGl0ZW0pICYmIF92bS5kaXIgPT09IFwiREVTQ1wiXG4gICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImFycm93IGRvd25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBfdm0uaXNTb3J0RmllbGQoaXRlbSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfdm0uaXNTb3J0RmllbGQoaXRlbSkgJiYgX3ZtLmRpciA9PT0gXCJBU0NcIlxuICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJhcnJvdyB1cFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogeyBhY3RpdmU6IF92bS5pc1NvcnRGaWVsZChpdGVtKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMlxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJidGFibGUtYm9keVwiLFxuICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiY2FsYygxMDAlIC0gNTlweClcIiB9LFxuICAgICAgICAgICAgICBhdHRyczogeyBcImRhdGEtc2ltcGxlYmFyXCI6IFwiXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLml0ZW1zLCBmdW5jdGlvbihlbGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIV92bS5sb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJpdGVtX1wiICsgaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBfdm0uc2V0UmVmKGVsZW0sIGluZGV4KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZJbkZvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJib2R5LWVsZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogeyBzZWxlY3RlZDogX3ZtLmlzU2VsZWN0ZWQoZWxlbSkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGJsY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmRibENsaWNrKGVsZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dG1lbnU6IF92bS5vcGVuQ29udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZWxlY3RJdGVtKGVsZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjZWxsIGNoZWNrYm94XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiY2hlY2tib3hcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyBjaGVja2VkOiBfdm0uaXNTZWxlY3RlZChlbGVtKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImxhYmVsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLnRhYmxlX2RhdGEuaGVhZGVyLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGl0ZW0ubmFtZSArIGVsZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2VsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBfdm0uZ2V0SGVhZGVyU3R5bGUoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidGl0bGVcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKGVsZW1baXRlbS50YWJsZV9uYW1lXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfdm0ubG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woMTIsIGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IGVsZW0sIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2NlbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiMzBweFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0udGFibGVfZGF0YS5oZWFkZXIsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGl0ZW0ubmFtZSArIFwicGxhY2Vob2xkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2NlbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogX3ZtLmdldEhlYWRlclN0eWxlKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAhX3ZtLmxvYWRpbmdcbiAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICByZWY6IFwiY29udFwiLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY29udGV4dFwiLFxuICAgICAgICAgICAgICAgICAgc3R5bGU6IF92bS5jb250ZXh0X3N0eWxlLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IFwiY29udGV4dFwiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF92bS5fbChfdm0udGFibGVfZGF0YS5jb250ZXh0X21lbnUsIGZ1bmN0aW9uKG1lbnUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGtleTogbWVudS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvbnRleHRfaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZW51LmFjdGlvbihfdm0uZWxlbS5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhtZW51Lm5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInBhZ2luYXRvclwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZGlzYWJsZWQ6IF92bS5maXJzdEJ1dHRvbkRpc2FibGVkIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZXRQYWdlKDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQn9C10YDQstCw0Y9cIildXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZGlzYWJsZWQ6IF92bS5wcmV2QnV0dG9uRGlzYWJsZWQgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNldFBhZ2UoX3ZtLmN1cnJlbnRfcGFnZSAtIDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQndCw0LfQsNC0XCIpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfdm0uX2woX3ZtLnBhZ2luYXRlX2FycmF5LCBmdW5jdGlvbihwYWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IF92bS5pc1BhZ2VBY3RpdmUocGFnZSksXG4gICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZXRQYWdlKHBhZ2UpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MocGFnZSkpXVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZGlzYWJsZWQ6IF92bS5uZXh0QnV0dG9uRGlzYWJsZWQgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNldFBhZ2UoX3ZtLmN1cnJlbnRfcGFnZSArIDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQktC/0LXRgNGR0LRcIildXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZGlzYWJsZWQ6IF92bS5sYXN0QnV0dG9uRGlzYWJsZWQgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNldFBhZ2UoX3ZtLmxhc3RfcGFnZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihcItCf0L7RgdC70LXQtNC90Y/Rj1wiKV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDJcbiAgICAgICAgICApXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vVGFibGUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTcyNzdlNGNlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1RhYmxlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vVGFibGUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc3Mjc3ZTRjZScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc3Mjc3ZTRjZScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc3Mjc3ZTRjZScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vVGFibGUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTcyNzdlNGNlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzcyNzdlNGNlJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVGFibGUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1RhYmxlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UYWJsZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzI3N2U0Y2UmXCIiLCJsZXQgZGVib3VuY2UgPSBmdW5jdGlvbiBkZWJvdW5jZSAoZm4sIGRlbGF5KSB7XHJcbiAgICBsZXQgdGltZW91dElEID0gbnVsbDtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7O1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xyXG4gICAgICAgIGxldCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncylcclxuICAgICAgICB9LCBkZWxheSlcclxuICAgIH1cclxufVxyXG5cclxuZGlyZWN0aXZlLmRlYm91bmNlID0gZGVib3VuY2U7XHJcblxyXG5mdW5jdGlvbiBkaXJlY3RpdmUgKGVsLCBiaW5kaW5nKSB7XHJcbiAgICBpZiAoYmluZGluZy52YWx1ZSAhPT0gYmluZGluZy5vbGRWYWx1ZSkgeyAvLyBjaGFuZ2UgZGVib3VuY2Ugb25seSBpZiBpbnRlcnZhbCBoYXMgY2hhbmdlZFxyXG4gICAgICAgIGVsLm9uaW5wdXQgPSBkaXJlY3RpdmUuZGVib3VuY2UoZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJykpXHJcbiAgICAgICAgfSwgcGFyc2VJbnQoYmluZGluZy52YWx1ZSkgfHwgNTAwKVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRpcmVjdGl2ZTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==