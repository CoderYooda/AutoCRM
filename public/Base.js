(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Base"],{

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
  props: ['table_data'],
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
      loading: false,
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
    }
  },
  mounted: function mounted() {
    this.getItems();
    document.addEventListener('click', this.closeContext);
  },
  computed: {
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

      this.unsetSelected();
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
  props: ['category', 'root_category'],
  data: function data() {
    return {
      name: null,
      parent_id: null,
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
    // parent_id(){
    //     return this.parent_id ? this.parent_id : this.root_category;
    // },
    category_id: function category_id() {
      return this.$route.params.category_id === 'all' ? this.root_category : this.$route.params.category_id;
    }
  },
  methods: {
    isOnlyName: function isOnlyName() {
      this.only_name = this.category_id === this.root_category;
    },
    setRootCategory: function setRootCategory() {
      var _this = this;

      var category = this.getFromLocalStorage('category_' + this.category_id + '_meta');

      if (category) {
        this.name = category.name;
        this.parent_id = category.category_id;
        this.isOnlyName();
      } else {
        window.axios({
          method: 'get',
          url: '/categories/' + this.category_id
        }).then(function (resp) {
          _this.name = resp.data.name;
          _this.parent_id = resp.data.category_id;

          _this.saveToLocalStorage('category_' + _this.category_id + '_meta', resp.data);

          _this.isOnlyName();
        });
      }
    },
    getCategories: function getCategories() {
      var _this2 = this;

      var categories = this.getFromLocalStorage('categories_' + this.category_id);

      if (categories) {
        this.categories = categories;
      } else {
        window.axios({
          method: 'get',
          url: '/categories/' + this.category_id + '/children'
        }).then(function (resp) {
          _this2.categories = resp.data;

          _this2.saveToLocalStorage('categories_' + _this2.category_id, _this2.categories);
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
      categories: null,
      table_data: {}
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.table_data.header = [{
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
    }];
    this.table_data.context_menu = [{
      name: 'Редактировать',
      action: function action(data) {
        alert(12);
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
    }];

    this.table_data.dbl_click = function (id) {
      console.log(id);
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
      var _this2 = this;

      window.axios({
        method: 'get',
        url: '/data/categories/get',
        params: {
          category_id: this.category
        }
      }).then(function (resp) {
        _this2.categories = resp.data;
        console.log(_this2.categories);
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
                    return _c(
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
          _c(
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
var staticRenderFns = []
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
      _c("Categories", { attrs: { root_category: _vm.root_category } }),
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
              attrs: {
                table_data: _vm.table_data,
                search: _vm.search,
                root_id: _vm.root_category
              }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0NhdGVnb3JpZXMudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9CYXNlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZT8wZTYzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0NhdGVnb3JpZXMudnVlP2M4ZmEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvQmFzZS52dWU/OTMyMSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZT80Mzc5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvVGFibGUudnVlPzdkOTEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvQ2F0ZWdvcmllcy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvQ2F0ZWdvcmllcy52dWU/MWZjNSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9DYXRlZ29yaWVzLnZ1ZT80ZDUzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0Jhc2UudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0Jhc2UudnVlP2NiN2UiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvQmFzZS52dWU/NDIzNSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvZGVib3VuY2UuanMiXSwibmFtZXMiOlsiZGVib3VuY2UiLCJmbiIsImRlbGF5IiwidGltZW91dElEIiwiY2xlYXJUaW1lb3V0IiwiYXJncyIsImFyZ3VtZW50cyIsInRoYXQiLCJzZXRUaW1lb3V0IiwiYXBwbHkiLCJkaXJlY3RpdmUiLCJlbCIsImJpbmRpbmciLCJ2YWx1ZSIsIm9sZFZhbHVlIiwib25pbnB1dCIsImV2dCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsInBhcnNlSW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5RUE7QUFDQSx1QkFEQTtBQUVBLGVBRkE7QUFHQTtBQUNBO0FBQ0EsZUFEQTtBQUVBLGtCQUZBO0FBR0EscUJBSEE7QUFJQSxxQkFKQTtBQUtBLDBCQUxBO0FBTUEsaUJBTkE7QUFPQSxlQVBBO0FBUUEsb0JBUkE7QUFTQSxrQkFUQTtBQVVBLHlCQVZBO0FBV0EsY0FYQTtBQVlBLDJCQVpBO0FBYUE7QUFiQTtBQWVBLEdBbkJBO0FBb0JBO0FBQ0EsVUFEQSxrQkFDQSxFQURBLEVBQ0EsSUFEQSxFQUNBO0FBQ0E7QUFFQSxLQUpBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFSQSxHQXBCQTtBQThCQSxTQTlCQSxxQkE4QkE7QUFDQTtBQUNBO0FBQ0EsR0FqQ0E7QUFrQ0E7QUFDQSxnQkFEQSwwQkFDQTtBQUNBO0FBQ0EsS0FIQTtBQUlBLHNCQUpBLGdDQUlBO0FBQ0E7QUFDQSxLQU5BO0FBT0EsdUJBUEEsaUNBT0E7QUFDQTtBQUNBLEtBVEE7QUFVQSxzQkFWQSxnQ0FVQTtBQUNBO0FBQ0EsS0FaQTtBQWFBLHNCQWJBLGdDQWFBO0FBQ0E7QUFDQTtB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anMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdiBpZD1cInRhYmxlLWNvbnRhaW5lclwiIGNsYXNzPVwiZmxleC0xIGgtMTAwXCI+XG4gICAgICAgIDxkaXYgcmVmPVwib2ZzZXR0ZXJcIiBjbGFzcz1cImgtMTAwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmJ0YWJsZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmJ0YWJsZS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1lbGVtIGNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1iaW5kOmNoZWNrZWQ9XCJpc0FueUNoZWNrZWRcIiB0eXBlPVwiY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCB2LW9uOmNsaWNrPVwidG9nZ2xlU2VsZWN0QWxsKClcIj48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiBpc1NvcnRGaWVsZChpdGVtKX1cIiB2LWZvcj1cIml0ZW0gaW4gdGFibGVfZGF0YS5oZWFkZXJcIiB2LWJpbmQ6a2V5PVwiaXRlbS5uYW1lXCIgdi1iaW5kOnN0eWxlPVwiZ2V0SGVhZGVyU3R5bGUoaXRlbSlcIiBjbGFzcz1cImhlYWRlci1lbGVtXCIgZGF0YS1maWVsZD1cImlkXCIgc3R5bGU9XCJ3aWR0aDogOTBweDsgbWluLXdpZHRoOiA5MHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LW9uOmNsaWNrPVwidG9nZ2xlU29ydChpdGVtKVwiIGNsYXNzPVwidGl0bGVcIj57eyBpdGVtLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cIiFpc1NvcnRGaWVsZChpdGVtKVwiIGNsYXNzPVwiYXJyb3cgZG93blwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiaXNTb3J0RmllbGQoaXRlbSkgJiYgZGlyID09PSAnREVTQydcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiBpc1NvcnRGaWVsZChpdGVtKX1cIiBjbGFzcz1cImFycm93IGRvd25cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cImlzU29ydEZpZWxkKGl0ZW0pICYmIGRpciA9PT0gJ0FTQydcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiBpc1NvcnRGaWVsZChpdGVtKX1cIiBjbGFzcz1cImFycm93IHVwXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYnRhYmxlLWJvZHlcIiBkYXRhLXNpbXBsZWJhciBzdHlsZT1cImhlaWdodDogY2FsYygxMDAlIC0gNTlweCk7XCIgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LW9uOmRibGNsaWNrPVwiZGJsQ2xpY2soZWxlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW9uOmNvbnRleHRtZW51PVwib3BlbkNvbnRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW9uOmNsaWNrPVwic2VsZWN0SXRlbShlbGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKGVsZW0sIGluZGV4KSBpbiBpdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpyZWY9XCJzZXRSZWYoZWxlbSwgaW5kZXgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmtleT1cIidpdGVtXycgKyBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDpjbGFzcz1cInsgJ3NlbGVjdGVkJyA6IGlzU2VsZWN0ZWQoZWxlbSl9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJib2R5LWVsZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbCBjaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdi1iaW5kOmNoZWNrZWQ9XCJpc1NlbGVjdGVkKGVsZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCJpdGVtIGluIHRhYmxlX2RhdGEuaGVhZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmtleT1cIml0ZW0ubmFtZSArIGVsZW0uaWRcIiBjbGFzcz1cImNlbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6c3R5bGU9XCJnZXRIZWFkZXJTdHlsZShpdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57eyBlbGVtW2l0ZW0udGFibGVfbmFtZV0gfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwibG9hZGluZ1wiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJlbGVtIGluIDEyXCIgdi1iaW5kOmtleT1cImVsZW1cIiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIgc3R5bGU9XCJ3aWR0aDogMzBweFwiID48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cIml0ZW0gaW4gdGFibGVfZGF0YS5oZWFkZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDprZXk9XCJpdGVtLm5hbWUgKyAncGxhY2Vob2xkZXInXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6c3R5bGU9XCJnZXRIZWFkZXJTdHlsZShpdGVtKVwiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPVwiY29udFwiIGNsYXNzPVwiY29udGV4dFwiIGlkPVwiY29udGV4dFwiIHYtYmluZDpzdHlsZT1cImNvbnRleHRfc3R5bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LW9uOmNsaWNrPVwibWVudS5hY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwibWVudSBpbiB0YWJsZV9kYXRhLmNvbnRleHRfbWVudVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmtleT1cIm1lbnUubmFtZVwiIGNsYXNzPVwiY29udGV4dF9pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57eyBtZW51Lm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdG9yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdi1vbjpjbGljaz1cInNldFBhZ2UoMSlcIiB2LWJpbmQ6ZGlzYWJsZWQ9XCJmaXJzdEJ1dHRvbkRpc2FibGVkXCIgPtCf0LXRgNCy0LDRjzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHYtb246Y2xpY2s9XCJzZXRQYWdlKGN1cnJlbnRfcGFnZSAtIDEpXCIgdi1iaW5kOmRpc2FibGVkPVwicHJldkJ1dHRvbkRpc2FibGVkXCI+0J3QsNC30LDQtDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdi1mb3I9XCJwYWdlIGluIHBhZ2luYXRlX2FycmF5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6Y2xhc3M9XCJpc1BhZ2VBY3RpdmUocGFnZSlcIiB2LW9uOmNsaWNrPVwic2V0UGFnZShwYWdlKVwiPnt7IHBhZ2UgfX08L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHYtb246Y2xpY2s9XCJzZXRQYWdlKGN1cnJlbnRfcGFnZSArIDEpXCIgdi1iaW5kOmRpc2FibGVkPVwibmV4dEJ1dHRvbkRpc2FibGVkXCIgPtCS0L/QtdGA0ZHQtDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHYtb246Y2xpY2s9XCJzZXRQYWdlKGxhc3RfcGFnZSlcIiB2LWJpbmQ6ZGlzYWJsZWQ9XCJsYXN0QnV0dG9uRGlzYWJsZWRcIj7Qn9C+0YHQu9C10LTQvdGP0Y88L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBwcm9wczpbJ3RhYmxlX2RhdGEnXSxcbiAgICAgICAgbmFtZTogXCJUYWJsZVwiLFxuICAgICAgICBkYXRhOiAoKT0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgICAgIHNlYXJjaDogbnVsbCxcbiAgICAgICAgICAgICAgICBsYXN0X3BhZ2U6IG51bGwsXG4gICAgICAgICAgICAgICAgY3VycmVudF9wYWdlOjEsXG4gICAgICAgICAgICAgICAgcGFnaW5hdGVfYXJyYXk6IG51bGwsXG4gICAgICAgICAgICAgICAgZmllbGQ6IG51bGwsXG4gICAgICAgICAgICAgICAgZGlyOm51bGwsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IFtdLFxuICAgICAgICAgICAgICAgIGxhc3Rfc2VsZWN0ZWQ6bnVsbCxcbiAgICAgICAgICAgICAgICBpbmRleDowLFxuICAgICAgICAgICAgICAgIGNvbnRleHRfb3BlbmVkOmZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRleHRfc3R5bGU6e30sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICAkcm91dGUodG8sIGZyb20pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW1zKCk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAkYXR0cnM6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaCA9IHRoaXMuJGF0dHJzLnNlYXJjaDtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW1zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKXtcbiAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXMoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZUNvbnRleHQpXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXB1dGVkOntcbiAgICAgICAgICAgIGlzQW55Q2hlY2tlZCgpe1xuICAgICAgICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLnNlbGVjdGVkLmxlbmd0aCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGFzdEJ1dHRvbkRpc2FibGVkKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudF9wYWdlID49IHRoaXMubGFzdF9wYWdlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpcnN0QnV0dG9uRGlzYWJsZWQoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50X3BhZ2UgPD0gMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0QnV0dG9uRGlzYWJsZWQoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50X3BhZ2UgPT09IHRoaXMubGFzdF9wYWdlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZXZCdXR0b25EaXNhYmxlZCgpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRfcGFnZSA9PT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBkYmxDbGljayhlbGVtKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YWJsZV9kYXRhWydkYmxfY2xpY2snXSA/IHRoaXMudGFibGVfZGF0YS5kYmxfY2xpY2soZWxlbS5pZCkgOiB2b2lkKDApIDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bnNldFNlbGVjdGVkKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0X3NlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2ggPSBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZVNlbGVjdEFsbCgpe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWQubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5wdXNoKGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0UmVmKGl0ZW0sIGluZGV4KXtcbiAgICAgICAgICAgICAgICBpdGVtLmluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpdGVtXycgKyBpbmRleDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1NvcnRGaWVsZChpdGVtKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWVsZCA9PT0gaXRlbS50YWJsZV9uYW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQoaXRlbSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQuaW5jbHVkZXMoaXRlbS5pZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNQYWdlQWN0aXZlKHBhZ2Upe1xuICAgICAgICAgICAgICAgIHJldHVybiAocGFnZSA9PT0gdGhpcy5jdXJyZW50X3BhZ2UpID8gJ2FjdGl2ZScgOiAnJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRQYWdpbmF0b3IoKXtcbiAgICAgICAgICAgICAgICBsZXQgcGFnaW5hdGVfYXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgcHJldl9hcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPiAwICYmIGkgPD0gdGhpcy5sYXN0X3BhZ2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldl9hcnJheS5wdXNoKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBwYWdlc19hcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmN1cnJlbnRfcGFnZSAtIDI7IGkgPCB0aGlzLmN1cnJlbnRfcGFnZSArIDI7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZihpID4gMCAmJiBpIDw9IHRoaXMubGFzdF9wYWdlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VzX2FycmF5LnB1c2goaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxhc3RfYXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5sYXN0X3BhZ2UgLSAyOyBpIDwgdGhpcy5sYXN0X3BhZ2U7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZihpID4gMCAmJiBpIDw9IHRoaXMubGFzdF9wYWdlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfYXJyYXkucHVzaChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYWdpbmF0ZV9hcnJheSA9IHBhZ2luYXRlX2FycmF5LmNvbmNhdChwcmV2X2FycmF5KS51bmlxdWUoKTtcbiAgICAgICAgICAgICAgICBwYWdpbmF0ZV9hcnJheSA9IHBhZ2luYXRlX2FycmF5LmNvbmNhdChwYWdlc19hcnJheSkudW5pcXVlKCk7XG4gICAgICAgICAgICAgICAgcGFnaW5hdGVfYXJyYXkgPSBwYWdpbmF0ZV9hcnJheS5jb25jYXQobGFzdF9hcnJheSkudW5pcXVlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0ZV9hcnJheSA9IHBhZ2luYXRlX2FycmF5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldENhdGVnb3J5SWQoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZCA9PT0gJ2FsbCcpID8gdGhpcy4kYXR0cnMucm9vdF9pZCA6IHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTZWFyY2hTdHJpbmcoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuc2VhcmNoID09PSAnJykgPyBudWxsIDogdGhpcy5zZWFyY2g7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SGVhZGVyU3R5bGUoaXRlbSl7XG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlID0ge307XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5taW5fd2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICBzdHlsZS5taW5XaWR0aCA9IGl0ZW0ubWluX3dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoaXRlbS53aWR0aCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0ud2lkdGggPT09ICdhdXRvJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5mbGV4ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLndpZHRoID0gaXRlbS53aWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEl0ZW1zKCl7XG4gICAgICAgICAgICAgICAgdGhpcy51bnNldFNlbGVjdGVkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3N0b3JlL2Jhc2UvdGFibGVfZGF0YScsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlfaWQ6IHRoaXMuZ2V0Q2F0ZWdvcnlJZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiB0aGlzLmdldFNlYXJjaFN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZTogdGhpcy5jdXJyZW50X3BhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5maWVsZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcjogdGhpcy5kaXIsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gcmVzcC5kYXRhLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdF9wYWdlID0gcmVzcC5kYXRhLmxhc3RfcGFnZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRQYWdpbmF0b3IoKTtcbiAgICAgICAgICAgICAgICB9KS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFBhZ2UobnVtKXtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRfcGFnZSA9IG51bTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW1zKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9nZ2xlU29ydChpdGVtKXtcbiAgICAgICAgICAgICAgICBpZighaXRlbS5zb3J0KXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zb3J0ID0gJ0FTQyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGl0ZW0uc29ydCA9PT0gJ0FTQycpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zb3J0ID0gJ0RFU0MnXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zb3J0ID0gJ0FTQydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZCA9IGl0ZW0udGFibGVfbmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpciA9IGl0ZW0uc29ydDtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW1zKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5zZWxlY3RBbGwoKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5zZWxlY3QoaWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuZm9yRWFjaCgodmFsLCBrZXkpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT09IGlkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuc3BsaWNlKGtleSwgMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdEl0ZW0oaXRlbSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUNvbnRleHQoKTtcbiAgICAgICAgICAgICAgICBpZighd2luZG93LmN0cmxfcHJlc3NlZCAmJiAhd2luZG93LnNoaWZ0X3ByZXNzZWQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHdpbmRvdy5jdHJsX3ByZXNzZWQpe1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkLmluY2x1ZGVzKGl0ZW0uaWQpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zZWxlY3QoaXRlbS5pZClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaChpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaChpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYod2luZG93LnNoaWZ0X3ByZXNzZWQgJiYgdGhpcy5sYXN0X3NlbGVjdGVkICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXhlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWF4ID0gKHRoaXMubGFzdF9zZWxlY3RlZCA+IGl0ZW0uaW5kZXgpID8gdGhpcy5sYXN0X3NlbGVjdGVkIDogaXRlbS5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1pbiA9ICh0aGlzLmxhc3Rfc2VsZWN0ZWQgPCBpdGVtLmluZGV4KSA/IHRoaXMubGFzdF9zZWxlY3RlZCA6IGl0ZW0uaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBtaW47IGkgPD0gbWF4OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ZXMucHVzaChwYXJzZUludChpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGluZGV4ZXMuaW5jbHVkZXMoaXRlbS5pbmRleCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaChpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0X3NlbGVjdGVkID0gaXRlbS5pbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlbkNvbnRleHQoZXZlbnQpe1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0X29wZW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IG9mc2V0dGVyID0gdGhpcy4kcmVmcy5vZnNldHRlcjtcbiAgICAgICAgICAgICAgICBpZihvZnNldHRlcil7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb250ZXh0WSA9IGV2ZW50LmNsaWVudFkgLSBvZnNldHRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgICAgICAgICAgICAgaWYoZXZlbnQuY2xpZW50WSArIHRoaXMuJHJlZnMuY29udC5vZmZzZXRIZWlnaHQgKyAxMDAgPj0gd2luZG93LmlubmVySGVpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRZIC09IHRoaXMuJHJlZnMuY29udC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0X3N0eWxlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBjb250ZXh0WSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBldmVudC5jbGllbnRYIC0gb2ZzZXR0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIHdpbmRvdy5zY3JvbGxYICsgJ3B4J1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2VDb250ZXh0KGUpe1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dF9zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnLTEyMDBweCcsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICctMTIwMHB4JyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LW1lbnUgYm94IHctMjUwXCIgaWQ9XCJjYXRlZ29yeS1uYXZcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJveC1oZWFkZXIgc3RvcmVcIj5cblxuICAgICAgICAgICAgPGRpdiB2LWlmPVwib25seV9uYW1lXCI+e3sgbmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgPHJvdXRlci1saW5rIGNsYXNzPVwiY2F0ZWdvcnktYmFjay1idXR0b25cIiB2LWlmPVwiIW9ubHlfbmFtZVwiIHRhZz1cImFcIiA6dG89XCJ7IG5hbWU6ICdiYXNlJywgcGFyYW1zOiB7IGNhdGVnb3J5X2lkOiBwYXJlbnRfaWQgfX1cIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tbGVmdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICA8c3BhbiB0aXRsZT1cItCQ0LLRgtC+0LrRgNC10L/QtdC2XCI+e3sgbmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvcm91dGVyLWxpbms+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94LWNvbnRlbnRcIiBkYXRhLXNpbXBsZWJhciBzdHlsZT1cIm1heC1oZWlnaHQ6IGNhbGMoMTAwJSAtIDU0cHgpO1wiPlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2XCIgaWQ9XCJjYXRlZ29yeS1ibG9ja1wiPlxuICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB2LWZvcj1cImNhdGVnb3J5IGluIGNhdGVnb3JpZXNcIiB2LWJpbmQ6a2V5PVwiY2F0ZWdvcnkuaWRcIiB0YWc9XCJsaVwiIDp0bz1cInsgbmFtZTogJ2Jhc2UnLCBwYXJhbXM6IHsgY2F0ZWdvcnlfaWQ6IGNhdGVnb3J5LmlkIH19XCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+e3sgY2F0ZWdvcnkubmFtZSB9fTwvYT5cbiAgICAgICAgICAgICAgICA8L3JvdXRlci1saW5rPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgbmFtZTogXCJDYXRlZ29yaWVzXCIsXG4gICAgICAgIHByb3BzOlsnY2F0ZWdvcnknLCAncm9vdF9jYXRlZ29yeSddLFxuICAgICAgICBkYXRhOiAoKT0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICBwYXJlbnRfaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgb25seV9uYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6e31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgICRyb3V0ZSh0bywgZnJvbSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Um9vdENhdGVnb3J5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDYXRlZ29yaWVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKXtcbiAgICAgICAgICAgIHRoaXMuc2V0Um9vdENhdGVnb3J5KCk7XG4gICAgICAgICAgICB0aGlzLmdldENhdGVnb3JpZXMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIC8vIHBhcmVudF9pZCgpe1xuICAgICAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLnBhcmVudF9pZCA/IHRoaXMucGFyZW50X2lkIDogdGhpcy5yb290X2NhdGVnb3J5O1xuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgIGNhdGVnb3J5X2lkKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLiRyb3V0ZS5wYXJhbXMuY2F0ZWdvcnlfaWQgPT09ICdhbGwnKSA/IHRoaXMucm9vdF9jYXRlZ29yeSA6IHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6e1xuICAgICAgICAgICAgaXNPbmx5TmFtZSgpe1xuICAgICAgICAgICAgICAgIHRoaXMub25seV9uYW1lID0gdGhpcy5jYXRlZ29yeV9pZCA9PT0gdGhpcy5yb290X2NhdGVnb3J5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFJvb3RDYXRlZ29yeSgpe1xuICAgICAgICAgICAgICAgIGxldCBjYXRlZ29yeSA9IHRoaXMuZ2V0RnJvbUxvY2FsU3RvcmFnZSgnY2F0ZWdvcnlfJyArIHRoaXMuY2F0ZWdvcnlfaWQgKyAnX21ldGEnKTtcbiAgICAgICAgICAgICAgICBpZihjYXRlZ29yeSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9IGNhdGVnb3J5Lm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50X2lkID0gY2F0ZWdvcnkuY2F0ZWdvcnlfaWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPbmx5TmFtZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2NhdGVnb3JpZXMvJyArIHRoaXMuY2F0ZWdvcnlfaWQsXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWUgPSByZXNwLmRhdGEubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50X2lkID0gcmVzcC5kYXRhLmNhdGVnb3J5X2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2UoJ2NhdGVnb3J5XycgKyB0aGlzLmNhdGVnb3J5X2lkICsgJ19tZXRhJywgcmVzcC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPbmx5TmFtZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q2F0ZWdvcmllcygpe1xuICAgICAgICAgICAgICAgIGxldCBjYXRlZ29yaWVzID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdjYXRlZ29yaWVzXycgKyB0aGlzLmNhdGVnb3J5X2lkKTtcbiAgICAgICAgICAgICAgICBpZihjYXRlZ29yaWVzKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzID0gY2F0ZWdvcmllcztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9jYXRlZ29yaWVzLycgKyB0aGlzLmNhdGVnb3J5X2lkICsgJy9jaGlsZHJlbicsXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSByZXNwLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZSgnY2F0ZWdvcmllc18nICsgdGhpcy5jYXRlZ29yeV9pZCwgdGhpcy5jYXRlZ29yaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJib3R0b20tY29udGFpbmVyXCI+XG4gICAgICAgIDxDYXRlZ29yaWVzIHYtYmluZDpyb290X2NhdGVnb3J5PVwicm9vdF9jYXRlZ29yeVwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3gtbGlzdGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IG1iLTE1XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1maWVsZC1jb250YWluZXIgdy0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHYtbW9kZWwubGF6eT1cInNlYXJjaFwiIHYtZGVib3VuY2U9XCI0NTBcIiBpZD1cInNlYXJjaFwiIG5hbWU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cItCf0L7QuNGB0Log0L/QviDRgdC60LvQsNC00YNcIiBjbGFzcz1cImlucHV0IHctMTAwXCIgdmFsdWU9XCJcIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHByaW1hcnkgbWwtMTVcIiB2LW9uOmNsaWNrPVwibmV3RGlhbG9nKCdjYXRlZ29yeScpXCI+0J3QvtCy0LDRjyDQutCw0YLQtdCz0L7RgNC40Y88L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gcHJpbWFyeSBtbC0xNVwiIHYtb246Y2xpY2s9XCJuZXdEaWFsb2coJ3Byb2R1Y3QnKVwiPtCd0L7QstGL0Lkg0YLQvtCy0LDRgDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94IGQtZmxleFwiIHN0eWxlPVwiaGVpZ2h0OiBjYWxjKDEwMCUgLSA0NXB4KTtcIj5cbiAgICAgICAgICAgICAgICA8VGFibGUgdi1iaW5kOnRhYmxlX2RhdGE9XCJ0YWJsZV9kYXRhXCIgdi1iaW5kOnNlYXJjaD1cInNlYXJjaFwiIHYtYmluZDpyb290X2lkPVwicm9vdF9jYXRlZ29yeVwiLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IENhdGVnb3JpZXMgZnJvbSBcIi4vLi4vLi4vdGVtcGxhdGUvQ2F0ZWdvcmllc1wiXG4gICAgaW1wb3J0IFRhYmxlIGZyb20gXCIuLi8uLi9zZXJ2aWNlL1RhYmxlXCI7XG4gICAgaW1wb3J0IGRlYm91bmNlIGZyb20gJy4vLi4vLi4vLi4vZGVib3VuY2UnXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBuYW1lOiBcIkJhc2VcIixcbiAgICAgICAgY29tcG9uZW50czp7XG4gICAgICAgICAgICBUYWJsZSxcbiAgICAgICAgICAgIENhdGVnb3JpZXNcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YTogKCk9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJvb3RfY2F0ZWdvcnk6IDIsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IG51bGwsXG4gICAgICAgICAgICAgICAgc2VhcmNoOiAnJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yaWVzOm51bGwsXG4gICAgICAgICAgICAgICAgdGFibGVfZGF0YTp7fVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCl7XG4gICAgICAgICAgICB0aGlzLnRhYmxlX2RhdGEuaGVhZGVyID0gW1xuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDkwLCB3aWR0aDogOTAsIG5hbWU6ICdJRCcsdGFibGVfbmFtZTogJ2lkJ30sXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogMTAwLCB3aWR0aDogJ2F1dG8nLCBuYW1lOiAn0J3QsNC40LzQtdC90L7QstCw0L3QuNC1JywgdGFibGVfbmFtZTogJ25hbWUnfSxcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxNTAsIHdpZHRoOiAyMDAsIG5hbWU6ICfQkNGA0YLQuNC60YPQuycsIHRhYmxlX25hbWU6ICdhcnRpY2xlJ30sXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogMTUwLCB3aWR0aDogMjAwLCBuYW1lOiAn0J/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70YwnLCB0YWJsZV9uYW1lOiAnc3VwcGxpZXInfSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICB0aGlzLnRhYmxlX2RhdGEuY29udGV4dF9tZW51ID0gW1xuICAgICAgICAgICAgICAgIHtuYW1lOifQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjCcsIGFjdGlvbjogZnVuY3Rpb24oZGF0YSl7YWxlcnQoMTIpfX0sXG4gICAgICAgICAgICAgICAge25hbWU6J9Ce0YLQutGA0YvRgtGMJywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtvcGVuRGlhbG9nKCdwcm9kdWN0RGlhbG9nJywgJyZwcm9kdWN0X2lkPScgKyBkYXRhLmNvbnRleHRlZC5pZCl9fSxcbiAgICAgICAgICAgICAgICB7bmFtZTon0KHQvtC30LTQsNGC0Ywg0LfQsNGP0LLQutGDINC/0L7RgdGC0LDQstGJ0LjQutGDJywgYWN0aW9uOiAoZGF0YSkgPT4ge29wZW5EaWFsb2coJ3Byb3ZpZGVyT3JkZXJEaWFsb2cnLCAnJnByb2R1Y3RzPScgKyB0aGlzLnRhYmxlLmdldFNlbGVjdGVkSURzKCkpfX0sXG4gICAgICAgICAgICAgICAge25hbWU6J9Cf0LXRh9Cw0YLRjCDRhtC10L3QvdC40LrQvtCyJywgYWN0aW9uOiAoZGF0YSkgPT4ge3dpbmRvdy5vcGVuRGlhbG9nKCdjaGVxdWVEaWFsb2cnLCAnJnByb2R1Y3RzPScgKyB0aGlzLnRhYmxlLmdldFNlbGVjdGVkSURzKCkpfX0sXG4gICAgICAgICAgICAgICAge25hbWU6J9Cf0L7QutCw0LfQsNGC0Ywg0LDQvdCw0LvQvtCz0Lgg0LIg0L3QsNC70LjRh9C40LgnLCBhY3Rpb246IChkYXRhKSA9PiB7dGhpcy5zaG93QW5hbG9ndWVzKGRhdGEpO319LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5kYmxfY2xpY2sgPSBmdW5jdGlvbihpZCl7Y29uc29sZS5sb2coaWQpfTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6e1xuICAgICAgICAgICAgY2F0ZWdvcnlfaWQoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3J5ID0gKHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZCA9PT0gJ2FsbCcpID8gdGhpcy5yb290X2NhdGVnb3J5IDogdGhpcy4kcm91dGUucGFyYW1zLmNhdGVnb3J5X2lkO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhdGVnb3J5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBnZXRDYXRlZ29yaWVzKCl7XG4gICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2RhdGEvY2F0ZWdvcmllcy9nZXQnLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtjYXRlZ29yeV9pZDogdGhpcy5jYXRlZ29yeX1cbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSByZXNwLmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jYXRlZ29yaWVzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXdEaWFsb2codGFnLCBwYXJhbXMgPSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnb3BlbkRpYWxvZycsIHtcbiAgICAgICAgICAgICAgICAgICAgdGFnOiB0YWcsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRpcmVjdGl2ZXM6IHtkZWJvdW5jZX1cbiAgICB9XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImZsZXgtMSBoLTEwMFwiLCBhdHRyczogeyBpZDogXCJ0YWJsZS1jb250YWluZXJcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXCJkaXZcIiwgeyByZWY6IFwib2ZzZXR0ZXJcIiwgc3RhdGljQ2xhc3M6IFwiaC0xMDBcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYmJ0YWJsZS1jb250YWluZXJcIiB9LCBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJiYnRhYmxlLWhlYWRlclwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaGVhZGVyLWVsZW0gY2hlY2tib3hcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImNoZWNrYm94XCIgfSxcbiAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IGNoZWNrZWQ6IF92bS5pc0FueUNoZWNrZWQgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS50b2dnbGVTZWxlY3RBbGwoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF92bS5fbChfdm0udGFibGVfZGF0YS5oZWFkZXIsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBrZXk6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaGVhZGVyLWVsZW1cIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBfdm0uaXNTb3J0RmllbGQoaXRlbSkgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiOTBweFwiLCBcIm1pbi13aWR0aFwiOiBcIjkwcHhcIiB9LFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogX3ZtLmdldEhlYWRlclN0eWxlKGl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBcImRhdGEtZmllbGRcIjogXCJpZFwiIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGl0bGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnRvZ2dsZVNvcnQoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoaXRlbS5uYW1lKSldXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICFfdm0uaXNTb3J0RmllbGQoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYXJyb3cgZG93blwiIH0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmlzU29ydEZpZWxkKGl0ZW0pICYmIF92bS5kaXIgPT09IFwiREVTQ1wiXG4gICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImFycm93IGRvd25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBfdm0uaXNTb3J0RmllbGQoaXRlbSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfdm0uaXNTb3J0RmllbGQoaXRlbSkgJiYgX3ZtLmRpciA9PT0gXCJBU0NcIlxuICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJhcnJvdyB1cFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogeyBhY3RpdmU6IF92bS5pc1NvcnRGaWVsZChpdGVtKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMlxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJidGFibGUtYm9keVwiLFxuICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiY2FsYygxMDAlIC0gNTlweClcIiB9LFxuICAgICAgICAgICAgICBhdHRyczogeyBcImRhdGEtc2ltcGxlYmFyXCI6IFwiXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLml0ZW1zLCBmdW5jdGlvbihlbGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiaXRlbV9cIiArIGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBfdm0uc2V0UmVmKGVsZW0sIGluZGV4KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZkluRm9yOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYm9keS1lbGVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogeyBzZWxlY3RlZDogX3ZtLmlzU2VsZWN0ZWQoZWxlbSkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRibGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmRibENsaWNrKGVsZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRtZW51OiBfdm0ub3BlbkNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNlbGVjdEl0ZW0oZWxlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjZWxsIGNoZWNrYm94XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImNoZWNrYm94XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyBjaGVja2VkOiBfdm0uaXNTZWxlY3RlZChlbGVtKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImxhYmVsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLnRhYmxlX2RhdGEuaGVhZGVyLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogaXRlbS5uYW1lICsgZWxlbS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNlbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBfdm0uZ2V0SGVhZGVyU3R5bGUoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidGl0bGVcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoZWxlbVtpdGVtLnRhYmxlX25hbWVdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfdm0ubG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woMTIsIGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IGVsZW0sIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2NlbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiMzBweFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0udGFibGVfZGF0YS5oZWFkZXIsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGl0ZW0ubmFtZSArIFwicGxhY2Vob2xkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2NlbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogX3ZtLmdldEhlYWRlclN0eWxlKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJlZjogXCJjb250XCIsXG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvbnRleHRcIixcbiAgICAgICAgICAgICAgc3R5bGU6IF92bS5jb250ZXh0X3N0eWxlLFxuICAgICAgICAgICAgICBhdHRyczogeyBpZDogXCJjb250ZXh0XCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF92bS5fbChfdm0udGFibGVfZGF0YS5jb250ZXh0X21lbnUsIGZ1bmN0aW9uKG1lbnUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAga2V5OiBtZW51Lm5hbWUsXG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjb250ZXh0X2l0ZW1cIixcbiAgICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBtZW51LmFjdGlvbiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKG1lbnUubmFtZSkpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAwXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicGFnaW5hdG9yXCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBkaXNhYmxlZDogX3ZtLmZpcnN0QnV0dG9uRGlzYWJsZWQgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNldFBhZ2UoMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihcItCf0LXRgNCy0LDRj1wiKV1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBkaXNhYmxlZDogX3ZtLnByZXZCdXR0b25EaXNhYmxlZCB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2V0UGFnZShfdm0uY3VycmVudF9wYWdlIC0gMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihcItCd0LDQt9Cw0LRcIildXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF92bS5fbChfdm0ucGFnaW5hdGVfYXJyYXksIGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjbGFzczogX3ZtLmlzUGFnZUFjdGl2ZShwYWdlKSxcbiAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNldFBhZ2UocGFnZSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhwYWdlKSldXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBkaXNhYmxlZDogX3ZtLm5leHRCdXR0b25EaXNhYmxlZCB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2V0UGFnZShfdm0uY3VycmVudF9wYWdlICsgMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihcItCS0L/QtdGA0ZHQtFwiKV1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBkaXNhYmxlZDogX3ZtLmxhc3RCdXR0b25EaXNhYmxlZCB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2V0UGFnZShfdm0ubGFzdF9wYWdlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0J/QvtGB0LvQtdC00L3Rj9GPXCIpXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMlxuICAgICAgICAgIClcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgXVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwiY29udGVudC1tZW51IGJveCB3LTI1MFwiLCBhdHRyczogeyBpZDogXCJjYXRlZ29yeS1uYXZcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiYm94LWhlYWRlciBzdG9yZVwiIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfdm0ub25seV9uYW1lID8gX2MoXCJkaXZcIiwgW192bS5fdihfdm0uX3MoX3ZtLm5hbWUpKV0pIDogX3ZtLl9lKCksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAhX3ZtLm9ubHlfbmFtZVxuICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2F0ZWdvcnktYmFjay1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHRhZzogXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvOiB7IG5hbWU6IFwiYmFzZVwiLCBwYXJhbXM6IHsgY2F0ZWdvcnlfaWQ6IF92bS5wYXJlbnRfaWQgfSB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcImlcIiwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmYSBmYS1jaGV2cm9uLWxlZnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIiB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBhdHRyczogeyB0aXRsZTogXCLQkNCy0YLQvtC60YDQtdC/0LXQtlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5uYW1lKSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJib3gtY29udGVudFwiLFxuICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IFwibWF4LWhlaWdodFwiOiBcImNhbGMoMTAwJSAtIDU0cHgpXCIgfSxcbiAgICAgICAgICBhdHRyczogeyBcImRhdGEtc2ltcGxlYmFyXCI6IFwiXCIgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInVsXCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIm5hdlwiLCBhdHRyczogeyBpZDogXCJjYXRlZ29yeS1ibG9ja1wiIH0gfSxcbiAgICAgICAgICAgIF92bS5fbChfdm0uY2F0ZWdvcmllcywgZnVuY3Rpb24oY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBrZXk6IGNhdGVnb3J5LmlkLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgdGFnOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvOiB7IG5hbWU6IFwiYmFzZVwiLCBwYXJhbXM6IHsgY2F0ZWdvcnlfaWQ6IGNhdGVnb3J5LmlkIH0gfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJhXCIsIHsgYXR0cnM6IHsgaHJlZjogXCIjXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoY2F0ZWdvcnkubmFtZSkpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdXG4gICAgICApXG4gICAgXVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwiYm90dG9tLWNvbnRhaW5lclwiIH0sXG4gICAgW1xuICAgICAgX2MoXCJDYXRlZ29yaWVzXCIsIHsgYXR0cnM6IHsgcm9vdF9jYXRlZ29yeTogX3ZtLnJvb3RfY2F0ZWdvcnkgfSB9KSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJveC1saXN0ZXJcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZC1mbGV4IG1iLTE1XCIgfSwgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic2VhcmNoLWZpZWxkLWNvbnRhaW5lciB3LTEwMFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsLmxhenlcIixcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2VhcmNoLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICAgIG1vZGlmaWVyczogeyBsYXp5OiB0cnVlIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVib3VuY2VcIixcbiAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1kZWJvdW5jZVwiLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IDQ1MCxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiNDUwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImlucHV0IHctMTAwXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgaWQ6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLQn9C+0LjRgdC6INC/0L4g0YHQutC70LDQtNGDXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5zZWFyY2ggfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgX3ZtLnNlYXJjaCA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImFjdGlvbnNcIiB9LCBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBwcmltYXJ5IG1sLTE1XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ubmV3RGlhbG9nKFwiY2F0ZWdvcnlcIilcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtfdm0uX3YoXCLQndC+0LLQsNGPINC60LDRgtC10LPQvtGA0LjRj1wiKV1cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gcHJpbWFyeSBtbC0xNVwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLm5ld0RpYWxvZyhcInByb2R1Y3RcIilcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtfdm0uX3YoXCLQndC+0LLRi9C5INGC0L7QstCw0YBcIildXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSlcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYm94IGQtZmxleFwiLFxuICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcImNhbGMoMTAwJSAtIDQ1cHgpXCIgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXCJUYWJsZVwiLCB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgdGFibGVfZGF0YTogX3ZtLnRhYmxlX2RhdGEsXG4gICAgICAgICAgICAgICAgc2VhcmNoOiBfdm0uc2VhcmNoLFxuICAgICAgICAgICAgICAgIHJvb3RfaWQ6IF92bS5yb290X2NhdGVnb3J5XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSxcbiAgICAgICAgICAxXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1RhYmxlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03Mjc3ZTRjZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9UYWJsZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1RhYmxlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNzI3N2U0Y2UnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNzI3N2U0Y2UnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNzI3N2U0Y2UnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1RhYmxlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03Mjc3ZTRjZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc3Mjc3ZTRjZScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1RhYmxlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UYWJsZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVGFibGUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTcyNzdlNGNlJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9DYXRlZ29yaWVzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zZGU5MWM3NiZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9DYXRlZ29yaWVzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjNkZTkxYzc2XCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnM2RlOTFjNzYnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnM2RlOTFjNzYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnM2RlOTFjNzYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0NhdGVnb3JpZXMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNkZTkxYzc2JnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzNkZTkxYzc2Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9DYXRlZ29yaWVzLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9M2RlOTFjNzYmc2NvcGVkPXRydWUmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0Jhc2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTVlMGMxODBiJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0Jhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9CYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiNWUwYzE4MGJcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc1ZTBjMTgwYicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc1ZTBjMTgwYicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc1ZTBjMTgwYicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vQmFzZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NWUwYzE4MGImc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNWUwYzE4MGInLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0Jhc2UudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9CYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9CYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9CYXNlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01ZTBjMTgwYiZzY29wZWQ9dHJ1ZSZcIiIsImxldCBkZWJvdW5jZSA9IGZ1bmN0aW9uIGRlYm91bmNlIChmbiwgZGVsYXkpIHtcclxuICAgIGxldCB0aW1lb3V0SUQgPSBudWxsO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHs7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XHJcbiAgICAgICAgbGV0IGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRpbWVvdXRJRCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmdzKVxyXG4gICAgICAgIH0sIGRlbGF5KVxyXG4gICAgfVxyXG59XHJcblxyXG5kaXJlY3RpdmUuZGVib3VuY2UgPSBkZWJvdW5jZTtcclxuXHJcbmZ1bmN0aW9uIGRpcmVjdGl2ZSAoZWwsIGJpbmRpbmcpIHtcclxuICAgIGlmIChiaW5kaW5nLnZhbHVlICE9PSBiaW5kaW5nLm9sZFZhbHVlKSB7IC8vIGNoYW5nZSBkZWJvdW5jZSBvbmx5IGlmIGludGVydmFsIGhhcyBjaGFuZ2VkXHJcbiAgICAgICAgZWwub25pbnB1dCA9IGRpcmVjdGl2ZS5kZWJvdW5jZShmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSlcclxuICAgICAgICB9LCBwYXJzZUludChiaW5kaW5nLnZhbHVlKSB8fCA1MDApXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGlyZWN0aXZlO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9