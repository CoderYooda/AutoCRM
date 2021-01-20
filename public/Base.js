(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Base"],{

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
//
//
//
//
//
//
//
//
//
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
      id: null,
      parent_id: null,
      only_name: true,
      categories: {},
      context_opened: false,
      context_style: {},
      contexted_category: null
    };
  },
  watch: {
    $route: function $route(to, from) {
      this.setRootCategory();
      this.getCategories();
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$eventBus.$on('CategoryUpdated', function (data) {
      _this.$notify({
        group: 'main',
        title: 'Система',
        text: 'Категория обновлена'
      });

      _this.setRootCategory(true);

      _this.getCategories(true);
    });
    this.$eventBus.$on('CategoryDeleted', function () {
      _this.$notify({
        group: 'main',
        title: 'Система',
        text: 'Категория удалена'
      });

      _this.setRootCategory(true);

      _this.getCategories(true);
    });
    this.setRootCategory();
    this.getCategories();
    document.addEventListener('click', this.closeContext);
  },
  computed: {
    // parent_id(){
    //     return this.parent_id ? this.parent_id : this.root_category;
    // },
    loading: function loading() {
      return this.$parent.loading;
    },
    category_id: function category_id() {
      return this.$route.params.category_id === 'all' || parseInt(this.$route.params.category_id) <= parseInt(this.root_category) ? this.root_category : this.$route.params.category_id;
    }
  },
  methods: {
    isSelected: function isSelected(id) {
      return id === this.contexted_category && this.context_opened;
    },
    isOnlyName: function isOnlyName() {
      this.only_name = parseInt(this.category_id) <= parseInt(this.root_category);
    },
    setRootCategory: function setRootCategory() {
      var _this2 = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!force) this.$parent.category_loading = true;
      window.axios({
        method: 'get',
        url: '/categories/' + this.category_id
      }).then(function (resp) {
        _this2.name = resp.data.name;
        _this2.parent_id = resp.data.category_id;

        _this2.isOnlyName();

        _this2.$parent.category_loading = false;
      });
    },
    getCategories: function getCategories() {
      var _this3 = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!force) this.$parent.categories_loading = true;
      window.axios({
        method: 'get',
        url: '/categories/' + this.category_id + '/children'
      }).then(function (resp) {
        _this3.categories = resp.data;
        _this3.$parent.categories_loading = false;
      });
    },
    openContext: function openContext(event, id) {
      event.preventDefault();
      this.contexted_category = id;
      this.context_opened = true;
      var ofsetter = this.$refs.ofsetter_cat;

      if (ofsetter) {
        var contextY = event.clientY - ofsetter.getBoundingClientRect().top + window.scrollY;

        if (event.clientY + this.$refs.contextt.offsetHeight + 100 >= window.innerHeight) {
          contextY -= this.$refs.contextt.offsetHeight;
        }

        this.context_style = {
          top: contextY + 'px',
          left: event.clientX - ofsetter.getBoundingClientRect().left + window.scrollX + 'px'
        };
      }
    },
    closeContext: function closeContext(e) {
      this.context_opened = false;
      this.context_style = {
        top: '-1200px',
        left: '-1200px'
      };
    },
    editCategory: function editCategory() {
      this.$eventBus.$emit('openDialog', {
        tag: 'category',
        params: {
          root_category: this.root_category,
          id: this.contexted_category
        }
      });
    },
    removeCategory: function removeCategory() {
      var _this4 = this;

      this.$confirm({
        title: 'Внимание!',
        message: 'Действие необратимо. Все вложенные товары переместятся в категорию "Несортированные".',
        button: {
          no: 'Закрыть',
          yes: 'Удалить'
        },
        callback: function callback(confirm) {
          if (confirm) {
            window.axios({
              method: 'delete',
              url: '/categories/' + _this4.contexted_category
            }).then(function (resp) {
              _this4.$eventBus.$emit('CategoryDeleted');
            });
          }
        }
      });
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
      table_data: {},
      root_category: 2,
      category: null,
      search: '',
      categories: null,
      table_loading: false,
      category_loading: false,
      categories_loading: false
    };
  },
  beforeMount: function beforeMount() {
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
      action: function action(elem) {
        _this.newDialog('product', {
          id: elem.id
        });
      }
    }, {
      name: 'Открыть',
      action: function action(id) {
        _this.newDialog('product', {
          id: id
        });
      }
    }, {
      name: 'Создать заявку поставщику',
      action: function action(id) {
        openDialog('providerOrderDialog', '&products=' + _this.table.getSelectedIDs());
      }
    }, {
      name: 'Печать ценников',
      action: function action(id) {
        window.openDialog('chequeDialog', '&products=' + _this.table.getSelectedIDs());
      }
    }, {
      name: 'Показать аналоги в наличии',
      action: function action(id) {
        _this.showAnalogues(id);
      }
    }];

    this.table_data.dbl_click = function (id) {
      _this.newDialog('product', {
        id: id
      });
    };

    this.table_data.url = '/store/base/table_data';
    this.table_data.event_tag = 'Product';
  },
  computed: {
    loading: function loading() {
      return this.table_loading || this.category_loading || this.categories_loading;
    },
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
    {
      ref: "ofsetter_cat",
      staticClass: "content-menu box w-250",
      attrs: { id: "category-nav" }
    },
    [
      _vm.loading
        ? _c(
            "div",
            {
              staticClass: "list-placeholder",
              staticStyle: { height: "53px" }
            },
            [_vm._m(0)]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.loading
        ? _c(
            "div",
            { staticClass: "list-placeholder" },
            _vm._l(12, function(elem) {
              return _c(
                "div",
                {
                  key: elem,
                  staticClass: "list-placeholder_item",
                  staticStyle: { height: "31px" }
                },
                [
                  _c("div", {
                    staticClass: "list-placeholder_cell",
                    staticStyle: { width: "100%" }
                  })
                ]
              )
            }),
            0
          )
        : _vm._e(),
      _vm._v(" "),
      !_vm.loading
        ? _c(
            "div",
            {
              ref: "contextt",
              staticClass: "context",
              style: _vm.context_style,
              attrs: { id: "context" }
            },
            [
              _c(
                "div",
                {
                  staticClass: "context_item",
                  on: {
                    click: function($event) {
                      return _vm.editCategory()
                    }
                  }
                },
                [_c("div", { staticClass: "title" }, [_vm._v("Редактировать")])]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "context_item",
                  on: {
                    click: function($event) {
                      return _vm.removeCategory()
                    }
                  }
                },
                [_c("div", { staticClass: "title" }, [_vm._v("Удалить")])]
              )
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      !_vm.loading
        ? _c(
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
                        to: {
                          name: "base",
                          params: { category_id: _vm.parent_id }
                        }
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
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "box-content",
          class: { "d-none": _vm.loading },
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
                  _c(
                    "a",
                    {
                      class: { active: _vm.isSelected(category.id) },
                      attrs: { href: "#" },
                      on: {
                        contextmenu: function($event) {
                          return _vm.openContext($event, category.id)
                        }
                      }
                    },
                    [_vm._v(_vm._s(category.name))]
                  )
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
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "list-placeholder_item", staticStyle: { height: "53px" } },
      [
        _c("div", {
          staticClass: "list-placeholder_cell",
          staticStyle: { width: "100%" }
        })
      ]
    )
  }
]
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
                    return _vm.newDialog("category", {
                      root_category: _vm.root_category,
                      selected_category: _vm.category_id
                    })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvQ2F0ZWdvcmllcy52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0Jhc2UudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0NhdGVnb3JpZXMudnVlP2M4ZmEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvQmFzZS52dWU/OTMyMSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9DYXRlZ29yaWVzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9DYXRlZ29yaWVzLnZ1ZT8xZmM1Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0NhdGVnb3JpZXMudnVlPzRkNTMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvQmFzZS52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvQmFzZS52dWU/Y2I3ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9CYXNlLnZ1ZT80MjM1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1Q0E7QUFDQSxvQkFEQTtBQUVBLHNDQUZBO0FBR0E7QUFDQTtBQUNBLGdCQURBO0FBRUEsY0FGQTtBQUdBLHFCQUhBO0FBSUEscUJBSkE7QUFLQSxvQkFMQTtBQU1BLDJCQU5BO0FBT0EsdUJBUEE7QUFRQTtBQVJBO0FBVUEsR0FkQTtBQWVBO0FBQ0EsVUFEQSxrQkFDQSxFQURBLEVB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QUUsMEVBQU07QUFDUixFQUFFLDJGQUFNO0FBQ1IsRUFBRSxvR0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBZ00sQ0FBZ0IsZ1BBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBcE47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6IkJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgICA8ZGl2ICByZWY9XCJvZnNldHRlcl9jYXRcIiBjbGFzcz1cImNvbnRlbnQtbWVudSBib3ggdy0yNTBcIiBpZD1cImNhdGVnb3J5LW5hdlwiPlxyXG4gICAgICAgIDxkaXYgdi1pZj1cImxvYWRpbmdcIiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJcIiBzdHlsZT1cImhlaWdodDogNTNweDtcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiIHN0eWxlPVwiaGVpZ2h0OiA1M3B4O1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfY2VsbFwiIHN0eWxlPVwid2lkdGg6IDEwMCVcIiA+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgdi1pZj1cImxvYWRpbmdcIiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJcIj5cclxuICAgICAgICAgICAgPGRpdiB2LWZvcj1cImVsZW0gaW4gMTJcIiB2LWJpbmQ6a2V5PVwiZWxlbVwiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9pdGVtXCIgc3R5bGU9XCJoZWlnaHQ6IDMxcHg7XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiID48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiB2LWlmPVwiIWxvYWRpbmdcIiByZWY9XCJjb250ZXh0dFwiIGNsYXNzPVwiY29udGV4dFwiIGlkPVwiY29udGV4dFwiIHYtYmluZDpzdHlsZT1cImNvbnRleHRfc3R5bGVcIj5cclxuICAgICAgICAgICAgPGRpdiB2LW9uOmNsaWNrPVwiZWRpdENhdGVnb3J5KClcIiBjbGFzcz1cImNvbnRleHRfaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0Yw8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgdi1vbjpjbGljaz1cInJlbW92ZUNhdGVnb3J5KClcIiBjbGFzcz1cImNvbnRleHRfaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+0KPQtNCw0LvQuNGC0Yw8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiB2LWlmPVwiIWxvYWRpbmdcIiBjbGFzcz1cImJveC1oZWFkZXIgc3RvcmVcIj5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwib25seV9uYW1lXCI+e3sgbmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICA8cm91dGVyLWxpbmsgY2xhc3M9XCJjYXRlZ29yeS1iYWNrLWJ1dHRvblwiIHYtaWY9XCIhb25seV9uYW1lXCIgdGFnPVwiYVwiIDp0bz1cInsgbmFtZTogJ2Jhc2UnLCBwYXJhbXM6IHsgY2F0ZWdvcnlfaWQ6IHBhcmVudF9pZCB9fVwiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiB0aXRsZT1cItCQ0LLRgtC+0LrRgNC10L/QtdC2XCI+e3sgbmFtZSB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9yb3V0ZXItbGluaz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94LWNvbnRlbnRcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2Qtbm9uZScgOiBsb2FkaW5nfVwiIGRhdGEtc2ltcGxlYmFyIHN0eWxlPVwibWF4LWhlaWdodDogY2FsYygxMDAlIC0gNTRweCk7XCI+XHJcbiAgICAgICAgICAgIDx1bCBjbGFzcz1cIm5hdlwiIGlkPVwiY2F0ZWdvcnktYmxvY2tcIj5cclxuICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB2LWZvcj1cImNhdGVnb3J5IGluIGNhdGVnb3JpZXNcIiB2LWJpbmQ6a2V5PVwiY2F0ZWdvcnkuaWRcIiB0YWc9XCJsaVwiIDp0bz1cInsgbmFtZTogJ2Jhc2UnLCBwYXJhbXM6IHsgY2F0ZWdvcnlfaWQ6IGNhdGVnb3J5LmlkIH19XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgdi1iaW5kOmNsYXNzPVwieydhY3RpdmUnIDogaXNTZWxlY3RlZChjYXRlZ29yeS5pZCl9XCIgdi1vbjpjb250ZXh0bWVudT1cIm9wZW5Db250ZXh0KCRldmVudCwgY2F0ZWdvcnkuaWQgKVwiIGhyZWY9XCIjXCI+e3sgY2F0ZWdvcnkubmFtZSB9fTwvYT5cclxuICAgICAgICAgICAgICAgIDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gICAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICAgIG5hbWU6IFwiQ2F0ZWdvcmllc1wiLFxyXG4gICAgICAgIHByb3BzOlsnY2F0ZWdvcnknLCAncm9vdF9jYXRlZ29yeSddLFxyXG4gICAgICAgIGRhdGE6ICgpPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50X2lkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgb25seV9uYW1lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmllczp7fSxcclxuICAgICAgICAgICAgICAgIGNvbnRleHRfb3BlbmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvbnRleHRfc3R5bGU6e30sXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0ZWRfY2F0ZWdvcnk6IG51bGwsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHdhdGNoOiB7XHJcbiAgICAgICAgICAgICRyb3V0ZSh0bywgZnJvbSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRSb290Q2F0ZWdvcnkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZWdvcmllcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3VudGVkKCl7XHJcbiAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRvbignQ2F0ZWdvcnlVcGRhdGVkJywgKGRhdGEpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiAnbWFpbicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfQodC40YHRgtC10LzQsCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ9Ca0LDRgtC10LPQvtGA0LjRjyDQvtCx0L3QvtCy0LvQtdC90LAnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Um9vdENhdGVnb3J5KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDYXRlZ29yaWVzKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJG9uKCdDYXRlZ29yeURlbGV0ZWQnLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kbm90aWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cDogJ21haW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn0KHQuNGB0YLQtdC80LAnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfQmtCw0YLQtdCz0L7RgNC40Y8g0YPQtNCw0LvQtdC90LAnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Um9vdENhdGVnb3J5KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDYXRlZ29yaWVzKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRSb290Q2F0ZWdvcnkoKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRDYXRlZ29yaWVzKCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZUNvbnRleHQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuICAgICAgICAgICAgLy8gcGFyZW50X2lkKCl7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gdGhpcy5wYXJlbnRfaWQgPyB0aGlzLnBhcmVudF9pZCA6IHRoaXMucm9vdF9jYXRlZ29yeTtcclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAgbG9hZGluZygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHBhcmVudC5sb2FkaW5nO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYXRlZ29yeV9pZCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLiRyb3V0ZS5wYXJhbXMuY2F0ZWdvcnlfaWQgPT09ICdhbGwnIHx8IHBhcnNlSW50KHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZCkgPD0gcGFyc2VJbnQodGhpcy5yb290X2NhdGVnb3J5KSkgPyB0aGlzLnJvb3RfY2F0ZWdvcnkgOiB0aGlzLiRyb3V0ZS5wYXJhbXMuY2F0ZWdvcnlfaWQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOntcclxuICAgICAgICAgICAgaXNTZWxlY3RlZChpZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGlkID09PSB0aGlzLmNvbnRleHRlZF9jYXRlZ29yeSkgJiYgdGhpcy5jb250ZXh0X29wZW5lZDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXNPbmx5TmFtZSgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbmx5X25hbWUgPSBwYXJzZUludCh0aGlzLmNhdGVnb3J5X2lkKSA8PSBwYXJzZUludCh0aGlzLnJvb3RfY2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgc2V0Um9vdENhdGVnb3J5KGZvcmNlID0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBpZighZm9yY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmNhdGVnb3J5X2xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9jYXRlZ29yaWVzLycgKyB0aGlzLmNhdGVnb3J5X2lkLFxyXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWUgPSByZXNwLmRhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudF9pZCA9IHJlc3AuZGF0YS5jYXRlZ29yeV9pZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT25seU5hbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuY2F0ZWdvcnlfbG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldENhdGVnb3JpZXMoZm9yY2UgPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGlmKCFmb3JjZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuY2F0ZWdvcmllc19sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvY2F0ZWdvcmllcy8nICsgdGhpcy5jYXRlZ29yeV9pZCArICcvY2hpbGRyZW4nLFxyXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmNhdGVnb3JpZXNfbG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9wZW5Db250ZXh0KGV2ZW50LCBpZCl7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ZWRfY2F0ZWdvcnkgPSBpZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dF9vcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9mc2V0dGVyID0gdGhpcy4kcmVmcy5vZnNldHRlcl9jYXQ7XHJcbiAgICAgICAgICAgICAgICBpZihvZnNldHRlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRleHRZID0gZXZlbnQuY2xpZW50WSAtIG9mc2V0dGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5zY3JvbGxZO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50LmNsaWVudFkgKyB0aGlzLiRyZWZzLmNvbnRleHR0Lm9mZnNldEhlaWdodCArIDEwMCA+PSB3aW5kb3cuaW5uZXJIZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0WSAtPSB0aGlzLiRyZWZzLmNvbnRleHR0Lm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0X3N0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IGNvbnRleHRZICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZXZlbnQuY2xpZW50WCAtIG9mc2V0dGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyB3aW5kb3cuc2Nyb2xsWCArICdweCdcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbG9zZUNvbnRleHQoZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRfb3BlbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRfc3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnLTEyMDBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJy0xMjAwcHgnLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZWRpdENhdGVnb3J5KCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnb3BlbkRpYWxvZycsIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWc6ICdjYXRlZ29yeScsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7cm9vdF9jYXRlZ29yeTp0aGlzLnJvb3RfY2F0ZWdvcnksIGlkOiB0aGlzLmNvbnRleHRlZF9jYXRlZ29yeX1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZW1vdmVDYXRlZ29yeSgpe1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuJGNvbmZpcm0oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ9CS0L3QuNC80LDQvdC40LUhJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ9CU0LXQudGB0YLQstC40LUg0L3QtdC+0LHRgNCw0YLQuNC80L4uINCS0YHQtSDQstC70L7QttC10L3QvdGL0LUg0YLQvtCy0LDRgNGLINC/0LXRgNC10LzQtdGB0YLRj9GC0YHRjyDQsiDQutCw0YLQtdCz0L7RgNC40Y4gXCLQndC10YHQvtGA0YLQuNGA0L7QstCw0L3QvdGL0LVcIi4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vOiAn0JfQsNC60YDRi9GC0YwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVzOiAn0KPQtNCw0LvQuNGC0YwnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjb25maXJtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZGVsZXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2NhdGVnb3JpZXMvJyArIHRoaXMuY29udGV4dGVkX2NhdGVnb3J5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRlbWl0KCdDYXRlZ29yeURlbGV0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG5cclxuPC9zdHlsZT5cclxuIiwiPHRlbXBsYXRlPlxyXG4gICAgPGRpdiBjbGFzcz1cImJvdHRvbS1jb250YWluZXJcIj5cclxuICAgICAgICA8Q2F0ZWdvcmllcyB2LWJpbmQ6cm9vdF9jYXRlZ29yeT1cInJvb3RfY2F0ZWdvcnlcIiAvPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3gtbGlzdGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggbWItMTVcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtZmllbGQtY29udGFpbmVyIHctMTAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHYtbW9kZWwubGF6eT1cInNlYXJjaFwiIHYtZGVib3VuY2U9XCI0NTBcIiBpZD1cInNlYXJjaFwiIG5hbWU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cItCf0L7QuNGB0Log0L/QviDRgdC60LvQsNC00YNcIiBjbGFzcz1cImlucHV0IHctMTAwXCIgdmFsdWU9XCJcIiB0eXBlPVwidGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHByaW1hcnkgbWwtMTVcIiB2LW9uOmNsaWNrPVwibmV3RGlhbG9nKCdjYXRlZ29yeScsICB7cm9vdF9jYXRlZ29yeTpyb290X2NhdGVnb3J5LCBzZWxlY3RlZF9jYXRlZ29yeTogY2F0ZWdvcnlfaWQsIH0pXCI+0J3QvtCy0LDRjyDQutCw0YLQtdCz0L7RgNC40Y88L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IG1sLTE1XCIgdi1vbjpjbGljaz1cIm5ld0RpYWxvZygncHJvZHVjdCcpXCI+0J3QvtCy0YvQuSDRgtC+0LLQsNGAPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3ggZC1mbGV4XCIgc3R5bGU9XCJoZWlnaHQ6IGNhbGMoMTAwJSAtIDQ1cHgpO1wiPlxyXG4gICAgICAgICAgICAgICAgPFRhYmxlIHYtYmluZDp0YWJsZV9kYXRhPVwidGFibGVfZGF0YVwiIHYtYmluZDpzZWFyY2g9XCJzZWFyY2hcIiB2LWJpbmQ6cm9vdF9pZD1cInJvb3RfY2F0ZWdvcnlcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gICAgaW1wb3J0IENhdGVnb3JpZXMgZnJvbSBcIi4vLi4vLi4vdGVtcGxhdGUvQ2F0ZWdvcmllc1wiXHJcbiAgICBpbXBvcnQgVGFibGUgZnJvbSBcIi4uLy4uL3NlcnZpY2UvVGFibGVcIjtcclxuICAgIGltcG9ydCBkZWJvdW5jZSBmcm9tICcuLy4uLy4uLy4uL2RlYm91bmNlJ1xyXG4gICAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICAgIG5hbWU6IFwiQmFzZVwiLFxyXG4gICAgICAgIGNvbXBvbmVudHM6e1xyXG4gICAgICAgICAgICBUYWJsZSxcclxuICAgICAgICAgICAgQ2F0ZWdvcmllc1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YTogKCk9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0YWJsZV9kYXRhOnt9LFxyXG4gICAgICAgICAgICAgICAgcm9vdF9jYXRlZ29yeTogMixcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgc2VhcmNoOiAnJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6bnVsbCxcclxuICAgICAgICAgICAgICAgIHRhYmxlX2xvYWRpbmc6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeV9sb2FkaW5nOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmllc19sb2FkaW5nOmZhbHNlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiZWZvcmVNb3VudCgpe1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlX2RhdGEuaGVhZGVyID0gW1xyXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogOTAsIHdpZHRoOiA5MCwgbmFtZTogJ0lEJyx0YWJsZV9uYW1lOiAnaWQnfSxcclxuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDEwMCwgd2lkdGg6ICdhdXRvJywgbmFtZTogJ9Cd0LDQuNC80LXQvdC+0LLQsNC90LjQtScsIHRhYmxlX25hbWU6ICduYW1lJ30sXHJcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxNTAsIHdpZHRoOiAyMDAsIG5hbWU6ICfQkNGA0YLQuNC60YPQuycsIHRhYmxlX25hbWU6ICdhcnRpY2xlJ30sXHJcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxNTAsIHdpZHRoOiAyMDAsIG5hbWU6ICfQn9GA0L7QuNC30LLQvtC00LjRgtC10LvRjCcsIHRhYmxlX25hbWU6ICdzdXBwbGllcid9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlX2RhdGEuY29udGV4dF9tZW51ID0gW1xyXG4gICAgICAgICAgICAgICAge25hbWU6J9Cg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMJywgYWN0aW9uOiAoZWxlbSk9Pnt0aGlzLm5ld0RpYWxvZygncHJvZHVjdCcsIHtpZDplbGVtLmlkfSl9fSxcclxuICAgICAgICAgICAgICAgIHtuYW1lOifQntGC0LrRgNGL0YLRjCcsIGFjdGlvbjogKGlkKSA9PiB7dGhpcy5uZXdEaWFsb2coJ3Byb2R1Y3QnLCB7aWQ6aWR9KX19LFxyXG4gICAgICAgICAgICAgICAge25hbWU6J9Ch0L7Qt9C00LDRgtGMINC30LDRj9Cy0LrRgyDQv9C+0YHRgtCw0LLRidC40LrRgycsIGFjdGlvbjogKGlkKSA9PiB7b3BlbkRpYWxvZygncHJvdmlkZXJPcmRlckRpYWxvZycsICcmcHJvZHVjdHM9JyArIHRoaXMudGFibGUuZ2V0U2VsZWN0ZWRJRHMoKSl9fSxcclxuICAgICAgICAgICAgICAgIHtuYW1lOifQn9C10YfQsNGC0Ywg0YbQtdC90L3QuNC60L7QsicsIGFjdGlvbjogKGlkKSA9PiB7d2luZG93Lm9wZW5EaWFsb2coJ2NoZXF1ZURpYWxvZycsICcmcHJvZHVjdHM9JyArIHRoaXMudGFibGUuZ2V0U2VsZWN0ZWRJRHMoKSl9fSxcclxuICAgICAgICAgICAgICAgIHtuYW1lOifQn9C+0LrQsNC30LDRgtGMINCw0L3QsNC70L7Qs9C4INCyINC90LDQu9C40YfQuNC4JywgYWN0aW9uOiAoaWQpID0+IHt0aGlzLnNob3dBbmFsb2d1ZXMoaWQpO319LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlX2RhdGEuZGJsX2NsaWNrID0gKGlkKSA9PiB7dGhpcy5uZXdEaWFsb2coJ3Byb2R1Y3QnLCB7aWQ6aWR9KX07XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS51cmwgPSAnL3N0b3JlL2Jhc2UvdGFibGVfZGF0YSc7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5ldmVudF90YWcgPSAnUHJvZHVjdCc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wdXRlZDp7XHJcbiAgICAgICAgICAgIGxvYWRpbmcoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYmxlX2xvYWRpbmcgfHwgdGhpcy5jYXRlZ29yeV9sb2FkaW5nIHx8IHRoaXMuY2F0ZWdvcmllc19sb2FkaW5nO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYXRlZ29yeV9pZCgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeSA9ICh0aGlzLiRyb3V0ZS5wYXJhbXMuY2F0ZWdvcnlfaWQgPT09ICdhbGwnKSA/IHRoaXMucm9vdF9jYXRlZ29yeSA6IHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhdGVnb3J5O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczp7XHJcbiAgICAgICAgICAgIGdldENhdGVnb3JpZXMoKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvZGF0YS9jYXRlZ29yaWVzL2dldCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7Y2F0ZWdvcnlfaWQ6IHRoaXMuY2F0ZWdvcnl9XHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuZXdEaWFsb2codGFnLCBwYXJhbXMgPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRlbWl0KCdvcGVuRGlhbG9nJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZzogdGFnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlyZWN0aXZlczoge2RlYm91bmNlfVxyXG4gICAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcblxyXG48L3N0eWxlPlxyXG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAge1xuICAgICAgcmVmOiBcIm9mc2V0dGVyX2NhdFwiLFxuICAgICAgc3RhdGljQ2xhc3M6IFwiY29udGVudC1tZW51IGJveCB3LTI1MFwiLFxuICAgICAgYXR0cnM6IHsgaWQ6IFwiY2F0ZWdvcnktbmF2XCIgfVxuICAgIH0sXG4gICAgW1xuICAgICAgX3ZtLmxvYWRpbmdcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJcIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjUzcHhcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fbSgwKV1cbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmxvYWRpbmdcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJcIiB9LFxuICAgICAgICAgICAgX3ZtLl9sKDEyLCBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGtleTogZWxlbSxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjMxcHhcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfY2VsbFwiLFxuICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCIxMDAlXCIgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgMFxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAhX3ZtLmxvYWRpbmdcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJlZjogXCJjb250ZXh0dFwiLFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjb250ZXh0XCIsXG4gICAgICAgICAgICAgIHN0eWxlOiBfdm0uY29udGV4dF9zdHlsZSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IFwiY29udGV4dFwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY29udGV4dF9pdGVtXCIsXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5lZGl0Q2F0ZWdvcnkoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ0aXRsZVwiIH0sIFtfdm0uX3YoXCLQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFwiKV0pXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvbnRleHRfaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ucmVtb3ZlQ2F0ZWdvcnkoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ0aXRsZVwiIH0sIFtfdm0uX3YoXCLQo9C00LDQu9C40YLRjFwiKV0pXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICFfdm0ubG9hZGluZ1xuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiYm94LWhlYWRlciBzdG9yZVwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5vbmx5X25hbWUgPyBfYyhcImRpdlwiLCBbX3ZtLl92KF92bS5fcyhfdm0ubmFtZSkpXSkgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgIV92bS5vbmx5X25hbWVcbiAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjYXRlZ29yeS1iYWNrLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6IFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG86IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJiYXNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogeyBjYXRlZ29yeV9pZDogX3ZtLnBhcmVudF9pZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJpXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZhIGZhLWNoZXZyb24tbGVmdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBhdHRyczogeyB0aXRsZTogXCLQkNCy0YLQvtC60YDQtdC/0LXQtlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0ubmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYm94LWNvbnRlbnRcIixcbiAgICAgICAgICBjbGFzczogeyBcImQtbm9uZVwiOiBfdm0ubG9hZGluZyB9LFxuICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IFwibWF4LWhlaWdodFwiOiBcImNhbGMoMTAwJSAtIDU0cHgpXCIgfSxcbiAgICAgICAgICBhdHRyczogeyBcImRhdGEtc2ltcGxlYmFyXCI6IFwiXCIgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInVsXCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIm5hdlwiLCBhdHRyczogeyBpZDogXCJjYXRlZ29yeS1ibG9ja1wiIH0gfSxcbiAgICAgICAgICAgIF92bS5fbChfdm0uY2F0ZWdvcmllcywgZnVuY3Rpb24oY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBrZXk6IGNhdGVnb3J5LmlkLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgdGFnOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvOiB7IG5hbWU6IFwiYmFzZVwiLCBwYXJhbXM6IHsgY2F0ZWdvcnlfaWQ6IGNhdGVnb3J5LmlkIH0gfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBfdm0uaXNTZWxlY3RlZChjYXRlZ29yeS5pZCkgfSxcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBocmVmOiBcIiNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0bWVudTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub3BlbkNvbnRleHQoJGV2ZW50LCBjYXRlZ29yeS5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKGNhdGVnb3J5Lm5hbWUpKV1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXVxuICAgICAgKVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIiwgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjUzcHhcIiB9IH0sXG4gICAgICBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2NlbGxcIixcbiAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCIxMDAlXCIgfVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIClcbiAgfVxuXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJib3R0b20tY29udGFpbmVyXCIgfSxcbiAgICBbXG4gICAgICBfYyhcIkNhdGVnb3JpZXNcIiwgeyBhdHRyczogeyByb290X2NhdGVnb3J5OiBfdm0ucm9vdF9jYXRlZ29yeSB9IH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYm94LWxpc3RlclwiIH0sIFtcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJkLWZsZXggbWItMTVcIiB9LCBbXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzZWFyY2gtZmllbGQtY29udGFpbmVyIHctMTAwXCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWwubGF6eVwiLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zZWFyY2gsXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgICAgbW9kaWZpZXJzOiB7IGxhenk6IHRydWUgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZWJvdW5jZVwiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LWRlYm91bmNlXCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogNDUwLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCI0NTBcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaW5wdXQgdy0xMDBcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBpZDogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcItCf0L7QuNGB0Log0L/QviDRgdC60LvQsNC00YNcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLnNlYXJjaCB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBfdm0uc2VhcmNoID0gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYWN0aW9uc1wiIH0sIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHByaW1hcnkgbWwtMTVcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5uZXdEaWFsb2coXCJjYXRlZ29yeVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgcm9vdF9jYXRlZ29yeTogX3ZtLnJvb3RfY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRfY2F0ZWdvcnk6IF92bS5jYXRlZ29yeV9pZFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW192bS5fdihcItCd0L7QstCw0Y8g0LrQsNGC0LXQs9C+0YDQuNGPXCIpXVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBwcmltYXJ5IG1sLTE1XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ubmV3RGlhbG9nKFwicHJvZHVjdFwiKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW192bS5fdihcItCd0L7QstGL0Lkg0YLQvtCy0LDRgFwiKV1cbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJib3ggZC1mbGV4XCIsXG4gICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiY2FsYygxMDAlIC0gNDVweClcIiB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcIlRhYmxlXCIsIHtcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICB0YWJsZV9kYXRhOiBfdm0udGFibGVfZGF0YSxcbiAgICAgICAgICAgICAgICBzZWFyY2g6IF92bS5zZWFyY2gsXG4gICAgICAgICAgICAgICAgcm9vdF9pZDogX3ZtLnJvb3RfY2F0ZWdvcnlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9M2RlOTFjNzYmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0NhdGVnb3JpZXMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIzZGU5MWM3NlwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9wZW5TZXJ2ZXJcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzNkZTkxYzc2JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzNkZTkxYzc2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzNkZTkxYzc2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9DYXRlZ29yaWVzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zZGU5MWM3NiZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCczZGU5MWM3NicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvQ2F0ZWdvcmllcy52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NhdGVnb3JpZXMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NhdGVnb3JpZXMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NhdGVnb3JpZXMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNkZTkxYzc2JnNjb3BlZD10cnVlJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9CYXNlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01ZTBjMTgwYiZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9CYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjVlMGMxODBiXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNWUwYzE4MGInKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNWUwYzE4MGInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNWUwYzE4MGInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0Jhc2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTVlMGMxODBiJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzVlMGMxODBiJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9CYXNlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQmFzZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NWUwYzE4MGImc2NvcGVkPXRydWUmXCIiXSwic291cmNlUm9vdCI6IiJ9