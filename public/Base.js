(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Base"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/Table.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/service/Table.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _this = undefined;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "Table",
  data: function data() {
    return {
      header: [{
        min_width: 90,
        width: 90,
        name: 'ID',
        table_name: 'id'
      }, {
        min_width: 100,
        width: 'auto',
        name: 'Наименование',
        table_name: 'name'
      }, {
        min_width: 150,
        width: 200,
        name: 'Артикул',
        table_name: 'article'
      }, {
        min_width: 150,
        width: 200,
        name: 'Производитель',
        table_name: 'supplier'
      }],
      context_menu: [{
        name: 'Редактировать',
        action: function action(data) {
          openDialog('productDialog', '&product_id=' + data.contexted.id);
        }
      }, {
        name: 'Открыть',
        action: function action(data) {
          openDialog('productDialog', '&product_id=' + data.contexted.id);
        }
      }, {
        name: 'Создать заявку поставщику',
        action: function action(data) {
          openDialog('providerOrderDialog', '&products=' + _this.table.getSelectedIDs());
        }
      }, {
        name: 'Печать ценников',
        action: function action(data) {
          window.openDialog('chequeDialog', '&products=' + _this.table.getSelectedIDs());
        }
      }, {
        name: 'Показать аналоги в наличии',
        action: function action(data) {
          _this.showAnalogues(data);
        }
      }],
      dbl_click: function dbl_click(id) {
        openDialog('productDialog', '&product_id=' + id);
      },
      items: [],
      search: null,
      last_page: null,
      current_page: 1,
      paginate_array: null,
      field: null,
      dir: null,
      loading: false,
      selected: []
    };
  },
  watch: {
    // $route(to, from) {
    //     this.getItems();
    // },
    // $attrs: _.debounce(function(){
    //
    // }, 550)
    $attrs: function $attrs() {
      this.search = this.$attrs.search;
      this.getItems();
    }
  },
  mounted: function mounted() {
    this.getItems();
  },
  computed: {
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
      return this.search === '' ? null : this.search;
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
    getItems: function getItems() {
      var _this2 = this;

      this.loading = true;
      this.items = [];
      window.axios({
        method: 'get',
        url: '/store/base/table_data',
        params: {
          category_id: this.getCategoryId(),
          search: this.getSearchString(),
          page: this.current_page,
          field: this.field,
          dir: this.dir
        }
      }).then(function (resp) {
        _this2.items = resp.data.data;
        _this2.last_page = resp.data.last_page;

        _this2.getPaginator();
      }).then(function () {
        _this2.loading = false;
      });
    },
    // Setters
    setPage: function setPage(num) {
      this.current_page = num;
      this.getItems();
    },
    toggleSort: function toggleSort(item) {
      if (!item.sort) {
        item.sort = 'DESC';
      } else if (item.sort === 'DESC') {
        item.sort = 'ASC';
      } else {
        item.sort = 'DESC';
      }

      this.field = item.table_name;
      this.dir = item.sort;
      this.getItems();
    },
    toggleSelectItem: function toggleSelectItem(item) {
      this.selected[item.id] = item;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Categories.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/Categories.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Categories",
  data: function data() {
    return {
      category: 2,
      name: null,
      parent_id: null,
      parent_name: null,
      only_name: true,
      categories: {}
    };
  },
  watch: {
    $route: function $route(to, from) {
      this.setRootCategory();
      this.getCategories();
    }
  },
  mounted: function mounted() {
    this.setRootCategory();
    this.getCategories();
  },
  computed: {
    category_id: function category_id() {
      this.category = this.$route.params.category_id === 'all' ? this.root_category : this.$route.params.category_id;
      return this.category;
    }
  },
  methods: {
    isOnlyName: function isOnlyName() {
      this.only_name = this.$attrs.category_id == this.$attrs.root_id;
    },
    setRootCategory: function setRootCategory() {
      var _this = this;

      var category = this.getFromLocalStorage('category_' + this.$attrs.category_id + '_meta');
      this.category = this.$attrs.category_id;

      if (category) {
        this.name = category.name;
        this.parent_id = category.parent_id;
        this.parent_name = category.parent_name;
        this.isOnlyName();
      } else {
        window.axios({
          method: 'get',
          url: '/data/categories/show',
          params: {
            category_id: this.category
          }
        }).then(function (resp) {
          _this.name = resp.data.name;
          _this.parent_id = resp.data.parent_id;
          _this.parent_name = resp.data.parent_name;

          _this.saveToLocalStorage('category_' + _this.$attrs.category_id + '_meta', resp.data);

          _this.isOnlyName();
        });
      }
    },
    getCategories: function getCategories() {
      var _this2 = this;

      var categories = this.getFromLocalStorage('categories_' + this.category);

      if (categories) {
        this.categories = categories;
      } else {
        window.axios({
          method: 'get',
          url: '/data/categories/get',
          params: {
            category_id: this.$attrs.category_id
          }
        }).then(function (resp) {
          _this2.categories = resp.data;

          _this2.saveToLocalStorage('categories_' + _this2.category, _this2.categories);
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/Base.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Store/Base.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _template_Categories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../template/Categories */ "./resources/js/components/template/Categories.vue");
/* harmony import */ var _service_Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/Table */ "./resources/js/components/service/Table.vue");
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



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Base",
  components: {
    Table: _service_Table__WEBPACK_IMPORTED_MODULE_1__["default"],
    Categories: _template_Categories__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      root_category: 2,
      category: null,
      search: '',
      categories: null
    };
  },
  computed: {
    category_id: function category_id() {
      this.category = this.$route.params.category_id === 'all' ? this.root_category : this.$route.params.category_id;
      return this.category;
    }
  },
  methods: {
    getCategories: function getCategories() {
      var _this = this;

      window.axios({
        method: 'get',
        url: '/data/categories/get',
        params: {
          category_id: this.category
        }
      }).then(function (resp) {
        _this.categories = resp.data;
        console.log(_this.categories);
      });
    },
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
      _c("div", { staticClass: "h-100", attrs: { id: "storeTable" } }, [
        _c("div", { staticClass: "bbtable-container" }, [
          _c(
            "div",
            { staticClass: "bbtable-header" },
            [
              _vm._m(0),
              _vm._v(" "),
              _vm._l(_vm.header, function(item) {
                return _c(
                  "div",
                  {
                    key: item.name,
                    staticClass: "header-elem",
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
                    _c("div", { staticClass: "arrow down" })
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
                  _vm._l(_vm.items, function(elem) {
                    return _c(
                      "div",
                      {
                        key: elem.id,
                        staticClass: "body-elem",
                        on: {
                          click: function($event) {
                            return _vm.toggleSelectItem(elem)
                          }
                        }
                      },
                      [
                        _vm._m(1, true),
                        _vm._v(" "),
                        _vm._l(_vm.header, function(item) {
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
                              _vm._l(_vm.header, function(item) {
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
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "header-elem checkbox" }, [
      _c("input", {
        attrs: { type: "checkbox", id: "check_all", name: "check_all" }
      }),
      _c("label", { attrs: { for: "check_all" } })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "cell checkbox" }, [
      _c("input", { attrs: { type: "checkbox" } }),
      _c("label")
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Categories.vue?vue&type=template&id=3de91c76&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/Categories.vue?vue&type=template&id=3de91c76&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "content-menu box w-250", attrs: { id: "category-nav" } },
    [
      _c(
        "div",
        { staticClass: "box-header store" },
        [
          _vm.only_name ? _c("div", [_vm._v(_vm._s(_vm.name))]) : _vm._e(),
          _vm._v(" "),
          !_vm.only_name
            ? _c(
                "router-link",
                {
                  staticClass: "category-back-button",
                  attrs: {
                    tag: "a",
                    to: { name: "base", params: { category_id: _vm.parent_id } }
                  }
                },
                [
                  _c("i", {
                    staticClass: "fa fa-chevron-left",
                    attrs: { "aria-hidden": "true" }
                  }),
                  _vm._v(" "),
                  _c("span", { attrs: { title: "Автокрепеж" } }, [
                    _vm._v(_vm._s(_vm.name))
                  ])
                ]
              )
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "box-content",
          staticStyle: { "max-height": "calc(100% - 54px)" },
          attrs: { "data-simplebar": "" }
        },
        [
          _c(
            "ul",
            { staticClass: "nav", attrs: { id: "category-block" } },
            _vm._l(_vm.categories, function(category) {
              return _c(
                "router-link",
                {
                  key: category.id,
                  attrs: {
                    tag: "li",
                    to: { name: "base", params: { category_id: category.id } }
                  }
                },
                [
                  _c("a", { attrs: { href: "#" } }, [
                    _vm._v(_vm._s(category.name))
                  ])
                ]
              )
            }),
            1
          )
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/Base.vue?vue&type=template&id=5e0c180b&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Store/Base.vue?vue&type=template&id=5e0c180b&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "bottom-container" },
    [
      _c("Categories", {
        attrs: { category_id: _vm.category_id, root_id: "2" }
      }),
      _vm._v(" "),
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
                placeholder: "Поиск по складу",
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
                staticClass: "button primary ml-15",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return _vm.newDialog("category")
                  }
                }
              },
              [_vm._v("Новая категория")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "button primary ml-15",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return _vm.newDialog("product")
                  }
                }
              },
              [_vm._v("Новый товар")]
            )
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "box d-flex",
            staticStyle: { height: "calc(100% - 45px)" }
          },
          [
            _c("Table", {
              attrs: { search: _vm.search, root_id: _vm.root_category }
            })
          ],
          1
        )
      ])
    ],
    1
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
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
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

/***/ "./resources/js/components/template/Categories.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/template/Categories.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Categories_vue_vue_type_template_id_3de91c76_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Categories.vue?vue&type=template&id=3de91c76&scoped=true& */ "./resources/js/components/template/Categories.vue?vue&type=template&id=3de91c76&scoped=true&");
/* harmony import */ var _Categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Categories.vue?vue&type=script&lang=js& */ "./resources/js/components/template/Categories.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Categories_vue_vue_type_template_id_3de91c76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Categories_vue_vue_type_template_id_3de91c76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3de91c76",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/template/Categories.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/template/Categories.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/template/Categories.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Categories.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Categories.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/template/Categories.vue?vue&type=template&id=3de91c76&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/template/Categories.vue?vue&type=template&id=3de91c76&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_template_id_3de91c76_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Categories.vue?vue&type=template&id=3de91c76&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Categories.vue?vue&type=template&id=3de91c76&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_template_id_3de91c76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_template_id_3de91c76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/views/Store/Base.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/views/Store/Base.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Base_vue_vue_type_template_id_5e0c180b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.vue?vue&type=template&id=5e0c180b&scoped=true& */ "./resources/js/components/views/Store/Base.vue?vue&type=template&id=5e0c180b&scoped=true&");
/* harmony import */ var _Base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Store/Base.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Base_vue_vue_type_template_id_5e0c180b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Base_vue_vue_type_template_id_5e0c180b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5e0c180b",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Store/Base.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Store/Base.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/views/Store/Base.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Base.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/Base.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Store/Base.vue?vue&type=template&id=5e0c180b&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/views/Store/Base.vue?vue&type=template&id=5e0c180b&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Base_vue_vue_type_template_id_5e0c180b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Base.vue?vue&type=template&id=5e0c180b&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/Base.vue?vue&type=template&id=5e0c180b&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Base_vue_vue_type_template_id_5e0c180b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Base_vue_vue_type_template_id_5e0c180b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0NhdGVnb3JpZXMudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9CYXNlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZT8zMDIzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0NhdGVnb3JpZXMudnVlP2M4ZmEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvQmFzZS52dWU/OTMyMSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZT80Mzc5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvVGFibGUudnVlPzQ1ZmYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvQ2F0ZWdvcmllcy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvQ2F0ZWdvcmllcy52dWU/MWZjNSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9DYXRlZ29yaWVzLnZ1ZT80ZDUzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0Jhc2UudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0Jhc2UudnVlP2NiN2UiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvQmFzZS52dWU/NDIzNSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvZGVib3VuY2UuanMiXSwibmFtZXMiOlsiZGVib3VuY2UiLCJmbiIsImRlbGF5IiwidGltZW91dElEIiwiY2xlYXJUaW1lb3V0IiwiYXJncyIsImFyZ3VtZW50cyIsInRoYXQiLCJzZXRUaW1lb3V0IiwiYXBwbHkiLCJkaXJlY3RpdmUiLCJlbCIsImJpbmRpbmciLCJ2YWx1ZSIsIm9sZFZhbHVlIiwib25pbnB1dCIsImV2dCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsInBhcnNlSW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0Q0E7QUFDQSxlQURBO0FBRUE7QUFDQTtBQUNBLGVBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BREEsRUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FGQSxFQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUhBLEVBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BSkEsQ0FEQTtBQU9BLHFCQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURBLEVBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BRkEsRUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FIQSxFQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUpBLEVBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BTEEsQ0FQQTtBQWNBO0FBQUE7QUFBQSxPQWRBO0FBZUEsZUFmQTtBQWdCQSxrQkFoQkE7QUFpQkEscUJBakJBO0FBa0JBLHFCQWxCQTtBQW1CQSwwQkFuQkE7QUFvQkEsaUJBcEJBO0FBcUJBLGVBckJBO0FBc0JBLG9CQXRCQTtBQXVCQTtBQXZCQTtBQXlCQSxHQTVC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QVMsR0FBR0ssVUFBVSxDQUFDLFlBQVk7QUFDL0JQLFFBQUUsQ0FBQ1EsS0FBSCxDQUFTRixJQUFULEVBQWVGLElBQWY7QUFDSCxLQUZxQixFQUVuQkgsS0FGbUIsQ0FBdEI7QUFHSCxHQVBEO0FBUUgsQ0FWRDs7QUFZQVEsU0FBUyxDQUFDVixRQUFWLEdBQXFCQSxRQUFyQjs7QUFFQSxTQUFTVSxTQUFULENBQW9CQyxFQUFwQixFQUF3QkMsT0FBeEIsRUFBaUM7QUFDN0IsTUFBSUEsT0FBTyxDQUFDQyxLQUFSLEtBQWtCRCxPQUFPLENBQUNFLFFBQTlCLEVBQXdDO0FBQUU7QUFDdENILE1BQUUsQ0FBQ0ksT0FBSCxHQUFhTCxTQUFTLENBQUNWLFFBQVYsQ0FBbUIsVUFBVWdCLEdBQVYsRUFBZTtBQUMzQ0wsUUFBRSxDQUFDTSxhQUFILENBQWlCLElBQUlDLEtBQUosQ0FBVSxRQUFWLENBQWpCO0FBQ0gsS0FGWSxFQUVWQyxRQUFRLENBQUNQLE9BQU8sQ0FBQ0MsS0FBVCxDQUFSLElBQTJCLEdBRmpCLENBQWI7QUFHSDtBQUNKOztBQUVETyxNQUFNLENBQUNDLE9BQVAsR0FBaUJYLFNBQWpCLEMiLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICAgIDxkaXYgaWQ9XCJ0YWJsZS1jb250YWluZXJcIiBjbGFzcz1cImZsZXgtMSBoLTEwMFwiPlxyXG4gICAgICAgIDxkaXYgaWQ9XCJzdG9yZVRhYmxlXCIgY2xhc3M9XCJoLTEwMFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmJ0YWJsZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYnRhYmxlLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItZWxlbSBjaGVja2JveFwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNoZWNrX2FsbFwiIG5hbWU9XCJjaGVja19hbGxcIj48bGFiZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yPVwiY2hlY2tfYWxsXCI+PC9sYWJlbD48L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cIml0ZW0gaW4gaGVhZGVyXCIgdi1iaW5kOmtleT1cIml0ZW0ubmFtZVwiIHYtYmluZDpzdHlsZT1cImdldEhlYWRlclN0eWxlKGl0ZW0pXCIgY2xhc3M9XCJoZWFkZXItZWxlbVwiIGRhdGEtZmllbGQ9XCJpZFwiIHN0eWxlPVwid2lkdGg6IDkwcHg7IG1pbi13aWR0aDogOTBweDtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LW9uOmNsaWNrPVwidG9nZ2xlU29ydChpdGVtKVwiIGNsYXNzPVwidGl0bGVcIj57eyBpdGVtLm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFycm93IGRvd25cIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJidGFibGUtYm9keVwiIGRhdGEtc2ltcGxlYmFyIHN0eWxlPVwiaGVpZ2h0OiBjYWxjKDEwMCUgLSA1OXB4KTtcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LW9uOmNsaWNrPVwidG9nZ2xlU2VsZWN0SXRlbShlbGVtKVwiIHYtZm9yPVwiZWxlbSBpbiBpdGVtc1wiIHYtYmluZDprZXk9XCJlbGVtLmlkXCIgY2xhc3M9XCJib2R5LWVsZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsIGNoZWNrYm94XCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiPjxsYWJlbD48L2xhYmVsPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cIml0ZW0gaW4gaGVhZGVyXCIgdi1iaW5kOmtleT1cIml0ZW0ubmFtZSArIGVsZW0uaWRcIiBjbGFzcz1cImNlbGxcIiB2LWJpbmQ6c3R5bGU9XCJnZXRIZWFkZXJTdHlsZShpdGVtKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPnt7IGVsZW1baXRlbS50YWJsZV9uYW1lXSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJsb2FkaW5nXCIgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwiZWxlbSBpbiAxMlwiIHYtYmluZDprZXk9XCJlbGVtXCIgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIgc3R5bGU9XCJ3aWR0aDogMzBweFwiID48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwiaXRlbSBpbiBoZWFkZXJcIiB2LWJpbmQ6a2V5PVwiaXRlbS5uYW1lICsgJ3BsYWNlaG9sZGVyJ1wiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIgdi1iaW5kOnN0eWxlPVwiZ2V0SGVhZGVyU3R5bGUoaXRlbSlcIiA+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0b3JcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHYtb246Y2xpY2s9XCJzZXRQYWdlKDEpXCIgdi1iaW5kOmRpc2FibGVkPVwiZmlyc3RCdXR0b25EaXNhYmxlZFwiID7Qn9C10YDQstCw0Y88L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHYtb246Y2xpY2s9XCJzZXRQYWdlKGN1cnJlbnRfcGFnZSAtIDEpXCIgdi1iaW5kOmRpc2FibGVkPVwicHJldkJ1dHRvbkRpc2FibGVkXCI+0J3QsNC30LDQtDwvYnV0dG9uPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHYtZm9yPVwicGFnZSBpbiBwYWdpbmF0ZV9hcnJheVwiIHYtYmluZDpjbGFzcz1cImlzUGFnZUFjdGl2ZShwYWdlKVwiIHYtb246Y2xpY2s9XCJzZXRQYWdlKHBhZ2UpXCI+e3sgcGFnZSB9fTwvYnV0dG9uPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHYtb246Y2xpY2s9XCJzZXRQYWdlKGN1cnJlbnRfcGFnZSArIDEpXCIgdi1iaW5kOmRpc2FibGVkPVwibmV4dEJ1dHRvbkRpc2FibGVkXCIgPtCS0L/QtdGA0ZHQtDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdi1vbjpjbGljaz1cInNldFBhZ2UobGFzdF9wYWdlKVwiIHYtYmluZDpkaXNhYmxlZD1cImxhc3RCdXR0b25EaXNhYmxlZFwiPtCf0L7RgdC70LXQtNC90Y/RjzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gICAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICAgIG5hbWU6IFwiVGFibGVcIixcclxuICAgICAgICBkYXRhOiAoKT0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDkwLCB3aWR0aDogOTAsIG5hbWU6ICdJRCcsdGFibGVfbmFtZTogJ2lkJ30sXHJcbiAgICAgICAgICAgICAgICAgICAge21pbl93aWR0aDogMTAwLCB3aWR0aDogJ2F1dG8nLCBuYW1lOiAn0J3QsNC40LzQtdC90L7QstCw0L3QuNC1JywgdGFibGVfbmFtZTogJ25hbWUnfSxcclxuICAgICAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxNTAsIHdpZHRoOiAyMDAsIG5hbWU6ICfQkNGA0YLQuNC60YPQuycsIHRhYmxlX25hbWU6ICdhcnRpY2xlJ30sXHJcbiAgICAgICAgICAgICAgICAgICAge21pbl93aWR0aDogMTUwLCB3aWR0aDogMjAwLCBuYW1lOiAn0J/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70YwnLCB0YWJsZV9uYW1lOiAnc3VwcGxpZXInfSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0X21lbnU6IFtcclxuICAgICAgICAgICAgICAgICAgICB7bmFtZTon0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YwnLCBhY3Rpb246IGZ1bmN0aW9uKGRhdGEpe29wZW5EaWFsb2coJ3Byb2R1Y3REaWFsb2cnLCAnJnByb2R1Y3RfaWQ9JyArIGRhdGEuY29udGV4dGVkLmlkKX19LFxyXG4gICAgICAgICAgICAgICAgICAgIHtuYW1lOifQntGC0LrRgNGL0YLRjCcsIGFjdGlvbjogZnVuY3Rpb24oZGF0YSl7b3BlbkRpYWxvZygncHJvZHVjdERpYWxvZycsICcmcHJvZHVjdF9pZD0nICsgZGF0YS5jb250ZXh0ZWQuaWQpfX0sXHJcbiAgICAgICAgICAgICAgICAgICAge25hbWU6J9Ch0L7Qt9C00LDRgtGMINC30LDRj9Cy0LrRgyDQv9C+0YHRgtCw0LLRidC40LrRgycsIGFjdGlvbjogKGRhdGEpID0+IHtvcGVuRGlhbG9nKCdwcm92aWRlck9yZGVyRGlhbG9nJywgJyZwcm9kdWN0cz0nICsgdGhpcy50YWJsZS5nZXRTZWxlY3RlZElEcygpKX19LFxyXG4gICAgICAgICAgICAgICAgICAgIHtuYW1lOifQn9C10YfQsNGC0Ywg0YbQtdC90L3QuNC60L7QsicsIGFjdGlvbjogKGRhdGEpID0+IHt3aW5kb3cub3BlbkRpYWxvZygnY2hlcXVlRGlhbG9nJywgJyZwcm9kdWN0cz0nICsgdGhpcy50YWJsZS5nZXRTZWxlY3RlZElEcygpKX19LFxyXG4gICAgICAgICAgICAgICAgICAgIHtuYW1lOifQn9C+0LrQsNC30LDRgtGMINCw0L3QsNC70L7Qs9C4INCyINC90LDQu9C40YfQuNC4JywgYWN0aW9uOiAoZGF0YSkgPT4ge3RoaXMuc2hvd0FuYWxvZ3VlcyhkYXRhKTt9fSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBkYmxfY2xpY2s6IGZ1bmN0aW9uKGlkKXtvcGVuRGlhbG9nKCdwcm9kdWN0RGlhbG9nJywgJyZwcm9kdWN0X2lkPScgKyBpZCl9LFxyXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgc2VhcmNoOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbGFzdF9wYWdlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudF9wYWdlOjEsXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0ZV9hcnJheTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZGlyOm51bGwsXHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBbXSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2F0Y2g6IHtcclxuICAgICAgICAgICAgLy8gJHJvdXRlKHRvLCBmcm9tKSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmdldEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIC8vIH0sXHJcblxyXG4gICAgICAgICAgICAvLyAkYXR0cnM6IF8uZGVib3VuY2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgLy8gfSwgNTUwKVxyXG4gICAgICAgICAgICAkYXR0cnM6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoID0gdGhpcy4kYXR0cnMuc2VhcmNoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3VudGVkKCl7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXMoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXB1dGVkOntcclxuICAgICAgICAgICAgbGFzdEJ1dHRvbkRpc2FibGVkKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50X3BhZ2UgPj0gdGhpcy5sYXN0X3BhZ2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZpcnN0QnV0dG9uRGlzYWJsZWQoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRfcGFnZSA8PSAxO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuZXh0QnV0dG9uRGlzYWJsZWQoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRfcGFnZSA9PT0gdGhpcy5sYXN0X3BhZ2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByZXZCdXR0b25EaXNhYmxlZCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudF9wYWdlID09PSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOntcclxuICAgICAgICAgICAgaXNQYWdlQWN0aXZlKHBhZ2Upe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChwYWdlID09PSB0aGlzLmN1cnJlbnRfcGFnZSkgPyAnYWN0aXZlJyA6ICcnO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQYWdpbmF0b3IoKXtcclxuICAgICAgICAgICAgICAgIGxldCBwYWdpbmF0ZV9hcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZXZfYXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA+IDAgJiYgaSA8PSB0aGlzLmxhc3RfcGFnZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZfYXJyYXkucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFnZXNfYXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmN1cnJlbnRfcGFnZSAtIDI7IGkgPCB0aGlzLmN1cnJlbnRfcGFnZSArIDI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPiAwICYmIGkgPD0gdGhpcy5sYXN0X3BhZ2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlc19hcnJheS5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBsYXN0X2FycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5sYXN0X3BhZ2UgLSAyOyBpIDwgdGhpcy5sYXN0X3BhZ2U7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPiAwICYmIGkgPD0gdGhpcy5sYXN0X3BhZ2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0X2FycmF5LnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGVfYXJyYXkgPSBwYWdpbmF0ZV9hcnJheS5jb25jYXQocHJldl9hcnJheSkudW5pcXVlKCk7XHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0ZV9hcnJheSA9IHBhZ2luYXRlX2FycmF5LmNvbmNhdChwYWdlc19hcnJheSkudW5pcXVlKCk7XHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0ZV9hcnJheSA9IHBhZ2luYXRlX2FycmF5LmNvbmNhdChsYXN0X2FycmF5KS51bmlxdWUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdGVfYXJyYXkgPSBwYWdpbmF0ZV9hcnJheTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0Q2F0ZWdvcnlJZCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLiRyb3V0ZS5wYXJhbXMuY2F0ZWdvcnlfaWQgPT09ICdhbGwnKSA/IHRoaXMuJGF0dHJzLnJvb3RfaWQgOiB0aGlzLiRyb3V0ZS5wYXJhbXMuY2F0ZWdvcnlfaWQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFNlYXJjaFN0cmluZygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLnNlYXJjaCA9PT0gJycpID8gbnVsbCA6IHRoaXMuc2VhcmNoO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRIZWFkZXJTdHlsZShpdGVtKXtcclxuICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5taW5fd2lkdGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLm1pbldpZHRoID0gaXRlbS5taW5fd2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoaXRlbS53aWR0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS53aWR0aCA9PT0gJ2F1dG8nKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuZmxleCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUud2lkdGggPSBpdGVtLndpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldEl0ZW1zKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9zdG9yZS9iYXNlL3RhYmxlX2RhdGEnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeV9pZDogdGhpcy5nZXRDYXRlZ29yeUlkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaDogdGhpcy5nZXRTZWFyY2hTdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZTogdGhpcy5jdXJyZW50X3BhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiB0aGlzLmZpZWxkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXI6IHRoaXMuZGlyLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHJlc3AuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdF9wYWdlID0gcmVzcC5kYXRhLmxhc3RfcGFnZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFBhZ2luYXRvcigpO1xyXG4gICAgICAgICAgICAgICAgfSkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIFNldHRlcnNcclxuXHJcbiAgICAgICAgICAgIHNldFBhZ2UobnVtKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudF9wYWdlID0gbnVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtcygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b2dnbGVTb3J0KGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgaWYoIWl0ZW0uc29ydCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zb3J0ID0gJ0RFU0MnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGl0ZW0uc29ydCA9PT0gJ0RFU0MnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zb3J0ID0gJ0FTQydcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zb3J0ID0gJ0RFU0MnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkID0gaXRlbS50YWJsZV9uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXIgPSBpdGVtLnNvcnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvZ2dsZVNlbGVjdEl0ZW0oaXRlbSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkW2l0ZW0uaWRdID0gaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuXHJcbjwvc3R5bGU+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LW1lbnUgYm94IHctMjUwXCIgaWQ9XCJjYXRlZ29yeS1uYXZcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94LWhlYWRlciBzdG9yZVwiPlxyXG5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwib25seV9uYW1lXCI+e3sgbmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICA8cm91dGVyLWxpbmsgY2xhc3M9XCJjYXRlZ29yeS1iYWNrLWJ1dHRvblwiIHYtaWY9XCIhb25seV9uYW1lXCIgdGFnPVwiYVwiIDp0bz1cInsgbmFtZTogJ2Jhc2UnLCBwYXJhbXM6IHsgY2F0ZWdvcnlfaWQ6IHBhcmVudF9pZCB9fVwiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiB0aXRsZT1cItCQ0LLRgtC+0LrRgNC10L/QtdC2XCI+e3sgbmFtZSB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9yb3V0ZXItbGluaz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94LWNvbnRlbnRcIiBkYXRhLXNpbXBsZWJhciBzdHlsZT1cIm1heC1oZWlnaHQ6IGNhbGMoMTAwJSAtIDU0cHgpO1wiPlxyXG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXZcIiBpZD1cImNhdGVnb3J5LWJsb2NrXCI+XHJcbiAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgdi1mb3I9XCJjYXRlZ29yeSBpbiBjYXRlZ29yaWVzXCIgdi1iaW5kOmtleT1cImNhdGVnb3J5LmlkXCIgdGFnPVwibGlcIiA6dG89XCJ7IG5hbWU6ICdiYXNlJywgcGFyYW1zOiB7IGNhdGVnb3J5X2lkOiBjYXRlZ29yeS5pZCB9fVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+e3sgY2F0ZWdvcnkubmFtZSB9fTwvYT5cclxuICAgICAgICAgICAgICAgIDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAgICAgbmFtZTogXCJDYXRlZ29yaWVzXCIsXHJcbiAgICAgICAgZGF0YTogKCk9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogMixcclxuICAgICAgICAgICAgICAgIG5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRfaWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRfbmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIG9ubHlfbmFtZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6e31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2F0Y2g6IHtcclxuICAgICAgICAgICAgJHJvdXRlKHRvLCBmcm9tKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFJvb3RDYXRlZ29yeSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDYXRlZ29yaWVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdW50ZWQoKXtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0Um9vdENhdGVnb3J5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZWdvcmllcygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuICAgICAgICAgICAgY2F0ZWdvcnlfaWQoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnkgPSAodGhpcy4kcm91dGUucGFyYW1zLmNhdGVnb3J5X2lkID09PSAnYWxsJykgPyB0aGlzLnJvb3RfY2F0ZWdvcnkgOiB0aGlzLiRyb3V0ZS5wYXJhbXMuY2F0ZWdvcnlfaWQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYXRlZ29yeTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6e1xyXG4gICAgICAgICAgICBpc09ubHlOYW1lKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9ubHlfbmFtZSA9IHRoaXMuJGF0dHJzLmNhdGVnb3J5X2lkID09IHRoaXMuJGF0dHJzLnJvb3RfaWQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFJvb3RDYXRlZ29yeSgpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhdGVnb3J5ID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdjYXRlZ29yeV8nICsgdGhpcy4kYXR0cnMuY2F0ZWdvcnlfaWQgKyAnX21ldGEnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnkgPSB0aGlzLiRhdHRycy5jYXRlZ29yeV9pZDtcclxuICAgICAgICAgICAgICAgIGlmKGNhdGVnb3J5KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWUgPSBjYXRlZ29yeS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50X2lkID0gY2F0ZWdvcnkucGFyZW50X2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50X25hbWUgPSBjYXRlZ29yeS5wYXJlbnRfbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT25seU5hbWUoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2RhdGEvY2F0ZWdvcmllcy9zaG93JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeV9pZDogdGhpcy5jYXRlZ29yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gcmVzcC5kYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50X2lkID0gcmVzcC5kYXRhLnBhcmVudF9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRfbmFtZSA9IHJlc3AuZGF0YS5wYXJlbnRfbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2UoJ2NhdGVnb3J5XycgKyB0aGlzLiRhdHRycy5jYXRlZ29yeV9pZCArICdfbWV0YScsIHJlc3AuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPbmx5TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRDYXRlZ29yaWVzKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2F0ZWdvcmllcyA9IHRoaXMuZ2V0RnJvbUxvY2FsU3RvcmFnZSgnY2F0ZWdvcmllc18nICsgdGhpcy5jYXRlZ29yeSk7XHJcbiAgICAgICAgICAgICAgICBpZihjYXRlZ29yaWVzKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvZGF0YS9jYXRlZ29yaWVzL2dldCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczoge2NhdGVnb3J5X2lkOiB0aGlzLiRhdHRycy5jYXRlZ29yeV9pZH1cclxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVRvTG9jYWxTdG9yYWdlKCdjYXRlZ29yaWVzXycgKyB0aGlzLmNhdGVnb3J5LCB0aGlzLmNhdGVnb3JpZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG5cclxuPC9zdHlsZT5cclxuIiwiPHRlbXBsYXRlPlxyXG4gICAgPGRpdiBjbGFzcz1cImJvdHRvbS1jb250YWluZXJcIj5cclxuICAgICAgICA8Q2F0ZWdvcmllcyB2LWJpbmQ6Y2F0ZWdvcnlfaWQ9XCJjYXRlZ29yeV9pZFwiIHJvb3RfaWQ9XCIyXCIgLz5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94LWxpc3RlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IG1iLTE1XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWZpZWxkLWNvbnRhaW5lciB3LTEwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2LW1vZGVsLmxhenk9XCJzZWFyY2hcIiB2LWRlYm91bmNlPVwiNDUwXCIgaWQ9XCJzZWFyY2hcIiBuYW1lPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCLQn9C+0LjRgdC6INC/0L4g0YHQutC70LDQtNGDXCIgY2xhc3M9XCJpbnB1dCB3LTEwMFwiIHZhbHVlPVwiXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IG1sLTE1XCIgdi1vbjpjbGljaz1cIm5ld0RpYWxvZygnY2F0ZWdvcnknKVwiPtCd0L7QstCw0Y8g0LrQsNGC0LXQs9C+0YDQuNGPPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gcHJpbWFyeSBtbC0xNVwiIHYtb246Y2xpY2s9XCJuZXdEaWFsb2coJ3Byb2R1Y3QnKVwiPtCd0L7QstGL0Lkg0YLQvtCy0LDRgDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94IGQtZmxleFwiIHN0eWxlPVwiaGVpZ2h0OiBjYWxjKDEwMCUgLSA0NXB4KTtcIj5cclxuICAgICAgICAgICAgICAgIDxUYWJsZSB2LWJpbmQ6c2VhcmNoPVwic2VhcmNoXCIgdi1iaW5kOnJvb3RfaWQ9XCJyb290X2NhdGVnb3J5XCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICAgIGltcG9ydCBDYXRlZ29yaWVzIGZyb20gXCIuLy4uLy4uL3RlbXBsYXRlL0NhdGVnb3JpZXNcIlxyXG4gICAgaW1wb3J0IFRhYmxlIGZyb20gXCIuLi8uLi9zZXJ2aWNlL1RhYmxlXCI7XHJcbiAgICBpbXBvcnQgZGVib3VuY2UgZnJvbSAnLi8uLi8uLi8uLi9kZWJvdW5jZSdcclxuICAgIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgICAgICBuYW1lOiBcIkJhc2VcIixcclxuICAgICAgICBjb21wb25lbnRzOntcclxuICAgICAgICAgICAgVGFibGUsXHJcbiAgICAgICAgICAgIENhdGVnb3JpZXNcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6ICgpPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcm9vdF9jYXRlZ29yeTogMixcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgc2VhcmNoOiAnJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6bnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wdXRlZDp7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5X2lkKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3J5ID0gKHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZCA9PT0gJ2FsbCcpID8gdGhpcy5yb290X2NhdGVnb3J5IDogdGhpcy4kcm91dGUucGFyYW1zLmNhdGVnb3J5X2lkO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2F0ZWdvcnk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOntcclxuICAgICAgICAgICAgZ2V0Q2F0ZWdvcmllcygpe1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9kYXRhL2NhdGVnb3JpZXMvZ2V0JyxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtjYXRlZ29yeV9pZDogdGhpcy5jYXRlZ29yeX1cclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzID0gcmVzcC5kYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNhdGVnb3JpZXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5ld0RpYWxvZyh0YWcsIHBhcmFtcyA9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ29wZW5EaWFsb2cnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnOiB0YWcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaXJlY3RpdmVzOiB7ZGVib3VuY2V9XHJcbiAgICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuXHJcbjwvc3R5bGU+XHJcbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImZsZXgtMSBoLTEwMFwiLCBhdHRyczogeyBpZDogXCJ0YWJsZS1jb250YWluZXJcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJoLTEwMFwiLCBhdHRyczogeyBpZDogXCJzdG9yZVRhYmxlXCIgfSB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYmJ0YWJsZS1jb250YWluZXJcIiB9LCBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJiYnRhYmxlLWhlYWRlclwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5fbSgwKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX3ZtLl9sKF92bS5oZWFkZXIsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBrZXk6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaGVhZGVyLWVsZW1cIixcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiOTBweFwiLCBcIm1pbi13aWR0aFwiOiBcIjkwcHhcIiB9LFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogX3ZtLmdldEhlYWRlclN0eWxlKGl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBcImRhdGEtZmllbGRcIjogXCJpZFwiIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGl0bGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnRvZ2dsZVNvcnQoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoaXRlbS5uYW1lKSldXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYXJyb3cgZG93blwiIH0pXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDJcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJiYnRhYmxlLWJvZHlcIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcImNhbGMoMTAwJSAtIDU5cHgpXCIgfSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgXCJkYXRhLXNpbXBsZWJhclwiOiBcIlwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5pdGVtcywgZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGVsZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJib2R5LWVsZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnRvZ2dsZVNlbGVjdEl0ZW0oZWxlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9tKDEsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0uaGVhZGVyLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogaXRlbS5uYW1lICsgZWxlbS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNlbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBfdm0uZ2V0SGVhZGVyU3R5bGUoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidGl0bGVcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoZWxlbVtpdGVtLnRhYmxlX25hbWVdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfdm0ubG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woMTIsIGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IGVsZW0sIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2NlbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiMzBweFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0uaGVhZGVyLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBpdGVtLm5hbWUgKyBcInBsYWNlaG9sZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IF92bS5nZXRIZWFkZXJTdHlsZShpdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwYWdpbmF0b3JcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGRpc2FibGVkOiBfdm0uZmlyc3RCdXR0b25EaXNhYmxlZCB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2V0UGFnZSgxKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0J/QtdGA0LLQsNGPXCIpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGRpc2FibGVkOiBfdm0ucHJldkJ1dHRvbkRpc2FibGVkIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZXRQYWdlKF92bS5jdXJyZW50X3BhZ2UgLSAxKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0J3QsNC30LDQtFwiKV1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX3ZtLl9sKF92bS5wYWdpbmF0ZV9hcnJheSwgZnVuY3Rpb24ocGFnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiBfdm0uaXNQYWdlQWN0aXZlKHBhZ2UpLFxuICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2V0UGFnZShwYWdlKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKHBhZ2UpKV1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGRpc2FibGVkOiBfdm0ubmV4dEJ1dHRvbkRpc2FibGVkIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZXRQYWdlKF92bS5jdXJyZW50X3BhZ2UgKyAxKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0JLQv9C10YDRkdC0XCIpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGRpc2FibGVkOiBfdm0ubGFzdEJ1dHRvbkRpc2FibGVkIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZXRQYWdlKF92bS5sYXN0X3BhZ2UpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQn9C+0YHQu9C10LTQvdGP0Y9cIildXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAyXG4gICAgICAgICAgKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBdXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaGVhZGVyLWVsZW0gY2hlY2tib3hcIiB9LCBbXG4gICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJjaGVja2JveFwiLCBpZDogXCJjaGVja19hbGxcIiwgbmFtZTogXCJjaGVja19hbGxcIiB9XG4gICAgICB9KSxcbiAgICAgIF9jKFwibGFiZWxcIiwgeyBhdHRyczogeyBmb3I6IFwiY2hlY2tfYWxsXCIgfSB9KVxuICAgIF0pXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2VsbCBjaGVja2JveFwiIH0sIFtcbiAgICAgIF9jKFwiaW5wdXRcIiwgeyBhdHRyczogeyB0eXBlOiBcImNoZWNrYm94XCIgfSB9KSxcbiAgICAgIF9jKFwibGFiZWxcIilcbiAgICBdKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImNvbnRlbnQtbWVudSBib3ggdy0yNTBcIiwgYXR0cnM6IHsgaWQ6IFwiY2F0ZWdvcnktbmF2XCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImJveC1oZWFkZXIgc3RvcmVcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX3ZtLm9ubHlfbmFtZSA/IF9jKFwiZGl2XCIsIFtfdm0uX3YoX3ZtLl9zKF92bS5uYW1lKSldKSA6IF92bS5fZSgpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgIV92bS5vbmx5X25hbWVcbiAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNhdGVnb3J5LWJhY2stYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICB0YWc6IFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICB0bzogeyBuYW1lOiBcImJhc2VcIiwgcGFyYW1zOiB7IGNhdGVnb3J5X2lkOiBfdm0ucGFyZW50X2lkIH0gfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJpXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZmEgZmEtY2hldnJvbi1sZWZ0XCIsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgYXR0cnM6IHsgdGl0bGU6IFwi0JDQstGC0L7QutGA0LXQv9C10LZcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0ubmFtZSkpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYm94LWNvbnRlbnRcIixcbiAgICAgICAgICBzdGF0aWNTdHlsZTogeyBcIm1heC1oZWlnaHRcIjogXCJjYWxjKDEwMCUgLSA1NHB4KVwiIH0sXG4gICAgICAgICAgYXR0cnM6IHsgXCJkYXRhLXNpbXBsZWJhclwiOiBcIlwiIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ1bFwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJuYXZcIiwgYXR0cnM6IHsgaWQ6IFwiY2F0ZWdvcnktYmxvY2tcIiB9IH0sXG4gICAgICAgICAgICBfdm0uX2woX3ZtLmNhdGVnb3JpZXMsIGZ1bmN0aW9uKGNhdGVnb3J5KSB7XG4gICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAga2V5OiBjYXRlZ29yeS5pZCxcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHRhZzogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICB0bzogeyBuYW1lOiBcImJhc2VcIiwgcGFyYW1zOiB7IGNhdGVnb3J5X2lkOiBjYXRlZ29yeS5pZCB9IH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiYVwiLCB7IGF0dHJzOiB7IGhyZWY6IFwiI1wiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKGNhdGVnb3J5Lm5hbWUpKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXVxuICAgICAgKVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImJvdHRvbS1jb250YWluZXJcIiB9LFxuICAgIFtcbiAgICAgIF9jKFwiQ2F0ZWdvcmllc1wiLCB7XG4gICAgICAgIGF0dHJzOiB7IGNhdGVnb3J5X2lkOiBfdm0uY2F0ZWdvcnlfaWQsIHJvb3RfaWQ6IFwiMlwiIH1cbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYm94LWxpc3RlclwiIH0sIFtcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJkLWZsZXggbWItMTVcIiB9LCBbXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzZWFyY2gtZmllbGQtY29udGFpbmVyIHctMTAwXCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWwubGF6eVwiLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zZWFyY2gsXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgICAgbW9kaWZpZXJzOiB7IGxhenk6IHRydWUgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZWJvdW5jZVwiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LWRlYm91bmNlXCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogNDUwLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCI0NTBcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaW5wdXQgdy0xMDBcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBpZDogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcItCf0L7QuNGB0Log0L/QviDRgdC60LvQsNC00YNcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLnNlYXJjaCB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBfdm0uc2VhcmNoID0gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYWN0aW9uc1wiIH0sIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHByaW1hcnkgbWwtMTVcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5uZXdEaWFsb2coXCJjYXRlZ29yeVwiKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW192bS5fdihcItCd0L7QstCw0Y8g0LrQsNGC0LXQs9C+0YDQuNGPXCIpXVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBwcmltYXJ5IG1sLTE1XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ubmV3RGlhbG9nKFwicHJvZHVjdFwiKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW192bS5fdihcItCd0L7QstGL0Lkg0YLQvtCy0LDRgFwiKV1cbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJib3ggZC1mbGV4XCIsXG4gICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiY2FsYygxMDAlIC0gNDVweClcIiB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcIlRhYmxlXCIsIHtcbiAgICAgICAgICAgICAgYXR0cnM6IHsgc2VhcmNoOiBfdm0uc2VhcmNoLCByb290X2lkOiBfdm0ucm9vdF9jYXRlZ29yeSB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9UYWJsZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzI3N2U0Y2Umc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vVGFibGUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9UYWJsZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjcyNzdlNGNlXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNzI3N2U0Y2UnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNzI3N2U0Y2UnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNzI3N2U0Y2UnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1RhYmxlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03Mjc3ZTRjZSZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc3Mjc3ZTRjZScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1RhYmxlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UYWJsZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVGFibGUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTcyNzdlNGNlJnNjb3BlZD10cnVlJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9DYXRlZ29yaWVzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zZGU5MWM3NiZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9DYXRlZ29yaWVzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjNkZTkxYzc2XCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnM2RlOTFjNzYnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnM2RlOTFjNzYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnM2RlOTFjNzYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0NhdGVnb3JpZXMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNkZTkxYzc2JnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzNkZTkxYzc2Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9DYXRlZ29yaWVzLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9M2RlOTFjNzYmc2NvcGVkPXRydWUmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0Jhc2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTVlMGMxODBiJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0Jhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9CYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiNWUwYzE4MGJcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc1ZTBjMTgwYicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc1ZTBjMTgwYicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc1ZTBjMTgwYicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vQmFzZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NWUwYzE4MGImc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNWUwYzE4MGInLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0Jhc2UudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9CYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9CYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9CYXNlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01ZTBjMTgwYiZzY29wZWQ9dHJ1ZSZcIiIsImxldCBkZWJvdW5jZSA9IGZ1bmN0aW9uIGRlYm91bmNlIChmbiwgZGVsYXkpIHtcclxuICAgIGxldCB0aW1lb3V0SUQgPSBudWxsO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHs7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XHJcbiAgICAgICAgbGV0IGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRpbWVvdXRJRCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmdzKVxyXG4gICAgICAgIH0sIGRlbGF5KVxyXG4gICAgfVxyXG59XHJcblxyXG5kaXJlY3RpdmUuZGVib3VuY2UgPSBkZWJvdW5jZTtcclxuXHJcbmZ1bmN0aW9uIGRpcmVjdGl2ZSAoZWwsIGJpbmRpbmcpIHtcclxuICAgIGlmIChiaW5kaW5nLnZhbHVlICE9PSBiaW5kaW5nLm9sZFZhbHVlKSB7IC8vIGNoYW5nZSBkZWJvdW5jZSBvbmx5IGlmIGludGVydmFsIGhhcyBjaGFuZ2VkXHJcbiAgICAgICAgZWwub25pbnB1dCA9IGRpcmVjdGl2ZS5kZWJvdW5jZShmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSlcclxuICAgICAgICB9LCBwYXJzZUludChiaW5kaW5nLnZhbHVlKSB8fCA1MDApXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGlyZWN0aXZlO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9