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
      contexted_elem: null,
      context_style: {},
      updated_id: null
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

    this.$eventBus.$on(this.table_data.event_tag + 'Updated', function (data) {
      _this.updated_id = data.id;

      _this.getItems();
    });
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
    isItemUpdated: function isItemUpdated(item) {
      return item.id === this.updated_id;
    },
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

        setTimeout(function () {
          _this3.updated_id = null;
        }, 1000);
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

      this.updated_id = null;
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
    openContext: function openContext(event, elem) {
      event.preventDefault();
      this.contexted_elem = elem;
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

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/Table.vue?vue&type=style&index=0&id=7277e4ce&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--10-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/service/Table.vue?vue&type=style&index=0&id=7277e4ce&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.updated[data-v-7277e4ce]:before{\n    content: '';\n    border-bottom: 1px solid transparent!important;\n    position: absolute;\n    background: #63a049;\n    height: 100%;\n    width: 100%;\n    opacity: 0;\n    z-index: 0!important;\n    -webkit-animation: 1s updated_table linear;\n            animation: 1s updated_table linear;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/Table.vue?vue&type=style&index=0&id=7277e4ce&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--10-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/service/Table.vue?vue&type=style&index=0&id=7277e4ce&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--10-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--10-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Table.vue?vue&type=style&index=0&id=7277e4ce&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/Table.vue?vue&type=style&index=0&id=7277e4ce&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/Table.vue?vue&type=template&id=7277e4ce&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/service/Table.vue?vue&type=template&id=7277e4ce&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
                            class: {
                              selected: _vm.isSelected(elem),
                              updated: _vm.isItemUpdated(elem)
                            },
                            on: {
                              dblclick: function($event) {
                                return _vm.dblClick(elem)
                              },
                              contextmenu: function($event) {
                                return _vm.openContext($event, elem)
                              },
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
                          return menu.action(_vm.contexted_elem)
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
/* harmony import */ var _Table_vue_vue_type_template_id_7277e4ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Table.vue?vue&type=template&id=7277e4ce&scoped=true& */ "./resources/js/components/service/Table.vue?vue&type=template&id=7277e4ce&scoped=true&");
/* harmony import */ var _Table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Table.vue?vue&type=script&lang=js& */ "./resources/js/components/service/Table.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Table_vue_vue_type_style_index_0_id_7277e4ce_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Table.vue?vue&type=style&index=0&id=7277e4ce&scoped=true&lang=css& */ "./resources/js/components/service/Table.vue?vue&type=style&index=0&id=7277e4ce&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Table_vue_vue_type_template_id_7277e4ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Table_vue_vue_type_template_id_7277e4ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7277e4ce",
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

/***/ "./resources/js/components/service/Table.vue?vue&type=style&index=0&id=7277e4ce&scoped=true&lang=css&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/service/Table.vue?vue&type=style&index=0&id=7277e4ce&scoped=true&lang=css& ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_style_index_0_id_7277e4ce_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--10-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--10-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Table.vue?vue&type=style&index=0&id=7277e4ce&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/Table.vue?vue&type=style&index=0&id=7277e4ce&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_style_index_0_id_7277e4ce_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_style_index_0_id_7277e4ce_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_style_index_0_id_7277e4ce_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_style_index_0_id_7277e4ce_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_style_index_0_id_7277e4ce_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/service/Table.vue?vue&type=template&id=7277e4ce&scoped=true&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/service/Table.vue?vue&type=template&id=7277e4ce&scoped=true& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_template_id_7277e4ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Table.vue?vue&type=template&id=7277e4ce&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/Table.vue?vue&type=template&id=7277e4ce&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_template_id_7277e4ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_template_id_7277e4ce_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWU/ZjA5OCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZT80MTVkIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvVGFibGUudnVlPzMwMjMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWU/NDM3OSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZT83NGMxIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvVGFibGUudnVlPzQ1ZmYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2RlYm91bmNlLmpzIl0sIm5hbWVzIjpbImRlYm91bmNlIiwiZm4iLCJkZWxheSIsInRpbWVvdXRJRCIsImNsZWFyVGltZW91dCIsImFyZ3MiLCJhcmd1bWVudHMiLCJ0aGF0Iiwic2V0VGltZW91dCIsImFwcGx5IiwiZGlyZWN0aXZlIiwiZWwiLCJiaW5kaW5nIiwidmFsdWUiLCJvbGRWYWx1ZSIsIm9uaW5wdXQiLCJldnQiLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJwYXJzZUludCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxRUE7QUFDQSxvREFEQTtBQUVBLGVBRkE7QUFHQTtBQUNB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O0FBQ3pDLE1BQUlDLFNBQVMsR0FBRyxJQUFoQjtBQUNBLFNBQU8sWUFBWTtBQUFDO0FBQ2hCQyxnQkFBWSxDQUFDRCxTQUFELENBQVo7QUFDQSxRQUFJRSxJQUFJLEdBQUdDLFNBQVg7QUFDQSxRQUFJQyxJQUFJLEdBQUcsSUFBWDtBQUNBSixhQUFTLEdBQUdLLFVBQVUsQ0FBQyxZQUFZO0FBQy9CUCxRQUFFLENBQUNRLEtBQUgsQ0FBU0YsSUFBVCxFQUFlRixJQUFmO0FBQ0gsS0FGcUIsRUFFbkJILEtBRm1CLENBQXRCO0FBR0gsR0FQRDtBQVFILENBVkQ7O0FBWUFRLFNBQVMsQ0FBQ1YsUUFBVixHQUFxQkEsUUFBckI7O0FBRUEsU0FBU1UsU0FBVCxDQUFvQkMsRUFBcEIsRUFBd0JDLE9BQXhCLEVBQWlDO0FBQzdCLE1BQUlBLE9BQU8sQ0FBQ0MsS0FBUixLQUFrQkQsT0FBTyxDQUFDRSxRQUE5QixFQUF3QztBQUFFO0FBQ3RDSCxNQUFFLENBQUNJLE9BQUgsR0FBYUwsU0FBUyxDQUFDVixRQUFWLENBQW1CLFVBQVVnQixHQUFWLEVBQWU7QUFDM0NMLFFBQUUsQ0FBQ00sYUFBSCxDQUFpQixJQUFJQyxLQUFKLENBQVUsUUFBVixDQUFqQjtBQUNILEtBRlksRUFFVkMsUUFBUSxDQUFDUCxPQUFPLENBQUNDLEtBQVQsQ0FBUixJQUEyQixHQUZqQixDQUFiO0FBR0g7QUFDSjs7QUFFRE8sTUFBTSxDQUFDQyxPQUFQLEdBQWlCWCxTQUFqQixDIiwiZmlsZSI6IkJhc2V+RW50cmFuY2V+RW50cmFuY2VSZWZ1bmR+UHJvdmlkZXJPcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICAgIDxkaXYgaWQ9XCJ0YWJsZS1jb250YWluZXJcIiBjbGFzcz1cImZsZXgtMSBoLTEwMFwiPlxyXG4gICAgICAgIDxkaXYgcmVmPVwib2ZzZXR0ZXJcIiBjbGFzcz1cImgtMTAwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYnRhYmxlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJidGFibGUtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1lbGVtIGNoZWNrYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2LWJpbmQ6Y2hlY2tlZD1cImlzQW55Q2hlY2tlZFwiIHR5cGU9XCJjaGVja2JveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgdi1vbjpjbGljaz1cInRvZ2dsZVNlbGVjdEFsbCgpXCI+PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IGlzU29ydEZpZWxkKGl0ZW0pfVwiIHYtZm9yPVwiaXRlbSBpbiB0YWJsZV9kYXRhLmhlYWRlclwiIHYtYmluZDprZXk9XCJpdGVtLm5hbWVcIiB2LWJpbmQ6c3R5bGU9XCJnZXRIZWFkZXJTdHlsZShpdGVtKVwiIGNsYXNzPVwiaGVhZGVyLWVsZW1cIiBkYXRhLWZpZWxkPVwiaWRcIiBzdHlsZT1cIndpZHRoOiA5MHB4OyBtaW4td2lkdGg6IDkwcHg7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1vbjpjbGljaz1cInRvZ2dsZVNvcnQoaXRlbSlcIiBjbGFzcz1cInRpdGxlXCI+e3sgaXRlbS5uYW1lIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cIiFpc1NvcnRGaWVsZChpdGVtKVwiIGNsYXNzPVwiYXJyb3cgZG93blwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJpc1NvcnRGaWVsZChpdGVtKSAmJiBkaXIgPT09ICdERVNDJ1wiIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IGlzU29ydEZpZWxkKGl0ZW0pfVwiIGNsYXNzPVwiYXJyb3cgZG93blwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJpc1NvcnRGaWVsZChpdGVtKSAmJiBkaXIgPT09ICdBU0MnXCIgdi1iaW5kOmNsYXNzPVwieydhY3RpdmUnIDogaXNTb3J0RmllbGQoaXRlbSl9XCIgY2xhc3M9XCJhcnJvdyB1cFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmJ0YWJsZS1ib2R5XCIgZGF0YS1zaW1wbGViYXIgc3R5bGU9XCJoZWlnaHQ6IGNhbGMoMTAwJSAtIDU5cHgpO1wiID5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCIhbG9hZGluZ1wiIHYtb246ZGJsY2xpY2s9XCJkYmxDbGljayhlbGVtKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1vbjpjb250ZXh0bWVudT1cIm9wZW5Db250ZXh0KCRldmVudCwgZWxlbSlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtb246Y2xpY2s9XCJzZWxlY3RJdGVtKGVsZW0pXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cIihlbGVtLCBpbmRleCkgaW4gaXRlbXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpyZWY9XCJzZXRSZWYoZWxlbSwgaW5kZXgpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6a2V5PVwiJ2l0ZW1fJyArIGluZGV4XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6Y2xhc3M9XCJ7ICdzZWxlY3RlZCcgOiBpc1NlbGVjdGVkKGVsZW0pLCAndXBkYXRlZCcgOiBpc0l0ZW1VcGRhdGVkKGVsZW0pfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJib2R5LWVsZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsIGNoZWNrYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHYtYmluZDpjaGVja2VkPVwiaXNTZWxlY3RlZChlbGVtKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD48L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCJpdGVtIGluIHRhYmxlX2RhdGEuaGVhZGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6a2V5PVwiaXRlbS5uYW1lICsgZWxlbS5pZFwiIGNsYXNzPVwiY2VsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnN0eWxlPVwiZ2V0SGVhZGVyU3R5bGUoaXRlbSlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57eyBlbGVtW2l0ZW0udGFibGVfbmFtZV0gfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwibG9hZGluZ1wiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cImVsZW0gaW4gMTJcIiB2LWJpbmQ6a2V5PVwiZWxlbVwiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfY2VsbFwiIHN0eWxlPVwid2lkdGg6IDMwcHhcIiA+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cIml0ZW0gaW4gdGFibGVfZGF0YS5oZWFkZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmtleT1cIml0ZW0ubmFtZSArICdwbGFjZWhvbGRlcidcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnN0eWxlPVwiZ2V0SGVhZGVyU3R5bGUoaXRlbSlcIiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfY2VsbFwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiIWxvYWRpbmdcIiByZWY9XCJjb250XCIgY2xhc3M9XCJjb250ZXh0XCIgaWQ9XCJjb250ZXh0XCIgdi1iaW5kOnN0eWxlPVwiY29udGV4dF9zdHlsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgdi1vbjpjbGljaz1cIm1lbnUuYWN0aW9uKGNvbnRleHRlZF9lbGVtKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cIm1lbnUgaW4gdGFibGVfZGF0YS5jb250ZXh0X21lbnVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmtleT1cIm1lbnUubmFtZVwiIGNsYXNzPVwiY29udGV4dF9pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPnt7IG1lbnUubmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB2LW9uOmNsaWNrPVwic2V0UGFnZSgxKVwiIHYtYmluZDpkaXNhYmxlZD1cImZpcnN0QnV0dG9uRGlzYWJsZWRcIiA+0J/QtdGA0LLQsNGPPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB2LW9uOmNsaWNrPVwic2V0UGFnZShjdXJyZW50X3BhZ2UgLSAxKVwiIHYtYmluZDpkaXNhYmxlZD1cInByZXZCdXR0b25EaXNhYmxlZFwiPtCd0LDQt9Cw0LQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHYtZm9yPVwicGFnZSBpbiBwYWdpbmF0ZV9hcnJheVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6Y2xhc3M9XCJpc1BhZ2VBY3RpdmUocGFnZSlcIiB2LW9uOmNsaWNrPVwic2V0UGFnZShwYWdlKVwiPnt7IHBhZ2UgfX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHYtb246Y2xpY2s9XCJzZXRQYWdlKGN1cnJlbnRfcGFnZSArIDEpXCIgdi1iaW5kOmRpc2FibGVkPVwibmV4dEJ1dHRvbkRpc2FibGVkXCIgPtCS0L/QtdGA0ZHQtDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdi1vbjpjbGljaz1cInNldFBhZ2UobGFzdF9wYWdlKVwiIHYtYmluZDpkaXNhYmxlZD1cImxhc3RCdXR0b25EaXNhYmxlZFwiPtCf0L7RgdC70LXQtNC90Y/RjzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gICAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICAgIHByb3BzOlsndGFibGVfZGF0YScsICdmaWx0ZXJfZGF0YScsICdldmVudF9kYXRhJ10sXHJcbiAgICAgICAgbmFtZTogXCJUYWJsZVwiLFxyXG4gICAgICAgIGRhdGE6ICgpPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgc2VhcmNoOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbGFzdF9wYWdlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudF9wYWdlOjEsXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0ZV9hcnJheTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZGlyOm51bGwsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogW10sXHJcbiAgICAgICAgICAgICAgICBsYXN0X3NlbGVjdGVkOm51bGwsXHJcbiAgICAgICAgICAgICAgICBpbmRleDowLFxyXG4gICAgICAgICAgICAgICAgY29udGV4dF9vcGVuZWQ6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0ZWRfZWxlbTpudWxsLFxyXG4gICAgICAgICAgICAgICAgY29udGV4dF9zdHlsZTp7fSxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWRfaWQ6bnVsbCxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2F0Y2g6IHtcclxuICAgICAgICAgICAgJHJvdXRlKHRvLCBmcm9tKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICRhdHRyczpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2ggPSB0aGlzLiRhdHRycy5zZWFyY2g7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZpbHRlcl9kYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyKG5ld1ZhbCwgb2xkVmFsKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRfcGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtcygpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRlZXA6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdW50ZWQoKXtcclxuICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJG9uKHRoaXMudGFibGVfZGF0YS5ldmVudF90YWcgKyAnVXBkYXRlZCcsIChkYXRhKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVkX2lkID0gZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXMoKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlQ29udGV4dClcclxuICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJG9uKCdUb29NYW55QXR0ZW1wdHMnLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kbm90aWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cDogJ21haW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn0J7RiNC40LHQutCwINGB0LXRgNCy0LXRgNCwIScsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ9Ch0LvQuNGI0LrQvtC8INC80L3QvtCz0L4g0LfQsNC/0YDQvtGB0L7Qsiwg0L/QvtCy0YLQvtGA0LjRgtC1INC/0L7Qv9GL0YLQutGDINC/0L7Qt9C20LUuJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBQcm9kdWN0VXBkYXRlZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcHV0ZWQ6e1xyXG4gICAgICAgICAgICBsb2FkaW5nKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kcGFyZW50LmxvYWRpbmc7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzQW55Q2hlY2tlZCgpe1xyXG4gICAgICAgICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuc2VsZWN0ZWQubGVuZ3RoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGFzdEJ1dHRvbkRpc2FibGVkKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50X3BhZ2UgPj0gdGhpcy5sYXN0X3BhZ2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZpcnN0QnV0dG9uRGlzYWJsZWQoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRfcGFnZSA8PSAxO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuZXh0QnV0dG9uRGlzYWJsZWQoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRfcGFnZSA9PT0gdGhpcy5sYXN0X3BhZ2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByZXZCdXR0b25EaXNhYmxlZCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudF9wYWdlID09PSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOntcclxuICAgICAgICAgICAgaXNJdGVtVXBkYXRlZChpdGVtKXtcclxuICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT09IHRoaXMudXBkYXRlZF9pZDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGJsQ2xpY2soZWxlbSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YWJsZV9kYXRhWydkYmxfY2xpY2snXSA/IHRoaXMudGFibGVfZGF0YS5kYmxfY2xpY2soZWxlbS5pZCkgOiB2b2lkKDApIDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdW5zZXRTZWxlY3RlZCgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0X3NlbGVjdGVkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoID0gbnVsbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9nZ2xlU2VsZWN0QWxsKCl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5wdXNoKGl0ZW0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRSZWYoaXRlbSwgaW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgaXRlbS5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdpdGVtXycgKyBpbmRleDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXNTb3J0RmllbGQoaXRlbSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWVsZCA9PT0gaXRlbS50YWJsZV9uYW1lO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc1NlbGVjdGVkKGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQuaW5jbHVkZXMoaXRlbS5pZCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzUGFnZUFjdGl2ZShwYWdlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAocGFnZSA9PT0gdGhpcy5jdXJyZW50X3BhZ2UpID8gJ2FjdGl2ZScgOiAnJztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0UGFnaW5hdG9yKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFnaW5hdGVfYXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCBwcmV2X2FycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPiAwICYmIGkgPD0gdGhpcy5sYXN0X3BhZ2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2X2FycmF5LnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHBhZ2VzX2FycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5jdXJyZW50X3BhZ2UgLSAyOyBpIDwgdGhpcy5jdXJyZW50X3BhZ2UgKyAyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpID4gMCAmJiBpIDw9IHRoaXMubGFzdF9wYWdlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZXNfYXJyYXkucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdF9hcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMubGFzdF9wYWdlIC0gMjsgaSA8IHRoaXMubGFzdF9wYWdlOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpID4gMCAmJiBpIDw9IHRoaXMubGFzdF9wYWdlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF9hcnJheS5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhZ2luYXRlX2FycmF5ID0gcGFnaW5hdGVfYXJyYXkuY29uY2F0KHByZXZfYXJyYXkpLnVuaXF1ZSgpO1xyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGVfYXJyYXkgPSBwYWdpbmF0ZV9hcnJheS5jb25jYXQocGFnZXNfYXJyYXkpLnVuaXF1ZSgpO1xyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGVfYXJyYXkgPSBwYWdpbmF0ZV9hcnJheS5jb25jYXQobGFzdF9hcnJheSkudW5pcXVlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRlX2FycmF5ID0gcGFnaW5hdGVfYXJyYXk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldENhdGVnb3J5SWQoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy4kcm91dGUucGFyYW1zLmNhdGVnb3J5X2lkID09PSAnYWxsJykgPyB0aGlzLiRhdHRycy5yb290X2lkIDogdGhpcy4kcm91dGUucGFyYW1zLmNhdGVnb3J5X2lkO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRTZWFyY2hTdHJpbmcoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5zZWFyY2ggPT09ICcnKSA/IG51bGwgOiB0aGlzLiRhdHRycy5zZWFyY2g7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldEhlYWRlclN0eWxlKGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlID0ge307XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLm1pbl93aWR0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUubWluV2lkdGggPSBpdGVtLm1pbl93aWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLndpZHRoKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihpdGVtLndpZHRoID09PSAnYXV0bycpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5mbGV4ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS53aWR0aCA9IGl0ZW0ud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmlsdGVyTXV0YXRvcihwYXJhbXMpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5maWx0ZXJfZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5maWx0ZXJfZGF0YS5kYXRlcyAmJiB0aGlzLmZpbHRlcl9kYXRhLmRhdGVzLnN0YXJ0ICYmIHRoaXMuZmlsdGVyX2RhdGEuZGF0ZXMuZW5kKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmRhdGVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5kYXRlc1swXSA9IERhdGUucGFyc2UodGhpcy5maWx0ZXJfZGF0YS5kYXRlcy5zdGFydCkgLyAxMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMuZGF0ZXNbMV0gPSBEYXRlLnBhcnNlKHRoaXMuZmlsdGVyX2RhdGEuZGF0ZXMuZW5kKSAvIDEwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZmlsdGVyX2RhdGEuZmlsdGVycyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyX2RhdGEuZmlsdGVycy5mb3JFYWNoKChmaWx0ZXIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sbGVjdGlvbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmNvbGxlY3Rpb24uZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLmJvb2wpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24ucHVzaChpdGVtLnZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtc1tmaWx0ZXIuZmlsZWRdID0gY29sbGVjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRJdGVtcygpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNldFNlbGVjdGVkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQudGFibGVfbG9hZGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeV9pZDogdGhpcy5nZXRDYXRlZ29yeUlkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiB0aGlzLmdldFNlYXJjaFN0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHRoaXMuY3VycmVudF9wYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiB0aGlzLmZpZWxkLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcjogdGhpcy5kaXIsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zID0gdGhpcy5maWx0ZXJNdXRhdG9yKHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLnRhYmxlX2RhdGEudXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSByZXNwLmRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RfcGFnZSA9IHJlc3AuZGF0YS5sYXN0X3BhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRQYWdpbmF0b3IoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlZF9pZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnRhYmxlX2xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRQYWdlKG51bSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRfcGFnZSA9IG51bTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXMoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9nZ2xlU29ydChpdGVtKXtcclxuICAgICAgICAgICAgICAgIGlmKCFpdGVtLnNvcnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc29ydCA9ICdBU0MnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGl0ZW0uc29ydCA9PT0gJ0FTQycpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNvcnQgPSAnREVTQydcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zb3J0ID0gJ0FTQydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGQgPSBpdGVtLnRhYmxlX25hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpciA9IGl0ZW0uc29ydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXMoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdW5zZWxlY3RBbGwoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdW5zZWxlY3QoaWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5mb3JFYWNoKCh2YWwsIGtleSk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09PSBpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuc3BsaWNlKGtleSwgMSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2VsZWN0SXRlbShpdGVtKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlZF9pZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlQ29udGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoIXdpbmRvdy5jdHJsX3ByZXNzZWQgJiYgIXdpbmRvdy5zaGlmdF9wcmVzc2VkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih3aW5kb3cuY3RybF9wcmVzc2VkKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkLmluY2x1ZGVzKGl0ZW0uaWQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNlbGVjdChpdGVtLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaChpdGVtLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaChpdGVtLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHdpbmRvdy5zaGlmdF9wcmVzc2VkICYmIHRoaXMubGFzdF9zZWxlY3RlZCAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXhlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXggPSAodGhpcy5sYXN0X3NlbGVjdGVkID4gaXRlbS5pbmRleCkgPyB0aGlzLmxhc3Rfc2VsZWN0ZWQgOiBpdGVtLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtaW4gPSAodGhpcy5sYXN0X3NlbGVjdGVkIDwgaXRlbS5pbmRleCkgPyB0aGlzLmxhc3Rfc2VsZWN0ZWQgOiBpdGVtLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBtaW47IGkgPD0gbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhlcy5wdXNoKHBhcnNlSW50KGkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpbmRleGVzLmluY2x1ZGVzKGl0ZW0uaW5kZXgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaChpdGVtLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3Rfc2VsZWN0ZWQgPSBpdGVtLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvcGVuQ29udGV4dChldmVudCwgZWxlbSl7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ZWRfZWxlbSA9IGVsZW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRfb3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBvZnNldHRlciA9IHRoaXMuJHJlZnMub2ZzZXR0ZXI7XHJcbiAgICAgICAgICAgICAgICBpZihvZnNldHRlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRleHRZID0gZXZlbnQuY2xpZW50WSAtIG9mc2V0dGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5zY3JvbGxZO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50LmNsaWVudFkgKyB0aGlzLiRyZWZzLmNvbnQub2Zmc2V0SGVpZ2h0ICsgMTAwID49IHdpbmRvdy5pbm5lckhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRZIC09IHRoaXMuJHJlZnMuY29udC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dF9zdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBjb250ZXh0WSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGV2ZW50LmNsaWVudFggLSBvZnNldHRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgd2luZG93LnNjcm9sbFggKyAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbG9zZUNvbnRleHQoZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRfc3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnLTEyMDBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJy0xMjAwcHgnLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbjwvc2NyaXB0PlxyXG48c3R5bGUgc2NvcGVkPlxyXG4gICAgLnVwZGF0ZWQ6YmVmb3Jle1xyXG4gICAgICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB0cmFuc3BhcmVudCFpbXBvcnRhbnQ7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICM2M2EwNDk7XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgICAgei1pbmRleDogMCFpbXBvcnRhbnQ7XHJcbiAgICAgICAgYW5pbWF0aW9uOiAxcyB1cGRhdGVkX3RhYmxlIGxpbmVhcjtcclxuICAgIH1cclxuPC9zdHlsZT5cclxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4udXBkYXRlZFtkYXRhLXYtNzI3N2U0Y2VdOmJlZm9yZXtcXG4gICAgY29udGVudDogJyc7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB0cmFuc3BhcmVudCFpbXBvcnRhbnQ7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYmFja2dyb3VuZDogIzYzYTA0OTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgei1pbmRleDogMCFpbXBvcnRhbnQ7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiAxcyB1cGRhdGVkX3RhYmxlIGxpbmVhcjtcXG4gICAgICAgICAgICBhbmltYXRpb246IDFzIHVwZGF0ZWRfdGFibGUgbGluZWFyO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMTAtMSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/cmVmLS0xMC0yIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVGFibGUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NzI3N2U0Y2Umc2NvcGVkPXRydWUmbGFuZz1jc3MmXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xMC0xIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTEwLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UYWJsZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD03Mjc3ZTRjZSZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xMC0xIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTEwLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UYWJsZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD03Mjc3ZTRjZSZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJmbGV4LTEgaC0xMDBcIiwgYXR0cnM6IHsgaWQ6IFwidGFibGUtY29udGFpbmVyXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgcmVmOiBcIm9mc2V0dGVyXCIsIHN0YXRpY0NsYXNzOiBcImgtMTAwXCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJidGFibGUtY29udGFpbmVyXCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiYmJ0YWJsZS1oZWFkZXJcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImhlYWRlci1lbGVtIGNoZWNrYm94XCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJjaGVja2JveFwiIH0sXG4gICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyBjaGVja2VkOiBfdm0uaXNBbnlDaGVja2VkIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwibGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0udG9nZ2xlU2VsZWN0QWxsKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfdm0uX2woX3ZtLnRhYmxlX2RhdGEuaGVhZGVyLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBpdGVtLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImhlYWRlci1lbGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLmlzU29ydEZpZWxkKGl0ZW0pIH0sXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjkwcHhcIiwgXCJtaW4td2lkdGhcIjogXCI5MHB4XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IF92bS5nZXRIZWFkZXJTdHlsZShpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJkYXRhLWZpZWxkXCI6IFwiaWRcIiB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRpdGxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS50b2dnbGVTb3J0KGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKGl0ZW0ubmFtZSkpXVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAhX3ZtLmlzU29ydEZpZWxkKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImFycm93IGRvd25cIiB9KVxuICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF92bS5pc1NvcnRGaWVsZChpdGVtKSAmJiBfdm0uZGlyID09PSBcIkRFU0NcIlxuICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJhcnJvdyBkb3duXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLmlzU29ydEZpZWxkKGl0ZW0pIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmlzU29ydEZpZWxkKGl0ZW0pICYmIF92bS5kaXIgPT09IFwiQVNDXCJcbiAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYXJyb3cgdXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBfdm0uaXNTb3J0RmllbGQoaXRlbSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDJcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJiYnRhYmxlLWJvZHlcIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcImNhbGMoMTAwJSAtIDU5cHgpXCIgfSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgXCJkYXRhLXNpbXBsZWJhclwiOiBcIlwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5pdGVtcywgZnVuY3Rpb24oZWxlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFfdm0ubG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiaXRlbV9cIiArIGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogX3ZtLnNldFJlZihlbGVtLCBpbmRleCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmSW5Gb3I6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYm9keS1lbGVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBfdm0uaXNTZWxlY3RlZChlbGVtKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWQ6IF92bS5pc0l0ZW1VcGRhdGVkKGVsZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGJsY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmRibENsaWNrKGVsZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dG1lbnU6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLm9wZW5Db250ZXh0KCRldmVudCwgZWxlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2VsZWN0SXRlbShlbGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2VsbCBjaGVja2JveFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImNoZWNrYm94XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgY2hlY2tlZDogX3ZtLmlzU2VsZWN0ZWQoZWxlbSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJsYWJlbFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS50YWJsZV9kYXRhLmhlYWRlciwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBpdGVtLm5hbWUgKyBlbGVtLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNlbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogX3ZtLmdldEhlYWRlclN0eWxlKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhlbGVtW2l0ZW0udGFibGVfbmFtZV0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX3ZtLmxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKDEyLCBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiBlbGVtLCBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjMwcHhcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLnRhYmxlX2RhdGEuaGVhZGVyLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBpdGVtLm5hbWUgKyBcInBsYWNlaG9sZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IF92bS5nZXRIZWFkZXJTdHlsZShpdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgIV92bS5sb2FkaW5nXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgcmVmOiBcImNvbnRcIixcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvbnRleHRcIixcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiBfdm0uY29udGV4dF9zdHlsZSxcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGlkOiBcImNvbnRleHRcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLnRhYmxlX2RhdGEuY29udGV4dF9tZW51LCBmdW5jdGlvbihtZW51KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBrZXk6IG1lbnUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjb250ZXh0X2l0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVudS5hY3Rpb24oX3ZtLmNvbnRleHRlZF9lbGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidGl0bGVcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKG1lbnUubmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicGFnaW5hdG9yXCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBkaXNhYmxlZDogX3ZtLmZpcnN0QnV0dG9uRGlzYWJsZWQgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNldFBhZ2UoMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihcItCf0LXRgNCy0LDRj1wiKV1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBkaXNhYmxlZDogX3ZtLnByZXZCdXR0b25EaXNhYmxlZCB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2V0UGFnZShfdm0uY3VycmVudF9wYWdlIC0gMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihcItCd0LDQt9Cw0LRcIildXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF92bS5fbChfdm0ucGFnaW5hdGVfYXJyYXksIGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjbGFzczogX3ZtLmlzUGFnZUFjdGl2ZShwYWdlKSxcbiAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNldFBhZ2UocGFnZSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhwYWdlKSldXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBkaXNhYmxlZDogX3ZtLm5leHRCdXR0b25EaXNhYmxlZCB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2V0UGFnZShfdm0uY3VycmVudF9wYWdlICsgMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihcItCS0L/QtdGA0ZHQtFwiKV1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBkaXNhYmxlZDogX3ZtLmxhc3RCdXR0b25EaXNhYmxlZCB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2V0UGFnZShfdm0ubGFzdF9wYWdlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0J/QvtGB0LvQtdC00L3Rj9GPXCIpXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMlxuICAgICAgICAgIClcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgXVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9UYWJsZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzI3N2U0Y2Umc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vVGFibGUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9UYWJsZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vVGFibGUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NzI3N2U0Y2Umc2NvcGVkPXRydWUmbGFuZz1jc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjcyNzdlNGNlXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNzI3N2U0Y2UnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNzI3N2U0Y2UnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNzI3N2U0Y2UnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1RhYmxlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03Mjc3ZTRjZSZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc3Mjc3ZTRjZScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1RhYmxlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UYWJsZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMTAtMSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/cmVmLS0xMC0yIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVGFibGUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NzI3N2U0Y2Umc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xMC0xIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTEwLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UYWJsZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD03Mjc3ZTRjZSZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UYWJsZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzI3N2U0Y2Umc2NvcGVkPXRydWUmXCIiLCJsZXQgZGVib3VuY2UgPSBmdW5jdGlvbiBkZWJvdW5jZSAoZm4sIGRlbGF5KSB7XHJcbiAgICBsZXQgdGltZW91dElEID0gbnVsbDtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7O1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xyXG4gICAgICAgIGxldCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncylcclxuICAgICAgICB9LCBkZWxheSlcclxuICAgIH1cclxufVxyXG5cclxuZGlyZWN0aXZlLmRlYm91bmNlID0gZGVib3VuY2U7XHJcblxyXG5mdW5jdGlvbiBkaXJlY3RpdmUgKGVsLCBiaW5kaW5nKSB7XHJcbiAgICBpZiAoYmluZGluZy52YWx1ZSAhPT0gYmluZGluZy5vbGRWYWx1ZSkgeyAvLyBjaGFuZ2UgZGVib3VuY2Ugb25seSBpZiBpbnRlcnZhbCBoYXMgY2hhbmdlZFxyXG4gICAgICAgIGVsLm9uaW5wdXQgPSBkaXJlY3RpdmUuZGVib3VuY2UoZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJykpXHJcbiAgICAgICAgfSwgcGFyc2VJbnQoYmluZGluZy52YWx1ZSkgfHwgNTAwKVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRpcmVjdGl2ZTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==