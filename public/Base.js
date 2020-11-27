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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0NhdGVnb3JpZXMudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9CYXNlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZT8wZTYzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0NhdGVnb3JpZXMudnVlP2M4ZmEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvQmFzZS52dWU/OTMyMSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZT80Mzc5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvVGFibGUudnVlPzdkOTEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvQ2F0ZWdvcmllcy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvQ2F0ZWdvcmllcy52dWU/MWZjNSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9DYXRlZ29yaWVzLnZ1ZT80ZDUzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0Jhc2UudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0Jhc2UudnVlP2NiN2UiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvQmFzZS52dWU/NDIzNSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvZGVib3VuY2UuanMiXSwibmFtZXMiOlsiZGVib3VuY2UiLCJmbiIsImRlbGF5IiwidGltZW91dElEIiwiY2xlYXJUaW1lb3V0IiwiYXJncyIsImFyZ3VtZW50cyIsInRoYXQiLCJzZXRUaW1lb3V0IiwiYXBwbHkiLCJkaXJlY3RpdmUiLCJlbCIsImJpbmRpbmciLCJ2YWx1ZSIsIm9sZFZhbHVlIiwib25pbnB1dCIsImV2dCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsInBhcnNlSW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5RUE7QUFDQSx1QkFEQTtBQUVBLGVBRkE7QUFHQTtBQUNBO0FBQ0EsZUFEQTtBQUVBLGtCQUZBO0FBR0EscUJBSEE7QUFJQSxxQkFKQTtBQUtBLDBCQUxBO0FBTUEsaUJBTkE7QUFPQSxlQVBBO0FBUUEsb0JBUkE7QUFTQSxrQkFUQTtBQVVBLHlCQVZBO0FBV0EsY0FYQTtBQVlBLDJCQVpBO0FBYUE7QUFiQTtBQWVBLEdBbkJBO0FBb0JBO0FBQ0EsVUFEQSxrQkFDQSxFQURBLEVBQ0EsSUFEQSxFQUNBO0FBQ0E7QUFFQSxLQUpBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFSQSxHQXBCQTtBQThCQSxTQTlCQSxxQkE4QkE7QUFDQTtBQUNBO0FBQ0EsR0FqQ0E7QUFrQ0E7QUFDQSxnQkFEQSwwQkFDQTtBQUNBO0FBQ0EsS0FIQTtBQUlBLHNCQUpBLGdDQUlBO0FBQ0E7QUFDQSxLQU5BO0FBT0EsdUJBUEEsaUNBT0E7QUFDQTtBQUNBLEtBVEE7QUFVQSxzQkFWQSxnQ0FVQTtBQUNBO0FBQ0EsS0FaQTtBQWFBLHNCQWJBLGdDQWFBO0FBQ0E7QUFDQTtB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anMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdiBpZD1cInRhYmxlLWNvbnRhaW5lclwiIGNsYXNzPVwiZmxleC0xIGgtMTAwXCI+XG4gICAgICAgIDxkaXYgcmVmPVwib2ZzZXR0ZXJcIiBjbGFzcz1cImgtMTAwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmJ0YWJsZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmJ0YWJsZS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1lbGVtIGNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1iaW5kOmNoZWNrZWQ9XCJpc0FueUNoZWNrZWRcIiB0eXBlPVwiY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCB2LW9uOmNsaWNrPVwidG9nZ2xlU2VsZWN0QWxsKClcIj48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiBpc1NvcnRGaWVsZChpdGVtKX1cIiB2LWZvcj1cIml0ZW0gaW4gdGFibGVfZGF0YS5oZWFkZXJcIiB2LWJpbmQ6a2V5PVwiaXRlbS5uYW1lXCIgdi1iaW5kOnN0eWxlPVwiZ2V0SGVhZGVyU3R5bGUoaXRlbSlcIiBjbGFzcz1cImhlYWRlci1lbGVtXCIgZGF0YS1maWVsZD1cImlkXCIgc3R5bGU9XCJ3aWR0aDogOTBweDsgbWluLXdpZHRoOiA5MHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LW9uOmNsaWNrPVwidG9nZ2xlU29ydChpdGVtKVwiIGNsYXNzPVwidGl0bGVcIj57eyBpdGVtLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cIiFpc1NvcnRGaWVsZChpdGVtKVwiIGNsYXNzPVwiYXJyb3cgZG93blwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiaXNTb3J0RmllbGQoaXRlbSkgJiYgZGlyID09PSAnREVTQydcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiBpc1NvcnRGaWVsZChpdGVtKX1cIiBjbGFzcz1cImFycm93IGRvd25cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cImlzU29ydEZpZWxkKGl0ZW0pICYmIGRpciA9PT0gJ0FTQydcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiBpc1NvcnRGaWVsZChpdGVtKX1cIiBjbGFzcz1cImFycm93IHVwXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYnRhYmxlLWJvZHlcIiBkYXRhLXNpbXBsZWJhciBzdHlsZT1cImhlaWdodDogY2FsYygxMDAlIC0gNTlweCk7XCIgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LW9uOmRibGNsaWNrPVwiZGJsQ2xpY2soZWxlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW9uOmNvbnRleHRtZW51PVwib3BlbkNvbnRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW9uOmNsaWNrPVwic2VsZWN0SXRlbShlbGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKGVsZW0sIGluZGV4KSBpbiBpdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpyZWY9XCJzZXRSZWYoZWxlbSwgaW5kZXgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmtleT1cIidpdGVtXycgKyBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDpjbGFzcz1cInsgJ3NlbGVjdGVkJyA6IGlzU2VsZWN0ZWQoZWxlbSl9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJib2R5LWVsZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbCBjaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdi1iaW5kOmNoZWNrZWQ9XCJpc1NlbGVjdGVkKGVsZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCJpdGVtIGluIHRhYmxlX2RhdGEuaGVhZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmtleT1cIml0ZW0ubmFtZSArIGVsZW0uaWRcIiBjbGFzcz1cImNlbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6c3R5bGU9XCJnZXRIZWFkZXJTdHlsZShpdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57eyBlbGVtW2l0ZW0udGFibGVfbmFtZV0gfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwibG9hZGluZ1wiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJlbGVtIGluIDEyXCIgdi1iaW5kOmtleT1cImVsZW1cIiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIgc3R5bGU9XCJ3aWR0aDogMzBweFwiID48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cIml0ZW0gaW4gdGFibGVfZGF0YS5oZWFkZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDprZXk9XCJpdGVtLm5hbWUgKyAncGxhY2Vob2xkZXInXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6c3R5bGU9XCJnZXRIZWFkZXJTdHlsZShpdGVtKVwiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPVwiY29udFwiIGNsYXNzPVwiY29udGV4dFwiIGlkPVwiY29udGV4dFwiIHYtYmluZDpzdHlsZT1cImNvbnRleHRfc3R5bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LW9uOmNsaWNrPVwibWVudS5hY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwibWVudSBpbiB0YWJsZV9kYXRhLmNvbnRleHRfbWVudVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmtleT1cIm1lbnUubmFtZVwiIGNsYXNzPVwiY29udGV4dF9pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57eyBtZW51Lm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdG9yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdi1vbjpjbGljaz1cInNldFBhZ2UoMSlcIiB2LWJpbmQ6ZGlzYWJsZWQ9XCJmaXJzdEJ1dHRvbkRpc2FibGVkXCIgPtCf0LXRgNCy0LDRjzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHYtb246Y2xpY2s9XCJzZXRQYWdlKGN1cnJlbnRfcGFnZSAtIDEpXCIgdi1iaW5kOmRpc2FibGVkPVwicHJldkJ1dHRvbkRpc2FibGVkXCI+0J3QsNC30LDQtDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdi1mb3I9XCJwYWdlIGluIHBhZ2luYXRlX2FycmF5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6Y2xhc3M9XCJpc1BhZ2VBY3RpdmUocGFnZSlcIiB2LW9uOmNsaWNrPVwic2V0UGFnZShwYWdlKVwiPnt7IHBhZ2UgfX08L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHYtb246Y2xpY2s9XCJzZXRQYWdlKGN1cnJlbnRfcGFnZSArIDEpXCIgdi1iaW5kOmRpc2FibGVkPVwibmV4dEJ1dHRvbkRpc2FibGVkXCIgPtCS0L/QtdGA0ZHQtDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHYtb246Y2xpY2s9XCJzZXRQYWdlKGxhc3RfcGFnZSlcIiB2LWJpbmQ6ZGlzYWJsZWQ9XCJsYXN0QnV0dG9uRGlzYWJsZWRcIj7Qn9C+0YHQu9C10LTQvdGP0Y88L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBwcm9wczpbJ3RhYmxlX2RhdGEnXSxcbiAgICAgICAgbmFtZTogXCJUYWJsZVwiLFxuICAgICAgICBkYXRhOiAoKT0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgICAgIHNlYXJjaDogbnVsbCxcbiAgICAgICAgICAgICAgICBsYXN0X3BhZ2U6IG51bGwsXG4gICAgICAgICAgICAgICAgY3VycmVudF9wYWdlOjEsXG4gICAgICAgICAgICAgICAgcGFnaW5hdGVfYXJyYXk6IG51bGwsXG4gICAgICAgICAgICAgICAgZmllbGQ6IG51bGwsXG4gICAgICAgICAgICAgICAgZGlyOm51bGwsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IFtdLFxuICAgICAgICAgICAgICAgIGxhc3Rfc2VsZWN0ZWQ6bnVsbCxcbiAgICAgICAgICAgICAgICBpbmRleDowLFxuICAgICAgICAgICAgICAgIGNvbnRleHRfb3BlbmVkOmZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRleHRfc3R5bGU6e30sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICAkcm91dGUodG8sIGZyb20pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW1zKCk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAkYXR0cnM6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaCA9IHRoaXMuJGF0dHJzLnNlYXJjaDtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW1zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKXtcbiAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXMoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZUNvbnRleHQpXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXB1dGVkOntcbiAgICAgICAgICAgIGlzQW55Q2hlY2tlZCgpe1xuICAgICAgICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLnNlbGVjdGVkLmxlbmd0aCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGFzdEJ1dHRvbkRpc2FibGVkKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudF9wYWdlID49IHRoaXMubGFzdF9wYWdlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpcnN0QnV0dG9uRGlzYWJsZWQoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50X3BhZ2UgPD0gMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0QnV0dG9uRGlzYWJsZWQoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50X3BhZ2UgPT09IHRoaXMubGFzdF9wYWdlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZXZCdXR0b25EaXNhYmxlZCgpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRfcGFnZSA9PT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBkYmxDbGljayhlbGVtKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YWJsZV9kYXRhWydkYmxfY2xpY2snXSA/IHRoaXMudGFibGVfZGF0YS5kYmxfY2xpY2soZWxlbS5pZCkgOiB2b2lkKDApIDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bnNldFNlbGVjdGVkKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0X3NlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2ggPSBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZVNlbGVjdEFsbCgpe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWQubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5wdXNoKGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0UmVmKGl0ZW0sIGluZGV4KXtcbiAgICAgICAgICAgICAgICBpdGVtLmluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpdGVtXycgKyBpbmRleDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1NvcnRGaWVsZChpdGVtKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWVsZCA9PT0gaXRlbS50YWJsZV9uYW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQoaXRlbSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQuaW5jbHVkZXMoaXRlbS5pZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNQYWdlQWN0aXZlKHBhZ2Upe1xuICAgICAgICAgICAgICAgIHJldHVybiAocGFnZSA9PT0gdGhpcy5jdXJyZW50X3BhZ2UpID8gJ2FjdGl2ZScgOiAnJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRQYWdpbmF0b3IoKXtcbiAgICAgICAgICAgICAgICBsZXQgcGFnaW5hdGVfYXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgcHJldl9hcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPiAwICYmIGkgPD0gdGhpcy5sYXN0X3BhZ2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldl9hcnJheS5wdXNoKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBwYWdlc19hcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmN1cnJlbnRfcGFnZSAtIDI7IGkgPCB0aGlzLmN1cnJlbnRfcGFnZSArIDI7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZihpID4gMCAmJiBpIDw9IHRoaXMubGFzdF9wYWdlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VzX2FycmF5LnB1c2goaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxhc3RfYXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5sYXN0X3BhZ2UgLSAyOyBpIDwgdGhpcy5sYXN0X3BhZ2U7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZihpID4gMCAmJiBpIDw9IHRoaXMubGFzdF9wYWdlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfYXJyYXkucHVzaChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYWdpbmF0ZV9hcnJheSA9IHBhZ2luYXRlX2FycmF5LmNvbmNhdChwcmV2X2FycmF5KS51bmlxdWUoKTtcbiAgICAgICAgICAgICAgICBwYWdpbmF0ZV9hcnJheSA9IHBhZ2luYXRlX2FycmF5LmNvbmNhdChwYWdlc19hcnJheSkudW5pcXVlKCk7XG4gICAgICAgICAgICAgICAgcGFnaW5hdGVfYXJyYXkgPSBwYWdpbmF0ZV9hcnJheS5jb25jYXQobGFzdF9hcnJheSkudW5pcXVlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0ZV9hcnJheSA9IHBhZ2luYXRlX2FycmF5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldENhdGVnb3J5SWQoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZCA9PT0gJ2FsbCcpID8gdGhpcy4kYXR0cnMucm9vdF9pZCA6IHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTZWFyY2hTdHJpbmcoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuc2VhcmNoID09PSAnJykgPyBudWxsIDogdGhpcy4kYXR0cnMuc2VhcmNoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEhlYWRlclN0eWxlKGl0ZW0pe1xuICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IHt9O1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0ubWluX3dpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUubWluV2lkdGggPSBpdGVtLm1pbl93aWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGl0ZW0ud2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICBpZihpdGVtLndpZHRoID09PSAnYXV0bycpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuZmxleCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS53aWR0aCA9IGl0ZW0ud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRJdGVtcygpe1xuICAgICAgICAgICAgICAgIHRoaXMudW5zZXRTZWxlY3RlZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9zdG9yZS9iYXNlL3RhYmxlX2RhdGEnLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5X2lkOiB0aGlzLmdldENhdGVnb3J5SWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaDogdGhpcy5nZXRTZWFyY2hTdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IHRoaXMuY3VycmVudF9wYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IHRoaXMuZmllbGQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXI6IHRoaXMuZGlyLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHJlc3AuZGF0YS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RfcGFnZSA9IHJlc3AuZGF0YS5sYXN0X3BhZ2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGFnaW5hdG9yKCk7XG4gICAgICAgICAgICAgICAgfSkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRQYWdlKG51bSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50X3BhZ2UgPSBudW07XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtcygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZVNvcnQoaXRlbSl7XG4gICAgICAgICAgICAgICAgaWYoIWl0ZW0uc29ydCl7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc29ydCA9ICdBU0MnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihpdGVtLnNvcnQgPT09ICdBU0MnKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc29ydCA9ICdERVNDJ1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc29ydCA9ICdBU0MnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGQgPSBpdGVtLnRhYmxlX25hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXIgPSBpdGVtLnNvcnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtcygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuc2VsZWN0QWxsKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuc2VsZWN0KGlkKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLmZvckVhY2goKHZhbCwga2V5KT0+e1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09PSBpZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnNwbGljZShrZXksIDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3RJdGVtKGl0ZW0pe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VDb250ZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYoIXdpbmRvdy5jdHJsX3ByZXNzZWQgJiYgIXdpbmRvdy5zaGlmdF9wcmVzc2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih3aW5kb3cuY3RybF9wcmVzc2VkKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZC5pbmNsdWRlcyhpdGVtLmlkKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2VsZWN0KGl0ZW0uaWQpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHdpbmRvdy5zaGlmdF9wcmVzc2VkICYmIHRoaXMubGFzdF9zZWxlY3RlZCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1heCA9ICh0aGlzLmxhc3Rfc2VsZWN0ZWQgPiBpdGVtLmluZGV4KSA/IHRoaXMubGFzdF9zZWxlY3RlZCA6IGl0ZW0uaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtaW4gPSAodGhpcy5sYXN0X3NlbGVjdGVkIDwgaXRlbS5pbmRleCkgPyB0aGlzLmxhc3Rfc2VsZWN0ZWQgOiBpdGVtLmluZGV4O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gbWluOyBpIDw9IG1heDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleGVzLnB1c2gocGFyc2VJbnQoaSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpbmRleGVzLmluY2x1ZGVzKGl0ZW0uaW5kZXgpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdF9zZWxlY3RlZCA9IGl0ZW0uaW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wZW5Db250ZXh0KGV2ZW50KXtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dF9vcGVuZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBvZnNldHRlciA9IHRoaXMuJHJlZnMub2ZzZXR0ZXI7XG4gICAgICAgICAgICAgICAgaWYob2ZzZXR0ZXIpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29udGV4dFkgPSBldmVudC5jbGllbnRZIC0gb2ZzZXR0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnNjcm9sbFk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50LmNsaWVudFkgKyB0aGlzLiRyZWZzLmNvbnQub2Zmc2V0SGVpZ2h0ICsgMTAwID49IHdpbmRvdy5pbm5lckhlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0WSAtPSB0aGlzLiRyZWZzLmNvbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dF9zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogY29udGV4dFkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZXZlbnQuY2xpZW50WCAtIG9mc2V0dGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyB3aW5kb3cuc2Nyb2xsWCArICdweCdcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlQ29udGV4dChlKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRfc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogJy0xMjAwcHgnLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnLTEyMDBweCcsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cclxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LW1lbnUgYm94IHctMjUwXCIgaWQ9XCJjYXRlZ29yeS1uYXZcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94LWhlYWRlciBzdG9yZVwiPlxyXG5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwib25seV9uYW1lXCI+e3sgbmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICA8cm91dGVyLWxpbmsgY2xhc3M9XCJjYXRlZ29yeS1iYWNrLWJ1dHRvblwiIHYtaWY9XCIhb25seV9uYW1lXCIgdGFnPVwiYVwiIDp0bz1cInsgbmFtZTogJ2Jhc2UnLCBwYXJhbXM6IHsgY2F0ZWdvcnlfaWQ6IHBhcmVudF9pZCB9fVwiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiB0aXRsZT1cItCQ0LLRgtC+0LrRgNC10L/QtdC2XCI+e3sgbmFtZSB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9yb3V0ZXItbGluaz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94LWNvbnRlbnRcIiBkYXRhLXNpbXBsZWJhciBzdHlsZT1cIm1heC1oZWlnaHQ6IGNhbGMoMTAwJSAtIDU0cHgpO1wiPlxyXG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXZcIiBpZD1cImNhdGVnb3J5LWJsb2NrXCI+XHJcbiAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgdi1mb3I9XCJjYXRlZ29yeSBpbiBjYXRlZ29yaWVzXCIgdi1iaW5kOmtleT1cImNhdGVnb3J5LmlkXCIgdGFnPVwibGlcIiA6dG89XCJ7IG5hbWU6ICdiYXNlJywgcGFyYW1zOiB7IGNhdGVnb3J5X2lkOiBjYXRlZ29yeS5pZCB9fVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+e3sgY2F0ZWdvcnkubmFtZSB9fTwvYT5cclxuICAgICAgICAgICAgICAgIDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAgICAgbmFtZTogXCJDYXRlZ29yaWVzXCIsXHJcbiAgICAgICAgcHJvcHM6WydjYXRlZ29yeScsICdyb290X2NhdGVnb3J5J10sXHJcbiAgICAgICAgZGF0YTogKCk9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50X2lkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgb25seV9uYW1lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmllczp7fVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB3YXRjaDoge1xyXG4gICAgICAgICAgICAkcm91dGUodG8sIGZyb20pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Um9vdENhdGVnb3J5KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENhdGVnb3JpZXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW91bnRlZCgpe1xyXG4gICAgICAgICAgICB0aGlzLnNldFJvb3RDYXRlZ29yeSgpO1xyXG4gICAgICAgICAgICB0aGlzLmdldENhdGVnb3JpZXMoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgICAgICAgIC8vIHBhcmVudF9pZCgpe1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMucGFyZW50X2lkID8gdGhpcy5wYXJlbnRfaWQgOiB0aGlzLnJvb3RfY2F0ZWdvcnk7XHJcbiAgICAgICAgICAgIC8vIH0sXHJcbiAgICAgICAgICAgIGNhdGVnb3J5X2lkKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZCA9PT0gJ2FsbCcpID8gdGhpcy5yb290X2NhdGVnb3J5IDogdGhpcy4kcm91dGUucGFyYW1zLmNhdGVnb3J5X2lkO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczp7XHJcbiAgICAgICAgICAgIGlzT25seU5hbWUoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMub25seV9uYW1lID0gdGhpcy5jYXRlZ29yeV9pZCA9PT0gdGhpcy5yb290X2NhdGVnb3J5O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRSb290Q2F0ZWdvcnkoKXtcclxuICAgICAgICAgICAgICAgIGxldCBjYXRlZ29yeSA9IHRoaXMuZ2V0RnJvbUxvY2FsU3RvcmFnZSgnY2F0ZWdvcnlfJyArIHRoaXMuY2F0ZWdvcnlfaWQgKyAnX21ldGEnKTtcclxuICAgICAgICAgICAgICAgIGlmKGNhdGVnb3J5KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWUgPSBjYXRlZ29yeS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50X2lkID0gY2F0ZWdvcnkuY2F0ZWdvcnlfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09ubHlOYW1lKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9jYXRlZ29yaWVzLycgKyB0aGlzLmNhdGVnb3J5X2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9IHJlc3AuZGF0YS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudF9pZCA9IHJlc3AuZGF0YS5jYXRlZ29yeV9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2UoJ2NhdGVnb3J5XycgKyB0aGlzLmNhdGVnb3J5X2lkICsgJ19tZXRhJywgcmVzcC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09ubHlOYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldENhdGVnb3JpZXMoKXtcclxuICAgICAgICAgICAgICAgIGxldCBjYXRlZ29yaWVzID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdjYXRlZ29yaWVzXycgKyB0aGlzLmNhdGVnb3J5X2lkKTtcclxuICAgICAgICAgICAgICAgIGlmKGNhdGVnb3JpZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IGNhdGVnb3JpZXM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9jYXRlZ29yaWVzLycgKyB0aGlzLmNhdGVnb3J5X2lkICsgJy9jaGlsZHJlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzID0gcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZSgnY2F0ZWdvcmllc18nICsgdGhpcy5jYXRlZ29yeV9pZCwgdGhpcy5jYXRlZ29yaWVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuXHJcbjwvc3R5bGU+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICAgIDxkaXYgY2xhc3M9XCJib3R0b20tY29udGFpbmVyXCI+XHJcbiAgICAgICAgPENhdGVnb3JpZXMgdi1iaW5kOnJvb3RfY2F0ZWdvcnk9XCJyb290X2NhdGVnb3J5XCIgLz5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94LWxpc3RlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IG1iLTE1XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWZpZWxkLWNvbnRhaW5lciB3LTEwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2LW1vZGVsLmxhenk9XCJzZWFyY2hcIiB2LWRlYm91bmNlPVwiNDUwXCIgaWQ9XCJzZWFyY2hcIiBuYW1lPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCLQn9C+0LjRgdC6INC/0L4g0YHQutC70LDQtNGDXCIgY2xhc3M9XCJpbnB1dCB3LTEwMFwiIHZhbHVlPVwiXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IG1sLTE1XCIgdi1vbjpjbGljaz1cIm5ld0RpYWxvZygnY2F0ZWdvcnknKVwiPtCd0L7QstCw0Y8g0LrQsNGC0LXQs9C+0YDQuNGPPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gcHJpbWFyeSBtbC0xNVwiIHYtb246Y2xpY2s9XCJuZXdEaWFsb2coJ3Byb2R1Y3QnKVwiPtCd0L7QstGL0Lkg0YLQvtCy0LDRgDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94IGQtZmxleFwiIHN0eWxlPVwiaGVpZ2h0OiBjYWxjKDEwMCUgLSA0NXB4KTtcIj5cclxuICAgICAgICAgICAgICAgIDxUYWJsZSB2LWJpbmQ6dGFibGVfZGF0YT1cInRhYmxlX2RhdGFcIiB2LWJpbmQ6c2VhcmNoPVwic2VhcmNoXCIgdi1iaW5kOnJvb3RfaWQ9XCJyb290X2NhdGVnb3J5XCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICAgIGltcG9ydCBDYXRlZ29yaWVzIGZyb20gXCIuLy4uLy4uL3RlbXBsYXRlL0NhdGVnb3JpZXNcIlxyXG4gICAgaW1wb3J0IFRhYmxlIGZyb20gXCIuLi8uLi9zZXJ2aWNlL1RhYmxlXCI7XHJcbiAgICBpbXBvcnQgZGVib3VuY2UgZnJvbSAnLi8uLi8uLi8uLi9kZWJvdW5jZSdcclxuICAgIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgICAgICBuYW1lOiBcIkJhc2VcIixcclxuICAgICAgICBjb21wb25lbnRzOntcclxuICAgICAgICAgICAgVGFibGUsXHJcbiAgICAgICAgICAgIENhdGVnb3JpZXNcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6ICgpPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcm9vdF9jYXRlZ29yeTogMixcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgc2VhcmNoOiAnJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6bnVsbCxcclxuICAgICAgICAgICAgICAgIHRhYmxlX2RhdGE6e31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW91bnRlZCgpe1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlX2RhdGEuaGVhZGVyID0gW1xyXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogOTAsIHdpZHRoOiA5MCwgbmFtZTogJ0lEJyx0YWJsZV9uYW1lOiAnaWQnfSxcclxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDEwMCwgd2lkdGg6ICdhdXRvJywgbmFtZTogJ9Cd0LDQuNC80LXQvdC+0LLQsNC90LjQtScsIHRhYmxlX25hbWU6ICduYW1lJ30sXHJcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxNTAsIHdpZHRoOiAyMDAsIG5hbWU6ICfQkNGA0YLQuNC60YPQuycsIHRhYmxlX25hbWU6ICdhcnRpY2xlJ30sXHJcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxNTAsIHdpZHRoOiAyMDAsIG5hbWU6ICfQn9GA0L7QuNC30LLQvtC00LjRgtC10LvRjCcsIHRhYmxlX25hbWU6ICdzdXBwbGllcid9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlX2RhdGEuY29udGV4dF9tZW51ID0gW1xyXG4gICAgICAgICAgICAgICAge25hbWU6J9Cg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMJywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXthbGVydCgxMil9fSxcclxuICAgICAgICAgICAgICAgIHtuYW1lOifQntGC0LrRgNGL0YLRjCcsIGFjdGlvbjogZnVuY3Rpb24oZGF0YSl7b3BlbkRpYWxvZygncHJvZHVjdERpYWxvZycsICcmcHJvZHVjdF9pZD0nICsgZGF0YS5jb250ZXh0ZWQuaWQpfX0sXHJcbiAgICAgICAgICAgICAgICB7bmFtZTon0KHQvtC30LTQsNGC0Ywg0LfQsNGP0LLQutGDINC/0L7RgdGC0LDQstGJ0LjQutGDJywgYWN0aW9uOiAoZGF0YSkgPT4ge29wZW5EaWFsb2coJ3Byb3ZpZGVyT3JkZXJEaWFsb2cnLCAnJnByb2R1Y3RzPScgKyB0aGlzLnRhYmxlLmdldFNlbGVjdGVkSURzKCkpfX0sXHJcbiAgICAgICAgICAgICAgICB7bmFtZTon0J/QtdGH0LDRgtGMINGG0LXQvdC90LjQutC+0LInLCBhY3Rpb246IChkYXRhKSA9PiB7d2luZG93Lm9wZW5EaWFsb2coJ2NoZXF1ZURpYWxvZycsICcmcHJvZHVjdHM9JyArIHRoaXMudGFibGUuZ2V0U2VsZWN0ZWRJRHMoKSl9fSxcclxuICAgICAgICAgICAgICAgIHtuYW1lOifQn9C+0LrQsNC30LDRgtGMINCw0L3QsNC70L7Qs9C4INCyINC90LDQu9C40YfQuNC4JywgYWN0aW9uOiAoZGF0YSkgPT4ge3RoaXMuc2hvd0FuYWxvZ3VlcyhkYXRhKTt9fSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy50YWJsZV9kYXRhLmRibF9jbGljayA9IGZ1bmN0aW9uKGlkKXtjb25zb2xlLmxvZyhpZCl9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcHV0ZWQ6e1xyXG4gICAgICAgICAgICBjYXRlZ29yeV9pZCgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeSA9ICh0aGlzLiRyb3V0ZS5wYXJhbXMuY2F0ZWdvcnlfaWQgPT09ICdhbGwnKSA/IHRoaXMucm9vdF9jYXRlZ29yeSA6IHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhdGVnb3J5O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczp7XHJcbiAgICAgICAgICAgIGdldENhdGVnb3JpZXMoKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvZGF0YS9jYXRlZ29yaWVzL2dldCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7Y2F0ZWdvcnlfaWQ6IHRoaXMuY2F0ZWdvcnl9XHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IHJlc3AuZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jYXRlZ29yaWVzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuZXdEaWFsb2codGFnLCBwYXJhbXMgPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRlbWl0KCdvcGVuRGlhbG9nJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZzogdGFnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlyZWN0aXZlczoge2RlYm91bmNlfVxyXG4gICAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcblxyXG48L3N0eWxlPlxyXG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJmbGV4LTEgaC0xMDBcIiwgYXR0cnM6IHsgaWQ6IFwidGFibGUtY29udGFpbmVyXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgcmVmOiBcIm9mc2V0dGVyXCIsIHN0YXRpY0NsYXNzOiBcImgtMTAwXCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJidGFibGUtY29udGFpbmVyXCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiYmJ0YWJsZS1oZWFkZXJcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImhlYWRlci1lbGVtIGNoZWNrYm94XCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJjaGVja2JveFwiIH0sXG4gICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyBjaGVja2VkOiBfdm0uaXNBbnlDaGVja2VkIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwibGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0udG9nZ2xlU2VsZWN0QWxsKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfdm0uX2woX3ZtLnRhYmxlX2RhdGEuaGVhZGVyLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBpdGVtLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImhlYWRlci1lbGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLmlzU29ydEZpZWxkKGl0ZW0pIH0sXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjkwcHhcIiwgXCJtaW4td2lkdGhcIjogXCI5MHB4XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IF92bS5nZXRIZWFkZXJTdHlsZShpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJkYXRhLWZpZWxkXCI6IFwiaWRcIiB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRpdGxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS50b2dnbGVTb3J0KGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKGl0ZW0ubmFtZSkpXVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAhX3ZtLmlzU29ydEZpZWxkKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImFycm93IGRvd25cIiB9KVxuICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF92bS5pc1NvcnRGaWVsZChpdGVtKSAmJiBfdm0uZGlyID09PSBcIkRFU0NcIlxuICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJhcnJvdyBkb3duXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLmlzU29ydEZpZWxkKGl0ZW0pIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmlzU29ydEZpZWxkKGl0ZW0pICYmIF92bS5kaXIgPT09IFwiQVNDXCJcbiAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYXJyb3cgdXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBfdm0uaXNTb3J0RmllbGQoaXRlbSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDJcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJiYnRhYmxlLWJvZHlcIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcImNhbGMoMTAwJSAtIDU5cHgpXCIgfSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgXCJkYXRhLXNpbXBsZWJhclwiOiBcIlwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5pdGVtcywgZnVuY3Rpb24oZWxlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcIml0ZW1fXCIgKyBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogX3ZtLnNldFJlZihlbGVtLCBpbmRleCksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZJbkZvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJvZHktZWxlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgc2VsZWN0ZWQ6IF92bS5pc1NlbGVjdGVkKGVsZW0pIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBkYmxjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5kYmxDbGljayhlbGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0bWVudTogX3ZtLm9wZW5Db250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZWxlY3RJdGVtKGVsZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2VsbCBjaGVja2JveFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJjaGVja2JveFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgY2hlY2tlZDogX3ZtLmlzU2VsZWN0ZWQoZWxlbSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJsYWJlbFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS50YWJsZV9kYXRhLmhlYWRlciwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGl0ZW0ubmFtZSArIGVsZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogX3ZtLmdldEhlYWRlclN0eWxlKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKGVsZW1baXRlbS50YWJsZV9uYW1lXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX3ZtLmxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKDEyLCBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiBlbGVtLCBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjMwcHhcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLnRhYmxlX2RhdGEuaGVhZGVyLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBpdGVtLm5hbWUgKyBcInBsYWNlaG9sZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IF92bS5nZXRIZWFkZXJTdHlsZShpdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByZWY6IFwiY29udFwiLFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjb250ZXh0XCIsXG4gICAgICAgICAgICAgIHN0eWxlOiBfdm0uY29udGV4dF9zdHlsZSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IFwiY29udGV4dFwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfdm0uX2woX3ZtLnRhYmxlX2RhdGEuY29udGV4dF9tZW51LCBmdW5jdGlvbihtZW51KSB7XG4gICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGtleTogbWVudS5uYW1lLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY29udGV4dF9pdGVtXCIsXG4gICAgICAgICAgICAgICAgICBvbjogeyBjbGljazogbWVudS5hY3Rpb24gfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ0aXRsZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhtZW51Lm5hbWUpKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgMFxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInBhZ2luYXRvclwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZGlzYWJsZWQ6IF92bS5maXJzdEJ1dHRvbkRpc2FibGVkIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZXRQYWdlKDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQn9C10YDQstCw0Y9cIildXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZGlzYWJsZWQ6IF92bS5wcmV2QnV0dG9uRGlzYWJsZWQgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNldFBhZ2UoX3ZtLmN1cnJlbnRfcGFnZSAtIDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQndCw0LfQsNC0XCIpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfdm0uX2woX3ZtLnBhZ2luYXRlX2FycmF5LCBmdW5jdGlvbihwYWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IF92bS5pc1BhZ2VBY3RpdmUocGFnZSksXG4gICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZXRQYWdlKHBhZ2UpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MocGFnZSkpXVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZGlzYWJsZWQ6IF92bS5uZXh0QnV0dG9uRGlzYWJsZWQgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNldFBhZ2UoX3ZtLmN1cnJlbnRfcGFnZSArIDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQktC/0LXRgNGR0LRcIildXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZGlzYWJsZWQ6IF92bS5sYXN0QnV0dG9uRGlzYWJsZWQgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNldFBhZ2UoX3ZtLmxhc3RfcGFnZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihcItCf0L7RgdC70LXQtNC90Y/Rj1wiKV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDJcbiAgICAgICAgICApXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImNvbnRlbnQtbWVudSBib3ggdy0yNTBcIiwgYXR0cnM6IHsgaWQ6IFwiY2F0ZWdvcnktbmF2XCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImJveC1oZWFkZXIgc3RvcmVcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX3ZtLm9ubHlfbmFtZSA/IF9jKFwiZGl2XCIsIFtfdm0uX3YoX3ZtLl9zKF92bS5uYW1lKSldKSA6IF92bS5fZSgpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgIV92bS5vbmx5X25hbWVcbiAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNhdGVnb3J5LWJhY2stYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICB0YWc6IFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICB0bzogeyBuYW1lOiBcImJhc2VcIiwgcGFyYW1zOiB7IGNhdGVnb3J5X2lkOiBfdm0ucGFyZW50X2lkIH0gfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJpXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZmEgZmEtY2hldnJvbi1sZWZ0XCIsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgYXR0cnM6IHsgdGl0bGU6IFwi0JDQstGC0L7QutGA0LXQv9C10LZcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0ubmFtZSkpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYm94LWNvbnRlbnRcIixcbiAgICAgICAgICBzdGF0aWNTdHlsZTogeyBcIm1heC1oZWlnaHRcIjogXCJjYWxjKDEwMCUgLSA1NHB4KVwiIH0sXG4gICAgICAgICAgYXR0cnM6IHsgXCJkYXRhLXNpbXBsZWJhclwiOiBcIlwiIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ1bFwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJuYXZcIiwgYXR0cnM6IHsgaWQ6IFwiY2F0ZWdvcnktYmxvY2tcIiB9IH0sXG4gICAgICAgICAgICBfdm0uX2woX3ZtLmNhdGVnb3JpZXMsIGZ1bmN0aW9uKGNhdGVnb3J5KSB7XG4gICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAga2V5OiBjYXRlZ29yeS5pZCxcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHRhZzogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICB0bzogeyBuYW1lOiBcImJhc2VcIiwgcGFyYW1zOiB7IGNhdGVnb3J5X2lkOiBjYXRlZ29yeS5pZCB9IH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiYVwiLCB7IGF0dHJzOiB7IGhyZWY6IFwiI1wiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKGNhdGVnb3J5Lm5hbWUpKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXVxuICAgICAgKVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImJvdHRvbS1jb250YWluZXJcIiB9LFxuICAgIFtcbiAgICAgIF9jKFwiQ2F0ZWdvcmllc1wiLCB7IGF0dHJzOiB7IHJvb3RfY2F0ZWdvcnk6IF92bS5yb290X2NhdGVnb3J5IH0gfSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJib3gtbGlzdGVyXCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImQtZmxleCBtYi0xNVwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInNlYXJjaC1maWVsZC1jb250YWluZXIgdy0xMDBcIiB9LCBbXG4gICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbC5sYXp5XCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNlYXJjaCxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICBtb2RpZmllcnM6IHsgbGF6eTogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcImRlYm91bmNlXCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtZGVib3VuY2VcIixcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiA0NTAsXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIjQ1MFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJpbnB1dCB3LTEwMFwiLFxuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIGlkOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi0J/QvtC40YHQuiDQv9C+INGB0LrQu9Cw0LTRg1wiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0uc2VhcmNoIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIF92bS5zZWFyY2ggPSAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJhY3Rpb25zXCIgfSwgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gcHJpbWFyeSBtbC0xNVwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLm5ld0RpYWxvZyhcImNhdGVnb3J5XCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBbX3ZtLl92KFwi0J3QvtCy0LDRjyDQutCw0YLQtdCz0L7RgNC40Y9cIildXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHByaW1hcnkgbWwtMTVcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5uZXdEaWFsb2coXCJwcm9kdWN0XCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBbX3ZtLl92KFwi0J3QvtCy0YvQuSDRgtC+0LLQsNGAXCIpXVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJveCBkLWZsZXhcIixcbiAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGhlaWdodDogXCJjYWxjKDEwMCUgLSA0NXB4KVwiIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFwiVGFibGVcIiwge1xuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIHRhYmxlX2RhdGE6IF92bS50YWJsZV9kYXRhLFxuICAgICAgICAgICAgICAgIHNlYXJjaDogX3ZtLnNlYXJjaCxcbiAgICAgICAgICAgICAgICByb290X2lkOiBfdm0ucm9vdF9jYXRlZ29yeVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9UYWJsZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzI3N2U0Y2UmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vVGFibGUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9UYWJsZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9wZW5TZXJ2ZXJcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzcyNzdlNGNlJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzcyNzdlNGNlJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzcyNzdlNGNlJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9UYWJsZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzI3N2U0Y2UmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNzI3N2U0Y2UnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvVGFibGUudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UYWJsZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVGFibGUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1RhYmxlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03Mjc3ZTRjZSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9M2RlOTFjNzYmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0NhdGVnb3JpZXMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIzZGU5MWM3NlwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9wZW5TZXJ2ZXJcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzNkZTkxYzc2JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzNkZTkxYzc2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzNkZTkxYzc2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9DYXRlZ29yaWVzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zZGU5MWM3NiZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCczZGU5MWM3NicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvQ2F0ZWdvcmllcy52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NhdGVnb3JpZXMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NhdGVnb3JpZXMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NhdGVnb3JpZXMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNkZTkxYzc2JnNjb3BlZD10cnVlJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9CYXNlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01ZTBjMTgwYiZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9CYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjVlMGMxODBiXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNWUwYzE4MGInKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNWUwYzE4MGInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNWUwYzE4MGInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0Jhc2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTVlMGMxODBiJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzVlMGMxODBiJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9CYXNlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQmFzZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NWUwYzE4MGImc2NvcGVkPXRydWUmXCIiLCJsZXQgZGVib3VuY2UgPSBmdW5jdGlvbiBkZWJvdW5jZSAoZm4sIGRlbGF5KSB7XHJcbiAgICBsZXQgdGltZW91dElEID0gbnVsbDtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7O1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xyXG4gICAgICAgIGxldCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncylcclxuICAgICAgICB9LCBkZWxheSlcclxuICAgIH1cclxufVxyXG5cclxuZGlyZWN0aXZlLmRlYm91bmNlID0gZGVib3VuY2U7XHJcblxyXG5mdW5jdGlvbiBkaXJlY3RpdmUgKGVsLCBiaW5kaW5nKSB7XHJcbiAgICBpZiAoYmluZGluZy52YWx1ZSAhPT0gYmluZGluZy5vbGRWYWx1ZSkgeyAvLyBjaGFuZ2UgZGVib3VuY2Ugb25seSBpZiBpbnRlcnZhbCBoYXMgY2hhbmdlZFxyXG4gICAgICAgIGVsLm9uaW5wdXQgPSBkaXJlY3RpdmUuZGVib3VuY2UoZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJykpXHJcbiAgICAgICAgfSwgcGFyc2VJbnQoYmluZGluZy52YWx1ZSkgfHwgNTAwKVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRpcmVjdGl2ZTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==