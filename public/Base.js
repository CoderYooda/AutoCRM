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
//
//
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
        min_with: 90,
        width: 90,
        name: 'ID',
        table_name: 'id'
      }, {
        min_with: 100,
        width: 'auto',
        name: 'Наименование',
        table_name: 'name'
      }, {
        min_with: 150,
        width: 200,
        name: 'Артикул',
        table_name: 'article'
      }, {
        min_with: 150,
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
      search: null
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
  computed: {// itemss(){
    //     window.axios({
    //         method: 'get',
    //         url: '/store/base/table_data',
    //         params: {
    //             category_id: this.$route.params.category_id,
    //             search: this.$attrs.search
    //         }
    //     }).then((resp) => {
    //         this.items = resp.data.data;
    //         return resp.data.data
    //     });
    //     // this.getItems();
    //     // return this.items;
    // },
  },
  methods: {
    getHeaderStyle: function getHeaderStyle(item) {
      var style = {};

      if (item.min_with) {
        style.min_with = item.min_with + 'px';
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

      window.axios({
        method: 'get',
        url: '/store/base/table_data',
        params: {
          category_id: this.$route.params.category_id,
          search: this.search
        }
      }).then(function (resp) {
        _this2.items = resp.data.data;
      });
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
//
//
//
//
//
//
//
//
//
//
//
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
    { staticClass: "flex-1", attrs: { id: "table-container" } },
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
                    _c("div", { staticClass: "title" }, [
                      _vm._v(_vm._s(item.name))
                    ]),
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
              staticStyle: { height: "calc(100% - 59px)" }
            },
            _vm._l(_vm.items, function(elem) {
              return _c(
                "div",
                { key: elem.id, staticClass: "body-elem" },
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
            0
          ),
          _vm._v(" "),
          _vm._m(2)
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
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "paginator" }, [
      _c("button", { staticClass: "disabled", attrs: { "data-page": "1" } }, [
        _vm._v("Первая")
      ]),
      _vm._v(" "),
      _c("button", { staticClass: "disabled", attrs: { "data-page": "0" } }, [
        _vm._v("Назад")
      ]),
      _vm._v(" "),
      _c("button", { staticClass: "active", attrs: { "data-page": "1" } }, [
        _vm._v("1")
      ]),
      _vm._v(" "),
      _c("button", { attrs: { "data-page": "2" } }, [_vm._v("2")]),
      _vm._v(" "),
      _c("button", { attrs: { "data-page": "2" } }, [_vm._v("Вперёд")]),
      _vm._v(" "),
      _c("button", { attrs: { "data-page": "2" } }, [_vm._v("Последняя")])
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
                  rawName: "v-model",
                  value: _vm.search,
                  expression: "search"
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
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
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
          { staticClass: "box h-100 d-flex" },
          [_c("Table", { attrs: { search: _vm.search } })],
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



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9UYWJsZS52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0NhdGVnb3JpZXMudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9CYXNlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZT8zMDIzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0NhdGVnb3JpZXMudnVlP2M4ZmEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvQmFzZS52dWU/OTMyMSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1RhYmxlLnZ1ZT80Mzc5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvVGFibGUudnVlPzQ1ZmYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvQ2F0ZWdvcmllcy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvQ2F0ZWdvcmllcy52dWU/MWZjNSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9DYXRlZ29yaWVzLnZ1ZT80ZDUzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0Jhc2UudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0Jhc2UudnVlP2NiN2UiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvQmFzZS52dWU/NDIzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdURBO0FBQ0EsZUFEQTtBQUVBO0FBQ0E7QUFDQSxlQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURBLEVBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BRkEsRUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FIQSxFQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUpBLENBREE7QUFPQSxxQkFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FEQSxFQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUZBLEVBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BSEEsRUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FKQSxFQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUxBLENBUEE7QUFjQTtBQUFBO0FBQUEsT0FkQTtBQWVBLGVBZkE7QUFnQkE7QUFoQkE7QUFrQkEsR0FyQkE7QUFzQkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBLEdBdEJBO0FBbUNBLFNBbkNBLHFCQW1DQTtBQUNBO0FBQ0EsR0FyQ0E7QUFzQ0EsYUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFmQSxHQXRDQTtBQXVEQTtBQUNBLGtCQURBLDBCQUNBLElBREEsRUFDQTtBQUNBOztBQUNBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUZBLE1BRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQSxLQVpBO0FBYUEsWUFiQSxzQkFhQTtBQUFB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QTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJCYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICAgIDxkaXYgaWQ9XCJ0YWJsZS1jb250YWluZXJcIiBjbGFzcz1cImZsZXgtMVwiPlxuICAgICAgICA8ZGl2IGlkPVwic3RvcmVUYWJsZVwiIGNsYXNzPVwiaC0xMDBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYnRhYmxlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYnRhYmxlLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWVsZW0gY2hlY2tib3hcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjaGVja19hbGxcIiBuYW1lPVwiY2hlY2tfYWxsXCI+PGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3I9XCJjaGVja19hbGxcIj48L2xhYmVsPjwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJpdGVtIGluIGhlYWRlclwiIHYtYmluZDprZXk9XCJpdGVtLm5hbWVcIiB2LWJpbmQ6c3R5bGU9XCJnZXRIZWFkZXJTdHlsZShpdGVtKVwiIGNsYXNzPVwiaGVhZGVyLWVsZW1cIiBkYXRhLWZpZWxkPVwiaWRcIiBzdHlsZT1cIndpZHRoOiA5MHB4OyBtaW4td2lkdGg6IDkwcHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57eyBpdGVtLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcnJvdyBkb3duXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuPCEtLSAgICAgICAgICAgICAgICBkYXRhLXNpbXBsZWJhci0tPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYnRhYmxlLWJvZHlcIiBzdHlsZT1cImhlaWdodDogY2FsYygxMDAlIC0gNTlweCk7XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJlbGVtIGluIGl0ZW1zXCIgdi1iaW5kOmtleT1cImVsZW0uaWRcIiBjbGFzcz1cImJvZHktZWxlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNlbGwgY2hlY2tib3hcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+PGxhYmVsPjwvbGFiZWw+PC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJpdGVtIGluIGhlYWRlclwiIHYtYmluZDprZXk9XCJpdGVtLm5hbWUgKyBlbGVtLmlkXCIgY2xhc3M9XCJjZWxsXCIgdi1iaW5kOnN0eWxlPVwiZ2V0SGVhZGVyU3R5bGUoaXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57eyBlbGVtW2l0ZW0udGFibGVfbmFtZV0gfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuPCEtLSAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGV4dFwiIGlkPVwiY29udGV4dFwiIHN0eWxlPVwidG9wOiA1N3B4OyBsZWZ0OiAxMzhweDtcIj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZXh0X2l0ZW1cIj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj7QoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjDwvZGl2Pi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGV4dF9pdGVtXCI+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+0J7RgtC60YDRi9GC0Yw8L2Rpdj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRleHRfaXRlbVwiPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPtCh0L7Qt9C00LDRgtGMINC30LDRj9Cy0LrRgyDQv9C+0YHRgtCw0LLRidC40LrRgzwvZGl2Pi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGV4dF9pdGVtXCI+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+0J/QtdGH0LDRgtGMINGG0LXQvdC90LjQutC+0LI8L2Rpdj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRleHRfaXRlbVwiPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPtCf0L7QutCw0LfQsNGC0Ywg0LDQvdCw0LvQvtCz0Lgg0LIg0L3QsNC70LjRh9C40Lg8L2Rpdj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuPCEtLSAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdG9yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1wYWdlPVwiMVwiIGNsYXNzPVwiZGlzYWJsZWRcIj7Qn9C10YDQstCw0Y88L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXBhZ2U9XCIwXCIgY2xhc3M9XCJkaXNhYmxlZFwiPtCd0LDQt9Cw0LQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFjdGl2ZVwiIGRhdGEtcGFnZT1cIjFcIj4xPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1wYWdlPVwiMlwiPjI8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXBhZ2U9XCIyXCI+0JLQv9C10YDRkdC0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1wYWdlPVwiMlwiPtCf0L7RgdC70LXQtNC90Y/RjzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIG5hbWU6IFwiVGFibGVcIixcbiAgICAgICAgZGF0YTogKCk9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICB7bWluX3dpdGg6IDkwLCB3aWR0aDogOTAsIG5hbWU6ICdJRCcsdGFibGVfbmFtZTogJ2lkJ30sXG4gICAgICAgICAgICAgICAgICAgIHttaW5fd2l0aDogMTAwLCB3aWR0aDogJ2F1dG8nLCBuYW1lOiAn0J3QsNC40LzQtdC90L7QstCw0L3QuNC1JywgdGFibGVfbmFtZTogJ25hbWUnfSxcbiAgICAgICAgICAgICAgICAgICAge21pbl93aXRoOiAxNTAsIHdpZHRoOiAyMDAsIG5hbWU6ICfQkNGA0YLQuNC60YPQuycsIHRhYmxlX25hbWU6ICdhcnRpY2xlJ30sXG4gICAgICAgICAgICAgICAgICAgIHttaW5fd2l0aDogMTUwLCB3aWR0aDogMjAwLCBuYW1lOiAn0J/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70YwnLCB0YWJsZV9uYW1lOiAnc3VwcGxpZXInfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGNvbnRleHRfbWVudTogW1xuICAgICAgICAgICAgICAgICAgICB7bmFtZTon0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YwnLCBhY3Rpb246IGZ1bmN0aW9uKGRhdGEpe29wZW5EaWFsb2coJ3Byb2R1Y3REaWFsb2cnLCAnJnByb2R1Y3RfaWQ9JyArIGRhdGEuY29udGV4dGVkLmlkKX19LFxuICAgICAgICAgICAgICAgICAgICB7bmFtZTon0J7RgtC60YDRi9GC0YwnLCBhY3Rpb246IGZ1bmN0aW9uKGRhdGEpe29wZW5EaWFsb2coJ3Byb2R1Y3REaWFsb2cnLCAnJnByb2R1Y3RfaWQ9JyArIGRhdGEuY29udGV4dGVkLmlkKX19LFxuICAgICAgICAgICAgICAgICAgICB7bmFtZTon0KHQvtC30LTQsNGC0Ywg0LfQsNGP0LLQutGDINC/0L7RgdGC0LDQstGJ0LjQutGDJywgYWN0aW9uOiAoZGF0YSkgPT4ge29wZW5EaWFsb2coJ3Byb3ZpZGVyT3JkZXJEaWFsb2cnLCAnJnByb2R1Y3RzPScgKyB0aGlzLnRhYmxlLmdldFNlbGVjdGVkSURzKCkpfX0sXG4gICAgICAgICAgICAgICAgICAgIHtuYW1lOifQn9C10YfQsNGC0Ywg0YbQtdC90L3QuNC60L7QsicsIGFjdGlvbjogKGRhdGEpID0+IHt3aW5kb3cub3BlbkRpYWxvZygnY2hlcXVlRGlhbG9nJywgJyZwcm9kdWN0cz0nICsgdGhpcy50YWJsZS5nZXRTZWxlY3RlZElEcygpKX19LFxuICAgICAgICAgICAgICAgICAgICB7bmFtZTon0J/QvtC60LDQt9Cw0YLRjCDQsNC90LDQu9C+0LPQuCDQsiDQvdCw0LvQuNGH0LjQuCcsIGFjdGlvbjogKGRhdGEpID0+IHt0aGlzLnNob3dBbmFsb2d1ZXMoZGF0YSk7fX0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBkYmxfY2xpY2s6IGZ1bmN0aW9uKGlkKXtvcGVuRGlhbG9nKCdwcm9kdWN0RGlhbG9nJywgJyZwcm9kdWN0X2lkPScgKyBpZCl9LFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICAgICAgICBzZWFyY2g6IG51bGwsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICAvLyAkcm91dGUodG8sIGZyb20pIHtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmdldEl0ZW1zKCk7XG4gICAgICAgICAgICAvLyB9LFxuXG4gICAgICAgICAgICAvLyAkYXR0cnM6IF8uZGVib3VuY2UoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB9LCA1NTApXG4gICAgICAgICAgICAkYXR0cnM6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaCA9IHRoaXMuJGF0dHJzLnNlYXJjaDtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW1zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKXtcbiAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6e1xuICAgICAgICAgICAgLy8gaXRlbXNzKCl7XG4gICAgICAgICAgICAvLyAgICAgd2luZG93LmF4aW9zKHtcbiAgICAgICAgICAgIC8vICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgIC8vICAgICAgICAgdXJsOiAnL3N0b3JlL2Jhc2UvdGFibGVfZGF0YScsXG4gICAgICAgICAgICAvLyAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgY2F0ZWdvcnlfaWQ6IHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZCxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHNlYXJjaDogdGhpcy4kYXR0cnMuc2VhcmNoXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICB9KS50aGVuKChyZXNwKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuaXRlbXMgPSByZXNwLmRhdGEuZGF0YTtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuIHJlc3AuZGF0YS5kYXRhXG4gICAgICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgICAgICAvLyAgICAgLy8gdGhpcy5nZXRJdGVtcygpO1xuICAgICAgICAgICAgLy8gICAgIC8vIHJldHVybiB0aGlzLml0ZW1zO1xuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBnZXRIZWFkZXJTdHlsZShpdGVtKXtcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSB7fTtcbiAgICAgICAgICAgICAgICBpZihpdGVtLm1pbl93aXRoKXtzdHlsZS5taW5fd2l0aCA9IGl0ZW0ubWluX3dpdGggKyAncHgnO31cbiAgICAgICAgICAgICAgICBpZihpdGVtLndpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS53aWR0aCA9PT0gJ2F1dG8nKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmZsZXggPSAxO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUud2lkdGggPSBpdGVtLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SXRlbXMoKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvc3RvcmUvYmFzZS90YWJsZV9kYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeV9pZDogdGhpcy4kcm91dGUucGFyYW1zLmNhdGVnb3J5X2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiB0aGlzLnNlYXJjaCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSByZXNwLmRhdGEuZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1tZW51IGJveCB3LTI1MFwiIGlkPVwiY2F0ZWdvcnktbmF2XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3gtaGVhZGVyIHN0b3JlXCI+XG5cbiAgICAgICAgICAgIDxkaXYgdi1pZj1cIm9ubHlfbmFtZVwiPnt7IG5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgIDxyb3V0ZXItbGluayBjbGFzcz1cImNhdGVnb3J5LWJhY2stYnV0dG9uXCIgdi1pZj1cIiFvbmx5X25hbWVcIiB0YWc9XCJhXCIgOnRvPVwieyBuYW1lOiAnYmFzZScsIHBhcmFtczogeyBjYXRlZ29yeV9pZDogcGFyZW50X2lkIH19XCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgICAgPHNwYW4gdGl0bGU9XCLQkNCy0YLQvtC60YDQtdC/0LXQtlwiPnt7IG5hbWUgfX08L3NwYW4+XG4gICAgICAgICAgICA8L3JvdXRlci1saW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJveC1jb250ZW50XCIgZGF0YS1zaW1wbGViYXIgc3R5bGU9XCJtYXgtaGVpZ2h0OiBjYWxjKDEwMCUgLSA1NHB4KTtcIj5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cIm5hdlwiIGlkPVwiY2F0ZWdvcnktYmxvY2tcIj5cbiAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgdi1mb3I9XCJjYXRlZ29yeSBpbiBjYXRlZ29yaWVzXCIgdi1iaW5kOmtleT1cImNhdGVnb3J5LmlkXCIgdGFnPVwibGlcIiA6dG89XCJ7IG5hbWU6ICdiYXNlJywgcGFyYW1zOiB7IGNhdGVnb3J5X2lkOiBjYXRlZ29yeS5pZCB9fVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPnt7IGNhdGVnb3J5Lm5hbWUgfX08L2E+XG4gICAgICAgICAgICAgICAgPC9yb3V0ZXItbGluaz5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIG5hbWU6IFwiQ2F0ZWdvcmllc1wiLFxuICAgICAgICBkYXRhOiAoKT0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IDIsXG4gICAgICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICBwYXJlbnRfaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgcGFyZW50X25hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgb25seV9uYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6e31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgICRyb3V0ZSh0bywgZnJvbSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Um9vdENhdGVnb3J5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDYXRlZ29yaWVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKXtcblxuICAgICAgICAgICAgdGhpcy5zZXRSb290Q2F0ZWdvcnkoKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZWdvcmllcygpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wdXRlZDoge1xuICAgICAgICAgICAgY2F0ZWdvcnlfaWQoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3J5ID0gKHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZCA9PT0gJ2FsbCcpID8gdGhpcy5yb290X2NhdGVnb3J5IDogdGhpcy4kcm91dGUucGFyYW1zLmNhdGVnb3J5X2lkO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhdGVnb3J5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBpc09ubHlOYW1lKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmx5X25hbWUgPSB0aGlzLiRhdHRycy5jYXRlZ29yeV9pZCA9PSB0aGlzLiRhdHRycy5yb290X2lkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFJvb3RDYXRlZ29yeSgpe1xuICAgICAgICAgICAgICAgIGxldCBjYXRlZ29yeSA9IHRoaXMuZ2V0RnJvbUxvY2FsU3RvcmFnZSgnY2F0ZWdvcnlfJyArIHRoaXMuJGF0dHJzLmNhdGVnb3J5X2lkICsgJ19tZXRhJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeSA9IHRoaXMuJGF0dHJzLmNhdGVnb3J5X2lkO1xuICAgICAgICAgICAgICAgIGlmKGNhdGVnb3J5KXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gY2F0ZWdvcnkubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRfaWQgPSBjYXRlZ29yeS5wYXJlbnRfaWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50X25hbWUgPSBjYXRlZ29yeS5wYXJlbnRfbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09ubHlOYW1lKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvZGF0YS9jYXRlZ29yaWVzL3Nob3cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlfaWQ6IHRoaXMuY2F0ZWdvcnlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9IHJlc3AuZGF0YS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRfaWQgPSByZXNwLmRhdGEucGFyZW50X2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRfbmFtZSA9IHJlc3AuZGF0YS5wYXJlbnRfbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVRvTG9jYWxTdG9yYWdlKCdjYXRlZ29yeV8nICsgdGhpcy4kYXR0cnMuY2F0ZWdvcnlfaWQgKyAnX21ldGEnLCByZXNwLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09ubHlOYW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRDYXRlZ29yaWVzKCl7XG4gICAgICAgICAgICAgICAgbGV0IGNhdGVnb3JpZXMgPSB0aGlzLmdldEZyb21Mb2NhbFN0b3JhZ2UoJ2NhdGVnb3JpZXNfJyArIHRoaXMuY2F0ZWdvcnkpO1xuICAgICAgICAgICAgICAgIGlmKGNhdGVnb3JpZXMpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2RhdGEvY2F0ZWdvcmllcy9nZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7Y2F0ZWdvcnlfaWQ6IHRoaXMuJGF0dHJzLmNhdGVnb3J5X2lkfVxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzID0gcmVzcC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2UoJ2NhdGVnb3JpZXNfJyArIHRoaXMuY2F0ZWdvcnksIHRoaXMuY2F0ZWdvcmllcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiYm90dG9tLWNvbnRhaW5lclwiPlxuICAgICAgICA8Q2F0ZWdvcmllcyB2LWJpbmQ6Y2F0ZWdvcnlfaWQ9XCJjYXRlZ29yeV9pZFwiIHJvb3RfaWQ9XCIyXCIgLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJveC1saXN0ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggbWItMTVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWZpZWxkLWNvbnRhaW5lciB3LTEwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbD1cInNlYXJjaFwiIGlkPVwic2VhcmNoXCIgbmFtZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwi0J/QvtC40YHQuiDQv9C+INGB0LrQu9Cw0LTRg1wiIGNsYXNzPVwiaW5wdXQgdy0xMDBcIiB2YWx1ZT1cIlwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gcHJpbWFyeSBtbC0xNVwiIHYtb246Y2xpY2s9XCJuZXdEaWFsb2coJ2NhdGVnb3J5JylcIj7QndC+0LLQsNGPINC60LDRgtC10LPQvtGA0LjRjzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IG1sLTE1XCIgdi1vbjpjbGljaz1cIm5ld0RpYWxvZygncHJvZHVjdCcpXCI+0J3QvtCy0YvQuSDRgtC+0LLQsNGAPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3ggaC0xMDAgZC1mbGV4XCI+XG4gICAgICAgICAgICAgICAgPFRhYmxlIHYtYmluZDpzZWFyY2g9XCJzZWFyY2hcIi8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBDYXRlZ29yaWVzIGZyb20gXCIuLy4uLy4uL3RlbXBsYXRlL0NhdGVnb3JpZXNcIlxuICAgIGltcG9ydCBUYWJsZSBmcm9tIFwiLi4vLi4vc2VydmljZS9UYWJsZVwiO1xuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgbmFtZTogXCJCYXNlXCIsXG4gICAgICAgIGNvbXBvbmVudHM6e1xuICAgICAgICAgICAgVGFibGUsXG4gICAgICAgICAgICBDYXRlZ29yaWVzXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6ICgpPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByb290X2NhdGVnb3J5OiAyLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgICAgIHNlYXJjaDogJycsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmllczpudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXB1dGVkOntcbiAgICAgICAgICAgIGNhdGVnb3J5X2lkKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeSA9ICh0aGlzLiRyb3V0ZS5wYXJhbXMuY2F0ZWdvcnlfaWQgPT09ICdhbGwnKSA/IHRoaXMucm9vdF9jYXRlZ29yeSA6IHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYXRlZ29yeTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6e1xuICAgICAgICAgICAgZ2V0Q2F0ZWdvcmllcygpe1xuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9kYXRhL2NhdGVnb3JpZXMvZ2V0JyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7Y2F0ZWdvcnlfaWQ6IHRoaXMuY2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzID0gcmVzcC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2F0ZWdvcmllcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV3RGlhbG9nKHRhZywgcGFyYW1zID0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ29wZW5EaWFsb2cnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRhZzogdGFnLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHBhcmFtc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJmbGV4LTFcIiwgYXR0cnM6IHsgaWQ6IFwidGFibGUtY29udGFpbmVyXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaC0xMDBcIiwgYXR0cnM6IHsgaWQ6IFwic3RvcmVUYWJsZVwiIH0gfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJidGFibGUtY29udGFpbmVyXCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiYmJ0YWJsZS1oZWFkZXJcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfdm0uX20oMCksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF92bS5fbChfdm0uaGVhZGVyLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBpdGVtLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImhlYWRlci1lbGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjkwcHhcIiwgXCJtaW4td2lkdGhcIjogXCI5MHB4XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IF92bS5nZXRIZWFkZXJTdHlsZShpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJkYXRhLWZpZWxkXCI6IFwiaWRcIiB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoaXRlbS5uYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYXJyb3cgZG93blwiIH0pXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDJcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJiYnRhYmxlLWJvZHlcIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcImNhbGMoMTAwJSAtIDU5cHgpXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF92bS5fbChfdm0uaXRlbXMsIGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgeyBrZXk6IGVsZW0uaWQsIHN0YXRpY0NsYXNzOiBcImJvZHktZWxlbVwiIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl9tKDEsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0uaGVhZGVyLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogaXRlbS5uYW1lICsgZWxlbS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNlbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBfdm0uZ2V0SGVhZGVyU3R5bGUoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidGl0bGVcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoZWxlbVtpdGVtLnRhYmxlX25hbWVdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIDBcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX3ZtLl9tKDIpXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJoZWFkZXItZWxlbSBjaGVja2JveFwiIH0sIFtcbiAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICBhdHRyczogeyB0eXBlOiBcImNoZWNrYm94XCIsIGlkOiBcImNoZWNrX2FsbFwiLCBuYW1lOiBcImNoZWNrX2FsbFwiIH1cbiAgICAgIH0pLFxuICAgICAgX2MoXCJsYWJlbFwiLCB7IGF0dHJzOiB7IGZvcjogXCJjaGVja19hbGxcIiB9IH0pXG4gICAgXSlcbiAgfSxcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjZWxsIGNoZWNrYm94XCIgfSwgW1xuICAgICAgX2MoXCJpbnB1dFwiLCB7IGF0dHJzOiB7IHR5cGU6IFwiY2hlY2tib3hcIiB9IH0pLFxuICAgICAgX2MoXCJsYWJlbFwiKVxuICAgIF0pXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicGFnaW5hdG9yXCIgfSwgW1xuICAgICAgX2MoXCJidXR0b25cIiwgeyBzdGF0aWNDbGFzczogXCJkaXNhYmxlZFwiLCBhdHRyczogeyBcImRhdGEtcGFnZVwiOiBcIjFcIiB9IH0sIFtcbiAgICAgICAgX3ZtLl92KFwi0J/QtdGA0LLQsNGPXCIpXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImJ1dHRvblwiLCB7IHN0YXRpY0NsYXNzOiBcImRpc2FibGVkXCIsIGF0dHJzOiB7IFwiZGF0YS1wYWdlXCI6IFwiMFwiIH0gfSwgW1xuICAgICAgICBfdm0uX3YoXCLQndCw0LfQsNC0XCIpXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImJ1dHRvblwiLCB7IHN0YXRpY0NsYXNzOiBcImFjdGl2ZVwiLCBhdHRyczogeyBcImRhdGEtcGFnZVwiOiBcIjFcIiB9IH0sIFtcbiAgICAgICAgX3ZtLl92KFwiMVwiKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJidXR0b25cIiwgeyBhdHRyczogeyBcImRhdGEtcGFnZVwiOiBcIjJcIiB9IH0sIFtfdm0uX3YoXCIyXCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJidXR0b25cIiwgeyBhdHRyczogeyBcImRhdGEtcGFnZVwiOiBcIjJcIiB9IH0sIFtfdm0uX3YoXCLQktC/0LXRgNGR0LRcIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImJ1dHRvblwiLCB7IGF0dHJzOiB7IFwiZGF0YS1wYWdlXCI6IFwiMlwiIH0gfSwgW192bS5fdihcItCf0L7RgdC70LXQtNC90Y/Rj1wiKV0pXG4gICAgXSlcbiAgfVxuXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJjb250ZW50LW1lbnUgYm94IHctMjUwXCIsIGF0dHJzOiB7IGlkOiBcImNhdGVnb3J5LW5hdlwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJib3gtaGVhZGVyIHN0b3JlXCIgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF92bS5vbmx5X25hbWUgPyBfYyhcImRpdlwiLCBbX3ZtLl92KF92bS5fcyhfdm0ubmFtZSkpXSkgOiBfdm0uX2UoKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICFfdm0ub25seV9uYW1lXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjYXRlZ29yeS1iYWNrLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgdGFnOiBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgdG86IHsgbmFtZTogXCJiYXNlXCIsIHBhcmFtczogeyBjYXRlZ29yeV9pZDogX3ZtLnBhcmVudF9pZCB9IH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiaVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZhIGZhLWNoZXZyb24tbGVmdFwiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IGF0dHJzOiB7IHRpdGxlOiBcItCQ0LLRgtC+0LrRgNC10L/QtdC2XCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLm5hbWUpKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJveC1jb250ZW50XCIsXG4gICAgICAgICAgc3RhdGljU3R5bGU6IHsgXCJtYXgtaGVpZ2h0XCI6IFwiY2FsYygxMDAlIC0gNTRweClcIiB9LFxuICAgICAgICAgIGF0dHJzOiB7IFwiZGF0YS1zaW1wbGViYXJcIjogXCJcIiB9XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidWxcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibmF2XCIsIGF0dHJzOiB7IGlkOiBcImNhdGVnb3J5LWJsb2NrXCIgfSB9LFxuICAgICAgICAgICAgX3ZtLl9sKF92bS5jYXRlZ29yaWVzLCBmdW5jdGlvbihjYXRlZ29yeSkge1xuICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGtleTogY2F0ZWdvcnkuaWQsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICB0YWc6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgdG86IHsgbmFtZTogXCJiYXNlXCIsIHBhcmFtczogeyBjYXRlZ29yeV9pZDogY2F0ZWdvcnkuaWQgfSB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcImFcIiwgeyBhdHRyczogeyBocmVmOiBcIiNcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhjYXRlZ29yeS5uYW1lKSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF1cbiAgICAgIClcbiAgICBdXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJib3R0b20tY29udGFpbmVyXCIgfSxcbiAgICBbXG4gICAgICBfYyhcIkNhdGVnb3JpZXNcIiwge1xuICAgICAgICBhdHRyczogeyBjYXRlZ29yeV9pZDogX3ZtLmNhdGVnb3J5X2lkLCByb290X2lkOiBcIjJcIiB9XG4gICAgICB9KSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJveC1saXN0ZXJcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZC1mbGV4IG1iLTE1XCIgfSwgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic2VhcmNoLWZpZWxkLWNvbnRhaW5lciB3LTEwMFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNlYXJjaCxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImlucHV0IHctMTAwXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgaWQ6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLQn9C+0LjRgdC6INC/0L4g0YHQutC70LDQtNGDXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5zZWFyY2ggfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBfdm0uc2VhcmNoID0gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYWN0aW9uc1wiIH0sIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHByaW1hcnkgbWwtMTVcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5uZXdEaWFsb2coXCJjYXRlZ29yeVwiKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW192bS5fdihcItCd0L7QstCw0Y8g0LrQsNGC0LXQs9C+0YDQuNGPXCIpXVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBwcmltYXJ5IG1sLTE1XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ubmV3RGlhbG9nKFwicHJvZHVjdFwiKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW192bS5fdihcItCd0L7QstGL0Lkg0YLQvtCy0LDRgFwiKV1cbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImJveCBoLTEwMCBkLWZsZXhcIiB9LFxuICAgICAgICAgIFtfYyhcIlRhYmxlXCIsIHsgYXR0cnM6IHsgc2VhcmNoOiBfdm0uc2VhcmNoIH0gfSldLFxuICAgICAgICAgIDFcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vVGFibGUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTcyNzdlNGNlJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1RhYmxlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vVGFibGUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI3Mjc3ZTRjZVwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9TcGFuZWxcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzcyNzdlNGNlJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzcyNzdlNGNlJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzcyNzdlNGNlJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9UYWJsZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzI3N2U0Y2Umc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNzI3N2U0Y2UnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvVGFibGUudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UYWJsZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVGFibGUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1RhYmxlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03Mjc3ZTRjZSZzY29wZWQ9dHJ1ZSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9M2RlOTFjNzYmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0NhdGVnb3JpZXMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIzZGU5MWM3NlwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9TcGFuZWxcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzNkZTkxYzc2JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzNkZTkxYzc2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzNkZTkxYzc2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9DYXRlZ29yaWVzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zZGU5MWM3NiZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCczZGU5MWM3NicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvQ2F0ZWdvcmllcy52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NhdGVnb3JpZXMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NhdGVnb3JpZXMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NhdGVnb3JpZXMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNkZTkxYzc2JnNjb3BlZD10cnVlJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9CYXNlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01ZTBjMTgwYiZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9CYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjVlMGMxODBiXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT1NwYW5lbFxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNWUwYzE4MGInKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNWUwYzE4MGInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNWUwYzE4MGInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0Jhc2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTVlMGMxODBiJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzVlMGMxODBiJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9CYXNlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQmFzZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NWUwYzE4MGImc2NvcGVkPXRydWUmXCIiXSwic291cmNlUm9vdCI6IiJ9